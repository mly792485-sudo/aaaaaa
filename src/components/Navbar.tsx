import React, { useState } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap,
  Share2,
  Lock,
  PhoneCall,
  Check,
  Github,
} from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenRegistration?: () => void;
  onOpenAdmin: () => void;
  onShareLink: () => void;
  copiedLink: boolean;
  onOpenGitHubExport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenRegistration,
  onOpenAdmin,
  onShareLink,
  copiedLink,
  onOpenGitHubExport,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'عن المدرسة', href: '#about' },
    { name: 'الرؤية والرسالة', href: '#vision-mission' },
    { name: 'الأهداف والأسس', href: '#objectives' },
    { name: 'المراحل الدراسية', href: '#stages' },
    { name: 'الهيئة التعليمية', href: '#faculty' },
    { name: 'الأخبار', href: '#news' },
    { name: 'معرض الصور', href: '#gallery' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Right side (RTL): School Logo & Vertical Stacked Name */}
          <a
            href="#hero"
            id="nav-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <SchoolLogo size={54} variant="icon-only" />
            <div className="flex flex-col text-right leading-tight border-r-2 border-amber-500/60 pr-2.5">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                مَـــــدَارِسُ
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                اليَـــمَـــنِ
              </span>
              <span className="text-[12px] font-extrabold text-teal-800 dark:text-teal-300">
                النَّــمُــوذَجِــيَّــة
              </span>
              <span className="text-[8px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 hidden sm:block">
                YEMEN MODEL SCHOOLS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-2.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-teal-800 dark:text-slate-300 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Left Actions: Share link, Register button, Dark mode, Admin, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Share Link for Students & Teachers */}
            <button
              onClick={onShareLink}
              id="nav-share-link-btn"
              title="مشاركة رابط الموقع للطلاب والمعلمين"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 transition-colors shadow-xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400">تم نسخ الرابط!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة الرابط</span>
                </>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              id="nav-theme-toggle-btn"
              aria-label="تبديل الوضع الليلي والنهاري"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Portal Modal Trigger */}
            <button
              onClick={onOpenAdmin}
              id="nav-admin-portal-btn"
              title="لوحة تحكم إدارة المدارس"
              className="hidden lg:flex p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* GitHub & Standalone Export Modal Trigger */}
            {onOpenGitHubExport && (
              <button
                onClick={onOpenGitHubExport}
                id="nav-github-export-btn"
                title="تصدير إلى GitHub وحل مشاكل الكوكيز"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-900 dark:text-white" />
                <span className="hidden md:inline">GitHub</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-menu-toggle"
              aria-label="فتح القائمة"
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4"
        >
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onShareLink();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'تم النسخ' : 'المشاركة'}</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>الإدارة</span>
            </button>

            {onOpenGitHubExport && (
              <button
                onClick={() => {
                  onOpenGitHubExport();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </button>
            )}
          </div>

          <div className="flex flex-col space-y-1 py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-teal-800 dark:text-slate-200 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-right"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>مدارس اليمن النموذجية - صنعاء</span>
            <a href="tel:+9671450123" className="flex items-center gap-1 font-bold text-teal-700 dark:text-teal-400">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>450 123 1 967+</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
