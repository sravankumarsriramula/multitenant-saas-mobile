import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
} from 'react-native';
import { productApi } from '../api/products';
import { Product } from '../types';
import Loading from '../components/Loading';
import Button from '../components/Button';

const ProductsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await productApi.getAll();
            setProducts(data);
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const handleDelete = async (id: string) => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await productApi.delete(id);
                            fetchProducts();
                            Alert.alert('Success', 'Product deleted successfully');
                        } catch (error: any) {
                            Alert.alert('Error', error.response?.data?.message || 'Failed to delete product');
                        }
                    },
                },
            ]
        );
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
            activeOpacity={0.7}
        >
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                {item.description && (
                    <Text style={styles.productDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                )}
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading) {
        return <Loading message="Loading products..." />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Products</Text>
                <Button
                    title="+ Add"
                    onPress={() => navigation.navigate('ProductDetail', { id: 'new' })}
                    size="small"
                />
            </View>

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No products found</Text>
                        <Button
                            title="Add Product"
                            onPress={() => navigation.navigate('ProductDetail', { id: 'new' })}
                            style={styles.emptyButton}
                        />
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    listContent: {
        padding: 16,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
    deleteButton: {
        padding: 8,
    },
    deleteIcon: {
        fontSize: 24,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#8E8E93',
        marginBottom: 16,
    },
    emptyButton: {
        marginTop: 8,
    },
});

export default ProductsScreen;
