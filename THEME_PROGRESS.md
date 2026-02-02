# Applying Theme Support to Multiple Screens

## Screens to Update
1. ✅ QuotationsScreen - DONE
2. ⏳ OrdersScreen - In Progress
3. ⏳ InvoicesScreen - Pending
4. ⏳ PaymentsScreen - Pending
5. ⏳ PurchaseOrdersScreen - Pending

## Pattern Applied
All screens follow the same structure, so the theme integration is consistent:

### Changes Made:
1. Import `useThemeStore`
2. Get `theme` from the hook
3. Apply theme colors to:
   - Container background
   - Header (background, text, icons)
   - Search bar
   - Filter dropdowns
   - Cards (background, border)
   - Text elements (various hierarchy levels)
   - Icons
   - Pagination controls
   - User menu popup

This ensures all screens work correctly in both light and dark modes.
