import React, { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, X, AlertTriangle, Smartphone, Compass } from 'lucide-react';

export const InAppBrowserBanner: React.FC = () => {
  const [isInApp, setIsInApp] = useState<boolean>(false);
  const [appName, setAppName] = useState<string>('تطبيق خارجي');
  const [copied, setCopied] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  useEffect(() => {
    try {
      // Ensure security cookies are set
      document.cookie = "security_cookie_allowed=true; path=/; SameSite=None; Secure";
      document.cookie = "cross-site-cookie=true; path=/; SameSite=None; Secure";
    } catch {
      // Silent catch
    }

    if (sessionStorage.getItem('dismiss_inapp_banner') === 'true') {
      setIsDismissed(true);
    }

    const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
    const isSnapchat = /Snapchat/i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isFB = /FBAN|FBAV/i.test(ua);
    const isTikTok = /TikTok|musical_ly|BytedanceWebview/i.test(ua);
    const isTwitter = /Twitter|Tweetbot/i.test(ua);

    if (isSnapchat || isInstagram || isFB || isTikTok || isTwitter) {
      setIsInApp(true);
      if (isSnapchat) setAppName('سناب شات (Snapchat)');
      else if (isInstagram) setAppName('إنستغرام (Instagram)');
      else if (isFB) setAppName('فيسبوك (Facebook)');
      else if (isTikTok) setAppName('تيك توك (TikTok)');
      else if (isTwitter) setAppName('تطبيق X / تويتر');
    }
  }, []);

  if (!isInApp || isDismissed) {
    return null;
  }

  const handleCopy = () => {
    try {
      const url = window.location.href.replace('ais-dev-', 'ais-pre-');
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('dismiss_inapp_banner', 'true');
  };

  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href.replace('ais-dev-', 'ais-pre-') 
    : '';

  return (
    <aside
      aria-label="تنبيه المتصفح المدمج"
      className="relative z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-lg border-b border-amber-500/50"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-4 h-4 text-amber-100" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-black leading-tight flex flex-wrap items-center gap-1.5">
              <span>تتصفح حالياً عبر {appName}</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold">
                حظر الكوكيز محتمل
              </span>
            </p>
            <p className="text-[11px] sm:text-xs text-amber-100/90 leading-normal">
              لتفادي رسالة حظر ملفات تعريف الارتباط وضمان فتح الموقع بسرعة، اضغط على الثلاث نقاط (•••) ثم اختر <strong className="text-white underline underline-offset-2">«فتح في المتصفح» (Safari / Chrome)</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-amber-900 hover:bg-amber-50 text-xs font-black shadow-xs transition-colors"
            title="نسخ رابط الموقع لفتحه في متصفحك الأساسي"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
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
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-950/60 text-white text-xs font-bold border border-white/20 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>متصفح خارجي</span>
          </a>

          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
            title="تعليمات سفاري لحظر الكوكيز"
          >
            تعليمات
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="إغلاق التنبيه"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="bg-amber-800/95 border-t border-amber-600/50 px-4 py-3 text-xs leading-relaxed">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 bg-amber-900/40 p-2.5 rounded-xl">
              <Smartphone className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-white mb-0.5">لمستخدمي سناب شات وإنستغرام:</strong>
                <p className="text-amber-100 text-[11px]">
                  اضغط على أيقونة الخيارات (•••) أسفل أو أعلى الشاشة، ثم اختر <strong>«فتح في المتصفح» (Open in Safari / Chrome)</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-amber-900/40 p-2.5 rounded-xl">
              <ExternalLink className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-white mb-0.5">لمستخدمي آيفون / سفاري الأساسي:</strong>
                <p className="text-amber-100 text-[11px]">
                  اذهب إلى <strong>إعدادات الهاتف (Settings) &gt; Safari</strong>، ثم تأكد من إيقاف خيار <strong>«منع تعقب الموقع الإلكتروني تقاطعياً» (Prevent Cross-Site Tracking)</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
