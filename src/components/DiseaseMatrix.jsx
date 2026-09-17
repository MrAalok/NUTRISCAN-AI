import React, { useState } from 'react';
import { HeartPulse, CheckCircle2, ShieldX, Dumbbell, Baby, Activity, Scale, Stethoscope } from 'lucide-react';

export default function DiseaseMatrix({ product }) {
  const [selectedCondition, setSelectedCondition] = useState('diabetes');

  if (!product || !product.diseaseSuitability) return null;

  const conditions = [
    { id: 'diabetes', label: 'Diabetes', icon: Activity, color: 'from-rose-500 to-red-600' },
    { id: 'hypertension', label: 'Hypertension (BP)', icon: Stethoscope, color: 'from-amber-500 to-orange-600' },
    { id: 'obesity', label: 'Obesity / Weight Loss', icon: Scale, color: 'from-[#FF4B82] to-pink-600' },
    { id: 'thyroid', label: 'Thyroid Health', icon: HeartPulse, color: 'from-purple-500 to-indigo-600' },
    { id: 'gymFitness', label: 'Gym & High Protein', icon: Dumbbell, color: 'from-emerald-500 to-teal-600' },
    { id: 'kidsParenting', label: 'Kids & Parenting', icon: Baby, color: 'from-sky-500 to-blue-600' },
  ];

  const currentInfo = product.diseaseSuitability[selectedCondition] || {
    suitable: false,
    severity: "Unknown",
    note: "No specific medical data available for this condition."
  };

  return (
    <section id="disease-section" className="scroll-mt-24 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold mb-2 border border-rose-200">
          <HeartPulse className="w-3.5 h-3.5 text-[#FF4B82]" />
          <span>Disease & Lifestyle Suitability Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Is This Food Safe For Your Health Condition?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-normal">
          Select your health profile or medical condition to view personalized health risk warnings
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 bg-white border border-slate-200 shadow-xl">
        
        {/* Condition Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mb-8">
          {conditions.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedCondition === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCondition(item.id)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'bg-rose-50 border-[#FF4B82] shadow-md shadow-[#FF4B82]/10 scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#FF4B82]' : 'text-slate-500'}`} />
                <span className={`text-xs font-bold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Condition Status Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${
              currentInfo.suitable
                ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                : 'bg-rose-100 border-rose-300 text-rose-700'
            }`}>
              {currentInfo.suitable ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              ) : (
                <ShieldX className="w-8 h-8 text-rose-600" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                  Status for {conditions.find(c => c.id === selectedCondition)?.label}:
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  currentInfo.suitable
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    : 'bg-rose-100 text-rose-700 border border-rose-300'
                }`}>
                  {currentInfo.suitable ? 'SAFE & SUITABLE' : `RISK: ${currentInfo.severity.toUpperCase()}`}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {currentInfo.note}
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l border-slate-200 sm:pl-6 shrink-0">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">
              Scanned Food Item
            </p>
            <p className="text-xs font-extrabold text-[#FF4B82] font-['Outfit'] truncate max-w-[140px]">
              {product.name}
            </p>
            <span className="text-[11px] text-slate-600 font-semibold">Score: {product.score}/100</span>
          </div>
        </div>

      </div>
    </section>
  );
}
