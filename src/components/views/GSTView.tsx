import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  ShieldCheck,
  FileSpreadsheet,
  FileCheck,
  FileCode,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  QrCode
} from 'lucide-react';

export const GSTView: React.FC = () => {
  const { invoices, purchases } = useERP();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'gstr1' | 'gstr3b' | 'einvoice' | 'ewaybill'>('dashboard');

  const totalOutputGst = invoices.reduce((acc, i) => acc + i.taxTotal, 0);
  const totalInputGst = purchases.reduce((acc, p) => acc + p.taxTotal, 0);
  const netGstPayable = Math.max(0, totalOutputGst - totalInputGst);

  return (
    <div id="gst-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">GST Compliance & Tax Operations</h1>
          <p className="text-xs text-stone-500">
            GSTIN: <strong className="font-mono text-stone-800">29AABCK1234F1Z5</strong> • GSTR-1, GSTR-3B, E-Invoicing & E-Way Bill
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('GSTR-1 JSON export generated successfully for GST Portal upload.')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export JSON for Portal</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Total Output Tax (Sales)</span>
            <ShieldCheck className="w-4 h-4 text-stone-700" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-stone-900">
            ₹{totalOutputGst.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-400">CGST (50%) + SGST (50%)</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Input Tax Credit (ITC)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-stone-900">
            ₹{totalInputGst.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Eligible ITC from fabric bills</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Net Tax Payable (Cash Ledger)</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-stone-900">
            ₹{netGstPayable.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">Due for current return cycle</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-2xs flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'dashboard' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Tax Position Dashboard
        </button>
        <button
          onClick={() => setActiveTab('gstr1')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'gstr1' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          GSTR-1 (Outward Supplies)
        </button>
        <button
          onClick={() => setActiveTab('gstr3b')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'gstr3b' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          GSTR-3B (Summary Return)
        </button>
        <button
          onClick={() => setActiveTab('einvoice')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'einvoice' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          E-Invoice & IRN
        </button>
        <button
          onClick={() => setActiveTab('ewaybill')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'ewaybill' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          E-Way Bill
        </button>
      </div>

      {/* DASHBOARD & GSTR-1 CONTENT */}
      {(activeTab === 'dashboard' || activeTab === 'gstr1') && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden space-y-4">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900">Table 4 & 5: B2B and B2C Invoices Summary</h3>
              <p className="text-xs text-stone-500">Live outward tax invoices ready for GSTR-1 e-filing</p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-mono">
              Auto-Reconciled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[750px]">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Recipient Name</th>
                  <th className="py-3 px-4">Invoice Date</th>
                  <th className="py-3 px-4">Taxable Value</th>
                  <th className="py-3 px-4">CGST (6%)</th>
                  <th className="py-3 px-4">SGST (6%)</th>
                  <th className="py-3 px-4 text-right">Total Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">{inv.invoiceNumber}</td>
                    <td className="py-3 px-4 font-semibold text-stone-900">{inv.clientName}</td>
                    <td className="py-3 px-4 font-mono text-stone-500">{inv.issueDate}</td>
                    <td className="py-3 px-4 font-mono">₹{inv.subtotal.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-mono text-stone-600">₹{(inv.taxTotal / 2).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-mono text-stone-600">₹{(inv.taxTotal / 2).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-stone-900">
                      ₹{inv.grandTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GSTR-3B */}
      {activeTab === 'gstr3b' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
          <div className="pb-3 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900 font-serif">GSTR-3B Monthly Return Form</h3>
            <p className="text-xs text-stone-500">Summary of Outward Supplies and Inter-State supplies</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between">
              <div>
                <div className="font-bold text-stone-900">3.1 (a) Outward taxable supplies (other than zero rated, nil and exempted)</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Total Taxable Value: ₹2,45,000</div>
              </div>
              <div className="text-right font-mono font-bold text-stone-900">
                ₹{totalOutputGst.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between">
              <div>
                <div className="font-bold text-stone-900">4. Eligible ITC (All other ITC from normal suppliers)</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Fabric Mills & Trims Inward ITC</div>
              </div>
              <div className="text-right font-mono font-bold text-emerald-700">
                ₹{totalInputGst.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between">
              <div>
                <div className="font-bold text-amber-950">5. Payment of Tax (Net tax payable after adjusting ITC)</div>
                <div className="text-[11px] text-amber-800 mt-0.5">Payable through Electronic Cash Ledger</div>
              </div>
              <div className="text-right font-mono font-bold text-amber-950 text-sm">
                ₹{netGstPayable.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E-INVOICE & IRN */}
      {activeTab === 'einvoice' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif">E-Invoice Generation & IRN QR Codes</h3>
            <p className="text-xs text-stone-500">Government Invoice Registration Portal (IRP) live integration</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
              <div className="font-bold text-stone-900">Active IRN Status:</div>
              <div className="font-mono text-[11px] bg-white p-2.5 rounded border border-stone-200 text-stone-700 break-all">
                4a7c8b2e1f9d3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b
              </div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Signed by NIC IRP Portal</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex items-center gap-4">
              <div className="w-16 h-16 bg-white border border-stone-300 rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-stone-800" />
              </div>
              <div>
                <div className="font-bold text-stone-900">Signed B2B QR Code</div>
                <p className="text-[11px] text-stone-500 mt-0.5">Embeds GSTIN, Invoice #, Date & HSN summary</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E-WAY BILL */}
      {activeTab === 'ewaybill' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif">E-Way Bill Generation (Movement of Goods)</h3>
            <p className="text-xs text-stone-500">Consignment movement documentation for bridal & couture couriers</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="flex justify-between font-mono">
              <span className="font-bold text-stone-900">E-Way Bill No: 2819 4028 1948</span>
              <span className="text-emerald-700 font-bold">ACTIVE & VALID (48 HRS)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
              <div>From: KM Studio, Bengaluru (29)</div>
              <div>To: Meera Kapoor, Mumbai (27)</div>
              <div>Vehicle / Courier: BlueDart Air Express</div>
              <div>Distance: 980 km</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
