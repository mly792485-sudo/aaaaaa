import React, { useState } from 'react';
import {
  X,
  Github,
  Globe,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Smartphone,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'hosting' | 'cookies'>('github');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const publicUrl = appUrl.replace('ais-dev-', 'ais-pre-');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const gitCommands = `# 1. في مجلد المشروع نفذ الأوامر:
git init
git add .
git commit -m "الموقع الرسمي لمدارس اليمن النموذجية"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/al-yemen-schools.git
git push -u origin main`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                تصدير الموقع وتشغيله على GitHub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تشغيل الموقع بشكل مستقل ودائم بدون مشاكل الكوكيز
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'github'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>التصدير إلى GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hosting')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'hosting'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>النشر الدائم (GitHub Pages / Vercel)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'cookies'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>حل مشكلة الكوكيز وسناب شات</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Tab 1: Export to GitHub */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      الطريقة المباشرة بضغطة زر (من Google AI Studio):
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      من القائمة العلوية أو قائمة الإعدادات ⚙️ في Google AI Studio: اضغط على <strong>Export to GitHub</strong> أو <strong>Download ZIP</strong> لتحميل الموقع كاملاً دون نقص أي ملف.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-600" />
                    أوامر الرفع عبر Git:
                  </span>
                  <button
                    onClick={() => copyToClipboard(gitCommands, 'git')}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {copiedCode === 'git' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الأوامر</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto text-left dir-ltr">
                  {gitCommands}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">✅ جميع الملفات متوافقة وجاهزة للإنتاج:</p>
                <p>• ملف بناء تلقائي لـ GitHub Pages: <code className="text-blue-600 dark:text-blue-400">.github/workflows/deploy.yml</code></p>
                <p>• إعدادات النشر على Vercel بدون كوكيز: <code className="text-blue-600 dark:text-blue-400">vercel.json</code></p>
                <p>• إعدادات Netlify: <code className="text-blue-600 dark:text-blue-400">netlify.toml</code></p>
              </div>
            </div>
          )}

          {/* Tab 2: Free Hosting */}
          {activeTab === 'hosting' && (
            <div className="space-y-4">
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                    <span className="font-bold text-slate-900 dark:text-white">1. GitHub Pages (مجاني للأبد)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-full">
                    موصى به
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  بعد رفع الكود على GitHub، اذهب إلى <strong>Settings &gt; Pages</strong> ثم اختر <strong>GitHub Actions</strong> كمصدر للبناء. سيتم نشر الموقع فوراً على رابط دائم لا يتطلب أي كوكيز.
                </p>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-slate-900 dark:text-white">2. Vercel (سريع جداً + دومين خاص)</span>
                  </div>
                  <span className="text-[10px] bg-blue-500/10 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                    سرعة فائقة
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  اربط حساب GitHub بموقع <strong>Vercel.com</strong> واختر المستودع واضغط <strong>Deploy</strong>. سيعطيك رابطاً سريعاً مع شهادة SSL مجانية، ويمكنك ربط نطاقك الخاص (مثل: <code>alyemenschools.com</code>).
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Cookies and In-App Browsers */}
          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/50 space-y-2">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>لماذا ظهرت رسالة حظر الكوكيز الأمنية؟</span>
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  تظهر هذه الرسالة فقط عند فتح روابط المعاينة التجريبية لـ Cloud Run داخل تطبيقات مثل <strong>سناب شات أو إنستغرام</strong>، لأن متصفحاتها المدمجة تحظر ملفات تعريف الارتباط للطرف الثالث (Third-party Cookies) تلقائياً.
                </p>
              </div>

              <div className="space-y-2.5">
                <h5 className="font-bold text-xs text-slate-900 dark:text-white">الإجراءات المطبقة لحل المشكلة:</h5>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>تم تضمين كود <code>SameSite=None; Secure</code> لجميع ملفات تعريف الارتباط.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>تمت إضافة شريط علوي ذكي يتعرف على مستخدمي سناب شات وإنستغرام ويمنحهم زراً لنسخ الرابط وفتحه في سفاري.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>عند النشر على GitHub Pages أو Vercel، تنتهي المشكلة نهائياً لأن الموقع يصبح عاماً ومباشراً بدون خادم حماية مؤقت.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">رابط المشاركة المباشر:</span>
                  <button
                    onClick={() => copyToClipboard(publicUrl, 'url')}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedCode === 'url' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'url' ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
                <code className="block p-2 bg-white dark:bg-slate-900 rounded-lg text-[11px] text-slate-600 dark:text-slate-400 break-all border border-slate-200 dark:border-slate-800">
                  {publicUrl}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            مدارس اليمن النموذجية • جاهز للتصدير والنشر
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
