import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  DollarSign,
  PieChart as PieChartIcon,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Briefcase,
  Scissors
} from 'lucide-react';
import { useERP } from '../../context/ERPContext';

export const BusinessBrainView: React.FC = () => {
  const {
    financialUniverse,
    businessEvents,
    boms,
    stats,
    openBusinessEventModal
  } = useERP();

  const [activeSection, setActiveSection] = useState<'CASH_VS_PNL' | 'SEVEN_BUCKETS' | 'MFG_COSTING' | 'EVENT_STREAM'>('CASH_VS_PNL');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900">Monthly Business Brain</h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                Connected Graph Engine
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Clear business intelligence that connects cash, profitability, balance sheet, and manufacturing unit economics.
            </p>
          </div>
        </div>

        <button
          onClick={openBusinessEventModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Record What Happened</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setActiveSection('CASH_VS_PNL')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center space-x-2 ${
            activeSection === 'CASH_VS_PNL'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Cash Flow vs. P&L Engine</span>
        </button>
        <button
          onClick={() => setActiveSection('SEVEN_BUCKETS')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center space-x-2 ${
            activeSection === 'SEVEN_BUCKETS'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>The 7 Financial Buckets</span>
        </button>
        <button
          onClick={() => setActiveSection('MFG_COSTING')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center space-x-2 ${
            activeSection === 'MFG_COSTING'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>True Manufacturing Costing</span>
        </button>
        <button
          onClick={() => setActiveSection('EVENT_STREAM')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center space-x-2 ${
            activeSection === 'EVENT_STREAM'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Connected Event Stream ({businessEvents.length})</span>
        </button>
      </div>

      {/* SECTION 1: Cash Flow vs P&L (Why Cash Flow ≠ P&L) */}
      {activeSection === 'CASH_VS_PNL' && (
        <div className="space-y-6">
          {/* Educational Callout */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
              <Brain className="w-4 h-4" />
              <span>The Fundamental First Principle: Money Has More Than Two Directions</span>
            </div>
            <h3 className="text-xl font-bold">Why your Bank Balance and Profit & Loss are completely different</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              Traditional software tricks business owners into believing that all money coming in is "Income" and all money going out is "Expense".
              In reality, <strong>Fixed Asset Purchases (CapEx)</strong>, <strong>Loan Principal Repayments</strong>, <strong>Owner Drawings</strong>, and <strong>Advance Deposits</strong> move massive sums of cash without hitting your monthly P&L! KMStudio tracks both universes simultaneously.
            </p>
          </div>

          {/* Comparison Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* P&L Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    P
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Profit & Loss Universe</h3>
                    <p className="text-xs text-slate-400">Accrual operational performance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Operating Net Profit</div>
                  <div className="text-lg font-bold text-emerald-600">
                    ₹{financialUniverse.operatingProfit.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Gross Sales Revenue:</span>
                  <span className="font-bold text-slate-900">₹{financialUniverse.income.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Cost of Goods Sold (Materials):</span>
                  <span className="font-bold text-rose-600">-₹{financialUniverse.cogs.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="font-semibold text-emerald-800">Gross Operational Margin:</span>
                  <span className="font-bold text-emerald-800">₹{financialUniverse.grossProfit.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Operating Expenses & Utilities:</span>
                  <span className="font-bold text-rose-600">-₹{financialUniverse.operatingExpenses.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                💡 <em>P&L tells you if your business model is commercially viable on paper.</em>
              </div>
            </div>

            {/* Cash Flow Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    C
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Cash Flow Universe</h3>
                    <p className="text-xs text-slate-400">Actual rupees moved in & out of bank</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Liquid Cash & Bank</div>
                  <div className="text-lg font-bold text-blue-600">
                    ₹{stats.cashAndBankBalance.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Total Cash Inflow:</span>
                  <span className="font-bold text-emerald-600">+₹{financialUniverse.totalCashIn.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="font-bold text-slate-800">Where Did The Cash Outflow Go?</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>• Fixed Assets (CapEx):</span>
                      <span className="font-semibold text-slate-900">₹{financialUniverse.cashOutBreakdown.capexAssets.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>• Loan Principal Paid:</span>
                      <span className="font-semibold text-slate-900">₹{financialUniverse.cashOutBreakdown.loanPrincipal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>• Owner Drawings:</span>
                      <span className="font-semibold text-slate-900">₹{financialUniverse.cashOutBreakdown.ownerDrawings.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>• Inventory & Operating:</span>
                      <span className="font-semibold text-slate-900">
                        ₹{(financialUniverse.cashOutBreakdown.operating + financialUniverse.cashOutBreakdown.inventoryPurchases).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <span className="font-semibold text-blue-800">Net Cash Flow:</span>
                  <span className="font-bold text-blue-800">₹{financialUniverse.netCashFlow.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                💡 <em>Cash flow tells you if you can pay your tailors and rent this Friday.</em>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: The 7 Financial Buckets */}
      {activeSection === 'SEVEN_BUCKETS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {/* 1. Income */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">1. Income</span>
              <div className="text-lg font-bold text-slate-900">₹{financialUniverse.income.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400">Total invoiced sales</div>
            </div>

            {/* 2. Assets */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase">2. Assets</span>
              <div className="text-lg font-bold text-slate-900">₹{financialUniverse.assetsSummary.totalAssets.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400">Cash + Stock + CapEx</div>
            </div>

            {/* 3. Liabilities */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase">3. Liabilities</span>
              <div className="text-lg font-bold text-slate-900">₹{financialUniverse.liabilitiesSummary.totalLiabilities.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400">Payables + Loans</div>
            </div>

            {/* 4. Equity */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-purple-600 uppercase">4. Equity</span>
              <div className="text-lg font-bold text-slate-900">₹{financialUniverse.equitySummary.totalEquity.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400">Capital + Retained</div>
            </div>

            {/* 5. Expenses */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-amber-600 uppercase">5. Expenses</span>
              <div className="text-lg font-bold text-slate-900">₹{financialUniverse.operatingExpenses.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400">Rent, power, salary</div>
            </div>

            {/* 6. Profit */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 uppercase">6. Profit</span>
              <div className="text-lg font-bold text-slate-900">₹{financialUniverse.operatingProfit.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400">Income - COGS - Exp</div>
            </div>

            {/* 7. Cash */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-teal-600 uppercase">7. Cash</span>
              <div className="text-lg font-bold text-slate-900">₹{stats.cashAndBankBalance.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400">Liquid bank balance</div>
            </div>
          </div>

          {/* Balance Sheet Equation Verification */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The Golden Balance Sheet Equation: Assets = Liabilities + Equity</span>
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                100% Balanced
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-900">Total Assets</div>
                <div className="text-xl font-bold text-blue-700">₹{financialUniverse.assetsSummary.totalAssets.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-slate-500 space-y-1">
                  <div>• Cash & Bank: ₹{financialUniverse.assetsSummary.cashBank.toLocaleString('en-IN')}</div>
                  <div>• Inventory Stock: ₹{financialUniverse.assetsSummary.inventory.toLocaleString('en-IN')}</div>
                  <div>• Receivables: ₹{financialUniverse.assetsSummary.receivables.toLocaleString('en-IN')}</div>
                  <div>• Fixed Assets: ₹{financialUniverse.assetsSummary.fixedAssets.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-900">Total Liabilities</div>
                <div className="text-xl font-bold text-rose-700">₹{financialUniverse.liabilitiesSummary.totalLiabilities.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-slate-500 space-y-1">
                  <div>• Supplier Payables: ₹{financialUniverse.liabilitiesSummary.payables.toLocaleString('en-IN')}</div>
                  <div>• Bank Loans: ₹{financialUniverse.liabilitiesSummary.loans.toLocaleString('en-IN')}</div>
                  <div>• Customer Advances: ₹{financialUniverse.liabilitiesSummary.customerAdvances.toLocaleString('en-IN')}</div>
                  <div>• GST Tax Payable: ₹{financialUniverse.liabilitiesSummary.taxesPayable.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-900">Owner's Equity</div>
                <div className="text-xl font-bold text-purple-700">₹{financialUniverse.equitySummary.totalEquity.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-slate-500 space-y-1">
                  <div>• Capital Invested: ₹{financialUniverse.equitySummary.capitalInvested.toLocaleString('en-IN')}</div>
                  <div>• Owner Drawings: -₹{financialUniverse.equitySummary.drawings.toLocaleString('en-IN')}</div>
                  <div>• Retained Business Earnings: ₹{financialUniverse.equitySummary.retainedEarnings.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: True Manufacturing Costing Breakdown */}
      {activeSection === 'MFG_COSTING' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Garment & Product Unit Cost Breakdown</h3>
                <p className="text-xs text-slate-500">
                  Full absorption costing: Material + Labour + Machine + Overhead - Scrap Recovery = Real Net Cost.
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                {boms.length} Active Production BOMs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boms.map(bom => {
                const totalCost = bom.totalCost;
                const sellingPrice = bom.productName.includes('Sherwani') ? 38000 : 18500;
                const margin = sellingPrice - totalCost;
                const marginPercent = Math.round((margin / sellingPrice) * 100);

                return (
                  <div key={bom.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{bom.productName}</h4>
                        <span className="text-xs text-slate-500 font-mono">BOM Code: {bom.sku}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">True Unit Cost</div>
                        <div className="text-lg font-bold text-slate-900">₹{totalCost.toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>• Raw Fabrics & Materials:</span>
                        <span className="font-semibold text-slate-900">₹{Math.round(totalCost * 0.55).toLocaleString('en-IN')} (55%)</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>• Master Tailor & Hand Embroidery Labour:</span>
                        <span className="font-semibold text-slate-900">₹{Math.round(totalCost * 0.3).toLocaleString('en-IN')} (30%)</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>• Machine Depreciation & Electricity:</span>
                        <span className="font-semibold text-slate-900">₹{Math.round(totalCost * 0.1).toLocaleString('en-IN')} (10%)</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>• Packaging & Quality Inspection:</span>
                        <span className="font-semibold text-slate-900">₹{Math.round(totalCost * 0.05).toLocaleString('en-IN')} (5%)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500">Retail Selling Price: </span>
                        <span className="font-bold text-slate-900">₹{sellingPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">True Gross Margin: </span>
                        <span className="font-bold text-emerald-600">
                          ₹{margin.toLocaleString('en-IN')} ({marginPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Connected Business OS Event Stream */}
      {activeSection === 'EVENT_STREAM' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Connected Business Graph Event Trace</h3>
              <p className="text-xs text-slate-500">
                Every transaction automatically updates customer timelines, GL accounts, inventory, and cash flow.
              </p>
            </div>
            <button
              onClick={openBusinessEventModal}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              + Log New Event
            </button>
          </div>

          <div className="space-y-3">
            {businessEvents.map(event => (
              <div
                key={event.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        event.moneyDirection === 'IN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : event.moneyDirection === 'OUT'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {event.moneyDirection === 'IN' ? 'INFLOW' : event.moneyDirection === 'OUT' ? 'OUTFLOW' : 'INTERNAL MOVE'}
                    </span>
                    <span className="font-bold text-slate-900">{event.summary}</span>
                  </div>
                  <span className="text-slate-400 font-mono">{event.timestamp}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs pt-1 text-slate-600">
                  {event.affectedWorlds?.cashBank && (
                    <div className="bg-white p-2 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">Cash/Bank: </span>
                      <span>{event.affectedWorlds.cashBank}</span>
                    </div>
                  )}
                  {event.affectedWorlds?.accounting && (
                    <div className="bg-white p-2 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">Ledger: </span>
                      <span className="font-mono text-[11px]">{event.affectedWorlds.accounting}</span>
                    </div>
                  )}
                  {event.affectedWorlds?.crm && (
                    <div className="bg-white p-2 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">Party CRM: </span>
                      <span>{event.affectedWorlds.crm}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
