import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Building,
  Tag,
  CreditCard,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Truck,
  DollarSign
} from 'lucide-react';
import { useERP } from '../../context/ERPContext';
import { Party, PartyRole, PartyTimelineItem } from '../../types/erp';

export const PartiesView: React.FC = () => {
  const {
    parties,
    selectedPartyId,
    setSelectedPartyId,
    addParty,
    addPartyTimelineItem,
    updateParty,
    openQuickCreate,
    openBusinessEventModal
  } = useERP();

  const [roleFilter, setRoleFilter] = useState<'ALL' | PartyRole>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Party Form State
  const [newName, setNewName] = useState('');
  const [newRoles, setNewRoles] = useState<PartyRole[]>(['CUSTOMER']);
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newGstin, setNewGstin] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCreditLimit, setNewCreditLimit] = useState(50000);
  const [newCreditDays, setNewCreditDays] = useState(15);
  const [newNotes, setNewNotes] = useState('');

  // Quick Timeline Note State
  const [timelineNote, setTimelineNote] = useState('');

  const filteredParties = parties.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      (p.gstin && p.gstin.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'ALL' ? true : p.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  const activeParty = parties.find(p => p.id === selectedPartyId) || parties[0];

  const totalReceivable = parties.reduce((sum, p) => sum + p.outstandingReceivable, 0);
  const totalPayable = parties.reduce((sum, p) => sum + p.outstandingPayable, 0);
  const dualRoleCount = parties.filter(p => p.roles.length > 1).length;

  const handleRoleToggle = (role: PartyRole) => {
    if (newRoles.includes(role)) {
      if (newRoles.length > 1) {
        setNewRoles(newRoles.filter(r => r !== role));
      }
    } else {
      setNewRoles([...newRoles, role]);
    }
  };

  const handleCreateParty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created = addParty({
      name: newName,
      roles: newRoles,
      phone: newPhone,
      email: newEmail,
      gstin: newGstin,
      address: newAddress,
      city: 'Mumbai',
      creditLimit: Number(newCreditLimit),
      creditDays: Number(newCreditDays),
      paymentTerms: `${newCreditDays} Days Credit`,
      totalSales: 0,
      totalPurchases: 0,
      totalReceived: 0,
      totalPaid: 0,
      outstandingReceivable: 0,
      outstandingPayable: 0,
      overdueAmount: 0,
      tags: ['New Party'],
      notes: newNotes
    });

    setSelectedPartyId(created.id);
    setIsAddModalOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewGstin('');
    setNewAddress('');
    setNewNotes('');
  };

  const handleAddTimelineNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timelineNote.trim() || !activeParty) return;

    addPartyTimelineItem(activeParty.id, {
      date: new Date().toISOString().split('T')[0],
      type: 'NOTE',
      title: 'Activity Note Added',
      amount: 0,
      notes: timelineNote
    });

    setTimelineNote('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner & Metric Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Unified Party Directory</h1>
              <p className="text-sm text-slate-500">
                Single unified identity for Customers, Suppliers, Employees, Lenders & Partners.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={openBusinessEventModal}
            className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-sm border border-indigo-200 transition-colors flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Record What Happened</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Party</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Total Parties</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{parties.length}</div>
          <div className="text-xs text-slate-400 mt-1">{dualRoleCount} parties have multiple roles (Customer + Supplier)</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-xs font-semibold uppercase">Net Receivables</span>
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">₹{totalReceivable.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 mt-1">Owed to business across all parties</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-rose-600 mb-1">
            <span className="text-xs font-semibold uppercase">Net Payables</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-rose-600">₹{totalPayable.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 mt-1">Owed by business to vendors & lenders</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <span className="text-xs font-semibold uppercase">Net Working Capital</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            ₹{(totalReceivable - totalPayable).toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-400 mt-1">Receivables minus Payables</div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Party List & Filters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-4 space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search party by name, phone, GSTIN..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Role Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
              {(['ALL', 'CUSTOMER', 'SUPPLIER', 'EMPLOYEE', 'LENDER', 'PARTNER'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    roleFilter === role
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {role === 'ALL' ? 'All Roles' : role}
                </button>
              ))}
            </div>

            {/* Parties List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredParties.map(party => {
                const isSelected = activeParty?.id === party.id;
                return (
                  <button
                    key={party.id}
                    onClick={() => setSelectedPartyId(party.id)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-slate-900 text-sm">{party.name}</div>
                      <div className="flex items-center space-x-1">
                        {party.roles.map(r => (
                          <span
                            key={r}
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              r === 'CUSTOMER'
                                ? 'bg-emerald-100 text-emerald-800'
                                : r === 'SUPPLIER'
                                ? 'bg-amber-100 text-amber-800'
                                : r === 'EMPLOYEE'
                                ? 'bg-blue-100 text-blue-800'
                                : r === 'LENDER'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 mt-1 flex items-center space-x-3">
                      <span>{party.phone}</span>
                      {party.city && <span>• {party.city}</span>}
                    </div>

                    <div className="flex items-center justify-between text-xs mt-2.5 pt-2 border-t border-slate-100/80">
                      {party.outstandingReceivable > 0 ? (
                        <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                          <span>Receivable: ₹{party.outstandingReceivable.toLocaleString('en-IN')}</span>
                        </span>
                      ) : party.outstandingPayable > 0 ? (
                        <span className="text-rose-700 font-semibold flex items-center space-x-1">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>Payable: ₹{party.outstandingPayable.toLocaleString('en-IN')}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Balance Settled (₹0)</span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-300'}`} />
                    </div>
                  </button>
                );
              })}

              {filteredParties.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">No parties match your criteria.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right 360° Party Profile & Connected Timeline */}
        {activeParty && (
          <div className="lg:col-span-7 space-y-6">
            {/* Header Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold text-slate-900">{activeParty.name}</h2>
                    {activeParty.roles.map(r => (
                      <span
                        key={r}
                        className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Party ID: {activeParty.id}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={openBusinessEventModal}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Transact with Party</span>
                  </button>
                </div>
              </div>

              {/* Party Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Sales</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    ₹{activeParty.totalSales.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Purchases</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    ₹{activeParty.totalPurchases.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <div className="text-[11px] font-semibold text-emerald-700 uppercase">Receivable Due</div>
                  <div className="text-sm font-bold text-emerald-800 mt-0.5">
                    ₹{activeParty.outstandingReceivable.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <div className="text-[11px] font-semibold text-rose-700 uppercase">Payable Due</div>
                  <div className="text-sm font-bold text-rose-800 mt-0.5">
                    ₹{activeParty.outstandingPayable.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Contact Details & Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{activeParty.phone}</span>
                  </div>
                  {activeParty.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeParty.email}</span>
                    </div>
                  )}
                  {activeParty.address && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeParty.address}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {activeParty.gstin && (
                    <div className="flex items-center space-x-2">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        GSTIN: <span className="font-mono font-semibold text-slate-800">{activeParty.gstin}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Credit Limit: ₹{activeParty.creditLimit.toLocaleString('en-IN')} ({activeParty.creditDays} days)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Terms: {activeParty.paymentTerms}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 360° Connected Event Timeline */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-sm">360° Connected Business Timeline</h3>
                </div>
                <span className="text-xs text-slate-400">
                  {activeParty.timeline?.length || 0} interaction points
                </span>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddTimelineNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a call note, meeting takeaway, or promise to this party..."
                  value={timelineNote}
                  onChange={e => setTimelineNote(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!timelineNote.trim()}
                  className="px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 disabled:opacity-50"
                >
                  Post Note
                </button>
              </form>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {activeParty.timeline && activeParty.timeline.length > 0 ? (
                  activeParty.timeline.map((item, idx) => (
                    <div key={item.id || idx} className="relative group">
                      {/* Timeline Dot */}
                      <div
                        className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${
                          item.type === 'SALE'
                            ? 'bg-indigo-600'
                            : item.type === 'PURCHASE'
                            ? 'bg-amber-600'
                            : item.type === 'PAYMENT'
                            ? 'bg-emerald-600'
                            : item.type === 'ADVANCE'
                            ? 'bg-blue-600'
                            : 'bg-slate-500'
                        }`}
                      />

                      <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{item.title}</span>
                          <span className="text-slate-400 font-mono">{item.date}</span>
                        </div>

                        {item.amount !== undefined && (
                          <div className="text-xs font-bold text-indigo-700">
                            ₹{item.amount.toLocaleString('en-IN')}
                            {item.referenceNo && (
                              <span className="text-slate-500 font-normal ml-2">Ref: {item.referenceNo}</span>
                            )}
                          </div>
                        )}

                        {item.notes && <div className="text-xs text-slate-600">{item.notes}</div>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    No historical events recorded for this party yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Party Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Add New Party</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateParty} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Party Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Heritage Garments Pvt Ltd"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Roles (Select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {(['CUSTOMER', 'SUPPLIER', 'EMPLOYEE', 'LENDER', 'PARTNER'] as const).map(role => {
                    const isSelected = newRoles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleToggle(role)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@party.com"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN (Optional)</label>
                  <input
                    type="text"
                    placeholder="27AABCU9603R1ZM"
                    value={newGstin}
                    onChange={e => setNewGstin(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Credit Limit (₹)</label>
                  <input
                    type="number"
                    value={newCreditLimit}
                    onChange={e => setNewCreditLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Studio #4, Kala Ghoda, Mumbai"
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Preferences</label>
                <input
                  type="text"
                  placeholder="Prefers bank transfer, VIP custom fabrics"
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm"
                >
                  Save Party
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
