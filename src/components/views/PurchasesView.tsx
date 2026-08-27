import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  ShoppingBag,
  Plus,
  Search,
  Truck,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PurchaseStatus } from '../../types/erp';

export const PurchasesView: React.FC = () => {
  const {
    suppliers,
    purchases,
    receivePurchaseOrder,
    openQuickCreate
  } = useERP();

  const [activeTab, setActiveTab] = useState<'orders' | 'suppliers'>('orders');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = purchases.filter(
    po =>
      po.purchaseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSuppliers = suppliers.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="purchases-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">Purchases & Supplier Logistics</h1>
          <p className="text-xs text-stone-500">Fabric mills, trims vendors, PO dispatch and inventory receipt</p>
        </div>

        <button
          onClick={() => openQuickCreate('purchase')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>New Purchase Order</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'orders' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Purchase Orders ({purchases.length})
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'suppliers' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Suppliers & Mills ({suppliers.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search POs or suppliers..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-xs"
          />
        </div>
      </div>

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">PO #</th>
                  <th className="py-3 px-4">Supplier / Mill</th>
                  <th className="py-3 px-4">Items Ordered</th>
                  <th className="py-3 px-4">Order Date</th>
                  <th className="py-3 px-4">Grand Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Stock Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map(po => (
                  <tr key={po.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {po.purchaseNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      {po.supplierName}
                    </td>
                    <td className="py-3 px-4 text-stone-700">
                      {po.items.map(it => `${it.itemName} (${it.quantity} ${it.unit})`).join(', ')}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-500">
                      {po.orderDate}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      ₹{po.grandTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          po.status === 'RECEIVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : po.status === 'ORDERED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {po.status !== 'RECEIVED' ? (
                        <button
                          onClick={() => receivePurchaseOrder(po.id)}
                          className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Mark Received
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-medium inline-flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Stock Added</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUPPLIERS TAB */}
      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map(s => (
            <div
              key={s.id}
              className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">{s.name}</h3>
                      <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.2 rounded font-medium border border-amber-200">
                        {s.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-stone-600 space-y-1 pt-1 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{s.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{s.email}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-sans pt-1">
                    GSTIN: <span className="font-mono font-semibold">{s.gstin}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-stone-400">Balance Due</div>
                  <div className="font-mono font-bold text-rose-600">
                    ₹{s.balanceDue.toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  onClick={() => openQuickCreate('purchase')}
                  className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-[11px]"
                >
                  Create PO →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
