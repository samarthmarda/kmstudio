import React from 'react';
import { useERP } from '../../context/ERPContext';
import {
  TrendingUp,
  Wallet,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Box,
  Plus,
  Sparkles,
  Factory,
  ShoppingBag,
  Receipt,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { stats, orders, inventory, clients, activityLogs, setCurrentTab, openQuickCreate } = useERP();

  const chartData = [
    { month: 'Mar', sales: 48000, expenses: 22000 },
    { month: 'Apr', sales: 65000, expenses: 31000 },
    { month: 'May', sales: 92000, expenses: 44000 },
    { month: 'Jun', sales: 118000, expenses: 52000 },
    { month: 'Jul', sales: 145000, expenses: 68000 },
    { month: 'Aug (Cur)', sales: stats.monthlySales, expenses: 88200 }
  ];

  const lowStockItems = inventory.filter(i => i.currentStock <= i.minStockLevel);

  return (
    <div id="dashboard-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Executive Operations Dashboard</h1>
          <p className="text-xs text-slate-500">Live operational stories, revenue metrics, and bespoke production feeds</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openQuickCreate('sale')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Order</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL STORIES ROW (Vibrant Gradient Stories) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Operational Stories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {/* Sales Today Story */}
          <div
            onClick={() => setCurrentTab('sales')}
            className="h-44 bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-3xl p-4 flex flex-col justify-end relative shadow-lg shadow-indigo-200 text-white cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden group"
          >
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white/80 bg-indigo-400/80 flex items-center justify-center text-xs font-bold">
              ₹
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-indigo-100">Monthly Sales</span>
            <span className="text-lg lg:text-xl font-black text-white font-mono">
              ₹{stats.monthlySales.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Stock Level Story */}
          <div
            onClick={() => setCurrentTab('inventory')}
            className="h-44 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-3xl p-4 flex flex-col justify-end relative shadow-lg shadow-emerald-200 text-white cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden group"
          >
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white/80 bg-emerald-300/80 flex items-center justify-center text-xs font-bold">
              <Box className="w-4 h-4" />
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-emerald-100">Stock Health</span>
            <span className="text-lg lg:text-xl font-black text-white font-mono">
              {stats.lowStockCount === 0 ? 'Optimal' : `${stats.lowStockCount} Reorder`}
            </span>
          </div>

          {/* Due Invoices / Receivables Story */}
          <div
            onClick={() => setCurrentTab('receivables')}
            className="h-44 bg-gradient-to-b from-rose-400 to-rose-600 rounded-3xl p-4 flex flex-col justify-end relative shadow-lg shadow-rose-200 text-white cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden group"
          >
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white/80 bg-rose-300/80 flex items-center justify-center text-xs font-bold">
              !
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-rose-100">Receivables</span>
            <span className="text-lg lg:text-xl font-black text-white font-mono">
              ₹{stats.totalReceivables.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Liquid Cash Story */}
          <div
            onClick={() => setCurrentTab('cash_bank')}
            className="h-44 bg-gradient-to-b from-amber-400 to-orange-500 rounded-3xl p-4 flex flex-col justify-end relative shadow-lg shadow-amber-200 text-white cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden group"
          >
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white/80 bg-amber-300/80 flex items-center justify-center text-xs font-bold">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-amber-100">Cash & Bank</span>
            <span className="text-lg lg:text-xl font-black text-white font-mono">
              ₹{stats.cashAndBankBalance.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Quick Create Story Slot */}
          <button
            onClick={() => openQuickCreate('sale')}
            className="hidden lg:flex h-44 bg-slate-100 hover:bg-slate-200/80 border-2 border-dashed border-slate-300 rounded-3xl flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 text-xl font-bold shadow-xs">
              +
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600">New Record</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Revenue & Active Projects vs Quick Action Reel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Analytics & Active Projects */}
        <div className="lg:col-span-8 space-y-6">
          {/* Revenue Chart Container */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Revenue & Outflow Trajectory</h3>
                <p className="text-xs text-slate-500">Bespoke garment sales vs fabric purchases & studio overhead</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-indigo-600" /> Revenue
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-amber-400" /> Expenses
                </span>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="vibrantIndigoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="vibrantAmberGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={val => `₹${val / 1000}k`} axisLine={false} />
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#vibrantIndigoGrad)" name="Sales Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#vibrantAmberGrad)" name="Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Projects / Production Batches */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Atelier Orders & Batches</h3>
                <p className="text-xs text-slate-500">Live cutting, sewing, baste fitting and QC tracking</p>
              </div>
              <button
                onClick={() => setCurrentTab('manufacturing')}
                className="text-indigo-600 hover:text-indigo-700 text-xs font-bold"
              >
                View Feed →
              </button>
            </div>

            <div className="space-y-3">
              {/* Order 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold text-xs">
                  MFG
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate">Bespoke Italian Silk Tuxedo #ORD-2026-081</h4>
                  <p className="text-xs text-slate-500 font-medium">Production Stage: Hand Embroidery (75%) • Client: Sarah Jenkins</p>
                </div>
                <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-amber-500 h-full w-3/4 rounded-full" />
                </div>
              </div>

              {/* Order 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xs">
                  PRJ
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate">Bridal Lehenga Fitting Session & Alterations</h4>
                  <p className="text-xs text-slate-500 font-medium">Master: Ustad Rashid • Final Fitting in 2 days</p>
                </div>
                <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-blue-500 h-full w-4/5 rounded-full" />
                </div>
              </div>

              {/* Order 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-xs">
                  PUR
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate">Restock: Loro Piana Pure Cashmere Rolls</h4>
                  <p className="text-xs text-slate-500 font-medium">Supplier: Raymond Luxury Mills • Shipment En Route</p>
                </div>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                  PENDING
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Action Reel + Recent Contacts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Quick Action Reel (Vibrant Dark Indigo Card) */}
          <div className="bg-indigo-900 rounded-3xl p-6 text-white flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold tracking-tight">Quick Action Reel</h3>
              <span className="text-[10px] bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded-full font-bold uppercase">
                Instant
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => openQuickCreate('sale')}
                className="bg-white/10 hover:bg-white/20 aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/10 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold">New Quote</span>
              </button>

              <button
                onClick={() => openQuickCreate('purchase')}
                className="bg-white/10 hover:bg-white/20 aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/10 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold">Draft PO</span>
              </button>

              <button
                onClick={() => openQuickCreate('expense')}
                className="bg-white/10 hover:bg-white/20 aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/10 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold">Log Expense</span>
              </button>

              <button
                onClick={() => setCurrentTab('reminders')}
                className="bg-white/10 hover:bg-white/20 aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/10 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold">Reminders</span>
              </button>
            </div>
          </div>

          {/* Recent Contacts & VIP Clients */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Recent Contacts</h3>
              <button
                onClick={() => setCurrentTab('customers')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-3.5">
              <div
                onClick={() => setCurrentTab('customers')}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                  AC
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">Apex Weddings Corp</p>
                  <p className="text-[11px] text-slate-400 font-medium">Lead • High Intent VIP</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              <div
                onClick={() => setCurrentTab('customers')}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                  JS
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">Jason & Priya Smith</p>
                  <p className="text-[11px] text-slate-400 font-medium">Client • 3 Active Outfits</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>

              <div
                onClick={() => setCurrentTab('customers')}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">
                  RE
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">Riddle Royal Events</p>
                  <p className="text-[11px] text-slate-400 font-medium">Customer • 12 Orders</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
