import { 
  Client, 
  MeasurementSession, 
  InventoryItem, 
  SalesOrder, 
  Invoice, 
  Supplier, 
  PurchaseOrder, 
  BillOfMaterials, 
  WorkOrder, 
  ProjectTask, 
  TimesheetEntry, 
  Account, 
  AccountingVoucher, 
  ActivityLog, 
  WorkflowRule, 
  ReminderItem,
  ClientPhoto
} from '../types/erp';

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    name: 'Priya Sharma',
    phone: '+91 98201 44521',
    email: 'priya.sharma@luxuryfashion.in',
    bodyType: 'female',
    pipelineStage: 'IN_PRODUCTION',
    age: 29,
    address: '402 Regency Heights, Bandra West, Mumbai 400050',
    gstin: '27AAACS1429B1Z8',
    notes: 'Wedding reception ensemble. Prefers silk lining and structured shoulder pads. Requested trial fitting on 28th.',
    tags: ['VIP', 'Wedding', 'Bespoke'],
    totalSpend: 84500,
    createdAt: '2026-08-10T10:00:00.000Z',
    updatedAt: '2026-08-20T14:30:00.000Z',
    customValues: { 'Fabric Preference': 'Raw Mulberry Silk', 'Urgency': 'High' }
  },
  {
    id: 'cli-2',
    name: 'Vikram Malhotra',
    phone: '+91 98450 11982',
    email: 'vikram.malhotra@malhotragroup.com',
    bodyType: 'male',
    pipelineStage: 'FITTING',
    age: 38,
    address: '12 Indiranagar 100ft Road, Bengaluru 560038',
    gstin: '29AABCM9921D1ZT',
    notes: '3-Piece Italian Wool Charcoal Tuxedo with satin shawl lapel. Sleeve length +1.5cm longer for cuff show.',
    tags: ['Corporate', 'Formal', 'Repeat'],
    totalSpend: 112000,
    createdAt: '2026-08-05T09:15:00.000Z',
    updatedAt: '2026-08-21T11:00:00.000Z',
    customValues: { 'Lapel Style': 'Shawl Lapel', 'Vent': 'Double Vent' }
  },
  {
    id: 'cli-3',
    name: 'Ananya Desai',
    phone: '+91 99012 88473',
    email: 'ananya.desai@designlab.org',
    bodyType: 'female',
    pipelineStage: 'ORDERED',
    age: 26,
    address: '77 Koregaon Park, Lane 6, Pune 411001',
    notes: 'High-waist pleated wide trousers and tailored linen blazer for Paris showroom exhibition.',
    tags: ['Runway', 'Modern', 'Linen'],
    totalSpend: 42000,
    createdAt: '2026-08-18T16:20:00.000Z',
    updatedAt: '2026-08-22T10:00:00.000Z'
  },
  {
    id: 'cli-4',
    name: 'Rajesh Gupta',
    phone: '+91 97110 33490',
    email: 'rgupta@guptatextiles.co.in',
    bodyType: 'male',
    pipelineStage: 'READY',
    age: 52,
    address: 'B-14 Greater Kailash 1, New Delhi 110048',
    gstin: '07AAAFG8831P1ZS',
    notes: 'Handwoven Bandhgala jacket with mother of pearl antique buttons. Ready for courier dispatch.',
    tags: ['Heritage', 'Bandhgala', 'Urgent'],
    totalSpend: 68000,
    createdAt: '2026-08-01T12:00:00.000Z',
    updatedAt: '2026-08-22T08:30:00.000Z'
  },
  {
    id: 'cli-5',
    name: 'Sophia Chen',
    phone: '+91 98190 66219',
    email: 'sophia@studiovision.io',
    bodyType: 'female',
    pipelineStage: 'MEASURED',
    age: 31,
    address: '15 Sterling Road, Nungambakkam, Chennai 600034',
    notes: 'Measurements locked. Reviewing fabric swatch samples (Navy Crepe vs Emerald Green Brocade).',
    tags: ['Evening Wear', 'Custom'],
    totalSpend: 0,
    createdAt: '2026-08-21T14:00:00.000Z',
    updatedAt: '2026-08-22T12:00:00.000Z'
  },
  {
    id: 'cli-6',
    name: 'Aarav Patel',
    phone: '+91 98980 44210',
    email: 'kunal.patel@patelfamily.com',
    bodyType: 'child',
    pipelineStage: 'INQUIRY',
    age: 8,
    address: 'Plot 40, Drive-in Road, Ahmedabad 380054',
    notes: 'Festive Kurta-Churidar set with embroidered jacket for Diwali family photoshoot.',
    tags: ['Kids', 'Festive'],
    totalSpend: 0,
    createdAt: '2026-08-22T09:00:00.000Z',
    updatedAt: '2026-08-22T09:00:00.000Z'
  }
];

export const INITIAL_MEASUREMENT_SESSIONS: MeasurementSession[] = [
  {
    id: 'sess-1',
    clientId: 'cli-1',
    version: 1,
    bodyType: 'female',
    unit: 'cm',
    measurements: {
      shoulder: { cm: 38, inches: 15.0 },
      chest: { cm: 86, inches: 33.9 },
      bust: { cm: 90, inches: 35.4 },
      shoulder_to_waist: { cm: 42, inches: 16.5 },
      waist: { cm: 70, inches: 27.6 },
      waist_to_hip: { cm: 20, inches: 7.9 },
      sleeve_length: { cm: 57, inches: 22.4 },
      hips: { cm: 96, inches: 37.8 },
      crotch_depth: { cm: 26, inches: 10.2 },
      waist_to_knee: { cm: 58, inches: 22.8 },
      knee_line: { cm: 36, inches: 14.2 },
      high_ankle: { cm: 22, inches: 8.7 },
      ankle: { cm: 21, inches: 8.3 },
      neck_size: { cm: 35, inches: 13.8 },
      armscye_depth: { cm: 21, inches: 8.3 },
      back_width: { cm: 34, inches: 13.4 },
      top_arm: { cm: 27, inches: 10.6 },
      nape_to_waist: { cm: 40, inches: 15.7 },
      wrist: { cm: 16, inches: 6.3 },
      body_rise: { cm: 27, inches: 10.6 },
      waist_to_floor: { cm: 104, inches: 40.9 }
    },
    notes: 'Standard fitted pattern. Ease allowances: +2cm on bust, +1.5cm on waist.',
    createdAt: '2026-08-11T11:00:00.000Z',
    updatedAt: '2026-08-11T11:45:00.000Z'
  },
  {
    id: 'sess-2',
    clientId: 'cli-2',
    version: 1,
    bodyType: 'male',
    unit: 'cm',
    measurements: {
      shoulder: { cm: 46, inches: 18.1 },
      chest: { cm: 104, inches: 40.9 },
      bust: { cm: 102, inches: 40.2 },
      shoulder_to_waist: { cm: 46, inches: 18.1 },
      waist: { cm: 88, inches: 34.6 },
      waist_to_hip: { cm: 22, inches: 8.7 },
      sleeve_length: { cm: 64, inches: 25.2 },
      hips: { cm: 102, inches: 40.2 },
      crotch_depth: { cm: 29, inches: 11.4 },
      waist_to_knee: { cm: 62, inches: 24.4 },
      knee_line: { cm: 42, inches: 16.5 },
      high_ankle: { cm: 25, inches: 9.8 },
      ankle: { cm: 24, inches: 9.4 },
      neck_size: { cm: 41, inches: 16.1 },
      armscye_depth: { cm: 24, inches: 9.4 },
      back_width: { cm: 42, inches: 16.5 },
      top_arm: { cm: 34, inches: 13.4 },
      nape_to_waist: { cm: 45, inches: 17.7 },
      wrist: { cm: 18, inches: 7.1 },
      body_rise: { cm: 29, inches: 11.4 },
      waist_to_floor: { cm: 110, inches: 43.3 }
    },
    notes: 'Athletic drop 7 fit. Extra shoulder padding requested.',
    createdAt: '2026-08-06T10:00:00.000Z',
    updatedAt: '2026-08-06T10:30:00.000Z'
  },
  {
    id: 'sess-3',
    clientId: 'cli-5',
    version: 1,
    bodyType: 'female',
    unit: 'cm',
    measurements: {
      shoulder: { cm: 39, inches: 15.4 },
      chest: { cm: 88, inches: 34.6 },
      bust: { cm: 92, inches: 36.2 },
      shoulder_to_waist: { cm: 43, inches: 16.9 },
      waist: { cm: 72, inches: 28.3 },
      waist_to_hip: { cm: 21, inches: 8.3 },
      sleeve_length: { cm: 58, inches: 22.8 },
      hips: { cm: 98, inches: 38.6 },
      crotch_depth: { cm: 27, inches: 10.6 },
      waist_to_knee: { cm: 57, inches: 22.4 },
      knee_line: { cm: 37, inches: 14.6 },
      high_ankle: { cm: 23, inches: 9.1 },
      ankle: { cm: 22, inches: 8.7 },
      neck_size: { cm: 36, inches: 14.2 },
      armscye_depth: { cm: 22, inches: 8.7 },
      back_width: { cm: 35, inches: 13.8 },
      top_arm: { cm: 28, inches: 11.0 },
      nape_to_waist: { cm: 41, inches: 16.1 },
      wrist: { cm: 16.5, inches: 6.5 },
      body_rise: { cm: 27.5, inches: 10.8 },
      waist_to_floor: { cm: 106, inches: 41.7 }
    },
    notes: 'Measured with 3-inch heels for gown floor length accuracy.',
    createdAt: '2026-08-21T15:00:00.000Z',
    updatedAt: '2026-08-21T15:30:00.000Z'
  }
];

export const INITIAL_CLIENT_PHOTOS: ClientPhoto[] = [
  {
    id: 'ph-1',
    clientId: 'cli-1',
    url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
    title: 'Trial fitting side contour',
    tag: 'side',
    createdAt: '2026-08-15T12:00:00.000Z'
  },
  {
    id: 'ph-2',
    clientId: 'cli-1',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80',
    title: 'Mulberry raw silk swatch',
    tag: 'fabric',
    createdAt: '2026-08-12T14:30:00.000Z'
  },
  {
    id: 'ph-3',
    clientId: 'cli-2',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
    title: 'Super 140s Charcoal Wool drape',
    tag: 'fabric',
    createdAt: '2026-08-08T10:20:00.000Z'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'FAB-WOOL-140-CHR',
    name: 'Super 140s Italian Wool (Charcoal Grey)',
    category: 'FABRIC',
    unit: 'meters',
    currentStock: 48.5,
    minStockLevel: 20.0,
    purchasePrice: 2800,
    sellingPrice: 5200,
    hsnCode: '511111',
    gstRate: 5,
    location: 'Rack A1 - Fabric Roll 12'
  },
  {
    id: 'inv-2',
    sku: 'FAB-SILK-MUL-EMR',
    name: 'Mulberry Raw Silk (Emerald Brocade)',
    category: 'FABRIC',
    unit: 'meters',
    currentStock: 14.0,
    minStockLevel: 15.0,
    purchasePrice: 1950,
    sellingPrice: 4100,
    hsnCode: '500720',
    gstRate: 5,
    location: 'Rack A2 - Silk Vault'
  },
  {
    id: 'inv-3',
    sku: 'FAB-LIN-FR-IVR',
    name: 'French Pure Linen (Ivory Crisp)',
    category: 'FABRIC',
    unit: 'meters',
    currentStock: 62.0,
    minStockLevel: 25.0,
    purchasePrice: 1200,
    sellingPrice: 2600,
    hsnCode: '530911',
    gstRate: 5,
    location: 'Rack B1 - Linen Shelves'
  },
  {
    id: 'inv-4',
    sku: 'TRM-BTN-MOP-24',
    name: 'Mother of Pearl Buttons 24L (Set of 10)',
    category: 'TRIMS',
    unit: 'sets',
    currentStock: 180,
    minStockLevel: 50,
    purchasePrice: 120,
    sellingPrice: 350,
    hsnCode: '960621',
    gstRate: 12,
    location: 'Cabinet T1 - Drawer 4'
  },
  {
    id: 'inv-5',
    sku: 'TRM-ZIP-YKK-INV-22',
    name: 'YKK Concealed Invisible Zippers 22"',
    category: 'TRIMS',
    unit: 'pieces',
    currentStock: 85,
    minStockLevel: 30,
    purchasePrice: 35,
    sellingPrice: 95,
    hsnCode: '960711',
    gstRate: 18,
    location: 'Cabinet T2 - Drawer 1'
  },
  {
    id: 'inv-6',
    sku: 'RAW-CANVAS-HORSEHAIR',
    name: 'Horsehair Full Floating Canvas Interfacing',
    category: 'RAW_MATERIAL',
    unit: 'meters',
    currentStock: 28.0,
    minStockLevel: 10.0,
    purchasePrice: 650,
    sellingPrice: 1400,
    hsnCode: '590390',
    gstRate: 12,
    location: 'Roll Stand C - Tailoring Core'
  },
  {
    id: 'inv-7',
    sku: 'FG-BESPOKE-SUIT-2PC',
    name: 'Custom Bespoke 2-Piece Suit (Tailoring Service)',
    category: 'FINISHED_GOODS',
    unit: 'pieces',
    currentStock: 12,
    minStockLevel: 2,
    purchasePrice: 8500,
    sellingPrice: 38000,
    hsnCode: '998822',
    gstRate: 12,
    location: 'Display Lounge Suite Wardrobe'
  },
  {
    id: 'inv-8',
    sku: 'FG-BANDHGALA-HERITAGE',
    name: 'Handcrafted Heritage Bandhgala Jacket',
    category: 'FINISHED_GOODS',
    unit: 'pieces',
    currentStock: 6,
    minStockLevel: 1,
    purchasePrice: 11000,
    sellingPrice: 48000,
    hsnCode: '998822',
    gstRate: 12,
    location: 'Bridal & Groom Suite'
  }
];

export const INITIAL_ORDERS: SalesOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'SO-2026-0089',
    clientId: 'cli-1',
    clientName: 'Priya Sharma',
    sessionId: 'sess-1',
    items: [
      {
        id: 'oi-1',
        name: 'Bespoke Silk Reception Gown with Hand-cut Appliqué',
        itemId: 'inv-2',
        quantity: 1,
        unitPrice: 58000,
        gstRate: 12,
        lineTotal: 58000
      },
      {
        id: 'oi-2',
        name: 'Tailored Satin Stole & Embellished Belt',
        quantity: 1,
        unitPrice: 14500,
        gstRate: 12,
        lineTotal: 14500
      }
    ],
    subtotal: 72500,
    taxTotal: 8700,
    grandTotal: 81200,
    status: 'IN_PROGRESS',
    orderDate: '2026-08-11',
    dueDate: '2026-08-28',
    assignedTailor: 'Master Tailor Hamid',
    notes: 'First trial scheduled for August 26 afternoon.'
  },
  {
    id: 'ord-102',
    orderNumber: 'SO-2026-0090',
    clientId: 'cli-2',
    clientName: 'Vikram Malhotra',
    sessionId: 'sess-2',
    items: [
      {
        id: 'oi-3',
        name: 'Super 140s Bespoke 3-Piece Tuxedo (Full Canvas)',
        itemId: 'inv-1',
        quantity: 1,
        unitPrice: 85000,
        gstRate: 12,
        lineTotal: 85000
      },
      {
        id: 'oi-4',
        name: 'Pleated Marcella Tuxedo Shirt & Silk Bowtie',
        quantity: 1,
        unitPrice: 15000,
        gstRate: 12,
        lineTotal: 15000
      }
    ],
    subtotal: 100000,
    taxTotal: 12000,
    grandTotal: 112000,
    status: 'CONFIRMED',
    orderDate: '2026-08-08',
    dueDate: '2026-08-25',
    assignedTailor: 'Senior Cutter Ramesh',
    notes: 'Trial fitting complete. Final buttonhole hand-stitching underway.'
  },
  {
    id: 'ord-103',
    orderNumber: 'SO-2026-0091',
    clientId: 'cli-4',
    clientName: 'Rajesh Gupta',
    items: [
      {
        id: 'oi-5',
        name: 'Heritage Raw Silk Bandhgala with Antique MOP Buttons',
        itemId: 'inv-8',
        quantity: 1,
        unitPrice: 48000,
        gstRate: 12,
        lineTotal: 48000
      }
    ],
    subtotal: 48000,
    taxTotal: 5760,
    grandTotal: 53760,
    status: 'COMPLETED',
    orderDate: '2026-08-02',
    dueDate: '2026-08-20',
    deliveryDate: '2026-08-21',
    assignedTailor: 'Master Tailor Hamid',
    notes: 'Delivered in premium wooden hanger & dust garment bag.'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-0144',
    orderId: 'ord-101',
    clientId: 'cli-1',
    clientName: 'Priya Sharma',
    clientGstin: '27AAACS1429B1Z8',
    items: [
      {
        id: 'ii-1',
        name: 'Bespoke Silk Reception Gown with Hand-cut Appliqué',
        quantity: 1,
        unitPrice: 58000,
        gstRate: 12,
        lineTotal: 58000
      },
      {
        id: 'ii-2',
        name: 'Tailored Satin Stole & Embellished Belt',
        quantity: 1,
        unitPrice: 14500,
        gstRate: 12,
        lineTotal: 14500
      }
    ],
    subtotal: 72500,
    taxTotal: 8700,
    grandTotal: 81200,
    paidAmount: 50000,
    status: 'PARTIALLY_PAID',
    issueDate: '2026-08-11',
    dueDate: '2026-08-28',
    payments: [
      {
        id: 'pmt-1',
        amount: 50000,
        paymentMethod: 'UPI',
        referenceNumber: 'UPI/2938192837/KM',
        paidAt: '2026-08-11T11:30:00.000Z',
        notes: 'Advance deposit at order confirmation'
      }
    ],
    irn: 'e7a1b90c884210fd3391823901bcda9012489012',
    notes: 'Remaining balance ₹31,200 payable on final delivery.'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-0145',
    orderId: 'ord-102',
    clientId: 'cli-2',
    clientName: 'Vikram Malhotra',
    clientGstin: '29AABCM9921D1ZT',
    items: [
      {
        id: 'ii-3',
        name: 'Super 140s Bespoke 3-Piece Tuxedo (Full Canvas)',
        quantity: 1,
        unitPrice: 85000,
        gstRate: 12,
        lineTotal: 85000
      },
      {
        id: 'ii-4',
        name: 'Pleated Marcella Tuxedo Shirt & Silk Bowtie',
        quantity: 1,
        unitPrice: 15000,
        gstRate: 12,
        lineTotal: 15000
      }
    ],
    subtotal: 100000,
    taxTotal: 12000,
    grandTotal: 112000,
    paidAmount: 112000,
    status: 'PAID',
    issueDate: '2026-08-08',
    dueDate: '2026-08-25',
    payments: [
      {
        id: 'pmt-2',
        amount: 112000,
        paymentMethod: 'BANK_TRANSFER',
        referenceNumber: 'NEFT-HDFC-991204812',
        paidAt: '2026-08-08T14:00:00.000Z',
        notes: 'Full payment cleared via corporate HDFC NEFT'
      }
    ],
    irn: '98fa201bcfd99104821038102391029301928301',
    notes: 'GST E-Invoice verified and generated.'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-0146',
    orderId: 'ord-103',
    clientId: 'cli-4',
    clientName: 'Rajesh Gupta',
    clientGstin: '07AAAFG8831P1ZS',
    items: [
      {
        id: 'ii-5',
        name: 'Heritage Raw Silk Bandhgala with Antique MOP Buttons',
        quantity: 1,
        unitPrice: 48000,
        gstRate: 12,
        lineTotal: 48000
      }
    ],
    subtotal: 48000,
    taxTotal: 5760,
    grandTotal: 53760,
    paidAmount: 53760,
    status: 'PAID',
    issueDate: '2026-08-02',
    dueDate: '2026-08-20',
    payments: [
      {
        id: 'pmt-3',
        amount: 53760,
        paymentMethod: 'CARD',
        referenceNumber: 'POS-TXN-88190',
        paidAt: '2026-08-21T16:00:00.000Z',
        notes: 'Settled at studio POS terminal'
      }
    ],
    irn: '318491823901bcaef00192831902830192830192'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Raymond Wool & Worsted Mills Ltd',
    contactPerson: 'Kailash Singhania',
    phone: '+91 22 6152 7000',
    email: 'b2b.orders@raymond.in',
    gstin: '27AAACR1290K1ZP',
    address: 'Pokhran Road No. 1, Jekegram, Thane, Maharashtra 400606',
    category: 'FABRIC',
    balanceDue: 24500,
    rating: 4.9
  },
  {
    id: 'sup-2',
    name: 'Lotus Silk Weavers Cooperative',
    contactPerson: 'Mahesh Solanki',
    phone: '+91 261 249 8812',
    email: 'sales@lotussilksurat.org',
    gstin: '24AAACL8841M1ZY',
    address: 'Ring Road Textile Market, Surat, Gujarat 395002',
    category: 'FABRIC',
    balanceDue: 0,
    rating: 4.8
  },
  {
    id: 'sup-3',
    name: 'YKK India Pvt Ltd',
    contactPerson: 'Deepak Sharma',
    phone: '+91 124 456 9900',
    email: 'fasteners@ykkindia.com',
    gstin: '06AAACY2910J1ZX',
    address: 'Plot 697, Udyog Vihar Phase V, Gurugram, Haryana 122016',
    category: 'TRIMS',
    balanceDue: 4200,
    rating: 4.7
  },
  {
    id: 'sup-4',
    name: 'Vardhman Threads & Interfacings',
    contactPerson: 'Suresh Oswal',
    phone: '+91 161 222 8900',
    email: 'industrial@vardhman.com',
    gstin: '03AAACV4421L1ZR',
    address: 'Chandigarh Road, Ludhiana, Punjab 141010',
    category: 'TRIMS',
    balanceDue: 11800,
    rating: 4.6
  }
];

export const INITIAL_PURCHASES: PurchaseOrder[] = [
  {
    id: 'po-201',
    purchaseNumber: 'PO-2026-0045',
    supplierId: 'sup-1',
    supplierName: 'Raymond Wool & Worsted Mills Ltd',
    supplierGstin: '27AAACR1290K1ZP',
    items: [
      {
        id: 'pi-1',
        itemId: 'inv-1',
        itemName: 'Super 140s Italian Wool (Charcoal Grey)',
        quantity: 30,
        unit: 'meters',
        unitPrice: 2800,
        gstRate: 5,
        lineTotal: 84000
      }
    ],
    subtotal: 84000,
    taxTotal: 4200,
    grandTotal: 88200,
    status: 'RECEIVED',
    orderDate: '2026-08-04',
    expectedDate: '2026-08-12',
    receivedDate: '2026-08-11',
    paidAmount: 63700,
    notes: 'Premium bolt inspected for flawlessness. Stock updated.'
  },
  {
    id: 'po-202',
    purchaseNumber: 'PO-2026-0046',
    supplierId: 'sup-3',
    supplierName: 'YKK India Pvt Ltd',
    supplierGstin: '06AAACY2910J1ZX',
    items: [
      {
        id: 'pi-2',
        itemId: 'inv-5',
        itemName: 'YKK Concealed Invisible Zippers 22"',
        quantity: 100,
        unit: 'pieces',
        unitPrice: 35,
        gstRate: 18,
        lineTotal: 3500
      }
    ],
    subtotal: 3500,
    taxTotal: 630,
    grandTotal: 4130,
    status: 'ORDERED',
    orderDate: '2026-08-19',
    expectedDate: '2026-08-26',
    paidAmount: 0,
    notes: 'Shipment dispatched via BlueDart courier.'
  }
];

export const INITIAL_BOM: BillOfMaterials[] = [
  {
    id: 'bom-1',
    productName: 'Bespoke 3-Piece Tuxedo',
    sku: 'BOM-TUX-3PC',
    description: 'Full canvas tailored suit jacket, trousers, and silk-lined waistcoat',
    estimatedLaborHours: 32,
    laborCostPerHour: 450,
    materials: [
      { itemId: 'inv-1', itemName: 'Super 140s Italian Wool', quantity: 3.8, unit: 'meters', costPerUnit: 2800 },
      { itemId: 'inv-6', itemName: 'Horsehair Full Floating Canvas', quantity: 1.5, unit: 'meters', costPerUnit: 650 },
      { itemId: 'inv-4', itemName: 'Mother of Pearl Buttons (Set)', quantity: 2, unit: 'sets', costPerUnit: 120 },
      { itemId: 'inv-5', itemName: 'YKK Trouser Zipper', quantity: 1, unit: 'pieces', costPerUnit: 35 }
    ],
    totalMaterialCost: 11920,
    totalCost: 26320 // 11920 material + (32 * 450 = 14400 labor)
  },
  {
    id: 'bom-2',
    productName: 'Heritage Silk Bandhgala Jacket',
    sku: 'BOM-BANDHGALA',
    description: 'Structured mandarin collar jacket with hand-stitched pick edges',
    estimatedLaborHours: 24,
    laborCostPerHour: 450,
    materials: [
      { itemId: 'inv-2', itemName: 'Mulberry Raw Silk Brocade', quantity: 2.6, unit: 'meters', costPerUnit: 1950 },
      { itemId: 'inv-6', itemName: 'Horsehair Canvas Interfacing', quantity: 1.2, unit: 'meters', costPerUnit: 650 },
      { itemId: 'inv-4', itemName: 'Mother of Pearl Buttons (Set)', quantity: 1, unit: 'sets', costPerUnit: 120 }
    ],
    totalMaterialCost: 5970,
    totalCost: 16770
  }
];

export const INITIAL_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'wo-301',
    workOrderNumber: 'WO-2026-0019',
    bomId: 'bom-1',
    productName: 'Bespoke 3-Piece Tuxedo',
    salesOrderId: 'ord-102',
    clientName: 'Vikram Malhotra',
    quantity: 1,
    status: 'IN_PROGRESS',
    assignedWorker: 'Senior Cutter Ramesh',
    startDate: '2026-08-10',
    targetDate: '2026-08-24',
    stageProgress: 75,
    materialsUsed: [
      { itemId: 'inv-1', itemName: 'Super 140s Italian Wool', quantity: 3.8, unit: 'meters' },
      { itemId: 'inv-6', itemName: 'Horsehair Canvas', quantity: 1.5, unit: 'meters' }
    ],
    notes: 'Jacket canvas basted, shoulder pitch verified during first trial.'
  },
  {
    id: 'wo-302',
    workOrderNumber: 'WO-2026-0020',
    bomId: 'bom-2',
    productName: 'Bespoke Silk Reception Gown',
    salesOrderId: 'ord-101',
    clientName: 'Priya Sharma',
    quantity: 1,
    status: 'IN_PROGRESS',
    assignedWorker: 'Master Tailor Hamid',
    startDate: '2026-08-14',
    targetDate: '2026-08-27',
    stageProgress: 60,
    materialsUsed: [
      { itemId: 'inv-2', itemName: 'Mulberry Raw Silk', quantity: 4.2, unit: 'meters' },
      { itemId: 'inv-5', itemName: 'Invisible Zipper', quantity: 1, unit: 'pieces' }
    ],
    notes: 'Bodice boning inserted, skirt flare hem pinning in progress.'
  }
];

export const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 'tsk-1',
    title: 'Trial fitting session with Vikram Malhotra',
    description: 'Inspect collar roll, waist suppression, and trouser break length',
    clientName: 'Vikram Malhotra',
    assignedTo: 'Master Tailor Hamid',
    priority: 'HIGH',
    status: 'DONE',
    dueDate: '2026-08-21',
    estimatedHours: 1.5,
    loggedHours: 1.5
  },
  {
    id: 'tsk-2',
    title: 'Pattern draft for Ananya Desai wide trousers',
    description: 'High-waist double pleat pattern drafting based on latest measurements',
    clientName: 'Ananya Desai',
    assignedTo: 'Pattern Master Geeta',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    dueDate: '2026-08-24',
    estimatedHours: 3.0,
    loggedHours: 1.5
  },
  {
    id: 'tsk-3',
    title: 'Final quality control & pressing for Bandhgala',
    description: 'Steam pressing, thread trimming, and hanger bag packing',
    clientName: 'Rajesh Gupta',
    assignedTo: 'Finisher Suresh',
    priority: 'URGENT',
    status: 'DONE',
    dueDate: '2026-08-20',
    estimatedHours: 2.0,
    loggedHours: 2.0
  }
];

export const INITIAL_TIMESHEETS: TimesheetEntry[] = [
  {
    id: 'ts-1',
    workerName: 'Senior Cutter Ramesh',
    workOrderNumber: 'WO-2026-0019',
    activityDescription: 'Precision shears cutting of Super 140s wool & floating canvas',
    hours: 4.5,
    date: '2026-08-12',
    hourlyRate: 450,
    approved: true
  },
  {
    id: 'ts-2',
    workerName: 'Master Tailor Hamid',
    workOrderNumber: 'WO-2026-0020',
    activityDescription: 'Hand pad-stitching lapels and shoulder seam assembly',
    hours: 6.0,
    date: '2026-08-16',
    hourlyRate: 500,
    approved: true
  },
  {
    id: 'ts-3',
    workerName: 'Finisher Suresh',
    workOrderNumber: 'WO-2026-0019',
    activityDescription: 'Hand-worked milanese buttonhole on tuxedo lapel',
    hours: 2.5,
    date: '2026-08-21',
    hourlyRate: 350,
    approved: true
  }
];

export const INITIAL_ACCOUNTS: Account[] = [
  { id: 'acc-1010', code: '1010', name: 'Cash on Hand (Studio Till)', category: 'ASSET', type: 'CASH', balance: 34500, isSystem: true },
  { id: 'acc-1020', code: '1020', name: 'HDFC Current Account (Main)', category: 'ASSET', type: 'BANK', balance: 428000, isSystem: true },
  { id: 'acc-1030', code: '1030', name: 'ICICI Bank (Operations)', category: 'ASSET', type: 'BANK', balance: 185000, isSystem: true },
  { id: 'acc-1200', code: '1200', name: 'Accounts Receivable (Clients)', category: 'ASSET', type: 'ACCOUNTS_RECEIVABLE', balance: 31200, isSystem: true },
  { id: 'acc-1300', code: '1300', name: 'Inventory Asset (Fabrics & Trims)', category: 'ASSET', type: 'CURRENT_ASSET', balance: 320500, isSystem: true },
  { id: 'acc-1500', code: '1500', name: 'Studio Machinery & Equipment', category: 'ASSET', type: 'FIXED_ASSET', balance: 650000, isSystem: true },
  { id: 'acc-2010', code: '2010', name: 'Accounts Payable (Suppliers)', category: 'LIABILITY', type: 'ACCOUNTS_PAYABLE', balance: 40500, isSystem: true },
  { id: 'acc-2050', code: '2050', name: 'GST Output Tax Payable (CGST+SGST)', category: 'LIABILITY', type: 'TAX_PAYABLE', balance: 14460, isSystem: true },
  { id: 'acc-2060', code: '2060', name: 'GST Input Tax Credit (ITC)', category: 'ASSET', type: 'CURRENT_ASSET', balance: 4830, isSystem: true },
  { id: 'acc-3010', code: '3010', name: 'Owner Equity & Retained Capital', category: 'EQUITY', type: 'EQUITY', balance: 1200000, isSystem: true },
  { id: 'acc-4010', code: '4010', name: 'Sales Revenue - Bespoke Tailoring', category: 'INCOME', type: 'DIRECT_INCOME', balance: 246960, isSystem: true },
  { id: 'acc-5010', code: '5010', name: 'Cost of Goods Sold (Raw Materials)', category: 'EXPENSE', type: 'DIRECT_EXPENSE', balance: 88200, isSystem: true },
  { id: 'acc-5020', code: '5020', name: 'Master Craftsman & Labor Wages', category: 'EXPENSE', type: 'DIRECT_EXPENSE', balance: 45000, isSystem: true },
  { id: 'acc-6010', code: '6010', name: 'Studio Lease & Rent', category: 'EXPENSE', type: 'INDIRECT_EXPENSE', balance: 40000, isSystem: true },
  { id: 'acc-6020', code: '6020', name: 'Electricity & Utilities', category: 'EXPENSE', type: 'INDIRECT_EXPENSE', balance: 8200, isSystem: true }
];

export const INITIAL_VOUCHERS: AccountingVoucher[] = [
  {
    id: 'vch-1',
    voucherNumber: 'JV-2026-0034',
    type: 'RECEIPT',
    date: '2026-08-11',
    referenceNo: 'INV-2026-0144',
    narration: 'Advance receipt for Bespoke Silk Reception Gown - Priya Sharma',
    totalAmount: 50000,
    user: 'sam',
    rows: [
      { accountId: 'acc-1020', accountName: 'HDFC Current Account (Main)', debit: 50000, credit: 0, narration: 'UPI transfer' },
      { accountId: 'acc-1200', accountName: 'Accounts Receivable (Clients)', debit: 0, credit: 50000, narration: 'Priya Sharma deposit' }
    ]
  },
  {
    id: 'vch-2',
    voucherNumber: 'JV-2026-0035',
    type: 'PAYMENT',
    date: '2026-08-12',
    referenceNo: 'PO-2026-0045',
    narration: 'Part payment to Raymond Wool Mill for Super 140s fabric bolt',
    totalAmount: 63700,
    user: 'sam',
    rows: [
      { accountId: 'acc-2010', accountName: 'Accounts Payable (Suppliers)', debit: 63700, credit: 0, narration: 'Raymond Mill bill settlement' },
      { accountId: 'acc-1020', accountName: 'HDFC Current Account (Main)', debit: 0, credit: 63700, narration: 'NetBanking NEFT payment' }
    ]
  },
  {
    id: 'vch-3',
    voucherNumber: 'JV-2026-0036',
    type: 'CONTRA',
    date: '2026-08-15',
    referenceNo: 'ATM-WD-1002',
    narration: 'Cash withdrawal from HDFC for Studio Till Petty Cash replenishment',
    totalAmount: 20000,
    user: 'sam',
    rows: [
      { accountId: 'acc-1010', accountName: 'Cash on Hand (Studio Till)', debit: 20000, credit: 0, narration: 'Cash in drawer' },
      { accountId: 'acc-1020', accountName: 'HDFC Current Account (Main)', debit: 0, credit: 20000, narration: 'Bank withdrawal' }
    ]
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    clientId: 'cli-1',
    action: 'MEASUREMENT_RECORDED',
    title: 'Body Measurements Recorded',
    description: 'Logged 21 point female technical measurements (v1) for Priya Sharma.',
    user: 'sam',
    timestamp: '2026-08-11T11:45:00.000Z',
    category: 'measurement'
  },
  {
    id: 'act-2',
    clientId: 'cli-1',
    action: 'ORDER_CREATED',
    title: 'Sales Order SO-2026-0089 Created',
    description: 'Created custom bespoke order for ₹81,200 with 12% GST.',
    user: 'sam',
    timestamp: '2026-08-11T12:00:00.000Z',
    category: 'order'
  },
  {
    id: 'act-3',
    clientId: 'cli-2',
    action: 'PAYMENT_RECEIVED',
    title: 'Full Invoice Payment Received',
    description: 'Received ₹1,12,000 via NEFT for Tuxedo invoice INV-2026-0145.',
    user: 'sam',
    timestamp: '2026-08-08T14:00:00.000Z',
    category: 'finance'
  },
  {
    id: 'act-4',
    clientId: 'cli-2',
    action: 'STAGE_CHANGED',
    title: 'Moved to Fitting Stage',
    description: 'Vikram Malhotra advanced to FITTING stage on CRM Kanban.',
    user: 'sam',
    timestamp: '2026-08-21T11:00:00.000Z',
    category: 'client'
  },
  {
    id: 'act-5',
    action: 'STOCK_MOVEMENT',
    title: 'Super 140s Wool Restocked',
    description: 'Received 30.0 meters from Raymond Wool Mills (PO-2026-0045).',
    user: 'sam',
    timestamp: '2026-08-11T15:30:00.000Z',
    category: 'inventory'
  }
];

export const INITIAL_WORKFLOWS: WorkflowRule[] = [
  {
    id: 'wf-1',
    name: 'Auto-Invoice Generation on Order Confirmation',
    trigger: 'Order Status -> CONFIRMED',
    condition: 'Grand Total > 0',
    action: 'Generate draft invoice and post advance payment voucher',
    isActive: true
  },
  {
    id: 'wf-2',
    name: 'Low Fabric Stock Alert & Auto PO Draft',
    trigger: 'Current Stock < Min Stock Level',
    condition: 'Category = FABRIC',
    action: 'Send urgent reminder to purchase manager & create draft PO',
    isActive: true
  },
  {
    id: 'wf-3',
    name: 'Trial Fitting Reminder (2 Days Before)',
    trigger: 'Order Due Date Approaching',
    condition: 'Days Remaining <= 2 AND Stage = IN_PRODUCTION',
    action: 'WhatsApp client confirmation & alert Master Tailor',
    isActive: true
  }
];

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'Trial Fitting with Priya Sharma',
    description: 'Gown bodice drape & shoulder fit check (Studio Room A)',
    dueDate: '2026-08-26T15:00:00.000Z',
    priority: 'HIGH',
    isCompleted: false,
    relatedTo: 'Priya Sharma (SO-2026-0089)'
  },
  {
    id: 'rem-2',
    title: 'File GSTR-3B Monthly Return',
    description: 'Review output liability (₹14,460) vs input tax credit (₹4,830)',
    dueDate: '2026-08-20T23:59:00.000Z',
    priority: 'HIGH',
    isCompleted: true,
    relatedTo: 'GST Portal'
  },
  {
    id: 'rem-3',
    title: 'Inspect YKK Zipper Courier Arrival',
    description: 'Verify 100 pcs concealed zippers from BlueDart delivery',
    dueDate: '2026-08-26T12:00:00.000Z',
    priority: 'MEDIUM',
    isCompleted: false,
    relatedTo: 'PO-2026-0046'
  }
];

export const INITIAL_PARTIES: import('../types/erp').Party[] = [
  {
    id: 'party-abc',
    name: 'ABC Industries & Textiles',
    companyName: 'ABC Industries Ltd',
    roles: ['CUSTOMER', 'SUPPLIER'],
    phone: '+91 98200 99881',
    email: 'accounts@abcindustries.co.in',
    gstin: '27AABCU9603R1ZM',
    pan: 'AABCU9603R',
    address: 'Plot 45, MIDC Industrial Zone, Andheri East',
    city: 'Mumbai',
    creditLimit: 1000000,
    creditDays: 30,
    paymentTerms: 'Net 30 Days',
    totalSales: 1840000,
    totalPurchases: 620000,
    totalReceived: 1320000,
    totalPaid: 450000,
    outstandingReceivable: 520000,
    outstandingPayable: 170000,
    overdueAmount: 140000,
    isFavorite: true,
    tags: ['Dual-Role', 'High Volume', 'Corporate'],
    notes: 'Key trade partner: We manufacture custom uniform collections for them (Customer) and procure bulk cotton canvas from their spinning unit (Supplier).',
    createdAt: '2026-06-01T09:00:00.000Z',
    timeline: [
      { id: 'pt-1', date: '2026-08-23', type: 'RECEIPT', title: 'Payment Received via NEFT', amount: 50000, referenceNo: 'HDFC-N98210', balanceAfter: 520000 },
      { id: 'pt-2', date: '2026-08-21', type: 'INVOICE', title: 'Tax Invoice #INV-2026-1045', amount: 120000, referenceNo: 'INV-1045', balanceAfter: 570000 },
      { id: 'pt-3', date: '2026-08-18', type: 'SALE', title: 'Corporate Work Order Confirmed', amount: 120000, referenceNo: 'SO-984' },
      { id: 'pt-4', date: '2026-08-12', type: 'PURCHASE', title: 'Raw Canvas PO Received #PO-48', amount: 85000, referenceNo: 'BILL-4810' },
      { id: 'pt-5', date: '2026-08-05', type: 'RECEIPT', title: 'Advance Bank Transfer', amount: 80000, referenceNo: 'HDFC-N4410' }
    ]
  },
  {
    id: 'party-priya',
    name: 'Priya Sharma',
    roles: ['CUSTOMER'],
    phone: '+91 98201 44521',
    email: 'priya.sharma@luxuryfashion.in',
    gstin: '27AAACS1429B1Z8',
    address: '402 Regency Heights, Bandra West',
    city: 'Mumbai',
    creditLimit: 200000,
    creditDays: 15,
    paymentTerms: '50% Advance, 50% On Delivery',
    totalSales: 84500,
    totalPurchases: 0,
    totalReceived: 50000,
    totalPaid: 0,
    outstandingReceivable: 34500,
    outstandingPayable: 0,
    overdueAmount: 0,
    isFavorite: true,
    tags: ['VIP', 'Wedding', 'Bespoke'],
    notes: 'Wedding reception bespoke gown client. Advance paid; balance due on final fitting.',
    createdAt: '2026-08-10T10:00:00.000Z',
    timeline: [
      { id: 'pt-p1', date: '2026-08-10', type: 'ADVANCE', title: 'Booking Advance Received (UPI)', amount: 25000, referenceNo: 'UPI-9821' },
      { id: 'pt-p2', date: '2026-08-12', type: 'SALE', title: 'Bespoke Order #SO-2026-0089', amount: 56000, referenceNo: 'SO-0089' },
      { id: 'pt-p3', date: '2026-08-15', type: 'RECEIPT', title: 'Part Payment (UPI)', amount: 25000, referenceNo: 'UPI-4491' }
    ]
  },
  {
    id: 'party-raymond',
    name: 'Raymond Luxury Mills Ltd',
    roles: ['SUPPLIER'],
    phone: '+91 22 2589 1234',
    email: 'orders@raymondluxurytextiles.com',
    gstin: '27AAACR1284A1ZP',
    address: 'Jekegram, Pokhran Road No.1',
    city: 'Thane',
    creditLimit: 500000,
    creditDays: 45,
    paymentTerms: 'Credit 45 Days',
    totalSales: 0,
    totalPurchases: 450000,
    totalReceived: 0,
    totalPaid: 320000,
    outstandingReceivable: 0,
    outstandingPayable: 130000,
    overdueAmount: 0,
    tags: ['Fabric Mill', 'Tier 1 Supplier'],
    notes: 'Primary supplier for Super 120s & 140s pure merino wools and Italian silk blends.',
    createdAt: '2026-06-15T08:00:00.000Z',
    timeline: [
      { id: 'pt-r1', date: '2026-08-10', type: 'BILL', title: 'Fabric Roll Inward #BILL-9921', amount: 72000, referenceNo: 'BILL-9921' },
      { id: 'pt-r2', date: '2026-08-12', type: 'PAYMENT', title: 'RTGS Supplier Payment', amount: 50000, referenceNo: 'HDFC-RTGS-881' }
    ]
  },
  {
    id: 'party-hdfc',
    name: 'HDFC Commercial Bank Ltd',
    roles: ['LENDER', 'SERVICE_PROVIDER'],
    phone: '+91 22 6600 3300',
    email: 'businessdesk@hdfcbank.com',
    address: 'Bandra Kurla Complex, G Block',
    city: 'Mumbai',
    creditLimit: 2500000,
    creditDays: 0,
    paymentTerms: 'Monthly EMI Auto-Debit',
    totalSales: 0,
    totalPurchases: 0,
    totalReceived: 1000000,
    totalPaid: 280000,
    outstandingReceivable: 0,
    outstandingPayable: 720000,
    overdueAmount: 0,
    tags: ['Bank', 'Lender', 'Equipment Loan'],
    notes: 'Machinery Term Loan (A/c: 502000889912). Current outstanding ₹7.20L; EMI ₹28,400 debited 5th of every month.',
    createdAt: '2026-01-10T10:00:00.000Z',
    timeline: [
      { id: 'pt-h1', date: '2026-08-05', type: 'PAYMENT', title: 'Monthly Loan EMI (Principal ₹18.4K + Int ₹10K)', amount: 28400, referenceNo: 'AUTO-DEBIT-5AUG' }
    ]
  },
  {
    id: 'party-rahul',
    name: 'Rahul Sharma (Master Tailor)',
    roles: ['EMPLOYEE'],
    phone: '+91 97110 55432',
    email: 'rahul.tailor@kmstudio.in',
    address: 'Shop 4, Lower Parel Tailoring Lane',
    city: 'Mumbai',
    creditLimit: 50000,
    creditDays: 0,
    paymentTerms: 'Monthly Salary on 1st',
    totalSales: 0,
    totalPurchases: 0,
    totalReceived: 0,
    totalPaid: 450000,
    outstandingReceivable: 10000,
    outstandingPayable: 45000,
    overdueAmount: 0,
    tags: ['Key Artisan', 'Cutting Master', 'Payroll'],
    notes: 'Chief Pattern Cutter & Tailoring Master. Holds an emergency salary advance of ₹10,000 to be deducted across 2 pay periods.',
    createdAt: '2026-01-01T09:00:00.000Z',
    timeline: [
      { id: 'pt-rh1', date: '2026-08-01', type: 'PAYMENT', title: 'July Salary Disbursed', amount: 45000, referenceNo: 'SAL-JUL26' },
      { id: 'pt-rh2', date: '2026-08-14', type: 'ADVANCE', title: 'Festival Salary Advance (Direct Transfer)', amount: 10000, referenceNo: 'ADV-EMP-01' }
    ]
  },
  {
    id: 'party-sam',
    name: 'Sam (Studio Founder & Partner)',
    roles: ['PARTNER', 'EMPLOYEE'],
    phone: '+91 99201 00001',
    email: 'sam@kmstudio.in',
    address: 'Studio Atelier Penthouse, Bandra',
    city: 'Mumbai',
    creditLimit: 5000000,
    creditDays: 0,
    paymentTerms: 'Equity & Profit Drawings',
    totalSales: 0,
    totalPurchases: 0,
    totalReceived: 1500000,
    totalPaid: 210000,
    outstandingReceivable: 0,
    outstandingPayable: 0,
    overdueAmount: 0,
    tags: ['Owner', 'Founder', 'Equity'],
    notes: 'Initial Capital invested: ₹15.00 Lakhs. Monthly personal drawings ₹60,000 (Equity Drawings account).',
    createdAt: '2026-01-01T00:00:00.000Z',
    timeline: [
      { id: 'pt-s1', date: '2026-01-10', type: 'RECEIPT', title: 'Owner Capital Inflow', amount: 1500000, referenceNo: 'CAPITAL-01' },
      { id: 'pt-s2', date: '2026-08-05', type: 'PAYMENT', title: 'Personal Drawings Withdrawal', amount: 60000, referenceNo: 'DRAWING-AUG' }
    ]
  }
];

export const INITIAL_FIXED_ASSETS: import('../types/erp').FixedAsset[] = [
  {
    id: 'asset-1',
    assetCode: 'EQ-JUKI-01',
    name: 'Juki DDL-9000C Direct Drive Industrial Sewing Machine',
    category: 'MACHINERY',
    purchaseDate: '2026-02-15',
    purchaseCost: 145000,
    salvageValue: 15000,
    usefulLifeYears: 5,
    depreciationMethod: 'STRAIGHT_LINE',
    accumulatedDepreciation: 13000,
    currentBookValue: 132000,
    custodian: 'Rahul Sharma (Master Tailor)',
    location: 'Main Atelier - Stitching Bay A',
    department: 'Production',
    serialNumber: 'JK-99410-2026',
    warrantyExpiry: '2028-02-14',
    status: 'ACTIVE',
    maintenanceLogs: [
      { id: 'ml-1', date: '2026-07-10', description: 'Servicing, needle bar calibration and oil refill', cost: 1800, vendor: 'Juki India Service' }
    ]
  },
  {
    id: 'asset-2',
    assetCode: 'EQ-TAJIMA-01',
    name: 'Tajima 6-Head High-Precision Embroidery Machine',
    category: 'MACHINERY',
    purchaseDate: '2026-03-01',
    purchaseCost: 850000,
    salvageValue: 80000,
    usefulLifeYears: 7,
    depreciationMethod: 'STRAIGHT_LINE',
    accumulatedDepreciation: 55000,
    currentBookValue: 795000,
    custodian: 'Sunil Verma',
    location: 'Atelier - Embroidery Suite',
    department: 'Embellishment',
    serialNumber: 'TM-6H-88219',
    warrantyExpiry: '2029-03-01',
    status: 'ACTIVE'
  },
  {
    id: 'asset-3',
    assetCode: 'IT-MAC-01',
    name: 'Apple Mac Studio M2 Max & 27" 5K Studio Display',
    category: 'COMPUTERS',
    purchaseDate: '2026-01-20',
    purchaseCost: 220000,
    salvageValue: 30000,
    usefulLifeYears: 4,
    depreciationMethod: 'STRAIGHT_LINE',
    accumulatedDepreciation: 31666,
    currentBookValue: 188334,
    custodian: 'Sam (Creative Director)',
    location: 'Design & CAD Pattern Suite',
    department: 'Design',
    serialNumber: 'C02G9981MD6M',
    warrantyExpiry: '2027-01-19',
    status: 'ACTIVE'
  },
  {
    id: 'asset-4',
    assetCode: 'EQ-PRESS-01',
    name: 'Veit Professional Vacuum & Blowing Steam Ironing Table',
    category: 'STUDIO_EQUIPMENT',
    purchaseDate: '2026-04-10',
    purchaseCost: 85000,
    salvageValue: 5000,
    usefulLifeYears: 5,
    depreciationMethod: 'STRAIGHT_LINE',
    accumulatedDepreciation: 5333,
    currentBookValue: 79667,
    custodian: 'Ustad Rashid',
    location: 'Finishing & Pressing Bay',
    department: 'Finishing',
    serialNumber: 'VT-4410-B',
    status: 'ACTIVE'
  }
];

export const INITIAL_LOANS: import('../types/erp').BusinessLoan[] = [
  {
    id: 'loan-hdfc-01',
    loanNumber: 'LN-HDFC-2026-88',
    lenderName: 'HDFC Commercial Bank',
    lenderPartyId: 'party-hdfc',
    type: 'MACHINERY_LOAN',
    principalAmount: 1000000,
    outstandingPrincipal: 720000,
    interestRatePercent: 9.5,
    tenureMonths: 48,
    monthlyEmi: 28400,
    startDate: '2026-01-05',
    nextEmiDate: '2026-09-05',
    bankAccountId: 'acc-hdfc',
    emiHistory: [
      { id: 'em-1', date: '2026-06-05', emiPaid: 28400, principalComponent: 18100, interestComponent: 10300, balanceRemaining: 756500 },
      { id: 'em-2', date: '2026-07-05', emiPaid: 28400, principalComponent: 18250, interestComponent: 10150, balanceRemaining: 738250 },
      { id: 'em-3', date: '2026-08-05', emiPaid: 28400, principalComponent: 18400, interestComponent: 10000, balanceRemaining: 720000 }
    ]
  }
];

export const INITIAL_EQUITY_RECORDS: import('../types/erp').OwnerEquityRecord[] = [
  {
    id: 'eq-1',
    type: 'CAPITAL_IN',
    partnerName: 'Sam (Founder)',
    amount: 1500000,
    date: '2026-01-10',
    paymentMethod: 'Bank Transfer (NEFT)',
    bankAccountId: 'acc-hdfc',
    notes: 'Initial founding equity capital invested into KM Studio business operating account.'
  },
  {
    id: 'eq-2',
    type: 'DRAWING_OUT',
    partnerName: 'Sam (Founder)',
    amount: 60000,
    date: '2026-08-05',
    paymentMethod: 'Bank Transfer (IMPS)',
    bankAccountId: 'acc-hdfc',
    notes: 'Monthly personal drawing against partner share (Non-expense, Equity deduction).'
  }
];

export const INITIAL_ADVANCES: import('../types/erp').AdvanceRecord[] = [
  {
    id: 'adv-1',
    advanceNumber: 'CADV-2026-001',
    type: 'CUSTOMER_ADVANCE',
    partyId: 'party-priya',
    partyName: 'Priya Sharma',
    amount: 25000,
    unadjustedAmount: 25000,
    date: '2026-08-10',
    paymentMethod: 'UPI',
    status: 'OPEN',
    notes: 'Advance booking for Bespoke Bridal Gown (SO-2026-0089). Will adjust against final invoice.'
  },
  {
    id: 'adv-2',
    advanceNumber: 'SADV-2026-001',
    type: 'SUPPLIER_ADVANCE',
    partyId: 'party-raymond',
    partyName: 'Raymond Luxury Mills',
    amount: 20000,
    unadjustedAmount: 20000,
    date: '2026-08-18',
    paymentMethod: 'BANK_TRANSFER',
    status: 'OPEN',
    notes: 'Fabric mill reservation deposit for imported Super 150s Glen Plaid rolls.'
  },
  {
    id: 'adv-3',
    advanceNumber: 'EADV-2026-001',
    type: 'EMPLOYEE_ADVANCE',
    partyId: 'party-rahul',
    partyName: 'Rahul Sharma (Master Tailor)',
    amount: 10000,
    unadjustedAmount: 10000,
    date: '2026-08-14',
    paymentMethod: 'BANK_TRANSFER',
    status: 'OPEN',
    notes: 'Emergency festival salary advance; to be recovered in August & September payroll.'
  }
];

export const INITIAL_EMPLOYEES: import('../types/erp').Employee[] = [
  {
    id: 'emp-1',
    employeeCode: 'EMP-001',
    name: 'Rahul Sharma',
    designation: 'Master Tailor & Pattern Cutter',
    department: 'Cutting & Pattern',
    phone: '+91 97110 55432',
    email: 'rahul.tailor@kmstudio.in',
    dateOfJoining: '2025-06-01',
    basicSalary: 40000,
    allowances: 5000,
    deductions: 0,
    netSalary: 45000,
    bankAccountNumber: '918273645019',
    bankIfsc: 'HDFC0001234',
    status: 'ACTIVE',
    totalAdvancesDue: 10000
  },
  {
    id: 'emp-2',
    employeeCode: 'EMP-002',
    name: 'Meera Patel',
    designation: 'Senior Bridal Couturier',
    department: 'Stitching & Draping',
    phone: '+91 98200 44102',
    email: 'meera.couture@kmstudio.in',
    dateOfJoining: '2025-08-15',
    basicSalary: 35000,
    allowances: 3000,
    deductions: 0,
    netSalary: 38000,
    bankAccountNumber: '501002998812',
    bankIfsc: 'ICIC0000982',
    status: 'ACTIVE',
    totalAdvancesDue: 0
  },
  {
    id: 'emp-3',
    employeeCode: 'EMP-003',
    name: 'Sunil Verma',
    designation: 'Embroidery & Embellishment Specialist',
    department: 'Embellishment',
    phone: '+91 99100 88219',
    email: 'sunil.craft@kmstudio.in',
    dateOfJoining: '2026-01-10',
    basicSalary: 28000,
    allowances: 2000,
    deductions: 0,
    netSalary: 30000,
    bankAccountNumber: '334455667788',
    bankIfsc: 'SBIN0004521',
    status: 'ACTIVE',
    totalAdvancesDue: 0
  }
];

export const INITIAL_EXPENSE_CLAIMS: import('../types/erp').EmployeeExpenseClaim[] = [
  {
    id: 'clm-1',
    claimNumber: 'CLM-2026-014',
    employeeId: 'emp-1',
    employeeName: 'Rahul Sharma',
    category: 'Travel & Mill Visit',
    amount: 8400,
    date: '2026-08-15',
    description: 'Vande Bharat train ticket & local taxi for Surat silk mill quality audit and swatch picking.',
    status: 'APPROVED'
  },
  {
    id: 'clm-2',
    claimNumber: 'CLM-2026-015',
    employeeId: 'emp-2',
    employeeName: 'Meera Patel',
    category: 'Studio Trims & Notions',
    amount: 3200,
    date: '2026-08-19',
    description: 'Emergency Japanese organza interlining and gold bullion threads from Crawford Market.',
    status: 'REIMBURSED',
    reimbursedDate: '2026-08-20'
  }
];

export const INITIAL_BUSINESS_EVENTS: import('../types/erp').BusinessEventTrace[] = [
  {
    id: 'bev-1',
    timestamp: '2026-08-23T09:45:00.000Z',
    eventType: 'CUSTOMER_ADVANCE_RECEIVED',
    summary: 'Received ₹50,000 advance payment from ABC Industries Ltd',
    partyName: 'ABC Industries & Textiles',
    amount: 50000,
    moneyDirection: 'IN',
    category: 'ADVANCE',
    affectedWorlds: {
      crm: 'ABC Industries account timeline updated',
      sales: 'Advance liability credited',
      cashBank: 'HDFC Current A/c +₹50,000',
      accounting: 'Debit Bank / Credit Customer Advance',
      partyLedger: 'Party ledger balance updated to ₹5,20,000'
    }
  },
  {
    id: 'bev-2',
    timestamp: '2026-08-21T14:30:00.000Z',
    eventType: 'BESPOKE_SALE_COMPLETED',
    summary: 'Sold Bespoke Italian Tuxedo to Vikram Malhotra #SO-2026-0090',
    partyName: 'Vikram Malhotra',
    amount: 112000,
    moneyDirection: 'IN',
    category: 'SALES',
    affectedWorlds: {
      crm: 'Client stage moved to FITTING',
      sales: 'Revenue recognized ₹1,00,000 + GST ₹12,000',
      inventory: 'Super 120s Wool Fabric reduced by 3.5m',
      gst: 'Output GST liability +₹12,000 logged',
      accounting: 'Debit Receivables / Credit Sales & Output GST',
      partyLedger: 'Party timeline logged with order trace'
    }
  },
  {
    id: 'bev-3',
    timestamp: '2026-08-15T11:00:00.000Z',
    eventType: 'CAPEX_ASSET_PURCHASED',
    summary: 'Purchased Tajima 6-Head Embroidery Machine #EQ-TAJIMA-01',
    partyName: 'Tajima India',
    amount: 850000,
    moneyDirection: 'OUT',
    category: 'CAPEX',
    affectedWorlds: {
      assets: 'Fixed Asset register updated (+₹8.50L Equipment)',
      cashBank: 'HDFC Term Loan Disbursement credited / Supplier wired',
      accounting: 'Debit Fixed Assets (CapEx) / Credit Bank (No direct P&L hit)',
      partyLedger: 'Tajima vendor warranty record logged'
    }
  },
  {
    id: 'bev-4',
    timestamp: '2026-08-05T10:00:00.000Z',
    eventType: 'LOAN_EMI_PAID',
    summary: 'Monthly HDFC Machinery Loan EMI Debited #LN-HDFC-2026-88',
    partyName: 'HDFC Commercial Bank Ltd',
    amount: 28400,
    moneyDirection: 'OUT',
    category: 'LOAN',
    affectedWorlds: {
      cashBank: 'HDFC Current A/c -₹28,400',
      accounting: 'Debit Loan Liability ₹18,400 / Debit Interest Expense ₹10,000 / Credit Bank ₹28,400',
      partyLedger: 'Outstanding loan balance reduced to ₹7.20L'
    }
  },
  {
    id: 'bev-5',
    timestamp: '2026-08-05T10:30:00.000Z',
    eventType: 'OWNER_DRAWING_WITHDRAWAL',
    summary: 'Partner Sam personal drawings transfer',
    partyName: 'Sam (Studio Founder & Partner)',
    amount: 60000,
    moneyDirection: 'OUT',
    category: 'EQUITY',
    affectedWorlds: {
      cashBank: 'HDFC Current A/c -₹60,000',
      accounting: 'Debit Partner Drawings (Equity) / Credit Bank (P&L unaffected)',
      partyLedger: 'Partner equity account updated'
    }
  }
];

