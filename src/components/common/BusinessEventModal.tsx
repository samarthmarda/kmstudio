import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Building2,
  Users,
  CreditCard,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useERP } from '../../context/ERPContext';

type EventCategory =
  | 'CUSTOMER_ADVANCE'
  | 'SALE_ORDER'
  | 'LOAN_DISBURSED'
  | 'CAPITAL_INVESTED'
  | 'SUPPLIER_PURCHASE'
  | 'SUPPLIER_ADVANCE'
  | 'ASSET_PURCHASE'
  | 'LOAN_EMI'
  | 'OWNER_DRAWING'
  | 'SALARY_PAYROLL'
  | 'EXPENSE_PAYMENT'
  | 'CONTRA_TRANSFER';

interface EventPreset {
  id: EventCategory;
  name: string;
  category: 'IN' | 'OUT' | 'MOVE';
  icon: string;
  description: string;
  accountingImpact: string;
  cashImpact: string;
  partyType: 'CUSTOMER' | 'SUPPLIER' | 'EMPLOYEE' | 'LENDER' | 'PARTNER' | 'BANK';
}

const EVENT_PRESETS: EventPreset[] = [
  {
    id: 'CUSTOMER_ADVANCE',
    name: 'Customer Advance Received',
    category: 'IN',
    icon: '💰',
    description: 'A client paid an advance deposit before order execution.',
    accountingImpact: 'Debit Bank (Asset ↑) / Credit Customer Advance (Liability ↑). P&L is NOT affected yet!',
    cashImpact: 'Cash Inflow +',
    partyType: 'CUSTOMER'
  },
  {
    id: 'SALE_ORDER',
    name: 'Sales Invoice / Settlement',
    category: 'IN',
    icon: '🧾',
    description: 'Delivered goods or services and received payment or booked receivable.',
    accountingImpact: 'Debit Bank/Receivables / Credit Sales Revenue & GST Output Liability.',
    cashImpact: 'Cash Inflow + (if paid) / Accrual Revenue',
    partyType: 'CUSTOMER'
  },
  {
    id: 'CAPITAL_INVESTED',
    name: 'Owner / Partner Invests Capital',
    category: 'IN',
    icon: '💎',
    description: 'Promoter puts personal funds into the business bank account.',
    accountingImpact: 'Debit Bank (Asset ↑) / Credit Partner Capital (Equity ↑). NEVER treated as taxable income!',
    cashImpact: 'Cash Inflow +',
    partyType: 'PARTNER'
  },
  {
    id: 'LOAN_DISBURSED',
    name: 'Bank Loan Disbursed',
    category: 'IN',
    icon: '🏦',
    description: 'Received business loan or credit line from bank/lender.',
    accountingImpact: 'Debit Bank / Credit Loan Liability. This is borrowed money, NOT revenue.',
    cashImpact: 'Cash Inflow +',
    partyType: 'LENDER'
  },
  {
    id: 'SUPPLIER_PURCHASE',
    name: 'Supplier Raw Material Purchase',
    category: 'OUT',
    icon: '📦',
    description: 'Purchased fabrics, trims, or packaging materials from vendor.',
    accountingImpact: 'Debit Inventory & Input GST (ITC) / Credit Bank or Accounts Payable.',
    cashImpact: 'Cash Outflow - / Cost of Goods Sold',
    partyType: 'SUPPLIER'
  },
  {
    id: 'SUPPLIER_ADVANCE',
    name: 'Supplier Advance Given',
    category: 'OUT',
    icon: '⏳',
    description: 'Paid advance to fabric mill or manufacturer prior to dispatch.',
    accountingImpact: 'Debit Supplier Advance (Asset ↑) / Credit Bank. Not an expense until bill arrives!',
    cashImpact: 'Cash Outflow -',
    partyType: 'SUPPLIER'
  },
  {
    id: 'ASSET_PURCHASE',
    name: 'Fixed Asset (CapEx) Purchased',
    category: 'OUT',
    icon: '⚙️',
    description: 'Bought sewing machines, embroidery equipment, computers, or vehicles.',
    accountingImpact: 'Debit Fixed Asset (Balance Sheet) / Credit Bank. Does NOT hit monthly P&L directly; depreciates over years.',
    cashImpact: 'Cash Outflow - (CapEx)',
    partyType: 'SUPPLIER'
  },
  {
    id: 'LOAN_EMI',
    name: 'Loan EMI Repaid (Principal + Interest)',
    category: 'OUT',
    icon: '📊',
    description: 'Monthly loan installment debited by the bank.',
    accountingImpact: 'Debit Loan Liability (Principal portion) + Debit Interest Expense (P&L portion) / Credit Bank.',
    cashImpact: 'Cash Outflow - (Only Interest hits P&L)',
    partyType: 'LENDER'
  },
  {
    id: 'OWNER_DRAWING',
    name: 'Owner Drawings / Profit Withdrawal',
    category: 'OUT',
    icon: '👤',
    description: 'Partner withdraws funds for personal use.',
    accountingImpact: 'Debit Owner Drawings (Equity reduction) / Credit Bank. NOT a business expense in P&L!',
    cashImpact: 'Cash Outflow -',
    partyType: 'PARTNER'
  },
  {
    id: 'SALARY_PAYROLL',
    name: 'Staff Payroll / Master Tailor Wages',
    category: 'OUT',
    icon: '👥',
    description: 'Monthly salary disbursements to studio staff, tailors, and designers.',
    accountingImpact: 'Debit Salaries & Wages Expense (P&L) / Credit Bank or Cash.',
    cashImpact: 'Cash Outflow -',
    partyType: 'EMPLOYEE'
  },
  {
    id: 'EXPENSE_PAYMENT',
    name: 'Operating Expense (Rent, Power, Tea)',
    category: 'OUT',
    icon: '💡',
    description: 'Studio rent, electricity, maintenance, logistics, or refreshments.',
    accountingImpact: 'Debit Operating Expense (P&L) / Credit Bank or Cash.',
    cashImpact: 'Cash Outflow -',
    partyType: 'SUPPLIER'
  },
  {
    id: 'CONTRA_TRANSFER',
    name: 'Money Move (Bank ↔ Cash ↔ Bank)',
    category: 'MOVE',
    icon: '🔄',
    description: 'Withdrew cash from ATM or transferred funds between company bank accounts.',
    accountingImpact: 'Debit Destination Account / Credit Source Account. ZERO impact on P&L or Net Worth!',
    cashImpact: 'Internal Cash Shift (0 Net Cash Change)',
    partyType: 'BANK'
  }
];

export const BusinessEventModal: React.FC = () => {
  const {
    isBusinessEventModalOpen,
    setIsBusinessEventModalOpen,
    parties,
    accounts,
    logBusinessEvent,
    recordMoneyTransfer,
    recordAdvance,
    recordEquityTransaction,
    recordLoanEmiPayment,
    recordExpense,
    addPartyTimelineItem,
    updateParty
  } = useERP();

  const [selectedPresetId, setSelectedPresetId] = useState<EventCategory>('CUSTOMER_ADVANCE');
  const [filterDirection, setFilterDirection] = useState<'ALL' | 'IN' | 'OUT' | 'MOVE'>('ALL');
  const [amount, setAmount] = useState<number>(25000);
  const [partyName, setPartyName] = useState<string>('');
  const [selectedPartyId, setSelectedPartyId] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [fromAccountId, setFromAccountId] = useState<string>('acc-hdfc');
  const [toAccountId, setToAccountId] = useState<string>('acc-cash');
  const [loanPrincipal, setLoanPrincipal] = useState<number>(18000);
  const [loanInterest, setLoanInterest] = useState<number>(4500);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isBusinessEventModalOpen) return null;

  const currentPreset = EVENT_PRESETS.find(p => p.id === selectedPresetId) || EVENT_PRESETS[0];

  const filteredPresets = EVENT_PRESETS.filter(p => {
    if (filterDirection === 'ALL') return true;
    return p.category === filterDirection;
  });

  const handleSelectParty = (pId: string) => {
    setSelectedPartyId(pId);
    const p = parties.find(party => party.id === pId);
    if (p) {
      setPartyName(p.name);
    }
  };

  const handleRecordEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentPreset.id === 'CONTRA_TRANSFER') {
      recordMoneyTransfer(fromAccountId, toAccountId, amount, notes || 'Internal money transfer');
    } else if (currentPreset.id === 'CUSTOMER_ADVANCE') {
      recordAdvance({
        partyId: selectedPartyId || 'party-abc',
        partyName: partyName || 'Customer Client',
        date: new Date().toISOString().split('T')[0],
        amount,
        paymentMethod: fromAccountId === 'acc-cash' ? 'CASH' : 'BANK_TRANSFER',
        type: 'CUSTOMER_ADVANCE',
        notes: notes || 'Advance deposit received for upcoming work'
      });
    } else if (currentPreset.id === 'SUPPLIER_ADVANCE') {
      recordAdvance({
        partyId: selectedPartyId || 'party-italy',
        partyName: partyName || 'Supplier Vendor',
        date: new Date().toISOString().split('T')[0],
        amount,
        paymentMethod: fromAccountId === 'acc-cash' ? 'CASH' : 'BANK_TRANSFER',
        type: 'SUPPLIER_ADVANCE',
        notes: notes || 'Advance deposit sent to vendor'
      });
    } else if (currentPreset.id === 'CAPITAL_INVESTED') {
      recordEquityTransaction({
        date: new Date().toISOString().split('T')[0],
        partnerName: partyName || 'Chief Designer (Owner)',
        type: 'CAPITAL_IN',
        amount,
        bankAccountId: fromAccountId,
        paymentMethod: fromAccountId === 'acc-cash' ? 'CASH' : 'BANK_TRANSFER',
        notes: notes || 'Promoter equity capital infusion'
      });
    } else if (currentPreset.id === 'OWNER_DRAWING') {
      recordEquityTransaction({
        date: new Date().toISOString().split('T')[0],
        partnerName: partyName || 'Chief Designer (Owner)',
        type: 'DRAWING_OUT',
        amount,
        bankAccountId: fromAccountId,
        paymentMethod: fromAccountId === 'acc-cash' ? 'CASH' : 'BANK_TRANSFER',
        notes: notes || 'Partner personal drawings'
      });
    } else if (currentPreset.id === 'LOAN_EMI') {
      recordLoanEmiPayment('loan-machinery', loanPrincipal, loanInterest, fromAccountId);
    } else if (currentPreset.id === 'EXPENSE_PAYMENT' || currentPreset.id === 'SALARY_PAYROLL') {
      recordExpense({
        category: currentPreset.id === 'SALARY_PAYROLL' ? 'Salaries & Tailoring Wages' : 'Studio Operating Expenses',
        description: notes || `${currentPreset.name} for ${partyName || 'General'}`,
        amount,
        paymentMethod: fromAccountId === 'acc-cash' ? 'CASH' : 'BANK',
        paidTo: partyName || 'Payee'
      });
    } else {
      // General Event
      logBusinessEvent({
        eventType: currentPreset.id,
        summary: `${currentPreset.name}: ₹${amount.toLocaleString('en-IN')} - ${notes || 'Recorded transaction'}`,
        partyName: partyName || undefined,
        amount,
        moneyDirection: currentPreset.category,
        category: 'EQUITY',
        affectedWorlds: {
          cashBank: `Cash/Bank updated by ₹${amount.toLocaleString('en-IN')}`,
          accounting: currentPreset.accountingImpact,
          crm: partyName ? `Logged in ${partyName} 360° timeline` : undefined
        }
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsBusinessEventModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold tracking-tight">Record What Happened</h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Business Event Intelligence
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">
                Log real business events in plain language. The system automatically updates CRM, inventory, GST, and double-entry ledgers.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBusinessEventModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Direction Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Money Direction:</span>
            <button
              type="button"
              onClick={() => setFilterDirection('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterDirection === 'ALL'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Events ({EVENT_PRESETS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterDirection('IN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                filterDirection === 'IN'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Money Comes In</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterDirection('OUT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                filterDirection === 'OUT'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Money Goes Out</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterDirection('MOVE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                filterDirection === 'MOVE'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Money Moves</span>
            </button>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {filteredPresets.map(preset => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{preset.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        preset.category === 'IN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : preset.category === 'OUT'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {preset.category === 'IN' ? 'INFLOW' : preset.category === 'OUT' ? 'OUTFLOW' : 'TRANSFER'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">{preset.name}</div>
                </button>
              );
            })}
          </div>

          {/* Form and Real-Time Event Impact Simulator */}
          <form onSubmit={handleRecordEvent} className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            {/* Input Parameters */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <span>{currentPreset.icon}</span>
                    <span>{currentPreset.name}</span>
                  </h3>
                  <span className="text-xs text-slate-500">{currentPreset.cashImpact}</span>
                </div>
                <p className="text-xs text-slate-600">{currentPreset.description}</p>
              </div>

              {/* Amount */}
              {currentPreset.id === 'LOAN_EMI' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Principal Paid (₹)</label>
                    <input
                      type="number"
                      required
                      value={loanPrincipal}
                      onChange={e => setLoanPrincipal(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-[10px] text-slate-500">Reduces Loan Liability</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Interest Paid (₹)</label>
                    <input
                      type="number"
                      required
                      value={loanInterest}
                      onChange={e => setLoanInterest(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-[10px] text-slate-500">Hits P&L as Expense</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹ INR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={e => setAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2.5 text-base font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>
              )}

              {/* Party Selection if relevant */}
              {currentPreset.id !== 'CONTRA_TRANSFER' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Party / Counterparty ({currentPreset.partyType})
                  </label>
                  <select
                    value={selectedPartyId}
                    onChange={e => handleSelectParty(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">-- Choose from existing Parties --</option>
                    {parties.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.roles.join(', ')})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Bank Accounts */}
              {currentPreset.id === 'CONTRA_TRANSFER' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Transfer From</label>
                    <select
                      value={fromAccountId}
                      onChange={e => setFromAccountId(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} (₹{acc.balance.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Transfer To</label>
                    <select
                      value={toAccountId}
                      onChange={e => setToAccountId(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} (₹{acc.balance.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method / Bank Account</label>
                  <select
                    value={fromAccountId}
                    onChange={e => setFromAccountId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    {accounts
                      .filter(a => a.category === 'ASSET' && (a.id.includes('cash') || a.id.includes('hdfc') || a.id.includes('icici')))
                      .map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} (Bal: ₹{acc.balance.toLocaleString('en-IN')})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Narration / Business Context</label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. 50% Advance for Royal Velvet Sherwani bridal order #SO-2026-0042"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSuccess}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                    isSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.99]'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Event Logged Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Commit Business Event to OS</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Real-time Business OS Impact Preview Panel */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Layers className="w-4 h-4" />
                  <span>Real-Time Business OS Trace</span>
                </div>

                <div className="space-y-3">
                  {/* Accounting Dimension */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold text-indigo-300 uppercase">Double-Entry Accounting Rule</div>
                    <div className="text-xs text-slate-200 font-mono leading-relaxed">
                      {currentPreset.accountingImpact}
                    </div>
                  </div>

                  {/* Cash Impact Dimension */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold text-emerald-300 uppercase">Liquidity & Cash Flow Impact</div>
                    <div className="text-xs text-slate-200">
                      {currentPreset.category === 'IN' && `Increases liquid cash by ₹${amount.toLocaleString('en-IN')}`}
                      {currentPreset.category === 'OUT' &&
                        `Decreases cash balance by ₹${(currentPreset.id === 'LOAN_EMI' ? loanPrincipal + loanInterest : amount).toLocaleString('en-IN')}`}
                      {currentPreset.category === 'MOVE' && `Moves ₹${amount.toLocaleString('en-IN')} between bank/cash accounts with zero change in total net cash`}
                    </div>
                  </div>

                  {/* Connected Graph Dimension */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold text-amber-300 uppercase">Connected Business Graph</div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <p>✓ Synced to 360° Party Timeline</p>
                      <p>✓ Financial statements (P&L, Balance Sheet, Cash Flow) auto-balanced</p>
                      <p>✓ GST & Audit compliance timestamped</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-white/5 p-2.5 rounded-lg border border-white/5 flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
                <span>
                  No accounting jargon needed. When you log what happened, KMStudio keeps your taxes, cash flow, and party ledgers in perfect sync.
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
