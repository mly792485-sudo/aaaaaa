import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Award,
  ShieldCheck,
  ChevronLeft,
  ArrowDown,
  Building,
  Upload,
  RotateCcw,
  Check,
} from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  getActiveSchoolLogo,
  setActiveSchoolLogo,
  resetSchoolLogo,
  subscribeToLogoChange,
} from '../utils/logoManager';

interface HeroProps {
  onOpenRegistration: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegistration }) => {
  const [logoSrc, setLogoSrc] = useState<string>(getActiveSchoolLogo());
  const [isCustom, setIsCustom] = useState<boolean>(getActiveSchoolLogo().startsWith('data:image'));
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return subscribeToLogoChange((newLogo) => {
      setLogoSrc(newLogo);
      setIsCustom(newLogo.startsWith('data:image'));
    });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setActiveSchoolLogo(dataUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    resetSchoolLogo();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-[#070d18] dark:via-[#0c1527] dark:to-[#070d18] transition-colors"
    >
      {/* Smooth, calm atmospheric lighting - NO grid squares */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          {/* Top Pill: Established & Accreditation */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>صرح تعليمي رائد في الجمهورية اليمنية منذ 2005</span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline font-semibold text-slate-600 dark:text-slate-400">
              معتمدة من وزارة التربية والتعليم
            </span>
          </div>

          {/* Official Emblem: Clean, Floating, No Confining Box */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="relative group">
              {/* Soft luminous ambient aura behind emblem */}
              <div className="absolute -inset-6 bg-gradient-to-r from-amber-400/20 via-blue-500/20 to-amber-400/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition duration-500 pointer-events-none" />
              
              <div className="relative p-2 transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={logoSrc}
                  alt="شعار مدارس اليمن النموذجية - AL YEMEN MODEL SCHOOLS - معاً نحو مستقبل أفضل"
                  className="w-56 sm:w-64 md:w-72 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] mx-auto"
                  loading="eager"
                />
              </div>
            </div>

            {/* Direct High-Resolution Logo Uploader / Customizer */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="hero-logo-uploader-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                id="hero-upload-logo-btn"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
                title="اضغط لرفع صورة الشعار الأصلية مباشرة من هاتفك أو جهازك"
              >
                <Upload className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{isCustom ? 'تغيير صورة الشعار' : 'رفع صورة الشعار الأصلية من جهازك'}</span>
              </button>

              {isCustom && (
                <button
                  type="button"
                  onClick={handleResetLogo}
                  id="hero-reset-logo-btn"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-300 dark:border-slate-700 transition-colors"
                  title="استعادة الشعار المتجه الافتراضي"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>استعادة</span>
                </button>
              )}
            </div>

            {uploadSuccess && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>تم اعتماد صورتك الأصلية للشعار بنجاح في كامل الموقع!</span>
              </div>
            )}

            {/* School Name & English Title */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 dark:from-blue-300 dark:via-indigo-200 dark:to-blue-100 bg-clip-text text-transparent">
                  {SCHOOL_INFO.name}
                </span>
              </h1>
              
              <div className="flex items-center gap-2 text-sm sm:text-lg font-black text-amber-600 dark:text-amber-400">
                <span>★</span>
                <span className="tracking-widest uppercase">{SCHOOL_INFO.englishName}</span>
                <span>★</span>
              </div>

              {/* Slogan */}
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 font-extrabold text-sm sm:text-base mt-1">
                <span>شعــارنا:</span>
                <span className="text-amber-700 dark:text-amber-300 font-black">«{SCHOOL_INFO.slogan}»</span>
              </div>
            </div>
          </div>

          {/* Smooth, Open Vision Quote - No Boxy Enclosure */}
          <div className="max-w-2xl mx-auto px-4 py-1">
            <p className="text-base sm:text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              «{SCHOOL_INFO.quote}»
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
            <button
              onClick={onOpenRegistration}
              id="hero-register-cta-btn"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 shadow-xl shadow-blue-600/25 active:scale-95 transition-all"
            >
              <GraduationCap className="w-5 h-5" />
              <span>التقديم والتسجيل للعام الجديد</span>
              <ChevronLeft className="w-4 h-4 mr-1" />
            </button>

            <a
              href="#vision-mission"
              id="hero-vision-cta-btn"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
            >
              <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>الرسالة والرؤية والأهداف</span>
            </a>

            <a
              href="#gallery"
              id="hero-gallery-cta-btn"
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
            >
              <Building className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>مرافق ومعالم المدرسة</span>
            </a>
          </div>

          {/* Unified, Sleek Stats Bar - Single Seamless Container */}
          <div className="w-full max-w-4xl pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 shadow-lg text-center">
              <div className="flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/60 mb-2">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {SCHOOL_INFO.studentsCount}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  طالب وطالبة
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-950/60 mb-2">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {SCHOOL_INFO.teachersCount}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  كادر تعليمي وإداري
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-teal-50 dark:bg-teal-950/60 mb-2">
                  <Building className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {SCHOOL_INFO.classroomsCount}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  فصلاً ومعملاً متطوراً
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  100%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  نسبة التفوق والنجاح
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
