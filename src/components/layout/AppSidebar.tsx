import React, { useState } from 'react';
import { useERP, NavigationTab } from '../../context/ERPContext';
import {
  LayoutGrid,
  BarChart3,
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
  Database,
  Building,
  Settings,
  ChevronDown,
  ChevronRight,
  Factory,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

interface NavSection {
  title: string;
  key: string;
  items: {
    tab: NavigationTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
  }[];
}

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const { currentTab, setCurrentTab, stats } = useERP();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    business: true,
    money: true,
    accounting: true,
    mfg: true,
    gst: false,
    automation: false,
    settings: false
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navSections: NavSection[] = [
    {
      title: 'BUSINESS & PARTIES',
      key: 'business',
      items: [
        { tab: 'parties', label: 'Parties (Unified 360°)', icon: Users, badge: stats.inPipelineCount },
        { tab: 'customers', label: 'Customers', icon: Users },
        { tab: 'pipeline', label: 'Pipelines', icon: GitFork },
        { tab: 'sales', label: 'Sales', icon: ShoppingCart, badge: stats.activeOrdersCount },
        { tab: 'purchases', label: 'Purchases', icon: ShoppingBag },
        { tab: 'inventory', label: 'Inventory', icon: Box, badge: stats.lowStockCount > 0 ? stats.lowStockCount : undefined }
      ]
    },
    {
      title: 'MONEY & BRAIN',
      key: 'money',
      items: [
        { tab: 'business_brain', label: 'Business Brain (P&L vs Cash)', icon: Sparkles },
        { tab: 'cash_bank', label: 'Cash & Bank Moves', icon: Wallet },
        { tab: 'receivables', label: 'Receivables', icon: ArrowDownToLine },
        { tab: 'payables', label: 'Payables', icon: ArrowUpFromLine },
        { tab: 'expenses', label: 'Expenses', icon: Receipt },
        { tab: 'fixed_assets', label: 'Fixed Assets & CapEx', icon: Layers },
        { tab: 'people', label: 'People & Payroll', icon: Users }
      ]
    },
    {
      title: 'ACCOUNTING',
      key: 'accounting',
      items: [
        { tab: 'accounting_transactions', label: 'Record Transaction', icon: PlusCircle },
        { tab: 'vouchers', label: 'Vouchers', icon: FileText },
        { tab: 'ledgers', label: 'Ledgers', icon: BookOpen },
        { tab: 'accounts', label: 'Accounts', icon: Landmark },
        { tab: 'reconciliation', label: 'Reconciliation', icon: RefreshCw },
        { tab: 'reports', label: 'Reports', icon: FileBarChart }
      ]
    },
    {
      title: 'MANUFACTURING & PROJECTS',
      key: 'mfg',
      items: [
        { tab: 'manufacturing', label: 'Production Cycles', icon: Factory },
        { tab: 'projects', label: 'Projects & Tasks', icon: Clock }
      ]
    },
    {
      title: 'GST (INDIA TAX)',
      key: 'gst',
      items: [
        { tab: 'gst_dashboard', label: 'GST Dashboard', icon: ShieldCheck },
        { tab: 'gstr1', label: 'GSTR-1 Sales Return', icon: FileSpreadsheet },
        { tab: 'gstr3b', label: 'GSTR-3B Summary', icon: FileCheck },
        { tab: 'einvoice', label: 'E-Invoice (IRN)', icon: FileCode },
        { tab: 'ewaybill', label: 'E-Way Bill', icon: Truck }
      ]
    },
    {
      title: 'AUTOMATION',
      key: 'automation',
      items: [
        { tab: 'workflows', label: 'Workflows', icon: GitBranch },
        { tab: 'reminders', label: 'Reminders', icon: Bell }
      ]
    },
    {
      title: 'SETTINGS',
      key: 'settings',
      items: [
        { tab: 'masters', label: 'Masters & SQL Dump', icon: Database },
        { tab: 'company', label: 'Company Profile', icon: Building },
        { tab: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setCurrentTab(tab);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          id="sidebar-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        id="main-app-sidebar"
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-200 border-r border-slate-800 z-50 flex flex-col transition-transform duration-200 ease-in-out flex-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <button
            id="brand-home-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left w-full group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 border border-indigo-400/40 flex items-center justify-center text-white font-black text-xl italic group-hover:scale-105 transition-transform shadow-lg shadow-indigo-600/30">
              E
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-sans">
                <span>FlowERP</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold">OS</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">KM Studio Enterprise</div>
            </div>
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Top Primary Items */}
          <div className="space-y-1">
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'home'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Home Hub</span>
            </button>
            <button
              id="nav-dashboard-btn"
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Operations Dashboard</span>
            </button>
          </div>

          {/* Sectional Groups */}
          {navSections.map(sec => {
            const isExpanded = expandedSections[sec.key] ?? true;
            return (
              <div key={sec.key} className="space-y-1 pt-1">
                <button
                  id={`toggle-sec-${sec.key}`}
                  onClick={() => toggleSection(sec.key)}
                  className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-slate-400 tracking-wider hover:text-slate-200 transition-colors uppercase"
                >
                  <span>{sec.title}</span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="space-y-0.5">
                    {sec.items.map(item => {
                      const Icon = item.icon;
                      const isActive =
                        currentTab === item.tab ||
                        (item.tab === 'customers' && currentTab === 'customer_detail');
                      return (
                        <button
                          key={item.tab}
                          id={`nav-${item.tab}-btn`}
                          onClick={() => handleNavClick(item.tab)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge !== undefined && (
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                              isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-indigo-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 text-white font-black text-xs flex items-center justify-center shadow-sm">
              S
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Studio Admin</div>
              <div className="text-[10px] text-slate-400 font-medium">FlowERP Active</div>
            </div>
          </div>
          <div
            id="status-indicator-btn"
            title="System Online - Local Persistence Active"
            className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80 animate-pulse"
          />
        </div>
      </aside>
    </>
  );
};
