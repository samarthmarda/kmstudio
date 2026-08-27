import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  ShoppingCart,
  Plus,
  Search,
  FileText,
  Printer,
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { SalesOrder, Invoice, OrderStatus, SalesOrderStatus } from '../../types/erp';

export const SalesView: React.FC = () => {
  const {
    orders,
    invoices,
    clients,
    updateOrderStatus,
    openQuickCreate,
    setSelectedClientId,
    setCurrentTab
  } = useERP();

  const [activeTab, setActiveTab] = useState<'orders' | 'invoices'>('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredOrders = orders.filter(
    o =>
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvoices = invoices.filter(
    i =>
      i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-stone-100 text-stone-700';
      case 'CONFIRMED':
        return 'bg-blue-50 text-blue-700';
      case 'IN_PROGRESS':
        return 'bg-amber-50 text-amber-800';
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-800';
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-700';
      default:
        return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div id="sales-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">Sales & Order Management</h1>
          <p className="text-xs text-stone-500">Bespoke customer orders, production tracking, and GST tax invoices</p>
        </div>

        <button
          onClick={() => openQuickCreate('sale')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>New Sales Order</span>
        </button>
      </div>

      {/* Sub Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Sales Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'invoices'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Tax Invoices ({invoices.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search orders or invoices..."
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
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Garment / Items</th>
                  <th className="py-3 px-4">Delivery Target</th>
                  <th className="py-3 px-4">Grand Total</th>
                  <th className="py-3 px-4">Production Status</th>
                  <th className="py-3 px-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {filteredOrders.map(order => {
                  const matchingInv = invoices.find(i => i.orderId === order.id);
                  return (
                    <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-stone-900">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setSelectedClientId(order.clientId);
                            setCurrentTab('customer_detail');
                          }}
                          className="font-semibold text-stone-900 hover:text-amber-700 text-left"
                        >
                          {order.clientName}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-stone-700">
                        {order.items.map(it => it.name).join(', ')}
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-500">
                        {order.dueDate}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-stone-900">
                        ₹{order.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border border-stone-200 focus:outline-hidden uppercase ${getStatusColor(
                            order.status
                          )}`}
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {matchingInv ? (
                          <button
                            onClick={() => setSelectedInvoice(matchingInv)}
                            className="inline-flex items-center gap-1 text-amber-600 font-semibold hover:underline"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View {matchingInv.invoiceNumber}</span>
                          </button>
                        ) : (
                          <span className="text-stone-400 text-[11px]">Uninvoiced</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INVOICES TAB */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Invoice Date</th>
                  <th className="py-3 px-4">Tax (CGST+SGST)</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4 text-right">Print / View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      {inv.clientName}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-500">
                      {inv.issueDate}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-600">
                      ₹{inv.taxTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      ₹{inv.grandTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inv.status === 'PARTIALLY_PAID'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {inv.status} (Paid: ₹{inv.paidAmount.toLocaleString('en-IN')})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium text-[11px] inline-flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Bill</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PRINTABLE GST TAX INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">Official GST Tax Invoice Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-xs font-bold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1 rounded text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Body */}
            <div className="p-8 overflow-y-auto space-y-6 text-xs text-stone-800 font-sans print:p-0">
              {/* Studio Header */}
              <div className="flex justify-between items-start pb-4 border-b-2 border-stone-900">
                <div>
                  <h2 className="text-xl font-bold text-stone-950 font-serif tracking-tight">KM STUDIO & ATELIER</h2>
                  <p className="text-stone-500 text-[11px] mt-0.5">Bespoke Couture & Luxury Suiting House</p>
                  <p className="text-stone-600 text-[11px] mt-1">42 Indiranagar 100ft Road, Bengaluru 560038</p>
                  <p className="font-mono text-[11px] text-stone-900 font-semibold">GSTIN: 29AABCK1234F1Z5 • State Code: 29</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-stone-900">{selectedInvoice.invoiceNumber}</div>
                  <div className="text-stone-500 text-[11px]">Date: {selectedInvoice.invoiceDate}</div>
                  <div className="text-stone-500 text-[11px]">Due: {selectedInvoice.dueDate}</div>
                  <div className="mt-2 inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">
                    Status: {selectedInvoice.status}
                  </div>
                </div>
              </div>

              {/* Bill To Info */}
              <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase">Billed To (Customer)</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{selectedInvoice.clientName}</div>
                  <div className="text-stone-600 text-[11px] mt-0.5">Studio Client Profile</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-stone-400 font-bold uppercase">Place of Supply</div>
                  <div className="font-semibold text-stone-900">Karnataka (29) - Intra-State</div>
                  <div className="text-stone-500 text-[11px]">Reverse Charge: No</div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 text-[11px] font-bold text-stone-600">
                    <th className="py-2">Item Description</th>
                    <th className="py-2">HSN / SAC</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price (₹)</th>
                    <th className="py-2 text-right">GST</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {selectedInvoice.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-semibold text-stone-900">{it.name}</td>
                      <td className="py-2.5 font-mono text-stone-500">998822</td>
                      <td className="py-2.5 text-center font-mono">{it.quantity}</td>
                      <td className="py-2.5 text-right font-mono">₹{it.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 text-right font-mono text-stone-600">{it.gstRate}%</td>
                      <td className="py-2.5 text-right font-mono font-bold">₹{it.lineTotal.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Calculation */}
              <div className="flex justify-end pt-2">
                <div className="w-72 space-y-2 border-t border-stone-300 pt-3">
                  <div className="flex justify-between text-stone-600">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono">₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>CGST (6%):</span>
                    <span className="font-mono">₹{(selectedInvoice.taxTotal / 2).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>SGST (6%):</span>
                    <span className="font-mono">₹{(selectedInvoice.taxTotal / 2).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-950 border-t border-stone-400 pt-2">
                    <span>Grand Total:</span>
                    <span className="font-mono">₹{selectedInvoice.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded">
                    <span>Paid Advance:</span>
                    <span className="font-mono">₹{selectedInvoice.paidAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-stone-900">
                    <span>Balance Due on Fitting:</span>
                    <span className="font-mono">
                      ₹{(selectedInvoice.grandTotal - selectedInvoice.paidAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Note & Bank Details */}
              <div className="border-t border-stone-200 pt-4 flex justify-between items-end text-[10px] text-stone-500">
                <div>
                  <div className="font-bold text-stone-700 mb-1">Bank Payment Details:</div>
                  <div>Bank: HDFC Bank Ltd • Branch: Indiranagar</div>
                  <div>A/C No: 50200049281920 • IFSC: HDFC0001234</div>
                  <div>UPI ID: kmstudio@hdfcbank</div>
                </div>
                <div className="text-right">
                  <div className="h-10 border-b border-stone-400 w-36 mb-1"></div>
                  <div className="font-semibold text-stone-700">Authorised Signatory</div>
                  <div>KM Studio & Atelier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
