import React from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle,
  GraduationCap,
  Sparkles,
  BookOpen,
  Compass,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface AboutSectionProps {
  onOpenRegistration: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenRegistration }) => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Right Column: Visual Showcase & Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative">
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 relative group">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000&auto=format&fit=crop"
                  alt="مبنى مدارس اليمن النموذجية"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 inline-block mb-2">
                    البيئة المدرسية النموذجية
                  </span>
                  <h4 className="text-lg font-black text-white">
                    مرافق حديثة وساحات واسعة مصممة للتميز
                  </h4>
                </div>
              </div>

              {/* Floating Mini Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-3 max-w-xs">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    اعتماد وزاري رسمي
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    وزارة التربية والتعليم - الجمهورية اليمنية
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column: Story & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
                <Building2 className="w-3.5 h-3.5" />
                <span>عن مدارس اليمن النموذجية</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                مسيرة متواصلة من العطاء التربوي والريادة الأكاديمية
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              تأسست <strong className="text-blue-700 dark:text-blue-400 font-black">مدارس اليمن النموذجية</strong> لتكون منارة تعليمية وأكاديمية بارزة في الجمهورية اليمنية، تسعى بكل عزيمة إلى تقديم تعليم نوعي يجمع بين أصالة القيم اليمنية والإسلامية ومواكبة أحدث تقنيات وأساليب العصر المعرفي.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              نؤمن في مدارسنا بأن التعليم ليس مجرد تلقين، بل هو بناء شامل لشخصية الطالب علمياً، وأخلاقياً، وسلوكياً، وثقافياً، واجتماعياً؛ ليكون قادراً على الابتكار والتفكير النقدي والمساهمة الفاعلة في نهضة وطنه ومجتمعه.
            </p>

            {/* Key Advantages Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  كادر تدريسي وإداري نخبة من ذوي الكفاءة العالية والخبرة
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  معامل حاسوب ومختبرات علوم تجريبية متكاملة
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  مناهج إثرائية متطورة للغات والرياضيات وتنمية المهارات
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  بيئة آمنة وصحية مع رعاية خاصة لجميع المراحل
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenRegistration}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-700 hover:bg-blue-800 shadow-md transition-all"
              >
                انضم إلى أسرة مدارس اليمن النموذجية
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
