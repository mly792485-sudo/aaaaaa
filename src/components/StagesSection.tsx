import React from 'react';
import {
  GraduationCap,
  Smile,
  BookOpenCheck,
  Check,
  ChevronLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_STAGES } from '../data/schoolData';

interface StagesSectionProps {
  onOpenRegistrationWithStage: (stageName: string) => void;
}

export const StagesSection: React.FC<StagesSectionProps> = ({
  onOpenRegistrationWithStage,
}) => {
  const getStageIcon = (name: string) => {
    switch (name) {
      case 'Smile':
        return <Smile className="w-8 h-8 text-rose-500" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8 text-amber-500" />;
      default:
        return <GraduationCap className="w-8 h-8 text-teal-600" />;
    }
  };

  return (
    <section
      id="stages"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>الرحلة التعليمية المتكاملة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            المراحل الدراسية
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            برامج تعليمية وتربوية متسلسلة تلبي احتياجات كل فئة عمرية وترتقي بطموحات طلابنا
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {SCHOOL_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-7 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-teal-500 to-amber-500 opacity-80" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform shadow-xs">
                    {getStageIcon(stage.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                    {stage.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                  {stage.title}
                </h3>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-4">
                  {stage.subtitle}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {stage.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                    أبرز مميزات المرحلة:
                  </span>
                  {stage.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => onOpenRegistrationWithStage(stage.title)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-700 hover:bg-blue-800 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>تسجيل طالب في هذه المرحلة</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
