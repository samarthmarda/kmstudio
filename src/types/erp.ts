export type BodyType = 'female' | 'male' | 'child';

export type PipelineStage = 
  | 'INQUIRY'
  | 'MEASURED'
  | 'ORDERED'
  | 'IN_PRODUCTION'
  | 'FITTING'
  | 'READY'
  | 'DELIVERED';

export type OrderStatus = 'DRAFT' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type InvoiceStatus = 'DRAFT' | 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export type PurchaseStatus = 'DRAFT' | 'ORDERED' | 'RECEIVED' | 'PAID' | 'CANCELLED';

export type WorkOrderStatus = 'PLANNED' | 'IN_PROGRESS' | 'QUALITY_CHECK' | 'COMPLETED' | 'CANCELLED';

export type VoucherType = 'JOURNAL' | 'PAYMENT' | 'RECEIPT' | 'CONTRA';

export type AccountCategory = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'INCOME' | 'EXPENSE';

export interface MeasurementValue {
  key: string;
  name: string;
  abbreviation?: string;
  isKey?: boolean;
  valueCm: number;
  valueInches: number;
  view: 'front' | 'back';
}

export interface MeasurementSession {
  id: string;
  clientId: string;
  version: number;
  bodyType: BodyType;
  unit: 'cm' | 'inches';
  measurements: Record<string, { cm: number; inches: number }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientPhoto {
  id: string;
  clientId: string;
  url: string;
  title: string;
  tag: 'front' | 'back' | 'side' | 'fabric' | 'detail' | 'general';
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  clientId?: string;
  action: string;
  title: string;
  description: string;
  user: string;
  timestamp: string;
  category: 'client' | 'measurement' | 'order' | 'finance' | 'inventory' | 'production';
}

export interface CustomFieldDef {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: string[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  bodyType: BodyType;
  pipelineStage: PipelineStage;
  age?: number;
  address?: string;
  gstin?: string;
  notes: string;
  customValues?: Record<string, any>;
  tags: string[];
  totalSpend: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  itemId?: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // e.g. 5, 12, 18%
  lineTotal: number;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  clientId: string;
  clientName: string;
  sessionId?: string;
  items: OrderItem[];
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  status: OrderStatus;
  orderDate: string;
  dueDate: string;
  deliveryDate?: string;
  notes?: string;
  assignedTailor?: string;
}

export interface InvoicePayment {
  id: string;
  amount: number;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'UPI' | 'CARD' | 'CHEQUE';
  referenceNumber?: string;
  paidAt: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  clientId: string;
  clientName: string;
  clientGstin?: string;
  items: OrderItem[];
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  paidAmount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  payments: InvoicePayment[];
  notes?: string;
  irn?: string;
  qrCodeMock?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstin: string;
  address: string;
  category: 'FABRIC' | 'TRIMS' | 'PACKAGING' | 'MACHINERY' | 'SERVICES';
  balanceDue: number;
  rating: number;
}

export interface PurchaseItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  gstRate: number;
  lineTotal: number;
}

export interface PurchaseOrder {
  id: string;
  purchaseNumber: string;
  supplierId: string;
  supplierName: string;
  supplierGstin?: string;
  items: PurchaseItem[];
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  status: PurchaseStatus;
  orderDate: string;
  expectedDate: string;
  receivedDate?: string;
  paidAmount: number;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'RAW_MATERIAL' | 'FABRIC' | 'TRIMS' | 'FINISHED_GOODS' | 'SERVICE';
  unit: 'meters' | 'yards' | 'pieces' | 'rolls' | 'kg' | 'sets';
  currentStock: number;
  minStockLevel: number;
  purchasePrice: number;
  sellingPrice: number;
  hsnCode: string;
  gstRate: number;
  location: string;
  imageUrl?: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: 'PURCHASE_IN' | 'PRODUCTION_OUT' | 'SALES_OUT' | 'ADJUSTMENT' | 'RETURN_IN';
  quantity: number;
  previousStock: number;
  newStock: number;
  referenceId?: string;
  reason: string;
  user: string;
  timestamp: string;
}

export interface BOMMaterial {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
}

export interface BillOfMaterials {
  id: string;
  productName: string;
  sku: string;
  description: string;
  estimatedLaborHours: number;
  laborCostPerHour: number;
  materials: BOMMaterial[];
  totalMaterialCost: number;
  totalCost: number;
}

export interface WorkOrder {
  id: string;
  workOrderNumber: string;
  bomId?: string;
  productName: string;
  salesOrderId?: string;
  clientName?: string;
  quantity: number;
  status: WorkOrderStatus;
  assignedWorker: string;
  startDate: string;
  targetDate: string;
  completedDate?: string;
  stageProgress: number; // 0 - 100%
  materialsUsed: { itemId: string; itemName: string; quantity: number; unit: string }[];
  notes?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  clientName?: string;
  assignedTo: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
}

export interface TimesheetEntry {
  id: string;
  workerName: string;
  taskId?: string;
  workOrderNumber?: string;
  activityDescription: string;
  hours: number;
  date: string;
  hourlyRate: number;
  approved: boolean;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  category: AccountCategory;
  type: 'CURRENT_ASSET' | 'FIXED_ASSET' | 'BANK' | 'CASH' | 'ACCOUNTS_RECEIVABLE' | 'CURRENT_LIABILITY' | 'ACCOUNTS_PAYABLE' | 'EQUITY' | 'DIRECT_INCOME' | 'INDIRECT_INCOME' | 'DIRECT_EXPENSE' | 'INDIRECT_EXPENSE' | 'TAX_PAYABLE';
  balance: number;
  isSystem: boolean;
}

export interface VoucherRow {
  accountId: string;
  accountName: string;
  debit: number;
  credit: number;
  narration?: string;
}

export interface AccountingVoucher {
  id: string;
  voucherNumber: string;
  type: VoucherType;
  date: string;
  referenceNo?: string;
  narration: string;
  rows: VoucherRow[];
  totalAmount: number;
  user: string;
}

export interface ExpenseRecord {
  id: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: 'CASH' | 'BANK' | 'UPI' | 'CARD';
  date: string;
  paidTo: string;
  receiptUrl?: string;
  isTaxDeductible: boolean;
}

export interface WorkflowRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  isActive: boolean;
}

export interface ReminderItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  isCompleted: boolean;
  relatedTo?: string;
}

export interface GSTSummary {
  taxPeriod: string;
  totalTaxableSales: number;
  totalCGST: number;
  totalSGST: number;
  totalIGST: number;
  totalTaxLiability: number;
  inputTaxCreditCGST: number;
  inputTaxCreditSGST: number;
  inputTaxCreditIGST: number;
  totalITC: number;
  netTaxPayable: number;
}

export type PartyRole = 'CUSTOMER' | 'SUPPLIER' | 'EMPLOYEE' | 'LENDER' | 'PARTNER' | 'GOVERNMENT' | 'SERVICE_PROVIDER';

export interface PartyTimelineItem {
  id: string;
  date: string;
  type: 'SALE' | 'INVOICE' | 'RECEIPT' | 'PURCHASE' | 'BILL' | 'PAYMENT' | 'ADVANCE' | 'RETURN' | 'EXPENSE' | 'JOURNAL' | 'NOTE';
  title: string;
  amount: number;
  referenceNo?: string;
  balanceAfter?: number;
  notes?: string;
}

export interface Party {
  id: string;
  name: string;
  companyName?: string;
  roles: PartyRole[];
  phone: string;
  email: string;
  gstin?: string;
  pan?: string;
  address: string;
  city: string;
  creditLimit: number;
  creditDays: number;
  paymentTerms: string;
  totalSales: number;
  totalPurchases: number;
  totalReceived: number;
  totalPaid: number;
  outstandingReceivable: number;
  outstandingPayable: number;
  overdueAmount: number;
  isFavorite?: boolean;
  tags: string[];
  notes: string;
  timeline: PartyTimelineItem[];
  createdAt: string;
}

export type AssetCategory = 'MACHINERY' | 'COMPUTERS' | 'FURNITURE' | 'VEHICLES' | 'TOOLS' | 'BUILDING' | 'STUDIO_EQUIPMENT';

export interface FixedAsset {
  id: string;
  assetCode: string;
  name: string;
  category: AssetCategory;
  purchaseDate: string;
  purchaseCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  depreciationMethod: 'STRAIGHT_LINE' | 'WDV';
  accumulatedDepreciation: number;
  currentBookValue: number;
  custodian: string;
  location: string;
  department: string;
  supplierName?: string;
  serialNumber?: string;
  warrantyExpiry?: string;
  warrantyExpiryDate?: string;
  status: 'ACTIVE' | 'IN_MAINTENANCE' | 'DISPOSED';
  maintenanceLogs?: { id: string; date: string; description: string; cost: number; vendor: string }[];
}

export interface BusinessLoan {
  id: string;
  loanNumber: string;
  lenderName: string;
  lenderPartyId?: string;
  type: 'TERM_LOAN' | 'WORKING_CAPITAL' | 'MACHINERY_LOAN' | 'VEHICLE_LOAN';
  principalAmount: number;
  outstandingPrincipal: number;
  interestRatePercent: number;
  tenureMonths: number;
  monthlyEmi: number;
  startDate: string;
  nextEmiDate: string;
  bankAccountId: string;
  emiHistory: {
    id: string;
    date: string;
    emiPaid: number;
    principalComponent: number;
    interestComponent: number;
    balanceRemaining: number;
  }[];
}

export interface OwnerEquityRecord {
  id: string;
  type: 'CAPITAL_IN' | 'DRAWING_OUT' | 'PROFIT_DISTRIBUTION';
  partnerName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  bankAccountId: string;
  notes: string;
}

export interface AdvanceRecord {
  id: string;
  advanceNumber: string;
  type: 'CUSTOMER_ADVANCE' | 'SUPPLIER_ADVANCE' | 'EMPLOYEE_ADVANCE';
  partyId: string;
  partyName: string;
  amount: number;
  unadjustedAmount: number;
  date: string;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'UPI' | 'CARD';
  status: 'OPEN' | 'PARTIALLY_ADJUSTED' | 'FULLY_ADJUSTED';
  notes?: string;
}

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  dateOfJoining: string;
  joiningDate?: string;
  basicSalary: number;
  hra?: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  bankAccountNumber: string;
  bankIfsc: string;
  bankAccountDetails?: { bankName?: string; accountNumber?: string; ifsc?: string } | any;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
  totalAdvancesDue: number;
}

export interface EmployeeExpenseClaim {
  id: string;
  claimNumber: string;
  employeeId: string;
  employeeName: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REIMBURSED';
  receiptUrl?: string;
  reimbursedDate?: string;
}

export interface ManufacturingCostBreakdown {
  rawMaterialCost: number;
  laborCost: number;
  machineCost: number;
  electricityCost: number;
  overheadCost: number;
  subcontractingCost: number;
  scrapRecovery: number;
  totalProductionCost: number;
  finishedQuantity: number;
  actualUnitCost: number;
  sellingPrice: number;
  grossMargin: number;
  marginPercent: number;
}

export interface BusinessEventTrace {
  id: string;
  timestamp: string;
  eventType: string;
  summary: string;
  partyName?: string;
  amount: number;
  moneyDirection: 'IN' | 'OUT' | 'MOVE';
  category: 'SALES' | 'PURCHASE' | 'CAPEX' | 'LOAN' | 'EQUITY' | 'PAYROLL' | 'EXPENSE' | 'TRANSFER' | 'ADVANCE' | 'TAX';
  affectedWorlds: {
    crm?: string;
    sales?: string;
    inventory?: string;
    assets?: string;
    gst?: string;
    accounting?: string;
    cashBank?: string;
    partyLedger?: string;
  };
}

// Aliases for component convenience
export type Voucher = AccountingVoucher;
export type AccountHead = Account;
export type SalesOrderStatus = OrderStatus;
export type PurchaseOrderStatus = PurchaseStatus;
export type ProductionStage = 'PATTERN_DRAFTING' | 'CLOTH_CUTTING' | 'BASTE_FITTING' | 'MACHINE_SEWING' | 'HAND_EMBROIDERY' | 'FINAL_PRESSING' | 'QC_PASSED';
export interface JournalVoucher extends AccountingVoucher {
  entries?: VoucherRow[];
}

