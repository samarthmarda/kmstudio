import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  GitFork,
  Plus,
  ArrowRight,
  Phone,
  Ruler,
  ShoppingBag,
  Clock,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { PipelineStage } from '../../types/erp';

export const PipelineView: React.FC = () => {
  const {
    clients,
    updateClientStage,
    setSelectedClientId,
    setCurrentTab,
    openQuickCreate
  } = useERP();

  const stages: { key: PipelineStage; label: string; color: string }[] = [
    { key: 'INQUIRY', label: '1. Inquiry', color: 'border-stone-400 bg-stone-100 text-stone-700' },
    { key: 'MEASURED', label: '2. Measured', color: 'border-blue-400 bg-blue-50 text-blue-700' },
    { key: 'ORDERED', label: '3. Order Confirmed', color: 'border-purple-400 bg-purple-50 text-purple-700' },
    { key: 'IN_PRODUCTION', label: '4. In Production', color: 'border-amber-400 bg-amber-50 text-amber-800' },
    { key: 'FITTING', label: '5. Trial Fitting', color: 'border-cyan-400 bg-cyan-50 text-cyan-800' },
    { key: 'READY', label: '6. Ready for Delivery', color: 'border-emerald-400 bg-emerald-50 text-emerald-800' },
    { key: 'DELIVERED', label: '7. Delivered / Closed', color: 'border-stone-700 bg-stone-800 text-white' }
  ];

  const getNextStage = (current: PipelineStage): PipelineStage | null => {
    const idx = stages.findIndex(s => s.key === current);
    if (idx !== -1 && idx < stages.length - 1) {
      return stages[idx + 1].key;
    }
    return null;
  };

  return (
    <div id="pipeline-view-container" className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 font-serif">Customer Sales Pipeline</h1>
          <p className="text-xs text-stone-500">
            Kanban workflow tracking clients from initial studio inquiry to final bespoke delivery
          </p>
        </div>

        <button
          onClick={() => openQuickCreate('customer')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span>New Lead / Inquiry</span>
        </button>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1350px]">
          {stages.map(st => {
            const stageClients = clients.filter(c => c.pipelineStage === st.key);
            const totalStageValue = stageClients.reduce((acc, c) => acc + c.totalSpend, 0);

            return (
              <div
                key={st.key}
                id={`kanban-col-${st.key}`}
                className="w-72 shrink-0 bg-stone-100/90 rounded-xl p-3 border border-stone-200/80 flex flex-col max-h-[75vh]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">{st.label}</span>
                    <span className="text-[10px] bg-white font-mono font-bold px-1.5 py-0.2 rounded-full border border-stone-300 text-stone-700">
                      {stageClients.length}
                    </span>
                  </div>
                  {totalStageValue > 0 && (
                    <span className="text-[10px] font-mono font-bold text-stone-600">
                      ₹{(totalStageValue / 1000).toFixed(0)}k
                    </span>
                  )}
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                  {stageClients.map(client => {
                    const nextSt = getNextStage(client.pipelineStage);

                    return (
                      <div
                        key={client.id}
                        className="bg-white p-3 rounded-lg border border-stone-200/90 shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <button
                              onClick={() => {
                                setSelectedClientId(client.id);
                                setCurrentTab('customer_detail');
                              }}
                              className="font-bold text-xs text-stone-900 hover:text-amber-700 text-left"
                            >
                              {client.name}
                            </button>
                            <div className="text-[10px] text-stone-500 font-mono mt-0.5">{client.phone}</div>
                          </div>
                          <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded capitalize font-medium">
                            {client.bodyType}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                          {client.notes || 'Studio walk-in inquiry'}
                        </p>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                          <button
                            onClick={() => {
                              setSelectedClientId(client.id);
                              setCurrentTab('customer_detail');
                            }}
                            className="text-stone-400 hover:text-stone-800 text-[10px] font-medium"
                          >
                            Details →
                          </button>

                          {nextSt && (
                            <button
                              onClick={() => updateClientStage(client.id, nextSt)}
                              className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 hover:bg-amber-500 hover:text-stone-950 text-stone-700 text-[10px] font-semibold transition-colors"
                              title={`Advance to ${nextSt}`}
                            >
                              <span>Move Next</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {stageClients.length === 0 && (
                    <div className="py-8 text-center text-stone-400 text-xs border border-dashed border-stone-300 rounded-lg">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
