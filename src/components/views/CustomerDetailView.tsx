import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { InteractiveBodyDiagram } from '../measurement/InteractiveBodyDiagram';
import {
  ArrowLeft,
  Ruler,
  Clock,
  Camera,
  ShoppingBag,
  History,
  Trash2,
  Edit,
  Plus,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  Tag,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PipelineStage, BodyType } from '../../types/erp';

export const CustomerDetailView: React.FC = () => {
  const {
    clients,
    selectedClientId,
    setSelectedClientId,
    selectedCustomerSubTab,
    setSelectedCustomerSubTab,
    measurementSessions,
    clientPhotos,
    orders,
    invoices,
    activityLogs,
    updateClient,
    updateClientStage,
    deleteClient,
    saveMeasurementSession,
    addClientPhoto,
    deleteClientPhoto,
    setCurrentTab,
    openQuickCreate
  } = useERP();

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoTag, setPhotoTag] = useState<'front' | 'back' | 'side' | 'fabric' | 'detail' | 'general'>('fabric');

  const client = clients.find(c => c.id === selectedClientId) || clients[0];

  if (!client) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-stone-500">No customer selected.</p>
        <button
          onClick={() => setCurrentTab('customers')}
          className="px-4 py-2 bg-stone-900 text-white text-xs rounded-lg font-medium"
        >
          Return to Customers
        </button>
      </div>
    );
  }

  const clientSessions = measurementSessions.filter(s => s.clientId === client.id).sort((a, b) => b.version - a.version);
  const latestSession = clientSessions[0];
  const clientPhotosList = clientPhotos.filter(p => p.clientId === client.id);
  const clientOrders = orders.filter(o => o.clientId === client.id);
  const clientActivity = activityLogs.filter(a => a.clientId === client.id);

  const tabs: { id: string; label: string; icon: any; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'measure', label: 'Body Measurements', icon: Ruler, count: clientSessions.length },
    { id: 'history', label: 'Version History', icon: History },
    { id: 'photos', label: 'Photos & Swatches', icon: Camera, count: clientPhotosList.length },
    { id: 'orders', label: 'Orders & Invoices', icon: ShoppingBag, count: clientOrders.length },
    { id: 'activity', label: 'Activity Log', icon: Clock }
  ];

  const handleSaveMeasurements = (
    values: Record<string, { cm: number; inches: number }>,
    unit: 'cm' | 'inches',
    notes?: string
  ) => {
    saveMeasurementSession(client.id, values, unit, notes);
  };

  const handlePhotoUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim()) return;

    addClientPhoto(client.id, photoUrl.trim(), photoTitle.trim() || 'Client Reference', photoTag);
    setPhotoUrl('');
    setPhotoTitle('');
    setIsUploadingPhoto(false);
  };

  return (
    <div id="customer-detail-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            id="back-to-clients-btn"
            onClick={() => setCurrentTab('customers')}
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
            title="Back to Customers Directory"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">{client.name}</h1>
              <span className="text-xs bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded capitalize">
                {client.bodyType}
              </span>
            </div>
            <div className="text-xs text-stone-500 font-mono flex items-center gap-3 mt-0.5">
              <span>{client.phone}</span>
              <span>•</span>
              <span>{client.email}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons & Stage Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
            <span className="text-[11px] font-semibold text-stone-500 uppercase">Stage:</span>
            <select
              value={client.pipelineStage}
              onChange={e => updateClientStage(client.id, e.target.value as PipelineStage)}
              className="text-xs font-bold text-stone-900 bg-transparent focus:outline-hidden uppercase"
            >
              <option value="INQUIRY">INQUIRY</option>
              <option value="MEASURED">MEASURED</option>
              <option value="ORDERED">ORDERED</option>
              <option value="IN_PRODUCTION">IN PRODUCTION</option>
              <option value="FITTING">FITTING</option>
              <option value="READY">READY</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
          </div>

          <button
            onClick={() => openQuickCreate('sale')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Create Order</span>
          </button>

          <button
            onClick={() => {
              if (confirm(`Delete customer record for ${client.name}?`)) {
                deleteClient(client.id);
                setCurrentTab('customers');
              }
            }}
            className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Customer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-tabs Navigation */}
      <div className="border-b border-stone-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = selectedCustomerSubTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`client-subtab-${tab.id}`}
              onClick={() => setSelectedCustomerSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? 'border-stone-900 text-stone-900 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-600 font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: OVERVIEW */}
      {selectedCustomerSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Key Details & Latest Measurements Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Clickable Latest Measurements Card */}
            <div
              onClick={() => setSelectedCustomerSubTab('measure')}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-950">
                      Latest Body Measurements (v{latestSession?.version || 1})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Recorded on {latestSession ? new Date(latestSession.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Interactive Croquis</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {latestSession ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-stone-50 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Chest (C)</div>
                    <div className="text-sm font-bold font-mono text-stone-900 mt-0.5">
                      {latestSession.measurements.chest?.cm || 88} cm ({latestSession.measurements.chest?.inches || 34.6}")
                    </div>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Waist (W)</div>
                    <div className="text-sm font-bold font-mono text-stone-900 mt-0.5">
                      {latestSession.measurements.waist?.cm || 70} cm ({latestSession.measurements.waist?.inches || 27.6}")
                    </div>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Hips (H)</div>
                    <div className="text-sm font-bold font-mono text-stone-900 mt-0.5">
                      {latestSession.measurements.hips?.cm || 94} cm ({latestSession.measurements.hips?.inches || 37.0}")
                    </div>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Sleeve Length</div>
                    <div className="text-sm font-bold font-mono text-stone-900 mt-0.5">
                      {latestSession.measurements.sleeve_length?.cm || 58} cm ({latestSession.measurements.sleeve_length?.inches || 22.8}")
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-stone-400 text-xs">
                  No measurements recorded yet. Click to open the technical interactive SVG diagram!
                </div>
              )}

              <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                <span>{clientSessions.length} total measurement versions archived</span>
                <span className="text-amber-700 font-medium">Tap to edit dimensions →</span>
              </div>
            </div>

            {/* Active Orders for Client */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-sm font-bold text-stone-900">Active Bespoke Orders</h3>
                <button
                  onClick={() => setSelectedCustomerSubTab('orders')}
                  className="text-xs text-amber-600 font-semibold hover:underline"
                >
                  View All Orders ({clientOrders.length})
                </button>
              </div>

              {clientOrders.length === 0 ? (
                <div className="text-center py-6 text-stone-400 text-xs">No active orders placed yet.</div>
              ) : (
                <div className="space-y-2.5">
                  {clientOrders.map(o => (
                    <div
                      key={o.id}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-stone-900 flex items-center gap-2">
                          <span>{o.orderNumber}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-stone-200 text-stone-800 font-medium">
                            {o.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {o.items[0]?.name} • Due Date: {o.dueDate}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-stone-900 text-sm">
                          ₹{o.grandTotal.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-stone-400">Tailor: {o.assignedTailor || 'Studio Team'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Customer Info & Notes */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
              <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">Contact & Studio Data</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-stone-700">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Phone</div>
                    <div className="font-mono font-medium">{client.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-stone-700">
                  <Mail className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Email</div>
                    <div>{client.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-stone-700">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Address</div>
                    <div className="leading-relaxed">{client.address || 'Studio walk-in / Address not specified.'}</div>
                  </div>
                </div>

                {client.gstin && (
                  <div className="flex items-start gap-2.5 text-stone-700">
                    <FileText className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-semibold">GSTIN</div>
                      <div className="font-mono font-bold text-stone-900">{client.gstin}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes & Special Requests */}
              <div className="pt-2 border-t border-stone-100">
                <div className="text-[10px] text-stone-400 uppercase font-semibold mb-1">Tailoring Notes</div>
                <p className="text-stone-600 bg-stone-50 p-2.5 rounded-lg leading-relaxed text-[11px]">
                  {client.notes || 'No specific posture or fitting notes recorded.'}
                </p>
              </div>

              {/* Tags */}
              {client.tags && client.tags.length > 0 && (
                <div className="pt-2 border-t border-stone-100">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold mb-1.5">Tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {client.tags.map(t => (
                      <span key={t} className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: INTERACTIVE BODY MEASUREMENTS */}
      {selectedCustomerSubTab === 'measure' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-900">Interactive Technical Croquis Mode: </span>
                <span className="text-amber-800">
                  Click on any measurement line on the diagram or use the precision stepper on the right.
                </span>
              </div>
            </div>
          </div>

          <InteractiveBodyDiagram
            bodyType={client.bodyType}
            initialValues={latestSession?.measurements || {}}
            onSave={handleSaveMeasurements}
            clientName={client.name}
          />
        </div>
      )}

      {/* SUBTAB 3: VERSION HISTORY */}
      {selectedCustomerSubTab === 'history' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif">Measurement Version History</h3>
            <p className="text-xs text-stone-500">Track dimensional evolution across fittings and seasons</p>
          </div>

          {clientSessions.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs">No sessions recorded yet.</div>
          ) : (
            <div className="space-y-4">
              {clientSessions.map(sess => (
                <div
                  key={sess.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 font-mono text-sm">Version {sess.version}</span>
                      <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded capitalize">
                        {sess.bodyType} • Unit: {sess.unit}
                      </span>
                    </div>
                    <div className="text-stone-400 text-[11px]">
                      {new Date(sess.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 font-mono">
                    <div className="bg-white p-2 rounded border border-stone-200">
                      <div className="text-[9px] text-stone-400 uppercase">Chest (C)</div>
                      <div className="font-bold text-stone-800">{sess.measurements.chest?.cm || '-'} cm</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-stone-200">
                      <div className="text-[9px] text-stone-400 uppercase">Waist (W)</div>
                      <div className="font-bold text-stone-800">{sess.measurements.waist?.cm || '-'} cm</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-stone-200">
                      <div className="text-[9px] text-stone-400 uppercase">Hips (H)</div>
                      <div className="font-bold text-stone-800">{sess.measurements.hips?.cm || '-'} cm</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-stone-200">
                      <div className="text-[9px] text-stone-400 uppercase">Shoulder</div>
                      <div className="font-bold text-stone-800">{sess.measurements.shoulder?.cm || '-'} cm</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-stone-200">
                      <div className="text-[9px] text-stone-400 uppercase">Sleeve</div>
                      <div className="font-bold text-stone-800">{sess.measurements.sleeve_length?.cm || '-'} cm</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-stone-200">
                      <div className="text-[9px] text-stone-400 uppercase">Floor Outseam</div>
                      <div className="font-bold text-stone-800">{sess.measurements.waist_to_floor?.cm || '-'} cm</div>
                    </div>
                  </div>

                  {sess.notes && (
                    <div className="text-[11px] text-stone-500 italic bg-white p-2 rounded border border-stone-200">
                      Notes: {sess.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 4: CLIENT PHOTOS & FABRICS */}
      {selectedCustomerSubTab === 'photos' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Reference Photos & Fabric Swatches</h3>
              <p className="text-xs text-stone-500">Fitting contours, silhouette drape, and fabric selection tags</p>
            </div>
            <button
              onClick={() => setIsUploadingPhoto(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Photo</span>
            </button>
          </div>

          {/* Upload Form Modal / Drawer */}
          {isUploadingPhoto && (
            <form onSubmit={handlePhotoUploadSubmit} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3 text-xs animate-in fade-in">
              <div className="font-bold text-stone-800">Add Photo / Fabric Swatch Link</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Tag</label>
                  <select
                    value={photoTag}
                    onChange={e => setPhotoTag(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="fabric">Fabric Swatch</option>
                    <option value="front">Front View</option>
                    <option value="back">Back View</option>
                    <option value="side">Side Profile</option>
                    <option value="detail">Detail / Lapel</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Description / Title</label>
                <input
                  type="text"
                  value={photoTitle}
                  onChange={e => setPhotoTitle(e.target.value)}
                  placeholder="e.g. Italian Wool sample drape"
                  className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadingPhoto(false)}
                  className="px-3 py-1.5 text-stone-600 text-xs hover:bg-stone-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  Save Photo
                </button>
              </div>
            </form>
          )}

          {clientPhotosList.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-xl space-y-2">
              <Camera className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">No photos uploaded for this customer yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {clientPhotosList.map(p => (
                <div
                  key={p.id}
                  className="group relative bg-stone-100 rounded-xl overflow-hidden border border-stone-200 shadow-2xs flex flex-col justify-between"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-stone-200">
                    <img
                      src={p.url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5 bg-white border-t border-stone-200 text-xs">
                    <div className="font-semibold text-stone-900 truncate">{p.title}</div>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-stone-500">
                      <span className="uppercase font-mono bg-stone-100 px-1.5 py-0.2 rounded font-bold text-amber-800">
                        {p.tag}
                      </span>
                      <button
                        onClick={() => deleteClientPhoto(p.id)}
                        className="text-stone-400 hover:text-rose-600"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 5: ORDERS & INVOICES */}
      {selectedCustomerSubTab === 'orders' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Customer Orders & Invoicing</h3>
              <p className="text-xs text-stone-500">Line items, GST tax invoices, and payment tracking</p>
            </div>
            <button
              onClick={() => openQuickCreate('sale')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Create New Order</span>
            </button>
          </div>

          <div className="space-y-4">
            {clientOrders.map(o => {
              const matchingInv = invoices.find(i => i.orderId === o.id);
              return (
                <div key={o.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div>
                      <div className="font-bold text-stone-900 font-mono text-sm flex items-center gap-2">
                        <span>{o.orderNumber}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-stone-900 text-white">
                          {o.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Placed on {o.orderDate} • Delivery Target: {o.dueDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-stone-900 text-base">
                        ₹{o.grandTotal.toLocaleString('en-IN')}
                      </div>
                      {matchingInv && (
                        <div className="text-[11px] text-stone-500 font-mono">
                          Invoice: {matchingInv.invoiceNumber} ({matchingInv.status})
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-semibold text-stone-400 uppercase">Items:</div>
                    {o.items.map(it => (
                      <div key={it.id} className="flex justify-between bg-white p-2 rounded border border-stone-200">
                        <span className="font-medium text-stone-800">{it.name} (Qty: {it.quantity})</span>
                        <span className="font-mono font-semibold">₹{it.lineTotal.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 6: ACTIVITY TIMELINE */}
      {selectedCustomerSubTab === 'activity' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif">Customer Timeline & Audit Log</h3>
            <p className="text-xs text-stone-500">Chronological history of appointments, measurements, orders, and payments</p>
          </div>

          <div className="space-y-4">
            {clientActivity.map(act => (
              <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-stone-900">{act.title}</div>
                  <div className="text-stone-600 mt-0.5 leading-relaxed">{act.description}</div>
                  <div className="text-[10px] text-stone-400 font-mono mt-1">
                    {new Date(act.timestamp).toLocaleString()} • User: {act.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
