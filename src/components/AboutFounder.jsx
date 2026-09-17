import React from 'react';
import { UserCheck, Sparkles, Heart, Target, Users, Dumbbell, GraduationCap, Activity } from 'lucide-react';

export default function AboutFounder() {
  const targetAudiences = [
    { title: "Health-Conscious Individuals", desc: "Mindful eaters who want transparent nutritional truth.", icon: Heart, color: "text-[#FF4B82]" },
    { title: "Parents & Students", desc: "Protecting growing children from hidden dyes and excess sugars.", icon: GraduationCap, color: "text-purple-400" },
    { title: "Gym-Goers & Fitness Lovers", desc: "Verifying protein claims vs hidden saturated fats.", icon: Dumbbell, color: "text-emerald-400" },
    { title: "Lifestyle Disease Management", desc: "Individuals managing Diabetes, Obesity, Thyroid, or Hypertension.", icon: Activity, color: "text-rose-400" }
  ];

  return (
    <section id="founder-section" className="scroll-mt-24 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
      
      {/* Founder Profile Card */}
      <div className="glass-panel p-8 relative overflow-hidden mb-12 border border-[#FF4B82]/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FF4B82]/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FF4B82] to-[#8B5CF6] p-1 shrink-0 shadow-xl shadow-[#FF4B82]/20">
            <div className="w-full h-full bg-[#090D16] rounded-full flex items-center justify-center overflow-hidden">
              <UserCheck className="w-12 h-12 text-[#FF4B82]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4B82] bg-[#FF4B82]/10 px-2.5 py-0.5 rounded-full border border-[#FF4B82]/20">
                Founder & Lead Innovator
              </span>
              <span className="text-xs text-slate-400">Tech for Health</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-['Outfit']">
              Arushi Shivhare
            </h2>
            
            <p className="text-sm text-slate-300 font-light leading-relaxed italic mb-4">
              "Hey, I'm Arushi Shivhare, founder of 'Tech for Health'. I'm 18 years old and I believe that technology can empower people to make better health choices every day. NutriScan AI is my step toward creating an AI solution that turns complex food labels into transparent clarity. Because health should never be a guess — it should be a choice."
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5 text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#FF4B82]" /> Solo Project Initiative
              </span>
              <span>•</span>
              <span className="text-emerald-400">Mission: Mindful Eating & Transparency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience Showcase */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mb-1">
          Who Is NutriScan AI Built For?
        </h3>
        <p className="text-xs text-slate-400">Empowering every generation to make informed dietary decisions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {targetAudiences.map((aud, idx) => {
          const Icon = aud.icon;
          return (
            <div key={idx} className="glass-panel p-5 text-center flex flex-col items-center justify-between hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center mb-3">
                <Icon className={`w-6 h-6 ${aud.color}`} />
              </div>
              <h4 className="text-xs font-bold text-white mb-1 font-['Outfit']">{aud.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{aud.desc}</p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
