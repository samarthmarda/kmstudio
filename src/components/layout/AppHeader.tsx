import React from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Menu,
  Search,
  Plus,
  Bell,
  Sparkles,
  Command,
  Database,
  CheckCircle2
} from 'lucide-react';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenMobileMenu }) => {
  const { openQuickCreate, setIsSearchOpen, reminders, currentTab, setCurrentTab } = useERP();

  const pendingRemindersCount = reminders.filter(r => !r.isCompleted).length;

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between flex-none shadow-xs"
    >
      {/* Left side: Hamburger on mobile + Brand / Context */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-toggle-btn"
          onClick={onOpenMobileMenu}
          aria-label="Open Navigation Menu"
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors focus:outline-hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Studio Branding / Tab Context */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg italic shadow-md shadow-indigo-200 flex-none">
            E
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-sans">
              FlowERP <span className="text-indigo-600">OS</span>
            </h1>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
              Studio Pro
            </span>
          </div>
        </div>
      </div>

      {/* Center / Right side controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Fast View Switcher Pills on Medium+ screens */}
        <div className="hidden md:flex bg-slate-100 rounded-full p-1 border border-slate-200/60 text-xs">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3.5 py-1 rounded-full font-semibold transition-all ${
              currentTab === 'home'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3.5 py-1 rounded-full font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentTab('sales')}
            className={`px-3.5 py-1 rounded-full font-semibold transition-all ${
              currentTab === 'sales'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sales
          </button>
        </div>

        {/* Global Search Bar (⌘K) */}
        <button
          id="global-search-trigger-btn"
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-500 text-xs px-3 py-1.5 rounded-xl transition-colors focus:outline-hidden shadow-2xs"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search records...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] bg-white border border-slate-300 px-1.5 py-0.5 rounded-md text-slate-500 font-mono">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Vibrant Quick Create Button */}
        <button
          id="quick-create-btn"
          onClick={() => openQuickCreate('sale')}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95 focus:outline-hidden"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Entry</span>
        </button>

        {/* Notifications / Reminders Bell */}
        <button
          id="notifications-bell-btn"
          onClick={() => setCurrentTab('reminders')}
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-hidden"
          title="Active Reminders & Alerts"
        >
          <Bell className="w-4 h-4" />
          {pendingRemindersCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center animate-pulse shadow-xs">
              {pendingRemindersCount}
            </span>
          )}
        </button>

        {/* User Gradient Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 border-2 border-white shadow-sm text-white font-black text-xs flex items-center justify-center">
            S
          </div>
          <span className="hidden xl:inline text-xs font-bold text-slate-700">Studio Admin</span>
        </div>
      </div>
    </header>
  );
};
