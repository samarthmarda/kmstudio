import React, { useState, useEffect } from 'react';
import { FEMALE_MEASUREMENTS, cmToInches, inchesToCm, MeasurementDefinition } from './svgDefinitions';
import { BodyType } from '../../types/erp';
import {
  Ruler,
  RotateCw,
  Plus,
  Minus,
  Save,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
  Layers
} from 'lucide-react';

interface InteractiveBodyDiagramProps {
  initialValues: Record<string, { cm: number; inches: number }>;
  bodyType: BodyType;
  onSave: (values: Record<string, { cm: number; inches: number }>, unit: 'cm' | 'inches', notes?: string) => void;
  clientName?: string;
}

export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = ({
  initialValues,
  bodyType,
  onSave,
  clientName
}) => {
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');
  const [selectedKey, setSelectedKey] = useState<string>('chest');
  const [values, setValues] = useState<Record<string, { cm: number; inches: number }>>(() => {
    const defaults: Record<string, { cm: number; inches: number }> = {};
    FEMALE_MEASUREMENTS.forEach(def => {
      if (initialValues[def.key]) {
        defaults[def.key] = initialValues[def.key];
      } else {
        defaults[def.key] = {
          cm: def.defaultCm,
          inches: cmToInches(def.defaultCm)
        };
      }
    });
    return defaults;
  });

  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');

  // Handle value adjustment
  const updateValue = (key: string, delta: number) => {
    setValues(prev => {
      const current = prev[key] || { cm: 80, inches: 31.5 };
      let newCm: number;
      let newInches: number;

      if (unit === 'cm') {
        newCm = Math.max(10, Number((current.cm + delta).toFixed(1)));
        newInches = cmToInches(newCm);
      } else {
        newInches = Math.max(4, Number((current.inches + delta).toFixed(1)));
        newCm = inchesToCm(newInches);
      }

      return {
        ...prev,
        [key]: { cm: newCm, inches: newInches }
      };
    });
    setSaveStatus('dirty');
  };

  const handleDirectInput = (key: string, val: number) => {
    if (isNaN(val)) return;
    setValues(prev => {
      let newCm: number;
      let newInches: number;

      if (unit === 'cm') {
        newCm = val;
        newInches = cmToInches(val);
      } else {
        newInches = val;
        newCm = inchesToCm(val);
      }

      return {
        ...prev,
        [key]: { cm: newCm, inches: newInches }
      };
    });
    setSaveStatus('dirty');
  };

  const handleManualSave = () => {
    setSaveStatus('saving');
    onSave(values, unit, notes);
    setTimeout(() => setSaveStatus('saved'), 400);
  };

  const currentDef = FEMALE_MEASUREMENTS.find(m => m.key === selectedKey) || FEMALE_MEASUREMENTS[0];
  const currentValue = values[selectedKey] || { cm: currentDef.defaultCm, inches: cmToInches(currentDef.defaultCm) };

  const frontMeasurements = FEMALE_MEASUREMENTS.filter(m => m.view === 'front');
  const backMeasurements = FEMALE_MEASUREMENTS.filter(m => m.view === 'back');
  const activeMeasurementsList = activeView === 'front' ? frontMeasurements : backMeasurements;

  return (
    <div id="interactive-body-measurement-module" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
      {/* LEFT: SVG Interactive Canvas */}
      <div className="flex-1 p-4 lg:p-6 bg-stone-50/70 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col items-center justify-between min-h-[520px]">
        {/* Top View Toggle & Reference Header */}
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              id="svg-view-front-btn"
              onClick={() => {
                setActiveView('front');
                if (currentDef.view !== 'front') setSelectedKey('chest');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeView === 'front'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              C.F. Front View
            </button>
            <button
              id="svg-view-back-btn"
              onClick={() => {
                setActiveView('back');
                if (currentDef.view !== 'back') setSelectedKey('neck_size');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeView === 'back'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              C.B. Back View
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center bg-white border border-stone-300 rounded-lg p-0.5 text-xs font-mono">
            <button
              id="unit-cm-btn"
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-0.5 rounded-md font-bold transition-colors ${
                unit === 'cm' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              CM
            </button>
            <button
              id="unit-in-btn"
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-0.5 rounded-md font-bold transition-colors ${
                unit === 'inches' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              IN
            </button>
          </div>
        </div>

        {/* SVG Croquis Illustration Canvas */}
        <div className="relative w-full max-w-[360px] aspect-[3/5] bg-white rounded-xl border border-stone-200/80 shadow-inner p-2 flex items-center justify-center select-none">
          <svg
            viewBox="0 0 300 620"
            className="w-full h-full cursor-pointer overflow-visible"
          >
            <defs>
              {/* Leader arrow marker */}
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#cc0000" />
              </marker>
              <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#2563eb" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Red Center Reference Axis Line */}
            <line
              x1="150"
              y1="40"
              x2="150"
              y2="600"
              stroke="#cc0000"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.75"
            />
            <text x="150" y="25" textAnchor="middle" fill="#cc0000" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              {activeView === 'front' ? 'C.F. Center Front' : 'C.B. Center Back'}
            </text>

            {/* S - Side Reference Marker between legs */}
            <text x="165" y="470" fill="#cc0000" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              S - Side
            </text>

            {/* Minimalist Female Silhouette Anatomy */}
            <g stroke="#1a1a1a" strokeWidth="1.3" fill="#fafafa" strokeLinecap="round" strokeLinejoin="round">
              {/* Head */}
              <ellipse cx="150" cy="80" rx="16" ry="22" />
              {/* Neck */}
              <path d="M 142 102 L 142 126 L 158 126 L 158 102" />

              {/* Shoulders & Torso */}
              <path d="M 142 126 Q 120 130 110 138 L 115 190 Q 128 238 128 242 Q 128 270 114 295 Q 112 330 125 380 L 132 460 L 134 570 L 126 595 L 146 595 L 146 380 L 150 340 L 154 380 L 154 595 L 174 595 L 166 570 L 168 460 L 175 380 Q 188 330 186 295 Q 172 270 172 242 Q 172 238 185 190 L 190 138 Q 180 130 158 126" />

              {/* Arms (Left & Right hanging gracefully) */}
              <path d="M 110 138 Q 92 180 84 265 L 94 267 Q 102 190 115 155" />
              <path d="M 190 138 Q 208 180 216 265 L 206 267 Q 198 190 185 155" />

              {/* Bust definition lines on front */}
              {activeView === 'front' && (
                <path d="M 132 195 Q 150 205 168 195" stroke="#999999" strokeWidth="0.9" fill="none" />
              )}
            </g>

            {/* Measurement Interactive Overlay Lines */}
            {activeMeasurementsList.map(def => {
              const isSelected = selectedKey === def.key;
              const val = values[def.key] || { cm: def.defaultCm, inches: cmToInches(def.defaultCm) };
              const displayVal = unit === 'cm' ? `${val.cm} cm` : `${val.inches}"`;

              const strokeColor = isSelected
                ? '#2563eb'
                : def.isKey
                ? '#cc0000'
                : def.svg.colorCode || '#10b981';

              return (
                <g
                  key={def.key}
                  id={`svg-meas-group-${def.key}`}
                  onClick={() => setSelectedKey(def.key)}
                  className="cursor-pointer group"
                >
                  {/* Invisible wide hit area for easy touch selection on phones */}
                  <line
                    x1={def.svg.x1}
                    y1={def.svg.y1}
                    x2={def.svg.x2}
                    y2={def.svg.y2}
                    stroke="transparent"
                    strokeWidth="18"
                  />

                  {/* Leader Dotted Line to Label */}
                  {def.svg.leaderLine && (
                    <line
                      x1={def.svg.leaderLine.x1}
                      y1={def.svg.leaderLine.y1}
                      x2={def.svg.leaderLine.x2}
                      y2={def.svg.leaderLine.y2}
                      stroke={isSelected ? '#2563eb' : '#888888'}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Visible Measurement Line */}
                  <line
                    x1={def.svg.x1}
                    y1={def.svg.y1}
                    x2={def.svg.x2}
                    y2={def.svg.y2}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? '3' : '2'}
                    filter={isSelected ? 'url(#activeGlow)' : undefined}
                    strokeLinecap="round"
                  />

                  {/* End ticks / dots */}
                  <circle cx={def.svg.x1} cy={def.svg.y1} r={isSelected ? '3.5' : '2.5'} fill={strokeColor} />
                  <circle cx={def.svg.x2} cy={def.svg.y2} r={isSelected ? '3.5' : '2.5'} fill={strokeColor} />

                  {/* Text Label */}
                  <text
                    x={def.svg.labelX}
                    y={def.svg.labelY}
                    fill={isSelected ? '#1d4ed8' : def.isKey ? '#cc0000' : '#262626'}
                    fontSize={isSelected ? '11' : '9.5'}
                    fontWeight={isSelected || def.isKey ? 'bold' : 'normal'}
                    fontFamily="system-ui, sans-serif"
                    textAnchor={def.svg.labelX > 150 ? 'start' : 'end'}
                  >
                    {def.abbreviation && def.isKey ? `${def.abbreviation} - ` : ''}
                    {def.name.split(' ')[0]} ({displayVal})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="text-[11px] text-stone-500 font-sans mt-2 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Tap any green/red line to adjust dimension</span>
        </div>
      </div>

      {/* RIGHT: High-Precision Stepper Control Panel */}
      <div className="w-full lg:w-96 p-5 lg:p-6 bg-white flex flex-col justify-between space-y-5">
        {/* Active Measurement Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                  {currentDef.category}
                </span>
                {currentDef.isKey && (
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded-sm font-mono">
                    KEY POINT: {currentDef.abbreviation}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-stone-900">{currentDef.name}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 font-mono font-bold text-xs">
              {currentDef.abbreviation || '#'}
            </div>
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">{currentDef.description}</p>

          {/* Stepper Display */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600">Active Dimension:</span>
              <span className="text-xs text-stone-400 font-mono">
                {unit === 'cm' ? `Inches: ${currentValue.inches}"` : `CM: ${currentValue.cm} cm`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="meas-decrement-btn"
                onClick={() => updateValue(selectedKey, unit === 'cm' ? -0.5 : -0.25)}
                className="w-12 h-12 rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 active:scale-95 flex items-center justify-center shadow-xs font-bold transition-transform"
              >
                <Minus className="w-5 h-5" />
              </button>

              <div className="flex-1 bg-white border border-stone-300 rounded-xl px-4 py-2 flex items-baseline justify-center gap-1 shadow-2xs">
                <input
                  type="number"
                  step={unit === 'cm' ? '0.5' : '0.25'}
                  value={unit === 'cm' ? currentValue.cm : currentValue.inches}
                  onChange={e => handleDirectInput(selectedKey, parseFloat(e.target.value))}
                  className="w-24 text-2xl font-bold font-mono text-center text-stone-900 focus:outline-hidden"
                />
                <span className="text-xs font-semibold text-stone-500 font-mono">{unit.toUpperCase()}</span>
              </div>

              <button
                id="meas-increment-btn"
                onClick={() => updateValue(selectedKey, unit === 'cm' ? 0.5 : 0.25)}
                className="w-12 h-12 rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 active:scale-95 flex items-center justify-center shadow-xs font-bold transition-transform"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick List Selector for other measurements in this view */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
              {activeView === 'front' ? 'Front Measurements' : 'Back Measurements'}
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {activeMeasurementsList.map(m => {
                const isCur = selectedKey === m.key;
                const v = values[m.key] || { cm: m.defaultCm, inches: cmToInches(m.defaultCm) };
                return (
                  <button
                    key={m.key}
                    id={`quick-select-${m.key}`}
                    onClick={() => setSelectedKey(m.key)}
                    className={`text-left p-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      isCur
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
                        : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    <span className="truncate">{m.name.split(' ')[0]}</span>
                    <span className="font-mono text-[11px]">
                      {unit === 'cm' ? `${v.cm}` : `${v.inches}"`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Session Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Tailor Ease & Posture Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => {
                setNotes(e.target.value);
                setSaveStatus('dirty');
              }}
              placeholder="e.g. Erect posture, sloping left shoulder by 0.5cm, +2cm bust ease requested."
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Save & Action Footer */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            {saveStatus === 'saved' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-700 font-medium">Session Saved</span>
              </>
            ) : (
              <span className="text-amber-600 font-medium">• Unsaved changes</span>
            )}
          </div>

          <button
            id="save-measurements-session-btn"
            onClick={handleManualSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-sm active:scale-95 transition-transform"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            <span>Save Measurements</span>
          </button>
        </div>
      </div>
    </div>
  );
};
