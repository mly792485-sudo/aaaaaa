import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare, ExternalLink, QrCode, X } from 'lucide-react';

interface ShareBannerProps {
  appUrl: string;
  onClose?: () => void;
}

export const ShareBanner: React.FC<ShareBannerProps> = ({ appUrl, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareText = `السلام عليكم ورحمة الله وبركاته،
أهلاً بكم في الموقع الرسمي لـ مدارس اليمن النموذجية 🏫
نحو تعليم نوعي، وبناء أجيال متسلحة بالعلم والأخلاق.
يمكنكم زيارة الموقع والتسجيل ومتابعة أخبار الطلاب والمعلمين عبر الرابط:
${appUrl}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div
      id="website-share-announcement"
      className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white py-3 px-4 shadow-lg border-b border-teal-700/50 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        {/* Right Info */}
        <div className="flex items-center gap-2.5 text-center md:text-right">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 shrink-0 border border-amber-400/30">
            <Share2 className="w-4 h-4" />
          </span>
          <div>
            <p className="font-bold text-white text-xs sm:text-sm">
              رابط الموقع الرسمي جاهز للنشر والمشاركة للطلاب والمعلمين وأولياء الأمور
            </p>
            <p className="text-[11px] text-teal-200/80 hidden sm:block">
              شارك الرابط الآن لتمكين الطلاب والمعلمين من الاطلاع على الأخبار والتسجيل الإلكتروني
            </p>
          </div>
        </div>

        {/* Center URL input & copy */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <div className="flex items-center bg-black/40 border border-teal-500/30 rounded-xl px-3 py-1.5 text-xs text-teal-200 font-mono select-all overflow-hidden max-w-[280px] sm:max-w-xs">
            <span className="truncate" dir="ltr">
              {appUrl}
            </span>
          </div>

          <button
            onClick={handleCopy}
            id="share-banner-copy-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="share-banner-whatsapp-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md active:scale-95 shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">مشاركة واتساب</span>
          </a>

          <button
            onClick={() => setShowQR(!showQR)}
            title="عرض رمز الاستجابة السريعة QR Code"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shrink-0"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* QR Code Lightbox */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              رمز QR لرابط مدارس اليمن النموذجية
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              امسح الرمز بكاميرا الجوال للدخول المباشر إلى الموقع الرسمي
            </p>
            <div className="flex justify-center p-4 bg-white rounded-xl border border-slate-200 w-fit mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appUrl)}`}
                alt="QR Code للموقع"
                className="w-44 h-44"
              />
            </div>
            <p className="text-xs text-teal-700 dark:text-teal-400 font-mono break-all" dir="ltr">
              {appUrl}
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-sm"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
