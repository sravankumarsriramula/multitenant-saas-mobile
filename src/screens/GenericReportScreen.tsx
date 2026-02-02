import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';
import { REPORT_CONFIG } from '../constants/reportData';

const GenericReportScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { theme } = useThemeStore();
    const { reportTitle } = route.params || { reportTitle: 'Report' };

    const config = useMemo(() => {
        return REPORT_CONFIG[reportTitle] || REPORT_CONFIG['default'];
    }, [reportTitle]);

    const { columns, data } = config;

    const getStatusColor = (status: string) => {
        const s = status?.toLowerCase() || '';
        if (s === 'passed' || s === 'delivered' || s === 'confirmed' || s === 'accepted') return '#10B981'; // Green
        if (s === 'pending' || s === 'in transit') return '#F59E0B'; // Amber
        if (s === 'rejected' || s === 'cancelled') return '#EF4444'; // Red
        return '#64748B'; // Slate
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                <View style={styles.headerLeftContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Reports')} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.headerText} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>{reportTitle}</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>Save View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#1E40AF' }]}>
                        <Text style={styles.headerButtonText}>Export</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#F1F5F9' }]}>
                        <Ionicons name="filter" size={16} color="#334155" />
                        <Text style={[styles.headerButtonText, { color: '#334155', marginLeft: 4 }]}>Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>
                <View>
                    {/* Table Header */}
                    <View style={[styles.tableHeader, { borderBottomColor: theme.borderLight }]}>
                        {columns.map((col, index) => (
                            <View key={index} style={[styles.headerCell, { width: col.width }]}>
                                <Text style={[styles.headerCellText, { color: theme.textSecondary }]}>{col.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Table Rows */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {data.map((row: any, rowIndex) => (
                            <View key={rowIndex} style={[styles.tableRow, { borderBottomColor: theme.borderLight, backgroundColor: rowIndex % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }]}>
                                {columns.map((col, colIndex) => (
                                    <View key={colIndex} style={[styles.cell, { width: col.width, justifyContent: 'center' }]}>
                                        {col.key === 'status' ? (
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(row.status) }]}>
                                                <Text style={styles.statusText}>{row.status}</Text>
                                            </View>
                                        ) : (
                                            <Text style={[styles.cellText, { color: theme.text }]} numberOfLines={1}>{row[col.key]}</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
            {/* Pagination Footer */}
            <View style={[styles.footer, { borderTopColor: theme.borderLight, backgroundColor: theme.surface }]}>
                <Text style={[styles.footerText, { color: theme.textSecondary }]}>Showing {data.length} out of {data.length}</Text>
                <View style={styles.paginationButtons}>
                    <TouchableOpacity style={styles.pageButton} disabled>
                        <Ionicons name="chevron-back" size={16} color="#94A3B8" />
                    </TouchableOpacity>
                    <View style={styles.pageNumberActive}>
                        <Text style={styles.pageNumberText}>1</Text>
                    </View>
                    <TouchableOpacity style={styles.pageButton}>
                        <Ionicons name="chevron-forward" size={16} color="#64748B" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 12,
        paddingBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#1E3A8A',
        borderRadius: 4,
    },
    headerButtonText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '600',
    },

    // Table Styles
    scrollContent: {
        flexDirection: 'column',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderBottomWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    headerCell: {
        paddingHorizontal: 8,
    },
    headerCellText: {
        fontSize: 12,
        fontWeight: '700',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    cell: {
        paddingHorizontal: 8,
    },
    cellText: {
        fontSize: 13,
        fontWeight: '500',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },

    // Footer
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
    },
    footerText: {
        fontSize: 12,
    },
    paginationButtons: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    pageButton: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageNumberActive: {
        width: 24,
        height: 24,
        borderRadius: 4,
        backgroundColor: '#1E3A8A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageNumberText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },

});

export default GenericReportScreen;
