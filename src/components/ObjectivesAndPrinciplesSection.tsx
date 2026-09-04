import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Flag,
  BookOpen,
  HeartHandshake,
  Award,
  GraduationCap,
  Trophy,
  CheckCircle,
  Briefcase,
} from 'lucide-react';
import { OBJECTIVES, WORK_PRINCIPLES } from '../data/schoolData';

export const ObjectivesAndPrinciplesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'objectives' | 'principles'>('objectives');

  const getObjectiveIcon = (name: string) => {
    switch (name) {
      case 'Flag':
        return <Flag className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Award':
        return <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      default:
        return <Target className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section
      id="objectives"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <Target className="w-3.5 h-3.5" />
            <span>الغايات الاستراتيجية والمنظومة المؤسسية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            الأهداف الاستراتيجية وأسس العمل
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            وثيقة الأهداف المعتمدة وأسس التعامل الواردة في اللوائح الرسمية لمدارس اليمن النموذجية
          </p>

          {/* Switch Tabs */}
          <div className="flex justify-center pt-4">
            <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
              <button
                onClick={() => setActiveTab('objectives')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'objectives'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>أهداف المدرسة (6)</span>
              </button>

              <button
                onClick={() => setActiveTab('principles')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'principles'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>أسس التعامل والعمل (8)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Objectives (الأهداف الستة) */}
        {activeTab === 'objectives' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50 duration-300">
            {OBJECTIVES.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                      {getObjectiveIcon(item.iconName)}
                    </div>
                    <span className="text-xl font-black text-slate-300 dark:text-slate-700 font-mono">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>هدف استراتيجي معتمد</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Work Principles (أسس التعامل والعمل) */}
        {activeTab === 'principles' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in-50 duration-300">
            {WORK_PRINCIPLES.map((principle, index) => (
              <div
                key={principle.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      {principle.category}
                    </span>
                    <span className="text-sm font-black text-slate-400 dark:text-slate-600">
                      #{index + 1}
                    </span>
                  </div>

                  <p className="text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                    «{principle.text}»
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>معيار التميز المؤسسي</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
