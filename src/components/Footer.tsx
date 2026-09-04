import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  Check,
  GraduationCap,
  ShieldCheck,
  ChevronUp,
  Github,
} from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onOpenRegistration: () => void;
  onOpenAdmin: () => void;
  onShareLink: () => void;
  copiedLink: boolean;
  onOpenGitHubExport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRegistration,
  onOpenAdmin,
  onShareLink,
  copiedLink,
  onOpenGitHubExport,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size={58} variant="icon-only" />
              <div className="flex flex-col text-right leading-tight border-r-2 border-amber-500/60 pr-2.5">
                <span className="text-xs font-bold text-amber-400 tracking-wider">
                  مَـــــدَارِسُ
                </span>
                <span className="text-xl font-black text-white tracking-wide">
                  اليَـــمَـــنِ
                </span>
                <span className="text-sm font-extrabold text-teal-300">
                  النَّــمُــوذَجِــيَّــة
                </span>
                <span className="text-[9px] font-semibold text-slate-400 tracking-wider">
                  YEMEN MODEL SCHOOLS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              مؤسسة تربوية وتعليمية وأكاديمية رائدة في أمانة العاصمة صنعاء، تسعى لبناء وإعداد أجيال متسلحة علمياً وأخلاقياً وثقافياً واجتماعياً.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>معتمدة من وزارة التربية والتعليم - الجمهورية اليمنية</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <a href="#hero" className="hover:text-amber-300 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  عن المدرسة وتاريخها
                </a>
              </li>
              <li>
                <a href="#vision-mission" className="hover:text-amber-300 transition-colors">
                  الرؤية والرسالة المعتمدة
                </a>
              </li>
              <li>
                <a href="#objectives" className="hover:text-amber-300 transition-colors">
                  الأهداف وأسس التعامل
                </a>
              </li>
              <li>
                <a href="#stages" className="hover:text-amber-300 transition-colors">
                  المراحل الدراسية (KG، أساسي، ثانوي)
                </a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-amber-300 transition-colors">
                  الهيئة التعليمية والإدارية
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-amber-300 transition-colors">
                  الأخبار والإعلانات المدرسية
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  معرض صور المدرسة
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
              بيانات التواصل والمقر
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address} - {SCHOOL_INFO.locationDetails}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span dir="ltr">{SCHOOL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span dir="ltr">{SCHOOL_INFO.mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Share & CTA */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
              نشر الموقع
            </h4>
            <p className="text-xs text-slate-400">
              انسخ رابط الموقع لمشاركته مع أولياء الأمور والطلاب والمعلمين.
            </p>
            <button
              onClick={onShareLink}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم نسخ الرابط!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة الرابط</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenRegistration}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>تسجيل طالب</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} جميع الحقوق محفوظة لـ <strong>مدارس اليمن النموذجية</strong> - صنعاء، الجمهورية اليمنية.
          </div>

          <div className="flex items-center gap-4">
            {onOpenGitHubExport && (
              <button
                onClick={onOpenGitHubExport}
                className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                title="تصدير إلى GitHub وحل مشكلة الكوكيز"
              >
                <Github className="w-3.5 h-3.5" />
                <span>تصدير لـ GitHub</span>
              </button>
            )}
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-white transition-colors"
            >
              لوحة الإدارة
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              title="الصعود للأعلى"
            >
              <ChevronUp className="w-4 h-4" />
              <span>أعلى الصفحة</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
