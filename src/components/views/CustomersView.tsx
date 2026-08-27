import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Users,
  Search,
  Plus,
  LayoutGrid,
  List,
  ChevronRight,
  Phone,
  Mail,
  Ruler,
  ShoppingBag,
  SlidersHorizontal,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PipelineStage, BodyType } from '../../types/erp';

export const CustomersView: React.FC = () => {
  const {
    clients,
    measurementSessions,
    orders,
    addClient,
    updateClient,
    deleteClient,
    setSelectedClientId,
    setCurrentTab,
    openQuickCreate
  } = useERP();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');

  // Inline Quick Add Row state for table
  const [newRowName, setNewRowName] = useState('');
  const [newRowPhone, setNewRowPhone] = useState('');
  const [newRowType, setNewRowType] = useState<BodyType>('female');

  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'ALL' || c.pipelineStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleInlineAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRowName.trim()) return;

    addClient({
      name: newRowName.trim(),
      phone: newRowPhone.trim() || '+91 90000 00000',
      email: `${newRowName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      bodyType: newRowType,
      pipelineStage: 'INQUIRY',
      notes: 'Quick inline table entry',
      tags: ['New']
    });

    setNewRowName('');
    setNewRowPhone('');
  };

  const getStageColor = (stage: PipelineStage) => {
    switch (stage) {
      case 'INQUIRY':
        return 'bg-stone-100 text-stone-700 border-stone-300';
      case 'MEASURED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ORDERED':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'IN_PRODUCTION':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'FITTING':
        return 'bg-cyan-50 text-cyan-800 border-cyan-300';
      case 'READY':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'DELIVERED':
        return 'bg-stone-800 text-white border-stone-700';
      default:
        return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div id="customers-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5 animate-in fade-in duration-150">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">Customer Directory & CRM</h1>
          <p className="text-xs text-stone-500">Airtable-style instant inline editing, measurements, and order history</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-stone-100 border border-stone-200 rounded-lg p-0.5">
            <button
              id="clients-view-list-toggle"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
              title="Airtable List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              id="clients-view-grid-toggle"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            id="add-customer-main-btn"
            onClick={() => openQuickCreate('customer')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>New Customer</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone or email..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-stone-500 whitespace-nowrap font-medium">Stage:</span>
          {['ALL', 'INQUIRY', 'MEASURED', 'ORDERED', 'IN_PRODUCTION', 'FITTING', 'READY'].map(st => (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                stageFilter === st
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* LIST VIEW (Airtable-style Inline Table) */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[950px]">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 w-10"></th>
                  <th className="py-2.5 px-3 w-48">Customer Name</th>
                  <th className="py-2.5 px-3 w-36">Phone</th>
                  <th className="py-2.5 px-3 w-36">Pipeline Stage</th>
                  <th className="py-2.5 px-3 w-24">Profile</th>
                  <th className="py-2.5 px-3 w-20">Age</th>
                  <th className="py-2.5 px-3 w-28 font-mono">Total Spend</th>
                  <th className="py-2.5 px-3">Occasion / Notes</th>
                  <th className="py-2.5 px-3 w-16 text-center">Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {filteredClients.map(client => {
                  const clientOrders = orders.filter(o => o.clientId === client.id);
                  const sessions = measurementSessions.filter(s => s.clientId === client.id);

                  return (
                    <tr key={client.id} className="hover:bg-amber-500/5 group transition-colors">
                      {/* Avatar Initials */}
                      <td className="py-2 px-3">
                        <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 font-bold text-[10px] flex items-center justify-center">
                          {client.name.charAt(0)}
                        </div>
                      </td>

                      {/* Name (Inline editable) */}
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={client.name}
                          onChange={e => updateClient(client.id, { name: e.target.value })}
                          className="w-full bg-transparent hover:bg-white focus:bg-white font-semibold text-stone-900 border border-transparent hover:border-stone-300 focus:border-amber-500 rounded px-1.5 py-0.5 focus:outline-hidden"
                        />
                      </td>

                      {/* Phone (Inline editable) */}
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={client.phone}
                          onChange={e => updateClient(client.id, { phone: e.target.value })}
                          className="w-full bg-transparent hover:bg-white focus:bg-white text-stone-600 font-mono border border-transparent hover:border-stone-300 focus:border-amber-500 rounded px-1.5 py-0.5 focus:outline-hidden text-[11px]"
                        />
                      </td>

                      {/* Pipeline Stage Select */}
                      <td className="py-2 px-3">
                        <select
                          value={client.pipelineStage}
                          onChange={e => updateClient(client.id, { pipelineStage: e.target.value as PipelineStage })}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border focus:outline-hidden uppercase ${getStageColor(
                            client.pipelineStage
                          )}`}
                        >
                          <option value="INQUIRY">INQUIRY</option>
                          <option value="MEASURED">MEASURED</option>
                          <option value="ORDERED">ORDERED</option>
                          <option value="IN_PRODUCTION">IN PRODUCTION</option>
                          <option value="FITTING">FITTING</option>
                          <option value="READY">READY</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      </td>

                      {/* Body Type Select */}
                      <td className="py-2 px-3">
                        <select
                          value={client.bodyType}
                          onChange={e => updateClient(client.id, { bodyType: e.target.value as BodyType })}
                          className="text-[11px] bg-stone-100 border border-stone-200 rounded px-2 py-0.5 text-stone-700 capitalize focus:outline-hidden"
                        >
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="child">Child</option>
                        </select>
                      </td>

                      {/* Age */}
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={client.age || ''}
                          onChange={e => updateClient(client.id, { age: parseInt(e.target.value) || undefined })}
                          placeholder="-"
                          className="w-12 bg-transparent hover:bg-white focus:bg-white text-stone-600 font-mono border border-transparent hover:border-stone-300 focus:border-amber-500 rounded px-1 py-0.5 text-center focus:outline-hidden"
                        />
                      </td>

                      {/* Spend */}
                      <td className="py-2 px-3 font-mono font-semibold text-stone-900">
                        ₹{client.totalSpend.toLocaleString('en-IN')}
                      </td>

                      {/* Notes (Inline editable) */}
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={client.notes || ''}
                          onChange={e => updateClient(client.id, { notes: e.target.value })}
                          placeholder="Add note..."
                          className="w-full bg-transparent hover:bg-white focus:bg-white text-stone-500 border border-transparent hover:border-stone-300 focus:border-amber-500 rounded px-1.5 py-0.5 truncate focus:outline-hidden"
                        />
                      </td>

                      {/* View Profile Action */}
                      <td className="py-2 px-3 text-center">
                        <button
                          id={`open-client-${client.id}-btn`}
                          onClick={() => {
                            setSelectedClientId(client.id);
                            setCurrentTab('customer_detail');
                          }}
                          className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                          title="Open Client Profile & Measurements"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {/* Inline Fast Add Row at bottom */}
                <tr className="bg-amber-50/40 border-t-2 border-dashed border-amber-300/80">
                  <td className="py-2 px-3 text-center">
                    <Plus className="w-4 h-4 text-amber-600" />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={newRowName}
                      onChange={e => setNewRowName(e.target.value)}
                      placeholder="+ Quick add name (press Enter)..."
                      onKeyDown={e => e.key === 'Enter' && handleInlineAdd(e)}
                      className="w-full bg-white border border-amber-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-medium"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={newRowPhone}
                      onChange={e => setNewRowPhone(e.target.value)}
                      placeholder="Phone number..."
                      onKeyDown={e => e.key === 'Enter' && handleInlineAdd(e)}
                      className="w-full bg-white border border-amber-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
                      INQUIRY
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <select
                      value={newRowType}
                      onChange={e => setNewRowType(e.target.value as BodyType)}
                      className="text-xs bg-white border border-amber-300 rounded px-2 py-1 focus:outline-hidden capitalize"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="child">Child</option>
                    </select>
                  </td>
                  <td colSpan={3} className="py-2 px-3 text-[11px] text-stone-400">
                    Type and hit Enter for instant sync
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={handleInlineAdd}
                      className="px-2 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded text-[10px] font-semibold"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map(client => {
            const sessions = measurementSessions.filter(s => s.clientId === client.id);
            const clientOrders = orders.filter(o => o.clientId === client.id);

            return (
              <div
                key={client.id}
                onClick={() => {
                  setSelectedClientId(client.id);
                  setCurrentTab('customer_detail');
                }}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-amber-400/80 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-400 font-bold text-sm flex items-center justify-center">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-950">
                          {client.name}
                        </h3>
                        <div className="text-[11px] text-stone-500 font-mono">{client.phone}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStageColor(client.pipelineStage)}`}>
                      {client.pipelineStage.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2">{client.notes || 'No notes added.'}</p>

                  <div className="flex items-center gap-2 text-[11px] text-stone-600 pt-1">
                    <span className="bg-stone-100 px-2 py-0.5 rounded capitalize font-medium">
                      {client.bodyType}
                    </span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded font-mono">
                      {sessions.length} session{sessions.length === 1 ? '' : 's'}
                    </span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded font-mono">
                      {clientOrders.length} order{clientOrders.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400">Total Spent: </span>
                    <span className="font-mono font-bold text-stone-900">
                      ₹{client.totalSpend.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-amber-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Profile & Measurements</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
