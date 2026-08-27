import React from 'react';
import { useERP, NavigationTab } from '../../context/ERPContext';
import {
  Users,
  GitFork,
  ShoppingCart,
  ShoppingBag,
  Box,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Receipt,
  PlusCircle,
  FileText,
  BookOpen,
  Landmark,
  RefreshCw,
  FileBarChart,
  ShieldCheck,
  FileSpreadsheet,
  FileCheck,
  FileCode,
  Truck,
  GitBranch,
  Bell,
  Clock,
  Sparkles,
  ChevronRight,
  Plus,
  Factory,
  Layers,
  Brain,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setCurrentTab,
    openQuickCreate,
    openBusinessEventModal,
    financialUniverse,
    stats,
    parties,
    fixedAssets,
    employees
  } = useERP();

  interface HomeTile {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    tab: NavigationTab;
    colorClass: string;
    badge?: string;
    onClick?: () => void;
  }

  const businessTiles: HomeTile[] = [
    {
      id: 'parties',
      title: 'Unified Party Directory (360°)',
      description: 'Customers, suppliers, staff & lenders with connected timelines',
      icon: Users,
      tab: 'parties',
      colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white',
      badge: `${parties.length} Parties`
    },
    { id: 'customers', title: 'Customers & CRM', description: 'Clients, profiles, measurements & logs', icon: Users, tab: 'customers', colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white' },
    { id: 'pipeline', title: 'Sales Pipelines', description: 'Leads, stages, fit sessions & follow-ups', icon: GitFork, tab: 'pipeline', colorClass: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white' },
    { id: 'sales', title: 'Sales & Orders', description: 'Quotes, custom orders & tax invoices', icon: ShoppingCart, tab: 'sales', colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white' },
    { id: 'purchases', title: 'Purchases & Mill POs', description: 'Purchase orders, mills & receiving', icon: ShoppingBag, tab: 'purchases', colorClass: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white' },
    { id: 'inventory', title: 'Fabric & Inventory', description: 'Rolls, trims, alerts & barcoding', icon: Box, tab: 'inventory', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white' }
  ];

  const moneyTiles: HomeTile[] = [
    {
      id: 'business_brain',
      title: 'Business Brain (P&L vs Cash)',
      description: 'Understand why Cash Flow ≠ P&L across the 7 financial buckets',
      icon: Brain,
      tab: 'business_brain',
      colorClass: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white',
      badge: 'Intelligence'
    },
    { id: 'cash_bank', title: 'Cash & Bank Moves', description: 'Live cash, bank ledgers, contra transfers & loans', icon: Wallet, tab: 'cash_bank', colorClass: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white' },
    { id: 'receivables', title: 'Receivables Due', description: 'Customer balances & advance tracking', icon: ArrowDownToLine, tab: 'receivables', colorClass: 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white' },
    { id: 'payables', title: 'Supplier Payables', description: 'Vendor bills & textile mill credit', icon: ArrowUpFromLine, tab: 'payables', colorClass: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white' },
    {
      id: 'fixed_assets',
      title: 'Fixed Assets & CapEx',
      description: 'Sewing machines, embroidery units, depreciation & maintenance',
      icon: Layers,
      tab: 'fixed_assets',
      colorClass: 'bg-violet-50 text-violet-600 border-violet-100 group-hover:bg-violet-600 group-hover:text-white',
      badge: `${fixedAssets.length} Assets`
    },
    {
      id: 'people',
      title: 'People & Staff Payroll',
      description: 'Master tailors, monthly wages & 1-click expense claims',
      icon: Users,
      tab: 'people',
      colorClass: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
      badge: `${employees.length} Staff`
    },
    { id: 'expenses', title: 'Studio Expenses', description: 'Overhead, utilities & daily vouchers', icon: Receipt, tab: 'expenses', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white' }
  ];

  const accountingTiles: HomeTile[] = [
    {
      id: 'record_txn',
      title: 'Record Transaction',
      description: 'Quick double-entry posting',
      icon: PlusCircle,
      tab: 'accounting_transactions',
      colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white',
      onClick: () => openQuickCreate('sale')
    },
    { id: 'vouchers', title: 'Journal Vouchers', description: 'Journal, payment, receipt & contra', icon: FileText, tab: 'vouchers', colorClass: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white' },
    { id: 'ledgers', title: 'General Ledgers', description: 'Every account and party movement', icon: BookOpen, tab: 'ledgers', colorClass: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white' },
    { id: 'accounts', title: 'Chart of Accounts', description: 'Assets, liabilities, income & equity', icon: Landmark, tab: 'accounts', colorClass: 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white' },
    { id: 'reconciliation', title: 'Bank Reconciliation', description: 'Match statements with digital books', icon: RefreshCw, tab: 'reconciliation', colorClass: 'bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white' },
    { id: 'reports', title: 'Financial Statements', description: 'P&L, Balance Sheet & Trial Balance', icon: FileBarChart, tab: 'reports', colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white' }
  ];

  const mfgTiles: HomeTile[] = [
    { id: 'manufacturing', title: 'Production Cycles & BOM', description: 'Work orders, cutting, sewing & artisan tasks', icon: Factory, tab: 'manufacturing', colorClass: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white' },
    { id: 'projects', title: 'Projects & Timesheets', description: 'Custom bridal orders & labor time logs', icon: Clock, tab: 'projects', colorClass: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white' }
  ];

  const gstTiles: HomeTile[] = [
    { id: 'gst_dash', title: 'GST Compliance Center', description: 'Output liability vs Input Tax Credit', icon: ShieldCheck, tab: 'gst_dashboard', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white' },
    { id: 'gstr1', title: 'GSTR-1 Outward Return', description: 'B2B, B2CL and HSN summary export', icon: FileSpreadsheet, tab: 'gstr1', colorClass: 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white' },
    { id: 'gstr3b', title: 'GSTR-3B Monthly Return', description: 'Auto-computed tax liability & ITC', icon: FileCheck, tab: 'gstr3b', colorClass: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white' },
    { id: 'einvoice', title: 'E-Invoicing & IRN Portal', description: 'Government QR code & IRN generation', icon: FileCode, tab: 'einvoice', colorClass: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white' },
    { id: 'ewaybill', title: 'E-Way Bill Generation', description: 'Consignment tracking & vehicle slips', icon: Truck, tab: 'ewaybill', colorClass: 'bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-600 group-hover:text-white' }
  ];

  const renderSection = (title: string, subtitle: string, tiles: HomeTile[]) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {tiles.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              id={`home-tile-${t.id}`}
              onClick={() => {
                if (t.onClick) {
                  t.onClick();
                } else {
                  setCurrentTab(t.tab);
                }
              }}
              className="group text-left p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100/50 transition-all flex items-center justify-between focus:outline-hidden cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${t.colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {t.title}
                    </h3>
                    {t.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-1">{t.description}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div id="home-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Top Banner Matching Vibrant Palette Archetype */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KMStudio Business OS Active</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight font-sans mt-0.5">
            What would you like to manage today?
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Connected Business Graph: Tell the system what happened, and it updates CRM, taxes, cash flow, and accounting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openBusinessEventModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Record What Happened</span>
          </button>
          <button
            id="quick-start-sale-btn"
            onClick={() => openQuickCreate('sale')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Fast Entry</span>
          </button>
        </div>
      </div>

      {/* 7-Bucket Financial Architecture Pulse */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Live 7-Bucket Financial Pulse</span>
          </div>
          <button
            onClick={() => setCurrentTab('business_brain')}
            className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center space-x-1"
          >
            <span>Open Business Brain Engine</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-emerald-300 font-bold uppercase">1. Income</div>
            <div className="text-sm font-bold text-white mt-0.5">₹{financialUniverse.income.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-blue-300 font-bold uppercase">2. Assets</div>
            <div className="text-sm font-bold text-white mt-0.5">₹{financialUniverse.assetsSummary.totalAssets.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-rose-300 font-bold uppercase">3. Liabilities</div>
            <div className="text-sm font-bold text-white mt-0.5">₹{financialUniverse.liabilitiesSummary.totalLiabilities.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-purple-300 font-bold uppercase">4. Equity</div>
            <div className="text-sm font-bold text-white mt-0.5">₹{financialUniverse.equitySummary.totalEquity.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-amber-300 font-bold uppercase">5. Expenses</div>
            <div className="text-sm font-bold text-white mt-0.5">₹{financialUniverse.operatingExpenses.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-indigo-300 font-bold uppercase">6. Operating Profit</div>
            <div className="text-sm font-bold text-white mt-0.5">₹{financialUniverse.operatingProfit.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-400/30">
            <div className="text-[10px] text-emerald-200 font-bold uppercase">7. Liquid Cash</div>
            <div className="text-sm font-bold text-emerald-300 mt-0.5">₹{stats.cashAndBankBalance.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Structured Sections */}
      <div className="space-y-8">
        {renderSection('Business & Unified Parties', '360° Party CRM/SRM, pipelines, sales quotes and inventory stock', businessTiles)}
        {renderSection('Money, Brain & Assets', 'Cash flow vs P&L, bank contra moves, CapEx assets, and staff payroll', moneyTiles)}
        {renderSection('Financial Books & Ledgers', 'Compliant double-entry journal vouchers and financial statements', accountingTiles)}
        {renderSection('Atelier Manufacturing & Projects', 'Bespoke tailoring, production stages, BOM and artisan timecards', mfgTiles)}
        {renderSection('GST & Tax Compliance', 'India GST tax filing, GSTR-1, GSTR-3B and E-Invoice IRN portal', gstTiles)}
      </div>
    </div>
  );
};

