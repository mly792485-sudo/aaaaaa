import React from 'react';
import { Eye, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { VISION, MISSION } from '../data/schoolData';

export const VisionMissionSection: React.FC = () => {
  return (
    <section
      id="vision-mission"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>البوصلة الاستراتيجية والهوية التربوية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            الرؤية والرسالة المعتمدة
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            المرجع التأسيسي والمنهاج التربوي المعتمد لدى مدارس اليمن النموذجية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1: الرؤية (The Vision) */}
          <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-xs">
                  <Eye className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    VISION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    رؤيتنا
                  </h3>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-inner">
                <p className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 leading-relaxed text-right">
                  «{VISION}»
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>معتمدة ضمن الخطة الاستراتيجية لمدارس اليمن النموذجية</span>
            </div>
          </div>

          {/* Card 2: الرسالة (The Mission) */}
          <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/15 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 flex items-center justify-center border border-teal-500/30 shadow-xs">
                  <Send className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                    MISSION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    رسالتنا
                  </h3>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-inner">
                <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 leading-relaxed text-right">
                  «{MISSION}»
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>إعداد وتأهيل أجيال الغد لخدمة الوطن والمجتمع</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
