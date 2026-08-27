/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ERPProvider, useERP } from './context/ERPContext';
import { AppSidebar } from './components/layout/AppSidebar';
import { AppHeader } from './components/layout/AppHeader';
import { MobileNav } from './components/layout/MobileNav';
import { QuickCreateModal } from './components/common/QuickCreateModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Views
import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { CustomersView } from './components/views/CustomersView';
import { CustomerDetailView } from './components/views/CustomerDetailView';
import { PipelineView } from './components/views/PipelineView';
import { SalesView } from './components/views/SalesView';
import { PurchasesView } from './components/views/PurchasesView';
import { InventoryView } from './components/views/InventoryView';
import { CashBankView } from './components/views/CashBankView';
import { ManufacturingView } from './components/views/ManufacturingView';
import { AccountingView } from './components/views/AccountingView';
import { GSTView } from './components/views/GSTView';
import { PartiesView } from './components/views/PartiesView';
import { FixedAssetsView } from './components/views/FixedAssetsView';
import { PeoplePayrollView } from './components/views/PeoplePayrollView';
import { BusinessBrainView } from './components/views/BusinessBrainView';
import { BusinessEventModal } from './components/common/BusinessEventModal';

const MainContent: React.FC = () => {
  const { currentTab } = useERP();
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView />;
      case 'dashboard':
        return <DashboardView />;
      case 'parties':
        return <PartiesView />;
      case 'customers':
        return <CustomersView />;
      case 'customer_detail':
        return <CustomerDetailView />;
      case 'pipeline':
        return <PipelineView />;
      case 'sales':
        return <SalesView />;
      case 'purchases':
        return <PurchasesView />;
      case 'inventory':
        return <InventoryView />;
      case 'cash_bank':
      case 'receivables':
      case 'payables':
      case 'expenses':
        return <CashBankView />;
      case 'fixed_assets':
        return <FixedAssetsView />;
      case 'people':
        return <PeoplePayrollView />;
      case 'business_brain':
        return <BusinessBrainView />;
      case 'manufacturing':
      case 'projects':
        return <ManufacturingView />;
      case 'accounting_transactions':
      case 'vouchers':
      case 'ledgers':
      case 'accounts':
      case 'reconciliation':
      case 'reports':
        return <AccountingView />;
      case 'gst_dashboard':
      case 'gstr1':
      case 'gstr3b':
      case 'einvoice':
      case 'ewaybill':
        return <GSTView />;
      case 'workflows':
      case 'reminders':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Desktop Collapsible Sidebar */}
      <AppSidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <AppHeader onOpenMobileMenu={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-8 scrollbar-thin scrollbar-thumb-slate-300">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile-First Bottom Navigation with Fast Create Action */}
      <MobileNav />

      {/* Global Modals */}
      <QuickCreateModal />
      <GlobalSearchModal />
      <BusinessEventModal />
    </div>
  );
};

export default function App() {
  return (
    <ERPProvider>
      <MainContent />
    </ERPProvider>
  );
}
