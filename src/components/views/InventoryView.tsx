import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Box,
  Plus,
  Search,
  AlertTriangle,
  Minus,
  Layers,
  Sparkles,
  TrendingUp,
  Tag
} from 'lucide-react';
import { InventoryItem } from '../../types/erp';

export const InventoryView: React.FC = () => {
  const {
    inventory,
    adjustStock,
    openQuickCreate
  } = useERP();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = inventory.filter(item => {
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalInventoryValuation = inventory.reduce(
    (acc, item) => acc + item.currentStock * item.purchasePrice,
    0
  );

  const lowStockCount = inventory.filter(i => i.currentStock <= i.minStockLevel).length;

  return (
    <div id="inventory-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">Fabric & Trims Inventory</h1>
          <p className="text-xs text-stone-500">Live stock levels, fabric roll lengths, trims, and unit valuation</p>
        </div>

        <button
          onClick={() => openQuickCreate('item')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Fabric / Item</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-semibold">Total Inventory Valuation</div>
          <div className="text-xl lg:text-2xl font-extrabold font-mono text-stone-900 mt-1">
            ₹{totalInventoryValuation.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Across {inventory.length} catalog items</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-semibold">Low Stock Warnings</div>
          <div className={`text-xl lg:text-2xl font-extrabold font-mono mt-1 ${lowStockCount > 0 ? 'text-amber-600' : 'text-stone-900'}`}>
            {lowStockCount} Items
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Below re-order threshold</div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-semibold">Categories Tracked</div>
          <div className="text-xl lg:text-2xl font-extrabold font-mono text-stone-900 mt-1">
            4 Lines
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Fabrics, Trims, Canvas & Finished Goods</div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'FABRIC', 'TRIMS', 'RAW_MATERIAL', 'FINISHED_GOODS'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search SKU or item name..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-xs"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px]">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">SKU / Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">HSN Code</th>
                <th className="py-3 px-4">Cost / Unit</th>
                <th className="py-3 px-4">Sell / Unit</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Quick Stock Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.map(item => {
                const isLow = item.currentStock <= item.minStockLevel;
                return (
                  <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{item.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">SKU: {item.sku}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-600">
                      {item.hsnCode || '520811'}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-700">
                      ₹{item.purchasePrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      ₹{item.sellingPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono font-bold text-sm ${isLow ? 'text-rose-600' : 'text-stone-900'}`}>
                          {item.currentStock} {item.unit}
                        </span>
                        {isLow && (
                          <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold uppercase">
                            Low
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono">Min: {item.minStockLevel}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 text-[11px]">
                      {item.location || 'Main Storage'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg">
                        <button
                          onClick={() => adjustStock(item.id, -1, 'Studio manual decrement')}
                          className="p-1 rounded bg-white hover:bg-stone-200 text-stone-800 shadow-2xs"
                          title="Reduce 1 unit"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-mono font-bold text-stone-800 text-xs">
                          {item.currentStock}
                        </span>
                        <button
                          onClick={() => adjustStock(item.id, 1, 'Studio manual increment')}
                          className="p-1 rounded bg-white hover:bg-stone-200 text-stone-800 shadow-2xs"
                          title="Add 1 unit"
                        >
                          <Plus className="w-3.5 h-3.5 text-emerald-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
