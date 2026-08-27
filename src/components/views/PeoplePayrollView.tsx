import React, { useState } from 'react';
import {
  Users,
  Plus,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  Building,
  Sparkles,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldAlert,
  Download
} from 'lucide-react';
import { useERP } from '../../context/ERPContext';
import { Employee, EmployeeExpenseClaim } from '../../types/erp';

export const PeoplePayrollView: React.FC = () => {
  const {
    employees,
    expenseClaims,
    addEmployee,
    recordExpenseClaim,
    reimburseExpenseClaim,
    accounts,
    openBusinessEventModal
  } = useERP();

  const [activeTab, setActiveTab] = useState<'EMPLOYEES' | 'PAYROLL' | 'CLAIMS'>('EMPLOYEES');
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddClaimModalOpen, setIsAddClaimModalOpen] = useState(false);

  // New Employee Form State
  const [empName, setEmpName] = useState('');
  const [department, setDepartment] = useState('Production');
  const [designation, setDesignation] = useState('Master Tailor');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [basicSalary, setBasicSalary] = useState(35000);
  const [hra, setHra] = useState(10000);
  const [allowances, setAllowances] = useState(5000);
  const [deductions, setDeductions] = useState(2500);

  // New Claim Form State
  const [claimEmpId, setClaimEmpId] = useState(employees[0]?.id || '');
  const [claimCategory, setClaimCategory] = useState<'TRAVEL' | 'FOOD_CLIENT' | 'SUPPLIES' | 'MISC'>('SUPPLIES');
  const [claimAmount, setClaimAmount] = useState(1500);
  const [claimDesc, setClaimDesc] = useState('');

  const totalMonthlyPayroll = employees.reduce((sum, e) => sum + e.netSalary, 0);
  const totalClaimsPending = expenseClaims
    .filter(c => c.status === 'SUBMITTED' || c.status === 'APPROVED')
    .reduce((sum, c) => sum + c.amount, 0);

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName.trim()) return;

    const netSalary = Number(basicSalary) + Number(hra) + Number(allowances) - Number(deductions);

    addEmployee({
      employeeCode: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      name: empName,
      department,
      designation,
      phone,
      email,
      dateOfJoining: new Date().toISOString().split('T')[0],
      joiningDate: new Date().toISOString().split('T')[0],
      basicSalary: Number(basicSalary),
      hra: Number(hra),
      allowances: Number(allowances),
      deductions: Number(deductions),
      netSalary,
      bankAccountNumber: '50100492819234',
      bankIfsc: 'HDFC0000128',
      bankAccountDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '50100492819234',
        ifsc: 'HDFC0000128'
      },
      status: 'ACTIVE',
      totalAdvancesDue: 0
    });

    setIsAddEmployeeModalOpen(false);
    setEmpName('');
    setPhone('');
    setEmail('');
  };

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimDesc.trim()) return;

    const emp = employees.find(e => e.id === claimEmpId) || employees[0];

    recordExpenseClaim({
      employeeId: emp.id,
      employeeName: emp.name,
      date: new Date().toISOString().split('T')[0],
      category: claimCategory,
      amount: Number(claimAmount),
      description: claimDesc
    });

    setIsAddClaimModalOpen(false);
    setClaimDesc('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">People, Payroll & Team Claims</h1>
            <p className="text-sm text-slate-500">
              Manage master tailors, designers, monthly wage disbursements, and out-of-pocket expense reimbursements.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={openBusinessEventModal}
            className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl text-sm border border-blue-200 transition-colors flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Record Payroll Event</span>
          </button>
          <button
            onClick={() => setIsAddEmployeeModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Studio Team</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{employees.length} Staff Members</div>
          <div className="text-xs text-slate-400 mt-1">Master tailors, cutters & studio artisans</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Monthly Payroll Liability</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">₹{totalMonthlyPayroll.toLocaleString('en-IN')}/mo</div>
          <div className="text-xs text-slate-400 mt-1">Net wages calculated and scheduled</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending Expense Claims</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">₹{totalClaimsPending.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 mt-1">Awaiting review and reimbursement</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setActiveTab('EMPLOYEES')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'EMPLOYEES'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Directory ({employees.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('PAYROLL')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'PAYROLL'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Monthly Salary Sheet</span>
        </button>
        <button
          onClick={() => setActiveTab('CLAIMS')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'CLAIMS'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Expense Claims & Reimbursements ({expenseClaims.length})</span>
        </button>
      </div>

      {/* Tab 1: Staff Directory */}
      {activeTab === 'EMPLOYEES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map(emp => (
            <div
              key={emp.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{emp.name}</h3>
                  <p className="text-xs text-blue-600 font-semibold">{emp.designation}</p>
                  <p className="text-xs text-slate-400 font-mono">{emp.employeeCode}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {emp.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Department:</span>
                  <span className="font-semibold text-slate-900">{emp.department}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Joined:</span>
                  <span className="font-semibold text-slate-900">{emp.joiningDate}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Net Salary:</span>
                  <span className="font-bold text-blue-700">₹{emp.netSalary.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <div>Phone: {emp.phone}</div>
                <div>Bank: {emp.bankAccountDetails?.bankName || 'Direct Deposit'} (A/c: ••••{(emp.bankAccountNumber || emp.bankAccountDetails?.accountNumber || '1234').slice(-4)})</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Monthly Salary Sheet */}
      {activeTab === 'PAYROLL' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Monthly Payroll Register</h3>
              <p className="text-xs text-slate-500">
                Transparent gross-to-net salary calculations compliant with studio standard deductions.
              </p>
            </div>
            <button
              onClick={openBusinessEventModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Disburse Monthly Wages</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4 text-right">Basic</th>
                  <th className="py-3 px-4 text-right">HRA</th>
                  <th className="py-3 px-4 text-right">Allowances</th>
                  <th className="py-3 px-4 text-right">Deductions</th>
                  <th className="py-3 px-4 text-right font-bold text-slate-900">Net Payable</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{emp.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{emp.employeeCode}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{emp.designation}</td>
                    <td className="py-3 px-4 text-right font-mono">₹{emp.basicSalary.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-mono">₹{emp.hra.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-mono">₹{emp.allowances.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-mono text-rose-600">-₹{emp.deductions.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-blue-700 text-sm">
                      ₹{emp.netSalary.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        SCHEDULED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Claims & Reimbursements */}
      {activeTab === 'CLAIMS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Expense Reimbursement Requests</h3>
            <button
              onClick={() => setIsAddClaimModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Submit New Claim</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenseClaims.map(claim => (
              <div
                key={claim.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{claim.description}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      Submitted by: <span className="text-slate-800">{claim.employeeName}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{claim.claimNumber} • {claim.date}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      claim.status === 'REIMBURSED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : claim.status === 'APPROVED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-base font-bold text-slate-900">
                    ₹{claim.amount.toLocaleString('en-IN')}
                  </div>

                  {claim.status !== 'REIMBURSED' ? (
                    <button
                      onClick={() => reimburseExpenseClaim(claim.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>1-Click Reimburse</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Reimbursed on {claim.reimbursedDate}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {isAddEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-blue-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Register Team Member</h3>
              <button onClick={() => setIsAddEmployeeModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Farooq Khan"
                  value={empName}
                  onChange={e => setEmpName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Basic Salary (₹)</label>
                  <input
                    type="number"
                    value={basicSalary}
                    onChange={e => setBasicSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">HRA (₹)</label>
                  <input
                    type="number"
                    value={hra}
                    onChange={e => setHra(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Allowances (₹)</label>
                  <input
                    type="number"
                    value={allowances}
                    onChange={e => setAllowances(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deductions (₹)</label>
                  <input
                    type="number"
                    value={deductions}
                    onChange={e => setDeductions(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddEmployeeModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Save Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Expense Claim Modal */}
      {isAddClaimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-blue-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Submit Expense Claim</h3>
              <button onClick={() => setIsAddClaimModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClaim} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Employee *</label>
                <select
                  value={claimEmpId}
                  onChange={e => setClaimEmpId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={claimCategory}
                    onChange={e => setClaimCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="SUPPLIES">Workshop Supplies</option>
                    <option value="TRAVEL">Travel / Logistics</option>
                    <option value="FOOD_CLIENT">Client Hospitality</option>
                    <option value="MISC">Miscellaneous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={claimAmount}
                    onChange={e => setClaimAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Bill Context *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Purchased specialized French lace trims for urgent bridal fitting"
                  value={claimDesc}
                  onChange={e => setClaimDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddClaimModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
