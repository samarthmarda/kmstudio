import React, { useState, useEffect, useRef } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Search,
  X,
  Users,
  Box,
  ShoppingCart,
  FileText,
  Clock,
  ArrowRight,
  Command
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    clients,
    inventory,
    orders,
    invoices,
    tasks,
    setSelectedClientId,
    setCurrentTab
  } = useERP();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedClients = q
    ? clients.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.pipelineStage.toLowerCase().includes(q)
      )
    : clients.slice(0, 3);

  const matchedInventory = q
    ? inventory.filter(
        i =>
          i.name.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      )
    : inventory.slice(0, 3);

  const matchedOrders = q
    ? orders.filter(
        o =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.clientName.toLowerCase().includes(q) ||
          o.items.some(it => it.name.toLowerCase().includes(q))
      )
    : orders.slice(0, 3);

  const matchedInvoices = q
    ? invoices.filter(
        inv =>
          inv.invoiceNumber.toLowerCase().includes(q) ||
          inv.clientName.toLowerCase().includes(q)
      )
    : invoices.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        id="global-search-modal-box"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type customer name, order #, fabric, SKU, or invoice..."
            className="flex-1 bg-transparent text-sm text-stone-800 placeholder:text-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-600 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <kbd className="text-[10px] bg-white border border-stone-300 px-1.5 py-0.5 rounded text-stone-500 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Customers Section */}
          {matchedClients.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-stone-400 font-semibold tracking-wider uppercase text-[10px] mb-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Customers ({matchedClients.length})</span>
              </div>
              <div className="space-y-1">
                {matchedClients.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedClientId(c.id);
                      setCurrentTab('customer_detail');
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-amber-500/10 border border-transparent hover:border-amber-200 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-stone-800 group-hover:text-amber-900">{c.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {c.phone} • {c.bodyType} • Stage: {c.pipelineStage}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sales Orders Section */}
          {matchedOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-stone-400 font-semibold tracking-wider uppercase text-[10px] mb-1.5">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Sales Orders ({matchedOrders.length})</span>
              </div>
              <div className="space-y-1">
                {matchedOrders.map(o => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setCurrentTab('sales');
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-stone-100 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-stone-800 flex items-center gap-2">
                        <span>{o.orderNumber}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-stone-100 text-stone-600 font-mono">
                          {o.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {o.clientName} • ₹{o.grandTotal.toLocaleString('en-IN')} (Due: {o.dueDate})
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Items Section */}
          {matchedInventory.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-stone-400 font-semibold tracking-wider uppercase text-[10px] mb-1.5">
                <Box className="w-3.5 h-3.5" />
                <span>Inventory & Fabrics ({matchedInventory.length})</span>
              </div>
              <div className="space-y-1">
                {matchedInventory.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab('inventory');
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-stone-100 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-stone-800">{item.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        SKU: {item.sku} • Stock: {item.currentStock} {item.unit} • ₹{item.sellingPrice}/unit
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
