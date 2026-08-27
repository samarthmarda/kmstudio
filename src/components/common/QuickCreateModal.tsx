import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  X,
  ShoppingCart,
  ShoppingBag,
  Users,
  Box,
  Ruler,
  Receipt,
  PlusCircle,
  Check,
  Sparkles,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BodyType } from '../../types/erp';

export const QuickCreateModal: React.FC = () => {
  const {
    isQuickCreateOpen,
    setIsQuickCreateOpen,
    quickCreateCategory,
    setQuickCreateCategory,
    clients,
    inventory,
    suppliers,
    addClient,
    addSalesOrder,
    addPurchaseOrder,
    addInventoryItem,
    recordExpense,
    saveMeasurementSession,
    setSelectedClientId,
    setCurrentTab
  } = useERP();

  // Sale form state
  const [saleClientId, setSaleClientId] = useState(clients[0]?.id || '');
  const [saleItemName, setSaleItemName] = useState('Bespoke Tailored Suit');
  const [salePrice, setSalePrice] = useState(45000);
  const [saleGst, setSaleGst] = useState(12);
  const [saleDueDate, setSaleDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [saleAdvance, setSaleAdvance] = useState(25000);

  // Customer form state
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custBodyType, setCustBodyType] = useState<BodyType>('female');
  const [custNotes, setCustNotes] = useState('');

  // Item form state
  const [itemName, setItemName] = useState('');
  const [itemSku, setItemSku] = useState('');
  const [itemCategory, setItemCategory] = useState<'FABRIC' | 'TRIMS' | 'RAW_MATERIAL' | 'FINISHED_GOODS'>('FABRIC');
  const [itemUnit, setItemUnit] = useState<'meters' | 'pieces' | 'sets' | 'rolls'>('meters');
  const [itemStock, setItemStock] = useState(20);
  const [itemBuyRate, setItemBuyRate] = useState(1500);
  const [itemSellRate, setItemSellRate] = useState(3200);

  // Purchase form state
  const [purSupplierId, setPurSupplierId] = useState(suppliers[0]?.id || '');
  const [purItemName, setPurItemName] = useState('Super 120s Wool Fabric');
  const [purQty, setPurQty] = useState(25);
  const [purRate, setPurRate] = useState(1800);
  const [purGst, setPurGst] = useState(5);

  // Expense form state
  const [expCategory, setExpCategory] = useState('Studio Supplies & Trims');
  const [expAmount, setExpAmount] = useState(3500);
  const [expPaidTo, setExpPaidTo] = useState('Local Trims Market');
  const [expMode, setExpMode] = useState<'CASH' | 'UPI' | 'BANK' | 'CARD'>('UPI');
  const [expDesc, setExpDesc] = useState('Emergency thread cones & marking chalks');

  // Quick Measure state
  const [measClientId, setMeasClientId] = useState(clients[0]?.id || '');
  const [measChest, setMeasChest] = useState(88);
  const [measWaist, setMeasWaist] = useState(70);
  const [measHips, setMeasHips] = useState(94);
  const [measShoulder, setMeasShoulder] = useState(38);
  const [measSleeve, setMeasSleeve] = useState(58);
  const [measLength, setMeasLength] = useState(104);

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isQuickCreateOpen) return null;

  const showSuccessNotice = (msg: string) => {
    setSuccessMsg(msg);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsQuickCreateOpen(false);
    }, 1100);
  };

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === saleClientId) || clients[0];
    const subtotal = salePrice;
    const taxTotal = (salePrice * saleGst) / 100;
    const grandTotal = subtotal + taxTotal;

    addSalesOrder({
      clientId: client.id,
      clientName: client.name,
      items: [
        {
          id: `oi-${Date.now()}`,
          name: saleItemName,
          quantity: 1,
          unitPrice: salePrice,
          gstRate: saleGst,
          lineTotal: salePrice
        }
      ],
      subtotal,
      taxTotal,
      grandTotal,
      status: 'CONFIRMED',
      orderDate: new Date().toISOString().split('T')[0],
      dueDate: saleDueDate,
      notes: `Quick order captured with ₹${saleAdvance} advance commitment.`
    });

    showSuccessNotice(`Order created for ${client.name}!`);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim()) return;

    const newClient = addClient({
      name: custName.trim(),
      phone: custPhone.trim() || '+91 90000 00000',
      email: custEmail.trim() || `${custName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      bodyType: custBodyType,
      pipelineStage: 'INQUIRY',
      notes: custNotes.trim() || 'Quick walk-in client captured.',
      tags: ['Walk-in', 'New']
    });

    setSelectedClientId(newClient.id);
    showSuccessNotice(`Customer "${newClient.name}" created!`);
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    const sku = itemSku.trim() || `SKU-${Date.now().toString().slice(-5)}`;
    addInventoryItem({
      sku,
      name: itemName.trim(),
      category: itemCategory,
      unit: itemUnit,
      currentStock: Number(itemStock) || 0,
      minStockLevel: 5,
      purchasePrice: Number(itemBuyRate) || 0,
      sellingPrice: Number(itemSellRate) || 0,
      hsnCode: '520811',
      gstRate: 5,
      location: 'Main Warehouse Shelf'
    });

    showSuccessNotice(`Item "${itemName}" added to inventory!`);
  };

  const handleCreatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.id === purSupplierId) || suppliers[0];
    const subtotal = purQty * purRate;
    const taxTotal = (subtotal * purGst) / 100;
    const grandTotal = subtotal + taxTotal;

    addPurchaseOrder({
      supplierId: sup.id,
      supplierName: sup.name,
      items: [
        {
          id: `pi-${Date.now()}`,
          itemId: 'inv-1',
          itemName: purItemName,
          quantity: purQty,
          unit: 'meters',
          unitPrice: purRate,
          gstRate: purGst,
          lineTotal: subtotal
        }
      ],
      subtotal,
      taxTotal,
      grandTotal,
      status: 'ORDERED',
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      paidAmount: 0,
      notes: 'Quick purchase order dispatched.'
    });

    showSuccessNotice(`Purchase Order placed with ${sup.name}!`);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    recordExpense({
      category: expCategory,
      description: expDesc,
      amount: Number(expAmount) || 0,
      paymentMethod: expMode,
      paidTo: expPaidTo
    });

    showSuccessNotice(`Expense of ₹${expAmount.toLocaleString('en-IN')} recorded!`);
  };

  const handleQuickMeasure = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === measClientId) || clients[0];

    saveMeasurementSession(
      client.id,
      {
        chest: { cm: measChest, inches: Number((measChest / 2.54).toFixed(1)) },
        waist: { cm: measWaist, inches: Number((measWaist / 2.54).toFixed(1)) },
        hips: { cm: measHips, inches: Number((measHips / 2.54).toFixed(1)) },
        shoulder: { cm: measShoulder, inches: Number((measShoulder / 2.54).toFixed(1)) },
        sleeve_length: { cm: measSleeve, inches: Number((measSleeve / 2.54).toFixed(1)) },
        waist_to_floor: { cm: measLength, inches: Number((measLength / 2.54).toFixed(1)) }
      },
      'cm',
      'Quick 15-second measurement entry.'
    );

    setSelectedClientId(client.id);
    showSuccessNotice(`Measurements saved for ${client.name}!`);
  };

  const categories = [
    { id: 'sale', label: 'Sale Order', icon: ShoppingCart },
    { id: 'customer', label: 'Customer', icon: Users },
    { id: 'measure', label: 'Measurements', icon: Ruler },
    { id: 'item', label: 'Inventory', icon: Box },
    { id: 'purchase', label: 'Purchase', icon: ShoppingBag },
    { id: 'expense', label: 'Expense', icon: Receipt }
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="quick-create-modal-container"
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header with Reel-like Banner */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide flex items-center gap-2">
                <span>Quick Business Capture</span>
                <span className="text-[10px] bg-amber-400 text-stone-950 font-bold px-1.5 py-0.2 rounded-full uppercase">
                  Fast
                </span>
              </h2>
              <p className="text-[11px] text-stone-400">1-Tap rapid creation with instant sync</p>
            </div>
          </div>
          <button
            onClick={() => setIsQuickCreateOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pill Switcher */}
        <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = quickCreateCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`qc-tab-${cat.id}`}
                onClick={() => setQuickCreateCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs scale-102'
                    : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Success Confirmation Overlay */}
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-3 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-base font-bold text-stone-800">{successMsg}</h3>
            <p className="text-xs text-stone-500 font-mono">Syncing instantly across all ledgers & pipeline...</p>
          </div>
        ) : (
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {/* SALE FORM */}
            {quickCreateCategory === 'sale' && (
              <form onSubmit={handleCreateSale} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Select Customer</label>
                    <select
                      value={saleClientId}
                      onChange={e => setSaleClientId(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    >
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.bodyType})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Garment / Service</label>
                    <input
                      type="text"
                      value={saleItemName}
                      onChange={e => setSaleItemName(e.target.value)}
                      required
                      placeholder="e.g. 3-Piece Tuxedo / Silk Gown"
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={e => setSalePrice(Number(e.target.value))}
                      required
                      min={0}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">GST Rate</label>
                    <select
                      value={saleGst}
                      onChange={e => setSaleGst(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                    >
                      <option value={5}>5% (Fabric)</option>
                      <option value={12}>12% (Tailoring)</option>
                      <option value={18}>18% (Standard)</option>
                      <option value={0}>0% (Exempt)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Advance (₹)</label>
                    <input
                      type="number"
                      value={saleAdvance}
                      onChange={e => setSaleAdvance(Number(e.target.value))}
                      min={0}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="text-amber-800 font-medium">Grand Total with GST: </span>
                    <span className="font-mono font-bold text-amber-950">
                      ₹{((salePrice * (1 + saleGst / 100))).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-700">Due: {saleDueDate}</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
                >
                  <span>Post Order & Advance</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            )}

            {/* CUSTOMER FORM */}
            {quickCreateCategory === 'customer' && (
              <form onSubmit={handleCreateCustomer} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    value={custName}
                    onChange={e => setCustName(e.target.value)}
                    required
                    placeholder="e.g. Meera Kapoor"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={custPhone}
                      onChange={e => setCustPhone(e.target.value)}
                      placeholder="+91 98..."
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Body Type & Profile</label>
                    <select
                      value={custBodyType}
                      onChange={e => setCustBodyType(e.target.value as BodyType)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden capitalize"
                    >
                      <option value="female">Female (Women's Couture)</option>
                      <option value="male">Male (Men's Suiting)</option>
                      <option value="child">Child (Kids Special)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={custEmail}
                    onChange={e => setCustEmail(e.target.value)}
                    placeholder="client@luxury.in"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Quick Note / Occasion</label>
                  <input
                    type="text"
                    value={custNotes}
                    onChange={e => setCustNotes(e.target.value)}
                    placeholder="e.g. Wedding December 2026, loves raw silk"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
                >
                  <span>Save Customer & Open Profile</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            )}

            {/* QUICK MEASURE FORM */}
            {quickCreateCategory === 'measure' && (
              <form onSubmit={handleQuickMeasure} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Select Customer</label>
                  <select
                    value={measClientId}
                    onChange={e => setMeasClientId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.bodyType})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Chest (C) cm</label>
                    <input
                      type="number"
                      value={measChest}
                      onChange={e => setMeasChest(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Waist (W) cm</label>
                    <input
                      type="number"
                      value={measWaist}
                      onChange={e => setMeasWaist(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Hips (H) cm</label>
                    <input
                      type="number"
                      value={measHips}
                      onChange={e => setMeasHips(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Shoulder cm</label>
                    <input
                      type="number"
                      value={measShoulder}
                      onChange={e => setMeasShoulder(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Sleeve cm</label>
                    <input
                      type="number"
                      value={measSleeve}
                      onChange={e => setMeasSleeve(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Floor Outseam</label>
                    <input
                      type="number"
                      value={measLength}
                      onChange={e => setMeasLength(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  Tip: Auto-converts cm to inches & generates the interactive technical SVG croquis pattern.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
                >
                  <span>Lock & Save Measurement Session</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            )}

            {/* INVENTORY ITEM FORM */}
            {quickCreateCategory === 'item' && (
              <form onSubmit={handleCreateItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Item / Fabric Name *</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    required
                    placeholder="e.g. Japanese Indigo Selvedge Denim"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                    <select
                      value={itemCategory}
                      onChange={e => setItemCategory(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    >
                      <option value="FABRIC">Fabric Roll</option>
                      <option value="TRIMS">Trims (Buttons, Zippers)</option>
                      <option value="RAW_MATERIAL">Canvas / Lining</option>
                      <option value="FINISHED_GOODS">Finished Sample</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Unit</label>
                    <select
                      value={itemUnit}
                      onChange={e => setItemUnit(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    >
                      <option value="meters">Meters</option>
                      <option value="pieces">Pieces</option>
                      <option value="sets">Sets</option>
                      <option value="rolls">Rolls</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Initial Stock</label>
                    <input
                      type="number"
                      value={itemStock}
                      onChange={e => setItemStock(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Cost / Unit (₹)</label>
                    <input
                      type="number"
                      value={itemBuyRate}
                      onChange={e => setItemBuyRate(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Sell / Unit (₹)</label>
                    <input
                      type="number"
                      value={itemSellRate}
                      onChange={e => setItemSellRate(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
                >
                  <span>Add Item to Inventory</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            )}

            {/* PURCHASE FORM */}
            {quickCreateCategory === 'purchase' && (
              <form onSubmit={handleCreatePurchase} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Supplier</label>
                  <select
                    value={purSupplierId}
                    onChange={e => setPurSupplierId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Item Description</label>
                    <input
                      type="text"
                      value={purItemName}
                      onChange={e => setPurItemName(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Quantity (meters)</label>
                    <input
                      type="number"
                      value={purQty}
                      onChange={e => setPurQty(Number(e.target.value))}
                      required
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Rate per Unit (₹)</label>
                    <input
                      type="number"
                      value={purRate}
                      onChange={e => setPurRate(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">GST %</label>
                    <select
                      value={purGst}
                      onChange={e => setPurGst(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono"
                    >
                      <option value={5}>5% (Fabric ITC)</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                    </select>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-xs font-medium flex justify-between">
                  <span>PO Amount (inc. Tax):</span>
                  <span className="font-mono font-bold text-stone-900">
                    ₹{((purQty * purRate * (1 + purGst / 100))).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
                >
                  <span>Dispatch Purchase Order</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            )}

            {/* EXPENSE FORM */}
            {quickCreateCategory === 'expense' && (
              <form onSubmit={handleCreateExpense} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Expense Category</label>
                    <select
                      value={expCategory}
                      onChange={e => setExpCategory(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    >
                      <option value="Studio Supplies & Trims">Studio Supplies & Trims</option>
                      <option value="Studio Utilities & Power">Studio Utilities & Power</option>
                      <option value="Machine Maintenance & Needles">Machine Maintenance & Needles</option>
                      <option value="Courier & Client Delivery">Courier & Client Delivery</option>
                      <option value="Refreshments & Client Hospitality">Refreshments & Hospitality</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Amount (₹) *</label>
                    <input
                      type="number"
                      value={expAmount}
                      onChange={e => setExpAmount(Number(e.target.value))}
                      required
                      min={1}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono font-bold text-rose-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Paid To / Vendor</label>
                    <input
                      type="text"
                      value={expPaidTo}
                      onChange={e => setExpPaidTo(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Payment Method</label>
                    <select
                      value={expMode}
                      onChange={e => setExpMode(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono"
                    >
                      <option value="UPI">UPI (Immediate)</option>
                      <option value="CASH">Cash on Hand (Till)</option>
                      <option value="BANK">HDFC Bank Transfer</option>
                      <option value="CARD">Debit/Credit Card</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Description / Narration</label>
                  <input
                    type="text"
                    value={expDesc}
                    onChange={e => setExpDesc(e.target.value)}
                    placeholder="Reason for operational payout"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
                >
                  <span>Post Expense & Adjust Cash Flow</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
