import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Factory,
  Scissors,
  CheckCircle2,
  Clock,
  Plus,
  Layers,
  Sparkles,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { WorkOrder, WorkOrderStatus, ProjectTask } from '../../types/erp';

export const ManufacturingView: React.FC = () => {
  const {
    workOrders,
    tasks,
    updateWorkOrderStatus,
    toggleTaskStatus,
    openQuickCreate
  } = useERP();

  const [activeTab, setActiveTab] = useState<'work_orders' | 'timesheets'>('work_orders');

  const statuses: { key: WorkOrderStatus; label: string; progress: number }[] = [
    { key: 'PLANNED', label: '1. Planned & Pattern Ready', progress: 20 },
    { key: 'IN_PROGRESS', label: '2. In Cutting & Sewing', progress: 60 },
    { key: 'QUALITY_CHECK', label: '3. Quality Check & Fitting', progress: 85 },
    { key: 'COMPLETED', label: '4. Completed & Ready', progress: 100 }
  ];

  return (
    <div id="manufacturing-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">
            Production Cycles & Atelier Timesheets
          </h1>
          <p className="text-xs text-stone-500">
            Bespoke tailoring work orders, Bill of Materials (BOM), material consumption & artisan labor hours
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('work_orders')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'work_orders' ? 'bg-stone-900 text-white shadow-2xs' : 'bg-white text-stone-600 border border-stone-200'
            }`}
          >
            Work Orders ({workOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('timesheets')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'timesheets' ? 'bg-stone-900 text-white shadow-2xs' : 'bg-white text-stone-600 border border-stone-200'
            }`}
          >
            Artisan Tasks & Hours ({tasks.length})
          </button>
        </div>
      </div>

      {/* WORK ORDERS TAB */}
      {activeTab === 'work_orders' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workOrders.map(wo => {
              return (
                <div
                  key={wo.id}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">{wo.workOrderNumber}</div>
                        <h3 className="text-base font-bold text-stone-900 mt-0.5">{wo.productName}</h3>
                        <div className="text-xs text-stone-500 font-medium">Client: {wo.clientName || 'Studio Stock'}</div>
                      </div>
                      <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                        {wo.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    {/* Stage Step Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-semibold text-stone-500">
                        <span>Production Progress</span>
                        <span>{wo.stageProgress}% Complete</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden flex">
                        <div
                          className="bg-stone-900 h-full rounded-full transition-all duration-300"
                          style={{ width: `${wo.stageProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Bill of Materials (BOM) Items */}
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2 text-xs">
                      <div className="font-bold text-stone-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-stone-500" />
                        <span>Allocated Raw Materials</span>
                      </div>
                      <div className="space-y-1">
                        {wo.materialsUsed.map((bom, bIdx) => (
                          <div key={bIdx} className="flex justify-between text-[11px] text-stone-600">
                            <span>{bom.itemName}</span>
                            <span className="font-mono font-medium">
                              {bom.quantity} {bom.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 flex items-center justify-between">
                      <span>Assigned Master: <strong className="text-stone-800">{wo.assignedWorker}</strong></span>
                      <span>Target Delivery: <strong className="font-mono text-stone-800">{wo.targetDate}</strong></span>
                    </div>
                  </div>

                  {/* Stage Advance Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <select
                      value={wo.status}
                      onChange={e => {
                        const newStatus = e.target.value as WorkOrderStatus;
                        const match = statuses.find(s => s.key === newStatus);
                        updateWorkOrderStatus(wo.id, newStatus, match?.progress || 50);
                      }}
                      className="text-xs bg-stone-100 border border-stone-300 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 focus:outline-hidden"
                    >
                      {statuses.map(s => (
                        <option key={s.key} value={s.key}>
                          {s.label}
                        </option>
                      ))}
                      <option value="CANCELLED">Cancelled</option>
                    </select>

                    {wo.status !== 'COMPLETED' && (
                      <button
                        onClick={() => updateWorkOrderStatus(wo.id, 'COMPLETED', 100)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs"
                      >
                        <span>Mark Done</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ARTISAN TASKS & TIMESHEETS TAB */}
      {activeTab === 'timesheets' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900">Atelier Project Tasks & Labor Timesheet</h3>
            <span className="text-xs text-stone-500">Track logged hours vs estimated production time</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[750px]">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Task Name</th>
                  <th className="py-3 px-4">Description / Client</th>
                  <th className="py-3 px-4">Assigned Artisan</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Logged / Estimated</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {tasks.map(task => (
                  <tr key={task.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-stone-900">{task.title}</td>
                    <td className="py-3 px-4 text-stone-600">{task.description} {task.clientName ? `(${task.clientName})` : ''}</td>
                    <td className="py-3 px-4 font-medium text-stone-800">{task.assignedTo}</td>
                    <td className="py-3 px-4 font-mono text-stone-500">{task.dueDate}</td>
                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-stone-900">{task.loggedHours}h</span> / {task.estimatedHours}h
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          task.status === 'DONE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : task.status === 'IN_PROGRESS'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-[11px] shadow-2xs"
                      >
                        {task.status === 'DONE' ? 'Re-open' : 'Mark Done'}
                      </button>
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
