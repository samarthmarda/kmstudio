import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  BookOpen,
  FileText,
  Landmark,
  FileBarChart,
  Plus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { AccountingVoucher, Account, VoucherType } from '../../types/erp';

export const AccountingView: React.FC = () => {
  const {
    vouchers,
    accounts,
    stats,
    recordVoucher,
    openQuickCreate
  } = useERP();

  const [activeTab, setActiveTab] = useState<'vouchers' | 'accounts' | 'reports'>('vouchers');

  // Quick Voucher state
  const [isCreatingVoucher, setIsCreatingVoucher] = useState(false);
  const [vType, setVType] = useState<VoucherType>('JOURNAL');
  const [vNarration, setVNarration] = useState('');
  const [vDebitAcc, setVDebitAcc] = useState('acc-bank-1');
  const [vCreditAcc, setVCreditAcc] = useState('acc-rev-1');
  const [vAmount, setVAmount] = useState(15000);

  const handleCreateVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const debAccObj = accounts.find(a => a.id === vDebitAcc) || accounts[0];
    const credAccObj = accounts.find(a => a.id === vCreditAcc) || accounts[1];

    recordVoucher({
      date: new Date().toISOString().split('T')[0],
      type: vType,
      narration: vNarration.trim() || 'Manual Journal Voucher entry',
      rows: [
        {
          accountId: debAccObj.id,
          accountName: debAccObj.name,
          debit: vAmount,
          credit: 0
        },
        {
          accountId: credAccObj.id,
          accountName: credAccObj.name,
          debit: 0,
          credit: vAmount
        }
      ],
      totalAmount: vAmount,
      user: 'Studio Accountant'
    });

    setIsCreatingVoucher(false);
    setVNarration('');
  };

  return (
    <div id="accounting-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">Accounting & Financial Books</h1>
          <p className="text-xs text-stone-500">Double-entry vouchers, Chart of Accounts, Ledgers & Profit and Loss</p>
        </div>

        <button
          onClick={() => setIsCreatingVoucher(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>New Journal Voucher</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-2xs flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('vouchers')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'vouchers' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Vouchers & Journals ({vouchers.length})
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'accounts' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Chart of Accounts ({accounts.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'reports' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Financial Reports (P&L, Balance Sheet)
        </button>
      </div>

      {/* NEW VOUCHER MODAL */}
      {isCreatingVoucher && (
        <form
          onSubmit={handleCreateVoucherSubmit}
          className="bg-white p-5 rounded-2xl border-2 border-stone-900 shadow-xl space-y-4 text-xs animate-in zoom-in-95"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-bold text-sm text-stone-900">Post Double-Entry Accounting Voucher</h3>
            <button
              type="button"
              onClick={() => setIsCreatingVoucher(false)}
              className="text-stone-400 hover:text-stone-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Voucher Type</label>
              <select
                value={vType}
                onChange={e => setVType(e.target.value as VoucherType)}
                className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50"
              >
                <option value="JOURNAL">Journal Voucher (General)</option>
                <option value="PAYMENT">Payment Voucher (Outflow)</option>
                <option value="RECEIPT">Receipt Voucher (Inflow)</option>
                <option value="CONTRA">Contra (Bank to Cash)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Debit Account (Dr)</label>
              <select
                value={vDebitAcc}
                onChange={e => setVDebitAcc(e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50"
              >
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.code} - {a.name} ({a.type})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Credit Account (Cr)</label>
              <select
                value={vCreditAcc}
                onChange={e => setVCreditAcc(e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50"
              >
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.code} - {a.name} ({a.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                value={vAmount}
                onChange={e => setVAmount(Number(e.target.value))}
                required
                min={1}
                className="w-full p-2 rounded-lg border border-stone-300 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Narration / Remarks</label>
              <input
                type="text"
                value={vNarration}
                onChange={e => setVNarration(e.target.value)}
                placeholder="Reason for financial journal entry"
                className="w-full p-2 rounded-lg border border-stone-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 text-white rounded-lg font-bold shadow-xs hover:bg-stone-800"
            >
              Post Voucher
            </button>
          </div>
        </form>
      )}

      {/* VOUCHERS TAB */}
      {activeTab === 'vouchers' && (
        <div className="space-y-4">
          {vouchers.map(v => (
            <div
              key={v.id}
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-900">{v.voucherNumber}</span>
                  <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono font-semibold">
                    {v.type}
                  </span>
                </div>
                <div className="text-stone-400 text-[11px] font-mono">{v.date}</div>
              </div>

              <div className="space-y-1">
                {v.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-stone-50 p-2 rounded text-stone-700 font-mono"
                  >
                    <div>
                      <span className="font-semibold text-stone-900 font-sans">{row.accountName}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {row.debit > 0 && (
                        <span className="font-bold text-emerald-700">
                          Dr: ₹{row.debit.toLocaleString('en-IN')}
                        </span>
                      )}
                      {row.credit > 0 && (
                        <span className="font-bold text-blue-700">
                          Cr: ₹{row.credit.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-stone-500 italic">
                Narration: {v.narration}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CHART OF ACCOUNTS TAB */}
      {activeTab === 'accounts' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Account Code</th>
                  <th className="py-3 px-4">Account Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Current Ledger Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {accounts.map(acc => (
                  <tr key={acc.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">{acc.code}</td>
                    <td className="py-3 px-4 font-semibold text-stone-900">{acc.name}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                        {acc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-stone-900">
                      ₹{acc.balance.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FINANCIAL REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PROFIT & LOSS */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
            <div className="pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-stone-900 font-serif">Profit & Loss Statement</h3>
              <p className="text-xs text-stone-500">Operating revenue vs direct materials and operating expenses</p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-stone-900 uppercase text-[10px] tracking-wider text-emerald-700">
                Revenue from Operations
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>Bespoke Garments & Tailoring Sales</span>
                <span className="font-mono font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
              </div>

              <div className="font-bold text-stone-900 uppercase text-[10px] tracking-wider text-rose-700 pt-2">
                Cost of Goods & Expenses
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>Fabric & Raw Material Purchases</span>
                <span className="font-mono text-rose-600">₹88,200</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>Studio Operating & Trim Expenses</span>
                <span className="font-mono text-rose-600">₹27,700</span>
              </div>

              <div className="pt-3 border-t-2 border-stone-900 flex justify-between text-sm font-bold text-stone-900">
                <span>Net Operating Profit:</span>
                <span className="font-mono text-emerald-700">
                  ₹{(stats.totalRevenue - 115900).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* BALANCE SHEET SUMMARY */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
            <div className="pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-stone-900 font-serif">Balance Sheet Summary</h3>
              <p className="text-xs text-stone-500">Assets, Liabilities and Partner Equity</p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-stone-900 uppercase text-[10px] tracking-wider text-blue-700">
                Current Assets
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>Cash & Bank Balances</span>
                <span className="font-mono font-bold">₹{stats.cashAndBankBalance.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>Fabric Stock Valuation</span>
                <span className="font-mono font-bold">₹2,85,000</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>Accounts Receivable</span>
                <span className="font-mono font-bold">₹{stats.totalReceivables.toLocaleString('en-IN')}</span>
              </div>

              <div className="font-bold text-stone-900 uppercase text-[10px] tracking-wider text-amber-700 pt-2">
                Liabilities & Equity
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>Supplier Payables</span>
                <span className="font-mono">₹45,000</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-stone-50">
                <span>GST Tax Liability</span>
                <span className="font-mono">₹28,600</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
