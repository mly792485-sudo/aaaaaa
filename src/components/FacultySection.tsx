import React from 'react';
import { Users, Award, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/schoolData';

export const FacultySection: React.FC = () => {
  return (
    <section
      id="faculty"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
            <Users className="w-3.5 h-3.5" />
            <span>صُنَّاع التميز وبُناة العقول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            الإدارة والهيئة التعليمية
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            نخبة من الكفاءات التربوية والإدارية المتميزة المكرسة لخدمة طلابنا ورعايتهم علمياً وأخلاقياً
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${member.avatarBg} text-white flex items-center justify-center font-black text-xl shadow-md shrink-0`}
                  >
                    {member.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 py-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{member.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>{member.department}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  خبرة أكاديمية: {member.experienceYears} عاماً
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>معتمد</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
