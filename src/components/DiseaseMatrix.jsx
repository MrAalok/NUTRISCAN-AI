import React, { useState } from 'react';
import { HeartPulse, AlertCircle, CheckCircle2, ShieldX, Dumbbell, Baby, Activity, Scale, Stethoscope } from 'lucide-react';

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2 border border-rose-500/20">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Disease & Lifestyle Suitability Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
          Is This Food Safe For Your Health Condition?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-light">
          Select your health profile or medical condition to view AI personalized risk alerts
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8">
        
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
                    ? 'bg-gradient-to-br from-white/10 to-white/5 border-[#FF4B82] shadow-lg shadow-[#FF4B82]/10 scale-105'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#FF4B82]' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Condition Status Box */}
        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
              currentInfo.suitable
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              {currentInfo.suitable ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <ShieldX className="w-8 h-8" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Status for {conditions.find(c => c.id === selectedCondition)?.label}:
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  currentInfo.suitable
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {currentInfo.suitable ? 'SAFE & SUITABLE' : `RISK: ${currentInfo.severity.toUpperCase()}`}
                </span>
              </div>
              <p className="text-sm font-medium text-white">
                {currentInfo.note}
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l border-white/10 sm:pl-6">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Scanned Food Item
            </p>
            <p className="text-xs font-bold text-[#FF4B82] font-['Outfit']">
              {product.name}
            </p>
            <span className="text-[11px] text-slate-400">Score: {product.score}/100</span>
          </div>
        </div>

      </div>
    </section>
  );
}
