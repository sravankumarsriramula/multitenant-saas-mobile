# Theme Update Script for Remaining Screens
# This script applies theme support to Orders, Invoices, Payments, and PurchaseOrders screens

$screens = @(
    @{Name="OrdersScreen"; Title="Orders"; Icon="clipboard-list"},
    @{Name="InvoicesScreen"; Title="Invoices"; Icon="receipt"},
    @{Name="PaymentsScreen"; Title="Payments"; Icon="cash"},
    @{Name="PurchaseOrdersScreen"; Title="Purchase Orders"; Icon="cart"}
)

foreach ($screen in $screens) {
    $filePath = "d:\Sravan\Projects\multitenant-saas\mobile\src\screens\$($screen.Name).tsx"
    
    Write-Host "Processing $($screen.Name)..." -ForegroundColor Cyan
    
    # Read the file
    $content = Get-Content $filePath -Raw
    
    # 1. Add import if not exists
    if ($content -notmatch "useThemeStore") {
        $content = $content -replace "(import \{ useAuthStore \} from '../store/authStore';)", "`$1`nimport { useThemeStore } from '../store/themeStore';"
    }
    
    # 2. Add theme hook if not exists
    if ($content -notmatch "const \{ theme \} = useThemeStore\(\);") {
        $content = $content -replace "(const \{ user, logout \} = useAuthStore\(\);)", "`$1`n    const { theme } = useThemeStore();"
    }
    
    # 3. Apply theme to container
    $content = $content -replace "style={styles\.container}", "style={[styles.container, { backgroundColor: theme.background }]}"
    
    # 4. Apply theme to header
    $content = $content -replace "style={styles\.header}", "style={[styles.header, { backgroundColor: theme.headerBackground }]}"
    
    # 5. Apply theme to header title
    $content = $content -replace "style={styles\.headerTitle}>", "style={[styles.headerTitle, { color: theme.headerText }]}>"
    
    # 6. Apply theme to menu icon
    $content = $content -replace 'name="menu" size={24} color="#FFFFFF"', 'name="menu" size={24} color={theme.headerText}'
    
    # 7. Apply theme to search icon
    $content = $content -replace 'name="search" size={20} color="#FFFFFF"', 'name="search" size={20} color={theme.headerText}'
    
    # 8. Apply theme to filter icon
    $content = $content -replace 'name={isFilterExpanded \? "filter" : "filter-outline"} size={20} color="#FFFFFF"', 'name={isFilterExpanded ? "filter" : "filter-outline"} size={20} color={theme.headerText}'
    
    # 9. Apply theme to create button
    $content = $content -replace "style={styles\.createButtonIconSmall}>", "style={[styles.createButtonIconSmall, { backgroundColor: theme.surface }]}>"
    $content = $content -replace 'name="add" size={20} color="#1E3A8A"', 'name="add" size={20} color={theme.primary}'
    
    # 10. Apply theme to avatar
    $content = $content -replace "style={styles\.headerAvatar}", "style={[styles.headerAvatar, { backgroundColor: theme.surface }]}"
    $content = $content -replace "style={styles\.avatarInitial}>", "style={[styles.avatarInitial, { color: theme.primary }]}>"
    
    # 11. Apply theme to search bar
    $content = $content -replace "style={styles\.searchBarHeader}>", "style={[styles.searchBarHeader, { backgroundColor: theme.surface }]}>"
    $content = $content -replace 'name="search" size={20} color="#64748B"', 'name="search" size={20} color={theme.textSecondary}'
    $content = $content -replace "style={styles\.searchInputHeader}", "style={[styles.searchInputHeader, { color: theme.text }]}"
    $content = $content -replace 'placeholderTextColor="#94A3B8"', 'placeholderTextColor={theme.textTertiary}'
    $content = $content -replace "style={styles\.cancelText}>", "style={[styles.cancelText, { color: theme.headerText }]}>"
    
    # 12. Apply theme to filter container
    $content = $content -replace "style={styles\.filterContainer}>", "style={[styles.filterContainer, { backgroundColor: theme.surface, borderBottomColor: theme.borderLight }]}>"
    $content = $content -replace "style={styles\.filterDropdown}>", "style={[styles.filterDropdown, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>"
    $content = $content -replace "style={styles\.filterDropdownText}>", "style={[styles.filterDropdownText, { color: theme.textSecondary }]}>"
    $content = $content -replace 'name="calendar-outline" size={18} color="#64748B"', 'name="calendar-outline" size={18} color={theme.textSecondary}'
    $content = $content -replace 'name="chevron-down" size={18} color="#64748B"', 'name="chevron-down" size={18} color={theme.textSecondary}'
    
    # 13. Apply theme to cards
    $content = $content -replace "style={styles\.card}", "style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}"
    $content = $content -replace "style={styles\.checkbox}", "style={[styles.checkbox, { borderColor: theme.borderDark }]}"
    $content = $content -replace "style={styles\.iconBox}>", "style={[styles.iconBox, { backgroundColor: theme.primaryLight + '20' }]}>"
    
    # 14. Apply theme to card text
    $content = $content -replace "style={styles\.idText}>", "style={[styles.idText, { color: theme.primaryLight }]}>"
    $content = $content -replace "style={styles\.companyName}>", "style={[styles.companyName, { color: theme.text }]}>"
    $content = $content -replace "style={styles\.separator}>", "style={[styles.separator, { color: theme.borderDark }]}>"
    $content = $content -replace "style={styles\.productText}>", "style={[styles.productText, { color: theme.textSecondary }]}>"
    
    # 15. Apply theme to details row
    $content = $content -replace "style={styles\.detailsRow}>", "style={[styles.detailsRow, { borderTopColor: theme.borderLight }]}>"
    $content = $content -replace "style={styles\.detailLabel}>", "style={[styles.detailLabel, { color: theme.textTertiary }]}>"
    $content = $content -replace "style={styles\.detailValue}>", "style={[styles.detailValue, { color: theme.textSecondary }]}>"
    
    # 16. Apply theme to chevron
    $content = $content -replace 'name="chevron-right" size={20} color="#CBD5E1"', 'name="chevron-right" size={20} color={theme.borderDark}'
    
    # 17. Apply theme to section header
    $content = $content -replace "style={styles\.sectionHeaderText}>", "style={[styles.sectionHeaderText, { color: theme.text }]}>"
    
    # 18. Apply theme to pagination
    $content = $content -replace "style={styles\.pageButton}>", "style={[styles.pageButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>"
    $content = $content -replace "style={styles\.pageButtonText}>", "style={[styles.pageButtonText, { color: theme.textSecondary }]}>"
    $content = $content -replace "style={styles\.pageInfo}>", "style={[styles.pageInfo, { color: theme.textSecondary }]}>"
    $content = $content -replace 'name="chevron-left" size={20} color="#64748B"', 'name="chevron-left" size={20} color={theme.textSecondary}'
    
    # 19. Apply theme to user menu
    $content = $content -replace "style={styles\.userMenuPopup}>", "style={[styles.userMenuPopup, { backgroundColor: theme.surface, borderColor: theme.border }]}>"
    $content = $content -replace 'name="log-out-outline" size={16} color="#EF4444"', 'name="log-out-outline" size={16} color={theme.error}'
    $content = $content -replace "color: '#EF4444'", "color: theme.error"
    
    # 20. Fix icon colors based on screen type
    if ($screen.Icon -eq "clipboard-list") {
        $content = $content -replace 'name="clipboard-list" size={18} color="#0EA5E9"', 'name="clipboard-list" size={18} color={theme.primaryLight}'
    } elseif ($screen.Icon -eq "receipt") {
        $content = $content -replace 'name="receipt" size={18} color="#0EA5E9"', 'name="receipt" size={18} color={theme.primaryLight}'
    } elseif ($screen.Icon -eq "cash") {
        $content = $content -replace 'name="cash" size={18} color="#0EA5E9"', 'name="cash" size={18} color={theme.primaryLight}'
    } elseif ($screen.Icon -eq "cart") {
        $content = $content -replace 'name="cart" size={18} color="#0EA5E9"', 'name="cart" size={18} color={theme.primaryLight}'
    }
    
    # Write the file back
    Set-Content -Path $filePath -Value $content -NoNewline
    
    Write-Host "✓ $($screen.Name) updated successfully!" -ForegroundColor Green
}

    Write-Host "All screens updated with theme support!" -ForegroundColor Green
