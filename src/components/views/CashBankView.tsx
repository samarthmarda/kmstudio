import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Wallet,
  Landmark,
  ArrowDownToLine,
  ArrowUpFromLine,
  Receipt,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowRightLeft,
  DollarSign,
  Layers,
  Sparkles,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const CashBankView: React.FC = () => {
  const {
    accounts,
    vouchers,
    invoices,
    suppliers,
    loans,
    ownerEquity,
    advances,
    recordMoneyTransfer,
    recordLoanEmiPayment,
    openBusinessEventModal,
    openQuickCreate,
    stats
  } = useERP();

  const [activeTab, setActiveTab] = useState<
    'accounts' | 'transfers' | 'loans' | 'equity' | 'advances' | 'expenses' | 'receivables' | 'payables'
  >('accounts');

  // Contra transfer form
  const [fromAcc, setFromAcc] = useState('acc-hdfc');
  const [toAcc, setToAcc] = useState('acc-cash');
  const [transferAmount, setTransferAmount] = useState(15000);
  const [transferNotes, setTransferNotes] = useState('');

  const bankAndCashAccounts = accounts.filter(a => a.type === 'BANK' || a.type === 'CASH');
  const pendingInvoices = invoices.filter(i => i.paidAmount < i.grandTotal);
  const expenseVouchers = vouchers.filter(v => v.type === 'PAYMENT');
  const contraVouchers = vouchers.filter(v => v.type === 'CONTRA');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromAcc === toAcc || transferAmount <= 0) return;
    recordMoneyTransfer(fromAcc, toAcc, Number(transferAmount), transferNotes || 'Contra transfer between accounts');
    setTransferNotes('');
  };

  return (
    <div id="cash-bank-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Money, Cash & Bank Moves</h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Multi-Directional
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Bank accounts, money moves (bank↔cash), business loans, promoter capital & advances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openBusinessEventModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Record What Happened</span>
          </button>
          <button
            onClick={() => openQuickCreate('expense')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Liquid Cash & Bank</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            ₹{stats.cashAndBankBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">Total available liquidity across accounts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-blue-600 font-semibold">
            <span>Customer Advances</span>
            <ArrowDownRight className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-700">
            ₹{advances.filter(a => a.type === 'CUSTOMER_ADVANCE').reduce((s, a) => s + a.amount, 0).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">Cash received before delivery</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-600 font-semibold">
            <span>Bank Loans Owed</span>
            <Landmark className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-700">
            ₹{loans.reduce((s, l) => s + l.outstandingPrincipal, 0).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">Active bank borrowing liabilities</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-indigo-600 font-semibold">
            <span>Promoter Equity</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-700">
            ₹{ownerEquity.reduce((s, e) => s + (e.type === 'CAPITAL_IN' ? e.amount : -e.amount), 0).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">Net capital invested in business</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('accounts')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'accounts' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Bank & Cash Accounts ({bankAndCashAccounts.length})
        </button>
        <button
          onClick={() => setActiveTab('transfers')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'transfers' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Money Moves / Contra ({contraVouchers.length})
        </button>
        <button
          onClick={() => setActiveTab('loans')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'loans' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Bank Loans & EMIs ({loans.length})
        </button>
        <button
          onClick={() => setActiveTab('equity')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'equity' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Owner Capital & Drawings ({ownerEquity.length})
        </button>
        <button
          onClick={() => setActiveTab('advances')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'advances' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Advances & Deposits ({advances.length})
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'expenses' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Expenses ({expenseVouchers.length})
        </button>
        <button
          onClick={() => setActiveTab('receivables')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'receivables' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Receivables ({pendingInvoices.length})
        </button>
        <button
          onClick={() => setActiveTab('payables')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'payables' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Payables ({suppliers.length})
        </button>
      </div>

      {/* 1. ACCOUNTS TAB */}
      {activeTab === 'accounts' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bankAndCashAccounts.map(acc => (
            <div
              key={acc.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                  {acc.type === 'BANK' ? <Landmark className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                </div>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono uppercase font-bold text-slate-700">
                  {acc.type}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{acc.name}</h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">Code: {acc.code}</div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-xs text-slate-500">Available Balance:</span>
                <span className="font-mono font-bold text-base text-slate-900">
                  ₹{acc.balance.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. TRANSFERS TAB (CONTRA MOVES) */}
      {activeTab === 'transfers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Transfer Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Transfer Money Between Accounts</h3>
            </div>
            <p className="text-xs text-slate-500">
              Shift funds between Bank accounts or ATM cash withdrawals. Zero effect on P&L!
            </p>

            <form onSubmit={handleTransfer} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transfer From</label>
                <select
                  value={fromAcc}
                  onChange={e => setFromAcc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  {bankAndCashAccounts.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} (Bal: ₹{a.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transfer To</label>
                <select
                  value={toAcc}
                  onChange={e => setToAcc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  {bankAndCashAccounts.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} (Bal: ₹{a.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transfer Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={transferAmount}
                  onChange={e => setTransferAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-bold rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Narration</label>
                <input
                  type="text"
                  placeholder="e.g. Branch cash counter replenishment"
                  value={transferNotes}
                  onChange={e => setTransferNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Execute Contra Transfer
              </button>
            </form>
          </div>

          {/* Contra History Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Contra Transfer Logs</h3>
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {contraVouchers.map(v => (
                <div key={v.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{v.narration}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{v.voucherNumber} • {v.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-700 font-mono">₹{v.totalAmount.toLocaleString('en-IN')}</div>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">CONTRA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. LOANS & EMIs TAB */}
      {activeTab === 'loans' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loans.map(loan => (
              <div key={loan.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{loan.lenderName}</h3>
                    <p className="text-xs text-purple-600 font-semibold">{loan.type.replace('_', ' ')}</p>
                    <p className="text-[10px] text-slate-400 font-mono">A/c: {loan.loanNumber}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
                  <div>
                    <div className="text-slate-400">Total Sanctioned:</div>
                    <div className="font-bold text-slate-900">₹{loan.principalAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Remaining Bal:</div>
                    <div className="font-bold text-purple-700">₹{loan.outstandingPrincipal.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Interest Rate:</div>
                    <div className="font-bold text-slate-900">{loan.interestRatePercent}% p.a.</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-500">Monthly EMI: </span>
                    <span className="font-bold text-slate-900">₹{loan.monthlyEmi.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={() => recordLoanEmiPayment(loan.id, Math.round(loan.monthlyEmi * 0.8), Math.round(loan.monthlyEmi * 0.2), 'acc-hdfc')}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-sm transition-all"
                  >
                    Pay EMI (Split P&L)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. OWNER CAPITAL & DRAWINGS TAB */}
      {activeTab === 'equity' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Promoter Capital & Drawings Register</h3>
              <p className="text-xs text-slate-500">
                Direct balance sheet transactions: Capital contributions and personal withdrawals without taxable P&L distortion.
              </p>
            </div>
            <button
              onClick={openBusinessEventModal}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              + Record Capital / Drawing
            </button>
          </div>

          <div className="space-y-3">
            {ownerEquity.map(item => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{item.partnerName}</div>
                  <div className="text-slate-500">{item.notes}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.date}</div>
                </div>

                <div className="text-right">
                  <div className={`font-bold font-mono text-sm ${item.type === 'CAPITAL_IN' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {item.type === 'CAPITAL_IN' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${item.type === 'CAPITAL_IN' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {item.type === 'CAPITAL_IN' ? 'EQUITY CAPITAL' : 'OWNER DRAWING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ADVANCES & DEPOSITS TAB */}
      {activeTab === 'advances' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Customer & Supplier Advance Deposits</h3>
              <p className="text-xs text-slate-500">
                Advances booked as balance sheet liabilities/assets until final invoices/bills are settled.
              </p>
            </div>
            <button
              onClick={openBusinessEventModal}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              + Record Advance
            </button>
          </div>

          <div className="space-y-3">
            {advances.map(adv => (
              <div key={adv.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{adv.partyName}</div>
                  <div className="text-slate-500">{adv.notes}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{adv.date} • Method: {adv.paymentMethod}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-blue-700 font-mono text-sm">
                    ₹{adv.amount.toLocaleString('en-IN')}
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${adv.type === 'CUSTOMER_ADVANCE' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                    {adv.type === 'CUSTOMER_ADVANCE' ? 'CUSTOMER ADVANCE' : 'SUPPLIER ADVANCE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. EXPENSES TAB */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[750px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Voucher #</th>
                  <th className="py-3 px-4">Description / Narration</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenseVouchers.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-500">{exp.date}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{exp.voucherNumber}</td>
                    <td className="py-3 px-4 text-slate-700">{exp.narration}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                      -₹{exp.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. RECEIVABLES TAB */}
      {activeTab === 'receivables' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[750px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Invoice Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Total Bill</th>
                  <th className="py-3 px-4">Paid</th>
                  <th className="py-3 px-4 text-right">Pending Receivable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{inv.clientName}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{inv.issueDate}</td>
                    <td className="py-3 px-4 font-mono text-rose-600 font-medium">{inv.dueDate}</td>
                    <td className="py-3 px-4 font-mono">₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-mono text-emerald-700">₹{inv.paidAmount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 text-sm">
                      ₹{(inv.grandTotal - inv.paidAmount).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. PAYABLES TAB */}
      {activeTab === 'payables' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[750px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Supplier / Mill</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">GSTIN</th>
                  <th className="py-3 px-4 text-right">Payable Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.map(sup => (
                  <tr key={sup.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{sup.name}</td>
                    <td className="py-3 px-4 text-slate-600">{sup.category}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{sup.gstin}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 text-sm">
                      ₹{sup.balanceDue.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
