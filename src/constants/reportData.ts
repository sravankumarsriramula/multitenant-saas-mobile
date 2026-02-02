export interface ReportColumn {
    key: string;
    label: string;
    width: number;
}

export interface ReportConfig {
    columns: ReportColumn[];
    data: any[];
}

export const REPORT_CONFIG: Record<string, ReportConfig> = {
    'Quotations': {
        columns: [
            { key: 'id', label: 'Quotation#', width: 140 },
            { key: 'date', label: 'Date', width: 100 },
            { key: 'status', label: 'Status', width: 100 },
            { key: 'client', label: 'Client Name', width: 160 },
            { key: 'currency', label: 'Currency', width: 80 },
            { key: 'subTotal', label: 'Sub Total', width: 100 },
            { key: 'amount', label: 'Amount', width: 100 },
        ],
        data: [
            { id: '#US1/QUT/42/2026', date: '31-01-2026', status: 'Passed', client: 'Dallas Stores', currency: 'USD', subTotal: '$1,100.00', amount: '$1,100.00' },
            { id: '#US1/QUT/35/2026', date: '19-01-2026', status: 'Passed', client: 'Dallas Stores', currency: 'USD', subTotal: '$33,220.00', amount: '$33,220.00' },
            { id: '#CHEM001/QUT/41/2026', date: '25-01-2026', status: 'Accepted', client: 'SKY SHORE PVT LTD', currency: 'USD', subTotal: '$100,560.00', amount: '$100,560.00' },
            { id: '#CHEM001/QUT/40/2026', date: '22-01-2026', status: 'Passed', client: 'SKY SHORE PVT LTD', currency: 'USD', subTotal: '$100,560.00', amount: '$100,560.00' },
        ]
    },
    'Orders': {
        columns: [
            { key: 'id', label: 'Order#', width: 140 },
            { key: 'date', label: 'Date', width: 100 },
            { key: 'status', label: 'Status', width: 100 },
            { key: 'client', label: 'Client Name', width: 160 },
            { key: 'amount', label: 'Total Amount', width: 120 },
        ],
        data: [
            { id: '#ORD-2026-001', date: '01-02-2026', status: 'Confirmed', client: 'Dallas Stores', amount: '$5,000.00' },
            { id: '#ORD-2026-002', date: '02-02-2026', status: 'Pending', client: 'SKY SHORE PVT LTD', amount: '$12,500.00' },
            { id: '#ORD-2026-003', date: '02-02-2026', status: 'Shipped', client: 'Tech Solutions', amount: '$8,200.00' },
        ]
    },
    'Shipments': {
        columns: [
            { key: 'id', label: 'Shipment#', width: 140 },
            { key: 'date', label: 'Date', width: 100 },
            { key: 'status', label: 'Status', width: 100 },
            { key: 'orderId', label: 'Order#', width: 140 },
            { key: 'client', label: 'Client', width: 160 },
        ],
        data: [
            { id: '#SHP-2026-101', date: '03-02-2026', status: 'In Transit', orderId: '#ORD-2026-003', client: 'Tech Solutions' },
            { id: '#SHP-2026-102', date: '01-02-2026', status: 'Delivered', orderId: '#ORD-2026-001', client: 'Dallas Stores' },
        ]
    },
    'Payments': {
        columns: [
            { key: 'id', label: 'Receipt#', width: 140 },
            { key: 'date', label: 'Date', width: 100 },
            { key: 'amount', label: 'Amount', width: 120 },
            { key: 'method', label: 'Method', width: 100 },
            { key: 'client', label: 'Client', width: 160 },
        ],
        data: [
            { id: '#RCP-2026-901', date: '02-02-2026', amount: '$2,000.00', method: 'Bank Transfer', client: 'Dallas Stores' },
            { id: '#RCP-2026-902', date: '28-01-2026', amount: '$10,000.00', method: 'Check', client: 'SKY SHORE PVT LTD' },
        ]
    },
    'Inventory': {
        columns: [
            { key: 'sku', label: 'SKU', width: 100 },
            { key: 'name', label: 'Product Name', width: 180 },
            { key: 'stock', label: 'Stock On Hand', width: 100 },
            { key: 'unit', label: 'Unit', width: 80 },
            { key: 'value', label: 'Value', width: 100 },
        ],
        data: [
            { sku: 'CHEM-001', name: 'Industrial Solvent', stock: '5,000', unit: 'Liters', value: '$25,000' },
            { sku: 'STL-500', name: 'Steel Rods', stock: '200', unit: 'Tons', value: '$120,000' },
            { sku: 'ELEC-22', name: 'Circuit Boards', stock: '1,500', unit: 'Units', value: '$45,000' },
        ]
    },
    // Default fallback
    'default': {
        columns: [
            { key: 'col1', label: 'Column 1', width: 150 },
            { key: 'col2', label: 'Column 2', width: 150 },
            { key: 'col3', label: 'Column 3', width: 150 },
        ],
        data: [
            { col1: 'Data 1', col2: 'Data A', col3: 'Details...' },
            { col1: 'Data 2', col2: 'Data B', col3: 'Details...' },
        ]
    }
};
