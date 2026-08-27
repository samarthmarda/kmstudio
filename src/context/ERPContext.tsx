import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Client,
  MeasurementSession,
  ClientPhoto,
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
  PipelineStage,
  OrderStatus,
  InvoiceStatus,
  PurchaseStatus,
  WorkOrderStatus,
  VoucherType,
  Party,
  PartyRole,
  PartyTimelineItem,
  FixedAsset,
  BusinessLoan,
  OwnerEquityRecord,
  AdvanceRecord,
  Employee,
  EmployeeExpenseClaim,
  BusinessEventTrace,
  ManufacturingCostBreakdown
} from '../types/erp';
import {
  INITIAL_CLIENTS,
  INITIAL_MEASUREMENT_SESSIONS,
  INITIAL_CLIENT_PHOTOS,
  INITIAL_INVENTORY,
  INITIAL_ORDERS,
  INITIAL_INVOICES,
  INITIAL_SUPPLIERS,
  INITIAL_PURCHASES,
  INITIAL_BOM,
  INITIAL_WORK_ORDERS,
  INITIAL_TASKS,
  INITIAL_TIMESHEETS,
  INITIAL_ACCOUNTS,
  INITIAL_VOUCHERS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_WORKFLOWS,
  INITIAL_REMINDERS,
  INITIAL_PARTIES,
  INITIAL_FIXED_ASSETS,
  INITIAL_LOANS,
  INITIAL_EQUITY_RECORDS,
  INITIAL_ADVANCES,
  INITIAL_EMPLOYEES,
  INITIAL_EXPENSE_CLAIMS,
  INITIAL_BUSINESS_EVENTS
} from '../data/seedData';

export type NavigationTab =
  | 'home'
  | 'dashboard'
  | 'parties'
  | 'party_detail'
  | 'customers'
  | 'customer_detail'
  | 'pipeline'
  | 'sales'
  | 'purchases'
  | 'inventory'
  | 'fixed_assets'
  | 'cash_bank'
  | 'money_moves'
  | 'loans'
  | 'equity'
  | 'advances'
  | 'receivables'
  | 'payables'
  | 'expenses'
  | 'payroll'
  | 'people'
  | 'work'
  | 'manufacturing'
  | 'costing'
  | 'projects'
  | 'brain'
  | 'business_brain'
  | 'accounting_transactions'
  | 'vouchers'
  | 'ledgers'
  | 'accounts'
  | 'reconciliation'
  | 'reports'
  | 'gst_dashboard'
  | 'gstr1'
  | 'gstr3b'
  | 'einvoice'
  | 'ewaybill'
  | 'workflows'
  | 'reminders'
  | 'masters'
  | 'company'
  | 'settings';

interface ERPContextType {
  // Navigation State
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedClientId: string | null;
  setSelectedClientId: (id: string | null) => void;
  selectedPartyId: string | null;
  setSelectedPartyId: (id: string | null) => void;
  selectedCustomerSubTab: 'overview' | 'measure' | 'history' | 'photos' | 'orders' | 'activity';
  setSelectedCustomerSubTab: (tab: 'overview' | 'measure' | 'history' | 'photos' | 'orders' | 'activity') => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  selectedInvoiceId: string | null;
  setSelectedInvoiceId: (id: string | null) => void;

  // Global Modals
  isQuickCreateOpen: boolean;
  setIsQuickCreateOpen: (open: boolean) => void;
  quickCreateCategory: 'sale' | 'purchase' | 'customer' | 'item' | 'measure' | 'expense' | 'transaction';
  setQuickCreateCategory: (category: 'sale' | 'purchase' | 'customer' | 'item' | 'measure' | 'expense' | 'transaction') => void;
  openQuickCreate: (category?: 'sale' | 'purchase' | 'customer' | 'item' | 'measure' | 'expense' | 'transaction') => void;
  isBusinessEventModalOpen: boolean;
  setIsBusinessEventModalOpen: (open: boolean) => void;
  openBusinessEventModal: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Entities Data
  parties: Party[];
  clients: Client[];
  measurementSessions: MeasurementSession[];
  clientPhotos: ClientPhoto[];
  inventory: InventoryItem[];
  orders: SalesOrder[];
  invoices: Invoice[];
  suppliers: Supplier[];
  purchases: PurchaseOrder[];
  fixedAssets: FixedAsset[];
  loans: BusinessLoan[];
  equityRecords: OwnerEquityRecord[];
  ownerEquity: OwnerEquityRecord[];
  advances: AdvanceRecord[];
  employees: Employee[];
  expenseClaims: EmployeeExpenseClaim[];
  businessEvents: BusinessEventTrace[];
  boms: BillOfMaterials[];
  workOrders: WorkOrder[];
  tasks: ProjectTask[];
  timesheets: TimesheetEntry[];
  accounts: Account[];
  vouchers: AccountingVoucher[];
  activityLogs: ActivityLog[];
  workflows: WorkflowRule[];
  reminders: ReminderItem[];

  // Party Operations
  addParty: (party: Omit<Party, 'id' | 'createdAt' | 'timeline'>) => Party;
  updateParty: (id: string, updates: Partial<Party>) => void;
  deleteParty: (id: string) => void;
  addPartyTimelineItem: (partyId: string, item: Omit<PartyTimelineItem, 'id'>) => void;

  // Client Operations
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'totalSpend'>) => Client;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  updateClientStage: (id: string, stage: PipelineStage) => void;

  // Measurement Operations
  saveMeasurementSession: (clientId: string, measurements: Record<string, { cm: number; inches: number }>, unit: 'cm' | 'inches', notes?: string) => MeasurementSession;
  getClientLatestSession: (clientId: string) => MeasurementSession | undefined;

  // Photo Operations
  addClientPhoto: (clientId: string, url: string, title: string, tag: ClientPhoto['tag']) => void;
  deleteClientPhoto: (photoId: string) => void;

  // Sales & Invoice Operations
  addSalesOrder: (order: Omit<SalesOrder, 'id' | 'orderNumber'>) => SalesOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => Invoice;
  recordInvoicePayment: (invoiceId: string, amount: number, method: 'CASH' | 'BANK_TRANSFER' | 'UPI' | 'CARD' | 'CHEQUE', reference?: string) => void;

  // Purchase & Inventory Operations
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Supplier;
  addPurchaseOrder: (purchase: Omit<PurchaseOrder, 'id' | 'purchaseNumber'>) => PurchaseOrder;
  receivePurchaseOrder: (purchaseId: string) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => InventoryItem;
  adjustStock: (itemId: string, quantityDelta: number, reason: string) => void;

  // Fixed Assets Operations
  addFixedAsset: (asset: Omit<FixedAsset, 'id'>) => FixedAsset;
  recordAssetMaintenance: (assetId: string, cost: number, description: string, vendor: string) => void;
  calculateDepreciation: (assetId: string) => number;

  // Loans & Debt Operations
  addLoan: (loan: Omit<BusinessLoan, 'id' | 'emiHistory'>) => BusinessLoan;
  recordLoanEmiPayment: (loanId: string, principalPart: number, interestPart: number, bankAccountId?: string) => void;

  // Equity & Partner Operations
  recordEquityTransaction: (record: Omit<OwnerEquityRecord, 'id'>) => OwnerEquityRecord;

  // Advances Operations
  recordAdvance: (adv: Omit<AdvanceRecord, 'id' | 'advanceNumber' | 'unadjustedAmount' | 'status'>) => AdvanceRecord;
  adjustAdvance: (advanceId: string, amount: number, refDoc: string) => void;

  // Employees & Claims Operations
  addEmployee: (emp: Omit<Employee, 'id'>) => Employee;
  recordExpenseClaim: (claim: Omit<EmployeeExpenseClaim, 'id' | 'claimNumber' | 'status'>) => EmployeeExpenseClaim;
  reimburseExpenseClaim: (claimId: string, bankAccountId?: string) => void;

  // Manufacturing Operations
  addBOM: (bom: Omit<BillOfMaterials, 'id'>) => BillOfMaterials;
  addWorkOrder: (wo: Omit<WorkOrder, 'id' | 'workOrderNumber'>) => WorkOrder;
  updateWorkOrderStatus: (workOrderId: string, status: WorkOrderStatus, stageProgress?: number) => void;

  // Tasks & Timesheets
  addTask: (task: Omit<ProjectTask, 'id' | 'loggedHours'>) => ProjectTask;
  toggleTaskStatus: (taskId: string) => void;
  addTimesheet: (entry: Omit<TimesheetEntry, 'id'>) => TimesheetEntry;

  // Business Event Intelligence Engine
  logBusinessEvent: (event: Omit<BusinessEventTrace, 'id' | 'timestamp'>) => BusinessEventTrace;
  recordMoneyTransfer: (fromAccountId: string, toAccountId: string, amount: number, narration: string) => void;

  // Accounting Operations
  recordVoucher: (voucher: Omit<AccountingVoucher, 'id' | 'voucherNumber'>) => AccountingVoucher;
  addVoucher: (voucher: any) => any;
  recordExpense: (expense: { category: string; description: string; amount: number; paymentMethod: 'CASH' | 'BANK' | 'UPI' | 'CARD'; paidTo: string }) => void;

  // Reminders & Workflows
  addReminder: (reminder: Omit<ReminderItem, 'id' | 'isCompleted'>) => ReminderItem;
  toggleReminder: (id: string) => void;
  toggleWorkflow: (id: string) => void;

  // Stats & Business Brain
  stats: {
    totalRevenue: number;
    monthlySales: number;
    cashAndBankBalance: number;
    totalReceivables: number;
    totalPayables: number;
    activeOrdersCount: number;
    lowStockCount: number;
    inPipelineCount: number;
    totalFixedAssets: number;
    totalLoansOutstanding: number;
    totalCustomerAdvances: number;
    totalSupplierAdvances: number;
    netEquity: number;
  };

  financialUniverse: {
    income: number;
    cogs: number;
    grossProfit: number;
    operatingExpenses: number;
    operatingProfit: number;
    totalCashIn: number;
    totalCashOut: number;
    netCashFlow: number;
    cashOutBreakdown: {
      operating: number;
      inventoryPurchases: number;
      capexAssets: number;
      loanPrincipal: number;
      loanInterest: number;
      ownerDrawings: number;
      taxPaid: number;
    };
    assetsSummary: {
      cashBank: number;
      inventory: number;
      receivables: number;
      fixedAssets: number;
      advancesGiven: number;
      totalAssets: number;
    };
    liabilitiesSummary: {
      payables: number;
      loans: number;
      customerAdvances: number;
      taxesPayable: number;
      totalLiabilities: number;
    };
    equitySummary: {
      capitalInvested: number;
      drawings: number;
      retainedEarnings: number;
      totalEquity: number;
    };
  };

  exportDatabaseAsJSON: () => void;
  exportDatabaseAsSQL: () => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'kmstudio_business_os_state_v2';

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export const ERPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedClientId, setSelectedClientId] = useState<string | null>('cli-1');
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>('party-abc');
  const [selectedCustomerSubTab, setSelectedCustomerSubTab] = useState<'overview' | 'measure' | 'history' | 'photos' | 'orders' | 'activity'>('overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  // Global Modals
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [quickCreateCategory, setQuickCreateCategory] = useState<'sale' | 'purchase' | 'customer' | 'item' | 'measure' | 'expense' | 'transaction'>('sale');
  const [isBusinessEventModalOpen, setIsBusinessEventModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Entities State with LocalStorage
  const [parties, setParties] = useState<Party[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_parties`);
      return saved ? JSON.parse(saved) : INITIAL_PARTIES;
    } catch {
      return INITIAL_PARTIES;
    }
  });

  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_clients`);
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  const [measurementSessions, setMeasurementSessions] = useState<MeasurementSession[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sessions`);
      return saved ? JSON.parse(saved) : INITIAL_MEASUREMENT_SESSIONS;
    } catch {
      return INITIAL_MEASUREMENT_SESSIONS;
    }
  });

  const [clientPhotos, setClientPhotos] = useState<ClientPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_photos`);
      return saved ? JSON.parse(saved) : INITIAL_CLIENT_PHOTOS;
    } catch {
      return INITIAL_CLIENT_PHOTOS;
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_inventory`);
      return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
    } catch {
      return INITIAL_INVENTORY;
    }
  });

  const [orders, setOrders] = useState<SalesOrder[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_invoices`);
      return saved ? JSON.parse(saved) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_suppliers`);
      return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
    } catch {
      return INITIAL_SUPPLIERS;
    }
  });

  const [purchases, setPurchases] = useState<PurchaseOrder[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_purchases`);
      return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
    } catch {
      return INITIAL_PURCHASES;
    }
  });

  const [fixedAssets, setFixedAssets] = useState<FixedAsset[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_fixed_assets`);
      return saved ? JSON.parse(saved) : INITIAL_FIXED_ASSETS;
    } catch {
      return INITIAL_FIXED_ASSETS;
    }
  });

  const [loans, setLoans] = useState<BusinessLoan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_loans`);
      return saved ? JSON.parse(saved) : INITIAL_LOANS;
    } catch {
      return INITIAL_LOANS;
    }
  });

  const [equityRecords, setEquityRecords] = useState<OwnerEquityRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_equity`);
      return saved ? JSON.parse(saved) : INITIAL_EQUITY_RECORDS;
    } catch {
      return INITIAL_EQUITY_RECORDS;
    }
  });

  const [advances, setAdvances] = useState<AdvanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_advances`);
      return saved ? JSON.parse(saved) : INITIAL_ADVANCES;
    } catch {
      return INITIAL_ADVANCES;
    }
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_employees`);
      return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
    } catch {
      return INITIAL_EMPLOYEES;
    }
  });

  const [expenseClaims, setExpenseClaims] = useState<EmployeeExpenseClaim[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_claims`);
      return saved ? JSON.parse(saved) : INITIAL_EXPENSE_CLAIMS;
    } catch {
      return INITIAL_EXPENSE_CLAIMS;
    }
  });

  const [businessEvents, setBusinessEvents] = useState<BusinessEventTrace[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_EVENTS;
    } catch {
      return INITIAL_BUSINESS_EVENTS;
    }
  });

  const [boms, setBoms] = useState<BillOfMaterials[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_boms`);
      return saved ? JSON.parse(saved) : INITIAL_BOM;
    } catch {
      return INITIAL_BOM;
    }
  });

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_work_orders`);
      return saved ? JSON.parse(saved) : INITIAL_WORK_ORDERS;
    } catch {
      return INITIAL_WORK_ORDERS;
    }
  });

  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_timesheets`);
      return saved ? JSON.parse(saved) : INITIAL_TIMESHEETS;
    } catch {
      return INITIAL_TIMESHEETS;
    }
  });

  const [accounts, setAccounts] = useState<Account[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_accounts`);
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  const [vouchers, setVouchers] = useState<AccountingVoucher[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_vouchers`);
      return saved ? JSON.parse(saved) : INITIAL_VOUCHERS;
    } catch {
      return INITIAL_VOUCHERS;
    }
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_activities`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  const [workflows, setWorkflows] = useState<WorkflowRule[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_workflows`);
      return saved ? JSON.parse(saved) : INITIAL_WORKFLOWS;
    } catch {
      return INITIAL_WORKFLOWS;
    }
  });

  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reminders`);
      return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
    } catch {
      return INITIAL_REMINDERS;
    }
  });

  // LocalStorage sync
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_parties`, JSON.stringify(parties));
      localStorage.setItem(`${STORAGE_KEY}_clients`, JSON.stringify(clients));
      localStorage.setItem(`${STORAGE_KEY}_sessions`, JSON.stringify(measurementSessions));
      localStorage.setItem(`${STORAGE_KEY}_photos`, JSON.stringify(clientPhotos));
      localStorage.setItem(`${STORAGE_KEY}_inventory`, JSON.stringify(inventory));
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${STORAGE_KEY}_invoices`, JSON.stringify(invoices));
      localStorage.setItem(`${STORAGE_KEY}_suppliers`, JSON.stringify(suppliers));
      localStorage.setItem(`${STORAGE_KEY}_purchases`, JSON.stringify(purchases));
      localStorage.setItem(`${STORAGE_KEY}_fixed_assets`, JSON.stringify(fixedAssets));
      localStorage.setItem(`${STORAGE_KEY}_loans`, JSON.stringify(loans));
      localStorage.setItem(`${STORAGE_KEY}_equity`, JSON.stringify(equityRecords));
      localStorage.setItem(`${STORAGE_KEY}_advances`, JSON.stringify(advances));
      localStorage.setItem(`${STORAGE_KEY}_employees`, JSON.stringify(employees));
      localStorage.setItem(`${STORAGE_KEY}_claims`, JSON.stringify(expenseClaims));
      localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(businessEvents));
      localStorage.setItem(`${STORAGE_KEY}_boms`, JSON.stringify(boms));
      localStorage.setItem(`${STORAGE_KEY}_work_orders`, JSON.stringify(workOrders));
      localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
      localStorage.setItem(`${STORAGE_KEY}_timesheets`, JSON.stringify(timesheets));
      localStorage.setItem(`${STORAGE_KEY}_accounts`, JSON.stringify(accounts));
      localStorage.setItem(`${STORAGE_KEY}_vouchers`, JSON.stringify(vouchers));
      localStorage.setItem(`${STORAGE_KEY}_activities`, JSON.stringify(activityLogs));
      localStorage.setItem(`${STORAGE_KEY}_workflows`, JSON.stringify(workflows));
      localStorage.setItem(`${STORAGE_KEY}_reminders`, JSON.stringify(reminders));
    } catch {
      // Ignore quota errors
    }
  }, [
    parties,
    clients,
    measurementSessions,
    clientPhotos,
    inventory,
    orders,
    invoices,
    suppliers,
    purchases,
    fixedAssets,
    loans,
    equityRecords,
    advances,
    employees,
    expenseClaims,
    businessEvents,
    boms,
    workOrders,
    tasks,
    timesheets,
    accounts,
    vouchers,
    activityLogs,
    workflows,
    reminders
  ]);

  const openQuickCreate = (category: 'sale' | 'purchase' | 'customer' | 'item' | 'measure' | 'expense' | 'transaction' = 'sale') => {
    setQuickCreateCategory(category);
    setIsQuickCreateOpen(true);
  };

  const openBusinessEventModal = () => {
    setIsBusinessEventModalOpen(true);
  };

  // Party Operations
  const addParty = (newPartyData: Omit<Party, 'id' | 'createdAt' | 'timeline'>): Party => {
    const id = `party-${Date.now().toString(36)}`;
    const party: Party = {
      ...newPartyData,
      id,
      timeline: [],
      createdAt: new Date().toISOString()
    };
    setParties(prev => [party, ...prev]);

    // Also sync to clients or suppliers if role is present
    if (party.roles.includes('CUSTOMER')) {
      const clientObj: Client = {
        id: `cli-${id}`,
        name: party.name,
        phone: party.phone,
        email: party.email,
        bodyType: 'female',
        pipelineStage: 'INQUIRY',
        address: party.address,
        gstin: party.gstin,
        notes: party.notes,
        tags: party.tags,
        totalSpend: party.totalSales,
        createdAt: party.createdAt,
        updatedAt: party.createdAt
      };
      setClients(prev => [clientObj, ...prev]);
    }
    if (party.roles.includes('SUPPLIER')) {
      const suppObj: Supplier = {
        id: `sup-${id}`,
        name: party.name,
        contactPerson: party.name,
        phone: party.phone,
        email: party.email,
        gstin: party.gstin || '',
        address: party.address,
        category: 'FABRIC',
        balanceDue: party.outstandingPayable,
        rating: 5
      };
      setSuppliers(prev => [suppObj, ...prev]);
    }

    return party;
  };

  const updateParty = (id: string, updates: Partial<Party>) => {
    setParties(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteParty = (id: string) => {
    setParties(prev => prev.filter(p => p.id !== id));
  };

  const addPartyTimelineItem = (partyId: string, item: Omit<PartyTimelineItem, 'id'>) => {
    const timelineItem: PartyTimelineItem = {
      ...item,
      id: `pt-${Date.now().toString(36)}`
    };
    setParties(prev =>
      prev.map(p => (p.id === partyId ? { ...p, timeline: [timelineItem, ...(p.timeline || [])] } : p))
    );
  };

  // Client Operations
  const addClient = (newClientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'totalSpend'>): Client => {
    const now = new Date().toISOString();
    const client: Client = {
      ...newClientData,
      id: `cli-${Date.now().toString(36)}`,
      totalSpend: 0,
      createdAt: now,
      updatedAt: now
    };
    setClients(prev => [client, ...prev]);

    // Also mirror to Party
    const newParty: Party = {
      id: `party-${client.id}`,
      name: client.name,
      roles: ['CUSTOMER'],
      phone: client.phone,
      email: client.email,
      gstin: client.gstin,
      address: client.address || '',
      city: 'Mumbai',
      creditLimit: 100000,
      creditDays: 15,
      paymentTerms: '50% Advance',
      totalSales: 0,
      totalPurchases: 0,
      totalReceived: 0,
      totalPaid: 0,
      outstandingReceivable: 0,
      outstandingPayable: 0,
      overdueAmount: 0,
      tags: client.tags,
      notes: client.notes,
      timeline: [],
      createdAt: now
    };
    setParties(prev => [newParty, ...prev]);

    return client;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(c => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c)));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const updateClientStage = (id: string, stage: PipelineStage) => {
    setClients(prev =>
      prev.map(c => {
        if (c.id === id) {
          return { ...c, pipelineStage: stage, updatedAt: new Date().toISOString() };
        }
        return c;
      })
    );
  };

  // Measurement Operations
  const saveMeasurementSession = (
    clientId: string,
    measurements: Record<string, { cm: number; inches: number }>,
    unit: 'cm' | 'inches',
    notes?: string
  ): MeasurementSession => {
    const existingForClient = measurementSessions.filter(s => s.clientId === clientId);
    const version = existingForClient.length + 1;
    const now = new Date().toISOString();
    const session: MeasurementSession = {
      id: `sess-${Date.now().toString(36)}`,
      clientId,
      version,
      bodyType: clients.find(c => c.id === clientId)?.bodyType || 'female',
      unit,
      measurements,
      notes,
      createdAt: now,
      updatedAt: now
    };
    setMeasurementSessions(prev => [session, ...prev]);
    return session;
  };

  const getClientLatestSession = (clientId: string): MeasurementSession | undefined => {
    return measurementSessions.filter(s => s.clientId === clientId).sort((a, b) => b.version - a.version)[0];
  };

  // Photos
  const addClientPhoto = (clientId: string, url: string, title: string, tag: ClientPhoto['tag']) => {
    const photo: ClientPhoto = {
      id: `photo-${Date.now().toString(36)}`,
      clientId,
      url,
      title,
      tag,
      createdAt: new Date().toISOString()
    };
    setClientPhotos(prev => [photo, ...prev]);
  };

  const deleteClientPhoto = (photoId: string) => {
    setClientPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  // Sales & Invoice Operations
  const addSalesOrder = (orderData: Omit<SalesOrder, 'id' | 'orderNumber'>): SalesOrder => {
    const orderNumber = `SO-${new Date().getFullYear()}-${String(orders.length + 1).padStart(4, '0')}`;
    const order: SalesOrder = {
      ...orderData,
      id: `ord-${Date.now().toString(36)}`,
      orderNumber
    };
    setOrders(prev => [order, ...prev]);

    // Auto-create invoice
    const invNumber = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(4, '0')}`;
    const newInvoice: Invoice = {
      id: `inv-${Date.now().toString(36)}`,
      invoiceNumber: invNumber,
      orderId: order.id,
      clientId: order.clientId,
      clientName: order.clientName,
      items: order.items,
      subtotal: order.subtotal,
      taxTotal: order.taxTotal,
      grandTotal: order.grandTotal,
      paidAmount: 0,
      status: 'UNPAID',
      issueDate: order.orderDate,
      dueDate: order.dueDate,
      payments: []
    };
    setInvoices(prev => [newInvoice, ...prev]);

    // Sync to Party timeline
    const matchedParty = parties.find(p => p.name.toLowerCase() === order.clientName.toLowerCase() || p.id === `party-${order.clientId}`);
    if (matchedParty) {
      addPartyTimelineItem(matchedParty.id, {
        date: order.orderDate,
        type: 'SALE',
        title: `Sales Order Confirmed #${orderNumber}`,
        amount: order.grandTotal,
        referenceNo: orderNumber
      });
      updateParty(matchedParty.id, {
        totalSales: matchedParty.totalSales + order.grandTotal,
        outstandingReceivable: matchedParty.outstandingReceivable + order.grandTotal
      });
    }

    return order;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber'>): Invoice => {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(4, '0')}`;
    const invoice: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now().toString(36)}`,
      invoiceNumber
    };
    setInvoices(prev => [invoice, ...prev]);
    return invoice;
  };

  const recordInvoicePayment = (
    invoiceId: string,
    amount: number,
    method: 'CASH' | 'BANK_TRANSFER' | 'UPI' | 'CARD' | 'CHEQUE',
    reference?: string
  ) => {
    setInvoices(prev =>
      prev.map(inv => {
        if (inv.id === invoiceId) {
          const newPaid = inv.paidAmount + amount;
          const newStatus: InvoiceStatus = newPaid >= inv.grandTotal ? 'PAID' : 'PARTIALLY_PAID';
          const newPayment = {
            id: `pay-${Date.now().toString(36)}`,
            amount,
            paymentMethod: method,
            referenceNumber: reference,
            paidAt: new Date().toISOString()
          };
          return {
            ...inv,
            paidAmount: newPaid,
            status: newStatus,
            payments: [...inv.payments, newPayment]
          };
        }
        return inv;
      })
    );

    // Update account balances
    const targetAccId = method === 'CASH' ? 'acc-cash' : 'acc-hdfc';
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === targetAccId) return { ...acc, balance: acc.balance + amount };
        if (acc.id === 'acc-ar') return { ...acc, balance: Math.max(0, acc.balance - amount) };
        return acc;
      })
    );
  };

  // Purchase & Inventory Operations
  const addSupplier = (supplierData: Omit<Supplier, 'id'>): Supplier => {
    const supplier: Supplier = {
      ...supplierData,
      id: `sup-${Date.now().toString(36)}`
    };
    setSuppliers(prev => [supplier, ...prev]);

    // Mirror to Party
    const newParty: Party = {
      id: `party-${supplier.id}`,
      name: supplier.name,
      roles: ['SUPPLIER'],
      phone: supplier.phone,
      email: supplier.email,
      gstin: supplier.gstin,
      address: supplier.address,
      city: 'Mumbai',
      creditLimit: 300000,
      creditDays: 30,
      paymentTerms: 'Credit 30 Days',
      totalSales: 0,
      totalPurchases: 0,
      totalReceived: 0,
      totalPaid: 0,
      outstandingReceivable: 0,
      outstandingPayable: supplier.balanceDue,
      overdueAmount: 0,
      tags: [supplier.category],
      notes: `Supplier category: ${supplier.category}`,
      timeline: [],
      createdAt: new Date().toISOString()
    };
    setParties(prev => [newParty, ...prev]);

    return supplier;
  };

  const addPurchaseOrder = (purchaseData: Omit<PurchaseOrder, 'id' | 'purchaseNumber'>): PurchaseOrder => {
    const purchaseNumber = `PO-${new Date().getFullYear()}-${String(purchases.length + 1).padStart(4, '0')}`;
    const purchase: PurchaseOrder = {
      ...purchaseData,
      id: `po-${Date.now().toString(36)}`,
      purchaseNumber
    };
    setPurchases(prev => [purchase, ...prev]);

    // Match Party
    const matchedParty = parties.find(p => p.name.toLowerCase() === purchase.supplierName.toLowerCase() || p.id === `party-${purchase.supplierId}`);
    if (matchedParty) {
      addPartyTimelineItem(matchedParty.id, {
        date: purchase.orderDate,
        type: 'PURCHASE',
        title: `Purchase Order Placed #${purchaseNumber}`,
        amount: purchase.grandTotal,
        referenceNo: purchaseNumber
      });
      updateParty(matchedParty.id, {
        totalPurchases: matchedParty.totalPurchases + purchase.grandTotal,
        outstandingPayable: matchedParty.outstandingPayable + (purchase.grandTotal - purchase.paidAmount)
      });
    }

    return purchase;
  };

  const receivePurchaseOrder = (purchaseId: string) => {
    const po = purchases.find(p => p.id === purchaseId);
    if (!po) return;

    setPurchases(prev =>
      prev.map(p => (p.id === purchaseId ? { ...p, status: 'RECEIVED', receivedDate: new Date().toISOString() } : p))
    );

    // Increment inventory stock
    po.items.forEach(item => {
      setInventory(prev =>
        prev.map(inv => {
          if (inv.id === item.itemId || inv.name.toLowerCase() === item.itemName.toLowerCase()) {
            return { ...inv, currentStock: inv.currentStock + item.quantity };
          }
          return inv;
        })
      );
    });
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>): InventoryItem => {
    const item: InventoryItem = {
      ...itemData,
      id: `item-${Date.now().toString(36)}`
    };
    setInventory(prev => [item, ...prev]);
    return item;
  };

  const adjustStock = (itemId: string, quantityDelta: number, reason: string) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const newStock = Math.max(0, item.currentStock + quantityDelta);
          return { ...item, currentStock: newStock };
        }
        return item;
      })
    );
  };

  // Fixed Assets Operations
  const addFixedAsset = (assetData: Omit<FixedAsset, 'id'>): FixedAsset => {
    const asset: FixedAsset = {
      ...assetData,
      id: `asset-${Date.now().toString(36)}`
    };
    setFixedAssets(prev => [asset, ...prev]);
    return asset;
  };

  const recordAssetMaintenance = (assetId: string, cost: number, description: string, vendor: string) => {
    const logId = `ml-${Date.now().toString(36)}`;
    const now = new Date().toISOString().split('T')[0];
    setFixedAssets(prev =>
      prev.map(a => {
        if (a.id === assetId) {
          const existingLogs = a.maintenanceLogs || [];
          return {
            ...a,
            maintenanceLogs: [{ id: logId, date: now, description, cost, vendor }, ...existingLogs]
          };
        }
        return a;
      })
    );

    // Also log as expense
    recordExpense({
      category: 'Repairs & Maintenance',
      description: `Asset Maintenance: ${description}`,
      amount: cost,
      paymentMethod: 'BANK',
      paidTo: vendor
    });
  };

  const calculateDepreciation = (assetId: string): number => {
    const asset = fixedAssets.find(a => a.id === assetId);
    if (!asset || asset.usefulLifeYears <= 0) return 0;
    const depreciable = Math.max(0, asset.purchaseCost - asset.salvageValue);
    return Math.round(depreciable / asset.usefulLifeYears);
  };

  // Loans Operations
  const addLoan = (loanData: Omit<BusinessLoan, 'id' | 'emiHistory'>): BusinessLoan => {
    const loan: BusinessLoan = {
      ...loanData,
      id: `loan-${Date.now().toString(36)}`,
      emiHistory: []
    };
    setLoans(prev => [loan, ...prev]);
    return loan;
  };

  const recordLoanEmiPayment = (
    loanId: string,
    principalPart: number,
    interestPart: number,
    bankAccountId: string = 'acc-hdfc'
  ) => {
    const totalEmi = principalPart + interestPart;
    const today = new Date().toISOString().split('T')[0];

    setLoans(prev =>
      prev.map(l => {
        if (l.id === loanId) {
          const newOutstanding = Math.max(0, l.outstandingPrincipal - principalPart);
          const historyEntry = {
            id: `em-${Date.now().toString(36)}`,
            date: today,
            emiPaid: totalEmi,
            principalComponent: principalPart,
            interestComponent: interestPart,
            balanceRemaining: newOutstanding
          };
          return {
            ...l,
            outstandingPrincipal: newOutstanding,
            emiHistory: [historyEntry, ...l.emiHistory]
          };
        }
        return l;
      })
    );

    // Update bank balance & accounting
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === bankAccountId) return { ...acc, balance: acc.balance - totalEmi };
        if (acc.id === 'acc-loans') return { ...acc, balance: Math.max(0, acc.balance - principalPart) };
        return acc;
      })
    );

    // Log Business Event
    logBusinessEvent({
      eventType: 'LOAN_EMI_PAID',
      summary: `Paid Loan EMI: Principal ₹${principalPart.toLocaleString('en-IN')}, Interest ₹${interestPart.toLocaleString('en-IN')}`,
      amount: totalEmi,
      moneyDirection: 'OUT',
      category: 'LOAN',
      affectedWorlds: {
        cashBank: `Bank Account debited ₹${totalEmi.toLocaleString('en-IN')}`,
        accounting: `Debit Loan Liability ₹${principalPart} / Debit Interest Expense ₹${interestPart} / Credit Bank ₹${totalEmi}`,
        partyLedger: 'Lender loan ledger updated'
      }
    });
  };

  // Equity Operations
  const recordEquityTransaction = (recordData: Omit<OwnerEquityRecord, 'id'>): OwnerEquityRecord => {
    const record: OwnerEquityRecord = {
      ...recordData,
      id: `eq-${Date.now().toString(36)}`
    };
    setEquityRecords(prev => [record, ...prev]);

    // Update bank balance
    const isCapitalIn = record.type === 'CAPITAL_IN';
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === record.bankAccountId || acc.id === 'acc-hdfc') {
          return { ...acc, balance: isCapitalIn ? acc.balance + record.amount : acc.balance - record.amount };
        }
        if (acc.id === 'acc-equity') {
          return { ...acc, balance: isCapitalIn ? acc.balance + record.amount : acc.balance - record.amount };
        }
        return acc;
      })
    );

    logBusinessEvent({
      eventType: isCapitalIn ? 'OWNER_CAPITAL_INVESTED' : 'OWNER_DRAWING_WITHDRAWAL',
      summary: `${record.partnerName}: ${isCapitalIn ? 'Invested Capital' : 'Withdrew Drawings'} of ₹${record.amount.toLocaleString('en-IN')}`,
      partyName: record.partnerName,
      amount: record.amount,
      moneyDirection: isCapitalIn ? 'IN' : 'OUT',
      category: 'EQUITY',
      affectedWorlds: {
        cashBank: `${isCapitalIn ? 'Credited' : 'Debited'} Bank A/c ₹${record.amount.toLocaleString('en-IN')}`,
        accounting: isCapitalIn ? 'Debit Bank / Credit Owner Capital (Equity)' : 'Debit Partner Drawings (Equity) / Credit Bank (P&L unaffected)'
      }
    });

    return record;
  };

  // Advances Operations
  const recordAdvance = (advData: Omit<AdvanceRecord, 'id' | 'advanceNumber' | 'unadjustedAmount' | 'status'>): AdvanceRecord => {
    const prefix = advData.type === 'CUSTOMER_ADVANCE' ? 'CADV' : advData.type === 'SUPPLIER_ADVANCE' ? 'SADV' : 'EADV';
    const advanceNumber = `${prefix}-${new Date().getFullYear()}-${String(advances.length + 1).padStart(3, '0')}`;
    const advance: AdvanceRecord = {
      ...advData,
      id: `adv-${Date.now().toString(36)}`,
      advanceNumber,
      unadjustedAmount: advData.amount,
      status: 'OPEN'
    };
    setAdvances(prev => [advance, ...prev]);

    const isMoneyIn = advData.type === 'CUSTOMER_ADVANCE';
    // Update Bank
    const bankAcc = advData.paymentMethod === 'CASH' ? 'acc-cash' : 'acc-hdfc';
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === bankAcc) {
          return { ...acc, balance: isMoneyIn ? acc.balance + advData.amount : acc.balance - advData.amount };
        }
        return acc;
      })
    );

    // Sync Party
    const matchedParty = parties.find(p => p.id === advData.partyId || p.name.toLowerCase() === advData.partyName.toLowerCase());
    if (matchedParty) {
      addPartyTimelineItem(matchedParty.id, {
        date: advData.date,
        type: 'ADVANCE',
        title: `${advData.type.replace('_', ' ')} #${advanceNumber}`,
        amount: advData.amount,
        referenceNo: advanceNumber
      });
    }

    logBusinessEvent({
      eventType: advData.type,
      summary: `${advData.type.replace('_', ' ')} of ₹${advData.amount.toLocaleString('en-IN')} with ${advData.partyName}`,
      partyName: advData.partyName,
      amount: advData.amount,
      moneyDirection: isMoneyIn ? 'IN' : 'OUT',
      category: 'ADVANCE',
      affectedWorlds: {
        crm: `${advData.partyName} timeline updated`,
        cashBank: `${isMoneyIn ? 'Bank received' : 'Bank paid'} ₹${advData.amount.toLocaleString('en-IN')}`,
        accounting: isMoneyIn ? 'Debit Bank / Credit Customer Advance (Liability)' : 'Debit Supplier Advance (Asset) / Credit Bank'
      }
    });

    return advance;
  };

  const adjustAdvance = (advanceId: string, amount: number, refDoc: string) => {
    setAdvances(prev =>
      prev.map(a => {
        if (a.id === advanceId) {
          const newUnadjusted = Math.max(0, a.unadjustedAmount - amount);
          const newStatus = newUnadjusted === 0 ? 'FULLY_ADJUSTED' : 'PARTIALLY_ADJUSTED';
          return { ...a, unadjustedAmount: newUnadjusted, status: newStatus };
        }
        return a;
      })
    );
  };

  // Employees & Claims
  const addEmployee = (empData: Omit<Employee, 'id'>): Employee => {
    const emp: Employee = {
      ...empData,
      id: `emp-${Date.now().toString(36)}`
    };
    setEmployees(prev => [emp, ...prev]);

    // Mirror to Party
    const newParty: Party = {
      id: `party-${emp.id}`,
      name: emp.name,
      roles: ['EMPLOYEE'],
      phone: emp.phone,
      email: emp.email,
      address: '',
      city: 'Mumbai',
      creditLimit: 50000,
      creditDays: 0,
      paymentTerms: 'Monthly Salary',
      totalSales: 0,
      totalPurchases: 0,
      totalReceived: 0,
      totalPaid: emp.netSalary,
      outstandingReceivable: 0,
      outstandingPayable: emp.netSalary,
      overdueAmount: 0,
      tags: [emp.department, emp.designation],
      notes: `Department: ${emp.department}, Designation: ${emp.designation}`,
      timeline: [],
      createdAt: new Date().toISOString()
    };
    setParties(prev => [newParty, ...prev]);

    return emp;
  };

  const recordExpenseClaim = (claimData: Omit<EmployeeExpenseClaim, 'id' | 'claimNumber' | 'status'>): EmployeeExpenseClaim => {
    const claimNumber = `CLM-${new Date().getFullYear()}-${String(expenseClaims.length + 1).padStart(3, '0')}`;
    const claim: EmployeeExpenseClaim = {
      ...claimData,
      id: `clm-${Date.now().toString(36)}`,
      claimNumber,
      status: 'SUBMITTED'
    };
    setExpenseClaims(prev => [claim, ...prev]);
    return claim;
  };

  const reimburseExpenseClaim = (claimId: string, bankAccountId: string = 'acc-hdfc') => {
    const claim = expenseClaims.find(c => c.id === claimId);
    if (!claim) return;

    setExpenseClaims(prev =>
      prev.map(c =>
        c.id === claimId
          ? {
              ...c,
              status: 'REIMBURSED',
              reimbursedDate: new Date().toISOString().split('T')[0]
            }
          : c
      )
    );

    // Deduct bank
    setAccounts(prev =>
      prev.map(acc => (acc.id === bankAccountId ? { ...acc, balance: acc.balance - claim.amount } : acc))
    );

    // Record expense
    recordExpense({
      category: `Employee Claim: ${claim.category}`,
      description: `Reimbursement for ${claim.employeeName} (${claim.claimNumber}): ${claim.description}`,
      amount: claim.amount,
      paymentMethod: 'BANK',
      paidTo: claim.employeeName
    });
  };

  // Manufacturing Operations
  const addBOM = (bomData: Omit<BillOfMaterials, 'id'>): BillOfMaterials => {
    const bom: BillOfMaterials = {
      ...bomData,
      id: `bom-${Date.now().toString(36)}`
    };
    setBoms(prev => [bom, ...prev]);
    return bom;
  };

  const addWorkOrder = (woData: Omit<WorkOrder, 'id' | 'workOrderNumber'>): WorkOrder => {
    const workOrderNumber = `WO-${new Date().getFullYear()}-${String(workOrders.length + 1).padStart(4, '0')}`;
    const wo: WorkOrder = {
      ...woData,
      id: `wo-${Date.now().toString(36)}`,
      workOrderNumber
    };
    setWorkOrders(prev => [wo, ...prev]);
    return wo;
  };

  const updateWorkOrderStatus = (workOrderId: string, status: WorkOrderStatus, stageProgress?: number) => {
    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id === workOrderId) {
          return {
            ...wo,
            status,
            stageProgress: stageProgress !== undefined ? stageProgress : wo.stageProgress,
            completedDate: status === 'COMPLETED' ? new Date().toISOString() : wo.completedDate
          };
        }
        return wo;
      })
    );
  };

  // Tasks & Timesheets
  const addTask = (taskData: Omit<ProjectTask, 'id' | 'loggedHours'>): ProjectTask => {
    const task: ProjectTask = {
      ...taskData,
      id: `task-${Date.now().toString(36)}`,
      loggedHours: 0
    };
    setTasks(prev => [task, ...prev]);
    return task;
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const nextStatus: ProjectTask['status'] =
            t.status === 'TODO' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'REVIEW' : t.status === 'REVIEW' ? 'DONE' : 'TODO';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const addTimesheet = (entryData: Omit<TimesheetEntry, 'id'>): TimesheetEntry => {
    const entry: TimesheetEntry = {
      ...entryData,
      id: `ts-${Date.now().toString(36)}`
    };
    setTimesheets(prev => [entry, ...prev]);

    // Update logged hours on task if linked
    if (entry.taskId) {
      setTasks(prev =>
        prev.map(t => (t.id === entry.taskId ? { ...t, loggedHours: t.loggedHours + entry.hours } : t))
      );
    }

    return entry;
  };

  // Business Event Intelligence Engine
  const logBusinessEvent = (eventData: Omit<BusinessEventTrace, 'id' | 'timestamp'>): BusinessEventTrace => {
    const event: BusinessEventTrace = {
      ...eventData,
      id: `bev-${Date.now().toString(36)}`,
      timestamp: new Date().toISOString()
    };
    setBusinessEvents(prev => [event, ...prev]);
    return event;
  };

  const recordMoneyTransfer = (fromAccountId: string, toAccountId: string, amount: number, narration: string) => {
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === fromAccountId) return { ...acc, balance: acc.balance - amount };
        if (acc.id === toAccountId) return { ...acc, balance: acc.balance + amount };
        return acc;
      })
    );

    const fromAcc = accounts.find(a => a.id === fromAccountId);
    const toAcc = accounts.find(a => a.id === toAccountId);

    logBusinessEvent({
      eventType: 'CONTRA_TRANSFER',
      summary: `Transferred ₹${amount.toLocaleString('en-IN')} from ${fromAcc?.name || fromAccountId} to ${toAcc?.name || toAccountId}`,
      amount,
      moneyDirection: 'MOVE',
      category: 'TRANSFER',
      affectedWorlds: {
        cashBank: `Transfer: ${fromAcc?.name} -> ${toAcc?.name}`,
        accounting: `Debit ${toAcc?.name} / Credit ${fromAcc?.name} (Balance sheet move only)`
      }
    });
  };

  // Accounting Operations
  const recordVoucher = (voucherData: Omit<AccountingVoucher, 'id' | 'voucherNumber'>): AccountingVoucher => {
    const prefix = voucherData.type.slice(0, 3);
    const voucherNumber = `${prefix}-${new Date().getFullYear()}-${String(vouchers.length + 1).padStart(4, '0')}`;
    const voucher: AccountingVoucher = {
      ...voucherData,
      id: `vouch-${Date.now().toString(36)}`,
      voucherNumber
    };
    setVouchers(prev => [voucher, ...prev]);

    // Apply rows to account balances
    voucher.rows.forEach(row => {
      setAccounts(prev =>
        prev.map(acc => {
          if (acc.id === row.accountId) {
            const netChange = row.debit - row.credit;
            return { ...acc, balance: acc.balance + netChange };
          }
          return acc;
        })
      );
    });

    return voucher;
  };

  const recordExpense = (expense: {
    category: string;
    description: string;
    amount: number;
    paymentMethod: 'CASH' | 'BANK' | 'UPI' | 'CARD';
    paidTo: string;
  }) => {
    const targetAccId = expense.paymentMethod === 'CASH' ? 'acc-cash' : 'acc-hdfc';

    // Deduct cash/bank
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === targetAccId) return { ...acc, balance: acc.balance - expense.amount };
        if (acc.id === 'acc-exp-mfg' || acc.id === 'acc-exp-rent') {
          return { ...acc, balance: acc.balance + expense.amount };
        }
        return acc;
      })
    );

    // Create journal voucher
    recordVoucher({
      type: 'PAYMENT',
      date: new Date().toISOString().split('T')[0],
      narration: `Expense: ${expense.category} - ${expense.description} paid to ${expense.paidTo}`,
      rows: [
        {
          accountId: 'acc-exp-mfg',
          accountName: expense.category,
          debit: expense.amount,
          credit: 0,
          narration: expense.description
        },
        {
          accountId: targetAccId,
          accountName: expense.paymentMethod === 'CASH' ? 'Cash in Hand' : 'HDFC Current A/c',
          debit: 0,
          credit: expense.amount,
          narration: `Paid to ${expense.paidTo}`
        }
      ],
      totalAmount: expense.amount,
      user: 'Studio Admin'
    });
  };

  // Reminders & Workflows
  const addReminder = (remData: Omit<ReminderItem, 'id' | 'isCompleted'>): ReminderItem => {
    const rem: ReminderItem = {
      ...remData,
      id: `rem-${Date.now().toString(36)}`,
      isCompleted: false
    };
    setReminders(prev => [rem, ...prev]);
    return rem;
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r)));
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(w => (w.id === id ? { ...w, isActive: !w.isActive } : w)));
  };

  // Aggregated Stats
  const stats = useMemo(() => {
    const totalRevenue = invoices.filter(i => i.status === 'PAID' || i.status === 'PARTIALLY_PAID').reduce((sum, i) => sum + i.paidAmount, 0);
    const monthlySales = orders.reduce((sum, o) => sum + o.grandTotal, 0);

    const cashAcc = accounts.find(a => a.id === 'acc-cash')?.balance || 0;
    const hdfcAcc = accounts.find(a => a.id === 'acc-hdfc')?.balance || 0;
    const iciciAcc = accounts.find(a => a.id === 'acc-icici')?.balance || 0;
    const cashAndBankBalance = cashAcc + hdfcAcc + iciciAcc;

    const totalReceivables = invoices.filter(i => i.status !== 'PAID' && i.status !== 'CANCELLED').reduce((sum, i) => sum + (i.grandTotal - i.paidAmount), 0);
    const totalPayables = suppliers.reduce((sum, s) => sum + (s.balanceDue || 0), 0);

    const activeOrdersCount = orders.filter(o => o.status === 'CONFIRMED' || o.status === 'IN_PROGRESS').length;
    const lowStockCount = inventory.filter(i => i.currentStock <= i.minStockLevel).length;
    const inPipelineCount = clients.filter(c => c.pipelineStage !== 'DELIVERED').length;

    const totalFixedAssets = fixedAssets.reduce((sum, a) => sum + a.currentBookValue, 0);
    const totalLoansOutstanding = loans.reduce((sum, l) => sum + l.outstandingPrincipal, 0);

    const totalCustomerAdvances = advances.filter(a => a.type === 'CUSTOMER_ADVANCE' && a.status !== 'FULLY_ADJUSTED').reduce((sum, a) => sum + a.unadjustedAmount, 0);
    const totalSupplierAdvances = advances.filter(a => a.type === 'SUPPLIER_ADVANCE' && a.status !== 'FULLY_ADJUSTED').reduce((sum, a) => sum + a.unadjustedAmount, 0);

    const capitalInvested = equityRecords.filter(e => e.type === 'CAPITAL_IN').reduce((sum, e) => sum + e.amount, 0);
    const drawings = equityRecords.filter(e => e.type === 'DRAWING_OUT').reduce((sum, e) => sum + e.amount, 0);
    const netEquity = capitalInvested - drawings;

    return {
      totalRevenue,
      monthlySales,
      cashAndBankBalance,
      totalReceivables,
      totalPayables,
      activeOrdersCount,
      lowStockCount,
      inPipelineCount,
      totalFixedAssets,
      totalLoansOutstanding,
      totalCustomerAdvances,
      totalSupplierAdvances,
      netEquity
    };
  }, [invoices, orders, accounts, suppliers, inventory, clients, fixedAssets, loans, advances, equityRecords]);

  // Financial Universe & Monthly Business Brain (Cash Flow ≠ P&L)
  const financialUniverse = useMemo(() => {
    // 1. P&L Engine (Accrual / Operational)
    const income = invoices.reduce((sum, i) => sum + (i.subtotal || i.grandTotal), 0);
    const cogs = purchases.reduce((sum, p) => sum + p.subtotal, 0);
    const grossProfit = income - cogs;

    const operatingExpenses = vouchers
      .filter(v => v.type === 'PAYMENT')
      .reduce((sum, v) => sum + v.totalAmount, 0);

    const operatingProfit = grossProfit - operatingExpenses;

    // 2. Cash Flow Engine (Actual Cash Inflows vs Outflows)
    const cashInSales = invoices.reduce((sum, i) => sum + i.paidAmount, 0);
    const cashInAdvances = advances.filter(a => a.type === 'CUSTOMER_ADVANCE').reduce((sum, a) => sum + a.amount, 0);
    const cashInCapital = equityRecords.filter(e => e.type === 'CAPITAL_IN').reduce((sum, e) => sum + e.amount, 0);
    const cashInLoans = loans.reduce((sum, l) => sum + l.principalAmount, 0);
    const totalCashIn = cashInSales + cashInAdvances + cashInCapital;

    const cashOutOperating = operatingExpenses;
    const cashOutPurchases = purchases.reduce((sum, p) => sum + p.paidAmount, 0);
    const cashOutCapEx = fixedAssets.reduce((sum, a) => sum + a.purchaseCost, 0);
    const cashOutLoanPrincipal = loans.reduce((sum, l) => sum + (l.principalAmount - l.outstandingPrincipal), 0);
    const cashOutLoanInterest = 20450;
    const cashOutDrawings = equityRecords.filter(e => e.type === 'DRAWING_OUT').reduce((sum, e) => sum + e.amount, 0);
    const cashOutTax = 14460;

    const totalCashOut = cashOutOperating + cashOutPurchases + cashOutCapEx + cashOutLoanPrincipal + cashOutLoanInterest + cashOutDrawings + cashOutTax;
    const netCashFlow = totalCashIn - totalCashOut;

    // 3. Balance Sheet Buckets
    const cashBank = stats.cashAndBankBalance;
    const inventoryVal = inventory.reduce((sum, i) => sum + i.currentStock * i.purchasePrice, 0);
    const receivables = stats.totalReceivables;
    const fixedAssetsVal = stats.totalFixedAssets;
    const advancesGiven = stats.totalSupplierAdvances;
    const totalAssets = cashBank + inventoryVal + receivables + fixedAssetsVal + advancesGiven;

    const payables = stats.totalPayables;
    const loansVal = stats.totalLoansOutstanding;
    const customerAdvances = stats.totalCustomerAdvances;
    const taxesPayable = 9630;
    const totalLiabilities = payables + loansVal + customerAdvances + taxesPayable;

    const capitalInvested = equityRecords.filter(e => e.type === 'CAPITAL_IN').reduce((sum, e) => sum + e.amount, 0);
    const drawings = equityRecords.filter(e => e.type === 'DRAWING_OUT').reduce((sum, e) => sum + e.amount, 0);
    const retainedEarnings = totalAssets - totalLiabilities - (capitalInvested - drawings);
    const totalEquity = capitalInvested - drawings + retainedEarnings;

    return {
      income,
      cogs,
      grossProfit,
      operatingExpenses,
      operatingProfit,
      totalCashIn,
      totalCashOut,
      netCashFlow,
      cashOutBreakdown: {
        operating: cashOutOperating,
        inventoryPurchases: cashOutPurchases,
        capexAssets: cashOutCapEx,
        loanPrincipal: cashOutLoanPrincipal,
        loanInterest: cashOutLoanInterest,
        ownerDrawings: cashOutDrawings,
        taxPaid: cashOutTax
      },
      assetsSummary: {
        cashBank,
        inventory: inventoryVal,
        receivables,
        fixedAssets: fixedAssetsVal,
        advancesGiven,
        totalAssets
      },
      liabilitiesSummary: {
        payables,
        loans: loansVal,
        customerAdvances,
        taxesPayable,
        totalLiabilities
      },
      equitySummary: {
        capitalInvested,
        drawings,
        retainedEarnings,
        totalEquity
      }
    };
  }, [invoices, purchases, vouchers, advances, equityRecords, loans, fixedAssets, inventory, stats]);

  // Export DB as JSON
  const exportDatabaseAsJSON = () => {
    const data = {
      meta: {
        app: 'KM Studio - Business OS ERP',
        exportedAt: new Date().toISOString(),
        version: '2.0.0'
      },
      parties,
      clients,
      measurementSessions,
      clientPhotos,
      inventory,
      orders,
      invoices,
      suppliers,
      purchases,
      fixedAssets,
      loans,
      equityRecords,
      advances,
      employees,
      expenseClaims,
      businessEvents,
      boms,
      workOrders,
      tasks,
      timesheets,
      accounts,
      vouchers,
      activityLogs,
      workflows,
      reminders
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kmstudio-business-os-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export DB as PostgreSQL / MySQL compatible SQL script
  const exportDatabaseAsSQL = () => {
    const sqlStatements: string[] = [];
    sqlStatements.push('-- KM Studio Business OS ERP - Enterprise SQL Dump');
    sqlStatements.push(`-- Generated: ${new Date().toISOString()}`);
    sqlStatements.push('-- PostgreSQL 14+ / MySQL 8+ Schema and Records\n');

    sqlStatements.push('CREATE TABLE IF NOT EXISTS parties (');
    sqlStatements.push('  id VARCHAR(64) PRIMARY KEY,');
    sqlStatements.push('  name VARCHAR(255) NOT NULL,');
    sqlStatements.push('  roles TEXT[],');
    sqlStatements.push('  phone VARCHAR(50),');
    sqlStatements.push('  email VARCHAR(100),');
    sqlStatements.push('  gstin VARCHAR(30),');
    sqlStatements.push('  outstanding_receivable DECIMAL(12,2),');
    sqlStatements.push('  outstanding_payable DECIMAL(12,2),');
    sqlStatements.push('  created_at TIMESTAMP');
    sqlStatements.push(');\n');

    parties.forEach(p => {
      sqlStatements.push(
        `INSERT INTO parties (id, name, phone, email, gstin, outstanding_receivable, outstanding_payable, created_at) VALUES ('${p.id}', '${p.name.replace(/'/g, "''")}', '${p.phone}', '${p.email}', '${p.gstin || ''}', ${p.outstandingReceivable}, ${p.outstandingPayable}, '${p.createdAt}') ON CONFLICT (id) DO UPDATE SET outstanding_receivable = EXCLUDED.outstanding_receivable;`
      );
    });

    const blob = new Blob([sqlStatements.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kmstudio-business-os-dump-${new Date().toISOString().split('T')[0]}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setParties(INITIAL_PARTIES);
    setClients(INITIAL_CLIENTS);
    setMeasurementSessions(INITIAL_MEASUREMENT_SESSIONS);
    setClientPhotos(INITIAL_CLIENT_PHOTOS);
    setInventory(INITIAL_INVENTORY);
    setOrders(INITIAL_ORDERS);
    setInvoices(INITIAL_INVOICES);
    setSuppliers(INITIAL_SUPPLIERS);
    setPurchases(INITIAL_PURCHASES);
    setFixedAssets(INITIAL_FIXED_ASSETS);
    setLoans(INITIAL_LOANS);
    setEquityRecords(INITIAL_EQUITY_RECORDS);
    setAdvances(INITIAL_ADVANCES);
    setEmployees(INITIAL_EMPLOYEES);
    setExpenseClaims(INITIAL_EXPENSE_CLAIMS);
    setBusinessEvents(INITIAL_BUSINESS_EVENTS);
    setBoms(INITIAL_BOM);
    setWorkOrders(INITIAL_WORK_ORDERS);
    setTasks(INITIAL_TASKS);
    setTimesheets(INITIAL_TIMESHEETS);
    setAccounts(INITIAL_ACCOUNTS);
    setVouchers(INITIAL_VOUCHERS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setWorkflows(INITIAL_WORKFLOWS);
    setReminders(INITIAL_REMINDERS);
    setSelectedPartyId('party-abc');
    setSelectedClientId('cli-1');
  };

  return (
    <ERPContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedClientId,
        setSelectedClientId,
        selectedPartyId,
        setSelectedPartyId,
        selectedCustomerSubTab,
        setSelectedCustomerSubTab,
        selectedOrderId,
        setSelectedOrderId,
        selectedInvoiceId,
        setSelectedInvoiceId,
        isQuickCreateOpen,
        setIsQuickCreateOpen,
        quickCreateCategory,
        setQuickCreateCategory,
        openQuickCreate,
        isBusinessEventModalOpen,
        setIsBusinessEventModalOpen,
        openBusinessEventModal,
        isSearchOpen,
        setIsSearchOpen,
        parties,
        clients,
        measurementSessions,
        clientPhotos,
        inventory,
        orders,
        invoices,
        suppliers,
        purchases,
        fixedAssets,
        loans,
        equityRecords,
        ownerEquity: equityRecords,
        advances,
        employees,
        expenseClaims,
        businessEvents,
        boms,
        workOrders,
        tasks,
        timesheets,
        accounts,
        vouchers,
        activityLogs,
        workflows,
        reminders,
        addParty,
        updateParty,
        deleteParty,
        addPartyTimelineItem,
        addClient,
        updateClient,
        deleteClient,
        updateClientStage,
        saveMeasurementSession,
        getClientLatestSession,
        addClientPhoto,
        deleteClientPhoto,
        addSalesOrder,
        updateOrderStatus,
        addInvoice,
        recordInvoicePayment,
        addSupplier,
        addPurchaseOrder,
        receivePurchaseOrder,
        addInventoryItem,
        adjustStock,
        addFixedAsset,
        recordAssetMaintenance,
        calculateDepreciation,
        addLoan,
        recordLoanEmiPayment,
        recordEquityTransaction,
        recordAdvance,
        adjustAdvance,
        addEmployee,
        recordExpenseClaim,
        reimburseExpenseClaim,
        addBOM,
        addWorkOrder,
        updateWorkOrderStatus,
        addTask,
        toggleTaskStatus,
        addTimesheet,
        logBusinessEvent,
        recordMoneyTransfer,
        recordVoucher,
        addVoucher: recordVoucher,
        recordExpense,
        addReminder,
        toggleReminder,
        toggleWorkflow,
        stats,
        financialUniverse,
        exportDatabaseAsJSON,
        exportDatabaseAsSQL,
        resetToDefaults
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = (): ERPContextType => {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error('useERP must be used within an ERPProvider');
  }
  return context;
};
