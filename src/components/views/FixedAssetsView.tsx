import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Wrench,
  TrendingDown,
  Calendar,
  DollarSign,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Sparkles,
  FileText
} from 'lucide-react';
import { useERP } from '../../context/ERPContext';
import { FixedAsset, AssetCategory } from '../../types/erp';

export const FixedAssetsView: React.FC = () => {
  const {
    fixedAssets,
    addFixedAsset,
    recordAssetMaintenance,
    calculateDepreciation,
    openBusinessEventModal
  } = useERP();

  const [selectedAssetId, setSelectedAssetId] = useState<string>(fixedAssets[0]?.id || '');
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  // New Asset Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('PLANT_MACHINERY');
  const [purchaseCost, setPurchaseCost] = useState(120000);
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [usefulLifeYears, setUsefulLifeYears] = useState(8);
  const [salvageValue, setSalvageValue] = useState(15000);
  const [depreciationMethod, setDepreciationMethod] = useState<'STRAIGHT_LINE' | 'WRITTEN_DOWN_VALUE'>('STRAIGHT_LINE');
  const [location, setLocation] = useState('Production Floor - Workshop A');
  const [serialNumber, setSerialNumber] = useState('');
  const [supplierName, setSupplierName] = useState('Usha Machinery Corp');

  // Maintenance Form
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceCost, setServiceCost] = useState(3500);
  const [serviceVendor, setServiceVendor] = useState('TechnoCare Service Specialists');

  const selectedAsset = fixedAssets.find(a => a.id === selectedAssetId) || fixedAssets[0];

  const totalCapExCost = fixedAssets.reduce((sum, a) => sum + a.purchaseCost, 0);
  const totalBookValue = fixedAssets.reduce((sum, a) => sum + a.currentBookValue, 0);
  const totalDepreciation = totalCapExCost - totalBookValue;

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAsset = addFixedAsset({
      assetCode: `AST-${new Date().getFullYear()}-${String(fixedAssets.length + 1).padStart(3, '0')}`,
      name,
      category,
      purchaseDate,
      purchaseCost: Number(purchaseCost),
      currentBookValue: Number(purchaseCost),
      accumulatedDepreciation: 0,
      usefulLifeYears: Number(usefulLifeYears),
      salvageValue: Number(salvageValue),
      depreciationMethod,
      location,
      custodian: 'Production Manager',
      department: 'Atelier Manufacturing',
      status: 'ACTIVE',
      serialNumber: serialNumber || `SN-${Date.now().toString(36).toUpperCase()}`,
      supplierName,
      warrantyExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      maintenanceLogs: []
    });

    setSelectedAssetId(newAsset.id);
    setIsAddAssetModalOpen(false);
    setName('');
  };

  const handleRecordMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset || !serviceDesc.trim()) return;

    recordAssetMaintenance(selectedAsset.id, serviceCost, serviceDesc, serviceVendor);
    setIsMaintenanceModalOpen(false);
    setServiceDesc('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Fixed Assets & CapEx Register</h1>
            <p className="text-sm text-slate-500">
              Track studio machinery, heavy equipment, computers, depreciation schedules, and maintenance lifecycles.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={openBusinessEventModal}
            className="px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-xl text-sm border border-purple-200 transition-colors flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Record CapEx Event</span>
          </button>
          <button
            onClick={() => setIsAddAssetModalOpen(true)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Fixed Asset</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Original Cost (CapEx)</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹{totalCapExCost.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 mt-1">{fixedAssets.length} active studio fixed assets</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Current Book Value (Net Asset)</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">₹{totalBookValue.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 mt-1">Value carried on Balance Sheet</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Accumulated Depreciation</div>
          <div className="text-2xl font-bold text-purple-600 mt-1">₹{totalDepreciation.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-400 mt-1">Tax-deductible depreciation to date</div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Assets List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Registered Assets ({fixedAssets.length})</h3>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {fixedAssets.map(asset => {
                const isSelected = selectedAsset?.id === asset.id;
                const annualDep = calculateDepreciation(asset.id);
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`w-full p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-1 ring-purple-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{asset.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{asset.assetCode}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                        {asset.category.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mt-3 pt-2.5 border-t border-slate-100">
                      <div>
                        <span className="text-slate-400">Book Value: </span>
                        <span className="font-bold text-emerald-700">₹{asset.currentBookValue.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">Life: </span>
                        <span className="font-semibold text-slate-700">{asset.usefulLifeYears} Yrs</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Asset 360 Details */}
        {selectedAsset && (
          <div className="lg:col-span-7 space-y-6">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold text-slate-900">{selectedAsset.name}</h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {selectedAsset.assetCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Located at: <span className="font-semibold text-slate-700">{selectedAsset.location}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMaintenanceModalOpen(true)}
                    className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 border border-purple-200"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Log Service</span>
                  </button>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Purchase Cost</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    ₹{selectedAsset.purchaseCost.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <div className="text-[11px] font-semibold text-emerald-700 uppercase">Current Value</div>
                  <div className="text-sm font-bold text-emerald-800 mt-0.5">
                    ₹{selectedAsset.currentBookValue.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Annual Depr.</div>
                  <div className="text-sm font-bold text-purple-700 mt-0.5">
                    ₹{calculateDepreciation(selectedAsset.id).toLocaleString('en-IN')}/yr
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Salvage Value</div>
                  <div className="text-sm font-bold text-slate-700 mt-0.5">
                    ₹{selectedAsset.salvageValue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Specs & Hardware Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-400">Supplier: </span>
                    <span className="font-semibold text-slate-800">{selectedAsset.supplierName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Serial Number: </span>
                    <span className="font-mono font-semibold text-slate-800">{selectedAsset.serialNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Purchased On: </span>
                    <span className="font-semibold text-slate-800">{selectedAsset.purchaseDate}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-slate-400">Depreciation Method: </span>
                    <span className="font-semibold text-slate-800">
                      {selectedAsset.depreciationMethod.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Warranty Status: </span>
                    <span className="text-emerald-700 font-semibold flex items-center space-x-1 inline-flex">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Valid until {selectedAsset.warrantyExpiryDate}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance History */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-purple-600" />
                  <span>Service & Maintenance History</span>
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedAsset.maintenanceLogs?.length || 0} service logs
                </span>
              </div>

              <div className="space-y-3">
                {selectedAsset.maintenanceLogs && selectedAsset.maintenanceLogs.length > 0 ? (
                  selectedAsset.maintenanceLogs.map(log => (
                    <div key={log.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{log.description}</span>
                        <span className="font-bold text-rose-600">₹{log.cost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Vendor: {log.vendor}</span>
                        <span className="font-mono">{log.date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    No maintenance records logged for this asset yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Asset Modal */}
      {isAddAssetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-purple-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Add New Fixed Asset</h3>
              <button onClick={() => setIsAddAssetModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asset Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juki DDL-8700 Industrial Lockstitch Machine"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Asset Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as AssetCategory)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="PLANT_MACHINERY">Plant & Machinery</option>
                    <option value="EQUIPMENT">Equipment & Tools</option>
                    <option value="COMPUTERS">Computers & IT</option>
                    <option value="FURNITURE">Furniture & Fixtures</option>
                    <option value="VEHICLE">Vehicles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Purchase Cost (₹) *</label>
                  <input
                    type="number"
                    required
                    value={purchaseCost}
                    onChange={e => setPurchaseCost(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Useful Life (Years)</label>
                  <input
                    type="number"
                    value={usefulLifeYears}
                    onChange={e => setUsefulLifeYears(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Salvage (₹)</label>
                  <input
                    type="number"
                    value={salvageValue}
                    onChange={e => setSalvageValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Supplier / Vendor</label>
                  <input
                    type="text"
                    value={supplierName}
                    onChange={e => setSupplierName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddAssetModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Maintenance Modal */}
      {isMaintenanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-purple-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Log Asset Maintenance</h3>
              <button onClick={() => setIsMaintenanceModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordMaintenance} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Servo motor replacement & calibration"
                  value={serviceDesc}
                  onChange={e => setServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cost (₹) *</label>
                  <input
                    type="number"
                    required
                    value={serviceCost}
                    onChange={e => setServiceCost(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Vendor</label>
                  <input
                    type="text"
                    value={serviceVendor}
                    onChange={e => setServiceVendor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMaintenanceModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm"
                >
                  Record Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
