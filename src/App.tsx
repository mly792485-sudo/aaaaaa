import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { VisionMissionSection } from './components/VisionMissionSection';
import { ObjectivesAndPrinciplesSection } from './components/ObjectivesAndPrinciplesSection';
import { StagesSection } from './components/StagesSection';
import { FacultySection } from './components/FacultySection';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudentRegistrationModal } from './components/StudentRegistrationModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { ShareLinkModal } from './components/ShareLinkModal';
import { InAppBrowserBanner } from './components/InAppBrowserBanner';
import { GitHubExportModal } from './components/GitHubExportModal';

import {
  NEWS_ARTICLES,
  GALLERY_ITEMS,
  SCHOOL_INFO,
} from './data/schoolData';
import {
  StudentApplication,
  ContactMessage,
  NewsArticle,
} from './types';

export function App() {
  // 1. Dark Mode State with LocalStorage & HTML class synchronization
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('yms_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('yms_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('yms_theme', 'light');
    }
  }, [darkMode]);

  // 2. Modals state
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [preselectedStage, setPreselectedStage] = useState<string | undefined>();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isGitHubExportOpen, setIsGitHubExportOpen] = useState(false);

  // 3. Share link state
  const [appUrl, setAppUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    // Obtain actual current full URL in browser
    if (typeof window !== 'undefined') {
      let currentUrl = window.location.origin + window.location.pathname;
      // Convert dev container URL to public preview URL for students/public
      if (currentUrl.includes('ais-dev-')) {
        currentUrl = currentUrl.replace('ais-dev-', 'ais-pre-');
      }
      setAppUrl(currentUrl || 'https://ais-pre-wmr7dinriq7ru5264hca3q-212392729472.europe-west2.run.app');
    }
  }, []);

  const handleShareLink = () => {
    let urlToShare = appUrl || (typeof window !== 'undefined' ? window.location.href : '');
    if (urlToShare.includes('ais-dev-')) {
      urlToShare = urlToShare.replace('ais-dev-', 'ais-pre-');
    }

    // Try clipboard copy safely
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(urlToShare).catch(() => {});
      }
    } catch {
      // Ignored; modal provides fallback copy
    }

    setCopiedLink(true);
    setShowShareToast(true);
    setIsShareModalOpen(true);
    setTimeout(() => {
      setCopiedLink(false);
      setShowShareToast(false);
    }, 4000);
  };

  // 4. Data states with local storage persistence
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('yms_news');
    return saved ? JSON.parse(saved) : NEWS_ARTICLES;
  });

  const [applications, setApplications] = useState<StudentApplication[]>(() => {
    const saved = localStorage.getItem('yms_applications');
    if (saved) return JSON.parse(saved);
    // Initial sample record for realistic demo
    return [
      {
        id: 'YMS-104921',
        studentName: 'محمد عبد الله الشامي',
        gender: 'ذكر',
        birthDate: '2016-04-12',
        stage: 'المرحلة الأساسية (الصفوف 1 - 9)',
        grade: 'الصف الرابع الأساسي',
        parentName: 'عبد الله صالح الشامي',
        parentPhone: '+967 771 234 567',
        parentJob: 'مهندس اتصالات',
        address: 'صنعاء، شارع الستين الغربي',
        notes: 'الرغبة في الاشتراك بالباص المدرسي',
        status: 'مقبول مبدئياً',
        submittedAt: '2026-08-20',
      },
    ];
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('yms_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddApplication = (
    newAppData: Omit<StudentApplication, 'id' | 'status' | 'submittedAt'>
  ) => {
    const newApp: StudentApplication = {
      ...newAppData,
      id: `YMS-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'قيد المراجعة',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem('yms_applications', JSON.stringify(updated));
  };

  const handleUpdateAppStatus = (
    id: string,
    newStatus: StudentApplication['status']
  ) => {
    const updated = applications.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setApplications(updated);
    localStorage.setItem('yms_applications', JSON.stringify(updated));
  };

  const handleSendMessage = (msgData: Omit<ContactMessage, 'id' | 'sentAt'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `MSG-${Date.now()}`,
      sentAt: new Date().toLocaleString('ar-YE'),
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('yms_messages', JSON.stringify(updated));
  };

  const handleAddNewsArticle = (articleData: Omit<NewsArticle, 'id'>) => {
    const newArt: NewsArticle = {
      ...articleData,
      id: `news-${Date.now()}`,
    };
    const updated = [newArt, ...articles];
    setArticles(updated);
    localStorage.setItem('yms_news', JSON.stringify(updated));
  };

  const openRegistrationWithStage = (stageName: string) => {
    setPreselectedStage(stageName);
    setIsRegistrationOpen(true);
  };

  const openGeneralRegistration = () => {
    setPreselectedStage(undefined);
    setIsRegistrationOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-teal-700 selection:text-white font-sans antialiased">
      {/* In-app browser detection and cookie helper banner (Snapchat, Instagram, etc.) */}
      <InAppBrowserBanner />

      {/* Main Navbar with vertical brand logo layout & dark mode toggle */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenRegistration={openGeneralRegistration}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onShareLink={handleShareLink}
        copiedLink={copiedLink}
        onOpenGitHubExport={() => setIsGitHubExportOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero onOpenRegistration={openGeneralRegistration} />

        {/* About Section */}
        <AboutSection onOpenRegistration={openGeneralRegistration} />

        {/* Vision & Mission Section (الرؤية والرسالة) */}
        <VisionMissionSection />

        {/* Objectives & Principles Section (الأهداف والأسس الثمانية) */}
        <ObjectivesAndPrinciplesSection />

        {/* School Stages (رياض أطفال، أساسي، ثانوي) */}
        <StagesSection onOpenRegistrationWithStage={openRegistrationWithStage} />

        {/* Faculty & Administration (الهيئة التعليمية والإدارية) */}
        <FacultySection />

        {/* News & Announcements (الأخبار والإعلانات) */}
        <NewsSection articles={articles} />

        {/* Photo Gallery (معرض الصور) */}
        <GallerySection items={GALLERY_ITEMS} />

        {/* Contact & Map (تواصل معنا والخريطة) */}
        <ContactSection
          onSendMessage={handleSendMessage}
          onShareLink={handleShareLink}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenRegistration={openGeneralRegistration}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onShareLink={handleShareLink}
        copiedLink={copiedLink}
        onOpenGitHubExport={() => setIsGitHubExportOpen(true)}
      />

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">تم نسخ رابط الموقع بنجاح!</div>
            <div className="text-[11px] text-slate-300">
              يمكنك الآن لصقه وإرساله للطلاب والمعلمين عبر واتساب أو تيليجرام
            </div>
          </div>
        </div>
      )}

      {/* Student Registration Modal */}
      <StudentRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        preselectedStage={preselectedStage}
        onSubmitApplication={handleAddApplication}
      />

      {/* Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        applications={applications}
        onUpdateAppStatus={handleUpdateAppStatus}
        messages={messages}
        onAddNewsArticle={handleAddNewsArticle}
        onOpenGitHubExport={() => setIsGitHubExportOpen(true)}
      />

      {/* Share Public Link Modal */}
      <ShareLinkModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        appUrl={appUrl}
      />

      {/* GitHub Export & Deployment Guide Modal */}
      <GitHubExportModal
        isOpen={isGitHubExportOpen}
        onClose={() => setIsGitHubExportOpen(false)}
        appUrl={appUrl}
      />
    </div>
  );
}

export default App;
