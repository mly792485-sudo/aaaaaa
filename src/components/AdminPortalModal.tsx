import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Users,
  MessageSquare,
  PlusCircle,
  CheckCircle,
  Clock,
  Printer,
  Trash2,
  Lock,
  Phone,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Github,
} from 'lucide-react';
import { StudentApplication, ContactMessage, NewsArticle } from '../types';
import {
  getActiveSchoolLogo,
  setActiveSchoolLogo,
  resetSchoolLogo,
  subscribeToLogoChange,
} from '../utils/logoManager';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: StudentApplication[];
  onUpdateAppStatus: (id: string, newStatus: StudentApplication['status']) => void;
  messages: ContactMessage[];
  onAddNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  onOpenGitHubExport?: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  applications,
  onUpdateAppStatus,
  messages,
  onAddNewsArticle,
  onOpenGitHubExport,
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'messages' | 'addNews' | 'identity'>('applications');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'إعلان' | 'أخبار' | 'فعاليات' | 'أكاديمي'>('إعلان');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsIsImportant, setNewsIsImportant] = useState(false);
  const [newsAddedNotice, setNewsAddedNotice] = useState(false);

  const [currentLogo, setCurrentLogo] = useState<string>(getActiveSchoolLogo());
  const [isCustomLogo, setIsCustomLogo] = useState<boolean>(getActiveSchoolLogo().startsWith('data:image'));
  const [logoUpdatedNotice, setLogoUpdatedNotice] = useState<string | null>(null);
  const adminFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return subscribeToLogoChange((newLogo) => {
      setCurrentLogo(newLogo);
      setIsCustomLogo(newLogo.startsWith('data:image'));
    });
  }, []);

  const handleAdminLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setActiveSchoolLogo(dataUrl);
        setLogoUpdatedNotice('تم رفع واعتماد صورتك الأصلية للشعار بنجاح في كامل أقسام الموقع!');
        setTimeout(() => setLogoUpdatedNotice(null), 5000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdminLogoReset = () => {
    resetSchoolLogo();
    if (adminFileInputRef.current) adminFileInputRef.current.value = '';
    setLogoUpdatedNotice('تمت استعادة الشعار المتجه الافتراضي.');
    setTimeout(() => setLogoUpdatedNotice(null), 4000);
  };

  if (!isOpen) return null;

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsSummary) return;

    onAddNewsArticle({
      title: newsTitle,
      category: newsCategory,
      date: new Date().toLocaleDateString('ar-YE', { year: 'numeric', month: 'long', day: 'numeric' }),
      summary: newsSummary,
      content: newsContent || newsSummary,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000&auto=format&fit=crop',
      isImportant: newsIsImportant,
    });

    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsIsImportant(false);
    setNewsAddedNotice(true);
    setTimeout(() => setNewsAddedNotice(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">لوحة الإدارة المدرسية</h2>
              <p className="text-xs text-slate-400">إدارة طلبات تسجيل الطلاب والرسائل والأخبار</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 dark:bg-slate-800/80 p-2.5 border-b border-slate-200 dark:border-slate-800 flex gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'applications'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>طلبات التسجيل ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'messages'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>رسائل وتواصل أولياء الأمور ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addNews')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'addNews'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>نشر خبر أو إعلان مدرسي</span>
          </button>

          <button
            onClick={() => setActiveTab('identity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'identity'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>شعار وهوية المدرسة</span>
          </button>

          {onOpenGitHubExport && (
            <button
              onClick={() => {
                onClose();
                onOpenGitHubExport();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-700 shadow-sm"
              title="تصدير الموقع وتشغيله على GitHub دون مشاكل الكوكيز"
            >
              <Github className="w-4 h-4 text-blue-400" />
              <span>تصدير ونشر (GitHub)</span>
            </button>
          )}
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Tab 1: Applications */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  قائمة طلبات التسجيل الإلكترونية المستلمة
                </h3>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-200"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة الكشف</span>
                </button>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                  لا توجد طلبات تسجيل مسجلة حالياً.
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                            {app.id}
                          </span>
                          <span className="font-black text-sm text-slate-900 dark:text-white">
                            {app.studentName} ({app.gender})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            الحالة:
                          </span>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              onUpdateAppStatus(
                                app.id,
                                e.target.value as StudentApplication['status']
                              )
                            }
                            className="text-xs font-bold px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 focus:outline-none"
                          >
                            <option value="قيد المراجعة">قيد المراجعة</option>
                            <option value="مقبول مبدئياً">مقبول مبدئياً</option>
                            <option value="تم التواصل">تم التواصل</option>
                            <option value="مرفوض">مرفوض</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">الصف:</strong>{' '}
                          {app.grade}
                        </div>
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">ولي الأمر:</strong>{' '}
                          {app.parentName}
                        </div>
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">الهاتف:</strong>{' '}
                          <a
                            href={`tel:${app.parentPhone}`}
                            className="text-blue-600 dark:text-blue-400 font-mono font-bold"
                            dir="ltr"
                          >
                            {app.parentPhone}
                          </a>
                        </div>
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">العنوان:</strong>{' '}
                          {app.address}
                        </div>
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">تاريخ الطلب:</strong>{' '}
                          {app.submittedAt}
                        </div>
                        {app.notes && (
                          <div className="sm:col-span-3 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                            <strong>ملاحظات ولي الأمر:</strong> {app.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Messages */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                رسائل واستفسارات أولياء الأمور
              </h3>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                  لا توجد رسائل جديدة.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {msg.senderName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            {msg.subject}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">{msg.sentAt}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {msg.message}
                      </p>

                      <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span>هاتف: <a href={`tel:${msg.phone}`} className="text-blue-600 font-mono" dir="ltr">{msg.phone}</a></span>
                        {msg.email && <span>بريد: {msg.email}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Add News Article */}
          {activeTab === 'addNews' && (
            <div className="max-w-xl mx-auto space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                إضافة ونشر خبر أو إعلان رسمي جديد على الموقع
              </h3>

              {newsAddedNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>تم نشر الخبر بنجاح على الموقع الرسمي!</span>
                </div>
              )}

              <form onSubmit={handleCreateNews} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    عنوان الخبر أو الإعلان *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: موعد اختبارات الفصل الأول"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      التصنيف *
                    </label>
                    <select
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                    >
                      <option value="إعلان">إعلان</option>
                      <option value="أخبار">أخبار</option>
                      <option value="فعاليات">فعاليات</option>
                      <option value="أكاديمي">أكاديمي</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="important-check"
                      checked={newsIsImportant}
                      onChange={(e) => setNewsIsImportant(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <label htmlFor="important-check" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      تمييز كإعلان هام عاجل
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ملخص الخبر القصير *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="ملخص يظهر في بطاقة الخبر..."
                    value={newsSummary}
                    onChange={(e) => setNewsSummary(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    التفاصيل الكاملة للخبر
                  </label>
                  <textarea
                    rows={4}
                    placeholder="التفاصيل الكاملة..."
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-sm text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-md"
                >
                  نشر الخبر في الموقع فوراً
                </button>
              </form>
            </div>
          )}

          {/* Tab 4: School Logo & Identity */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    إدارة شعار وهوية مدارس اليمن النموذجية
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    يمكنك رفع وتعيين صورة الشعار الأصلية بدقة عالية ومطابقة 100% دون أي تعديل، أو استخدام الشعار المتجه المطور.
                  </p>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isCustomLogo
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  {isCustomLogo ? 'صورة الشعار الأصلية معتمدة' : 'الشعار المتجه الافتراضي'}
                </span>
              </div>

              {logoUpdatedNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{logoUpdatedNotice}</span>
                </div>
              )}

              {/* Logo Preview Container */}
              <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200/60 dark:border-slate-700/60 max-w-xs">
                  <img
                    src={currentLogo}
                    alt="معاينة شعار مدارس اليمن النموذجية"
                    className="w-48 h-auto object-contain mx-auto drop-shadow-md"
                  />
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {isCustomLogo ? 'المصدر: صورة الشعار المرفوعة من جهازك' : 'المصدر: ملف SVG المتجه عالي الدقة'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <input
                  ref={adminFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAdminLogoUpload}
                  className="hidden"
                  id="admin-logo-upload-input"
                />
                
                <button
                  type="button"
                  onClick={() => adminFileInputRef.current?.click()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-700 hover:bg-blue-800 text-white shadow-md transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>رفع وتعيين صورة الشعار الأصلية من هاتفك أو جهازك</span>
                </button>

                {isCustomLogo && (
                  <button
                    type="button"
                    onClick={handleAdminLogoReset}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-200 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-950/50 text-slate-700 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>استعادة الشعار المتجه</span>
                  </button>
                )}
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs leading-relaxed space-y-1.5">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>ملاحظة حول دقة الشعار:</span>
                </p>
                <p>
                  عند اختيار صورة الشعار الأصلية المحفوظة في ألبوم الصور أو ملفات جهازك، سيتم تطبيقها فوراً بدقتها الكاملة الأصلية في كامل أجزاء الموقع (الترويسة، الواجهة الرئيسية، التذييل، وبوابة الإدارة) وبدون أي نقص أو تغيير في التفاصيل.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
