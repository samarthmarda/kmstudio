import React from 'react';
import { useERP, NavigationTab } from '../../context/ERPContext';
import {
  LayoutGrid,
  Users,
  Plus,
  GitFork,
  ShoppingCart
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentTab, setCurrentTab, openQuickCreate } = useERP();

  const items: { tab: NavigationTab; label: string; icon: React.ElementType }[] = [
    { tab: 'home', label: 'Home', icon: LayoutGrid },
    { tab: 'customers', label: 'Clients', icon: Users },
    { tab: 'pipeline', label: 'Pipeline', icon: GitFork },
    { tab: 'sales', label: 'Sales', icon: ShoppingCart }
  ];

  return (
    <nav
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg"
    >
      {items.slice(0, 2).map(item => {
        const Icon = item.icon;
        const isActive = currentTab === item.tab || (item.tab === 'customers' && currentTab === 'customer_detail');
        return (
          <button
            key={item.tab}
            id={`mob-nav-${item.tab}`}
            onClick={() => setCurrentTab(item.tab)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}

      {/* Floating Center Reel-like Quick Add Action */}
      <button
        id="mob-quick-create-fab"
        onClick={() => openQuickCreate('sale')}
        className="flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-300 active:scale-95 transition-transform border-2 border-white"
        aria-label="Quick Create New Record"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
      </button>

      {items.slice(2, 4).map(item => {
        const Icon = item.icon;
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            id={`mob-nav-${item.tab}`}
            onClick={() => setCurrentTab(item.tab)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
