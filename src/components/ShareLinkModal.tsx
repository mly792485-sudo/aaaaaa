import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Share2,
  Globe,
  QrCode,
  ShieldCheck,
} from 'lucide-react';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  // Resolve the public shared URL
  // If running on dev server (ais-dev-...), convert to public preview URL (ais-pre-...)
  const getPublicUrl = () => {
    let url = appUrl || (typeof window !== 'undefined' ? window.location.href : '');
    if (url.includes('ais-dev-')) {
      url = url.replace('ais-dev-', 'ais-pre-');
    }
    // Remove query params or internal hash if any
    try {
      const parsed = new URL(url);
      return `${parsed.origin}${parsed.pathname}`;
    } catch {
      return url || 'https://ais-pre-wmr7dinriq7ru5264hca3q-212392729472.europe-west2.run.app';
    }
  };

  const publicUrl = getPublicUrl();

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(publicUrl);
        setCopied(true);
      } else {
        throw new Error('Fallback needed');
      }
    } catch {
      // Robust Fallback for iframes and older mobile webviews
      const textArea = document.createElement('textarea');
      textArea.value = publicUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (err) {
        console.error('Copy failed', err);
      }
      document.body.removeChild(textArea);
    }

    setTimeout(() => setCopied(false), 3500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'مدارس اليمن النموذجية | الموقع الرسمي',
          text: 'الموقع الرسمي لمدارس اليمن النموذجية - نحو تعليم نوعي وبناء أجيال المستقبل:',
          url: publicUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const whatsappShareText = encodeURIComponent(
    `🏫 *الموقع الرسمي لمدارس اليمن النموذجية*\nنحو تعليم نوعي وبناء أجيال متسلحة بالعلم والأخلاق.\n\nتفضل بزيارة الموقع الرسمي والتسجيل الإلكتروني عبر الرابط المباشر:\n${publicUrl}`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappShareText}`;

  return (
    <div
      id="share-link-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="share-link-modal-container"
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-6 text-right"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-share-modal-btn"
          aria-label="إغلاق النافذة"
          className="absolute top-5 left-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center border border-teal-200 dark:border-teal-800 shadow-sm shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              رابط الموقع الرسمي المباشر
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              الرابط العام المعتمد للمشاركة مع الطلاب والمعلمين وأولياء الأمور
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>هذا الرابط عام وشغال 100% ويمكن فتحه من أي هاتف أو جهاز كمبيوتر مباشرة.</span>
        </div>

        {/* URL Box with Copy Button */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            عنوان الرابط العام:
          </label>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
            <input
              type="text"
              readOnly
              value={publicUrl}
              dir="ltr"
              className="w-full bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 px-2 py-1 outline-none select-all"
            />
            <button
              onClick={handleCopy}
              id="copy-public-link-btn"
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-800 hover:bg-teal-900 text-white active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Open Site in New Tab */}
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="open-site-in-new-tab-link"
            className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
          >
            <ExternalLink className="w-4 h-4" />
            <span>فتح الموقع في نافذة جديدة</span>
          </a>

          {/* Share on WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="whatsapp-share-modal-link"
            className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
          >
            <Share2 className="w-4 h-4" />
            <span>إرسال عبر واتساب</span>
          </a>
        </div>

        {/* Secondary: Mobile Native Share Sheet & QR Code */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setShowQr(!showQr)}
            className="text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-300 font-bold flex items-center gap-1.5 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQr ? 'إخفاء رمز QR' : 'إظهار رمز QR للمسح بالكاميرا'}</span>
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="text-teal-700 dark:text-teal-400 hover:underline font-bold flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة عبر تطبيقات الهاتف</span>
            </button>
          )}
        </div>

        {/* QR Code Container */}
        {showQr && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2 animate-in zoom-in-95 duration-150">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                publicUrl
              )}`}
              alt="QR Code للموقع الرسمي"
              className="w-36 h-36 mx-auto rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 bg-white p-2"
              loading="lazy"
            />
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              امسح الرمز بكاميرا الهاتف لفتح الموقع فوراً
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
