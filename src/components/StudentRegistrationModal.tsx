import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  CheckCircle2,
  Phone,
  User,
  Calendar,
  MapPin,
  FileText,
  Send,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { StudentApplication } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStage?: string;
  onSubmitApplication: (app: Omit<StudentApplication, 'id' | 'status' | 'submittedAt'>) => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedStage,
  onSubmitApplication,
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'ذكر' as 'ذكر' | 'أنثى',
    birthDate: '',
    stage: preselectedStage || 'المرحلة الأساسية (الصفوف 1 - 9)',
    grade: 'الصف الأول الأساسي',
    parentName: '',
    parentPhone: '',
    parentJob: '',
    address: 'صنعاء، ',
    notes: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedStage) {
      setFormData((prev) => ({ ...prev, stage: preselectedStage }));
    }
  }, [preselectedStage]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.parentPhone) return;

    const appId = `YMS-${Math.floor(100000 + Math.random() * 900000)}`;
    onSubmitApplication(formData);
    setSubmittedId(appId);
  };

  const handleResetAndClose = () => {
    setSubmittedId(null);
    onClose();
  };

  const whatsappFollowup = `السلام عليكم ورحمة الله،
أنا ولي أمر الطالب/ة: ${formData.studentName}
رقم طلب التسجيل الإلكتروني: ${submittedId}
المرحلة: ${formData.stage} - ${formData.grade}
نود تأكيد استلام الطلب واستكمال إجراءات القبول. شكراً لكم.`;

  const cleanPhone = SCHOOL_INFO.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappFollowup)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-800 text-white p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 tracking-wider">
                بوابة القبول والتسجيل للعام الجديد
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                طلب تسجيل طالب جديد
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submittedId ? (
            /* Success State */
            <div className="text-center space-y-5 py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-4 border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  تم إرسال طلب التسجيل بنجاح!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  أهلاً بكم في مدارس اليمن النموذجية، تم حفظ طلبكم في سجلات القبول المبدئي
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-right space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span>رقم الطلب المرجعي:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 text-sm">
                    {submittedId}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1">
                  <span>اسم الطالب:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formData.studentName}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>المرحلة والصف:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formData.grade}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>هاتف ولي الأمر:</span>
                  <span className="font-bold text-slate-900 dark:text-white" dir="ltr">
                    {formData.parentPhone}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>تأكيد الطلب فوراً عبر واتساب المدرسة</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
                <span>يرجى تعبئة بيانات الطالب وولي الأمر بدقة للتواصل واستكمال إجراءات القبول.</span>
              </div>

              {/* Student Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
                  1. بيانات الطالب / الطالبة
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      اسم الطالب الرباعي *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد عبد الله محمد النهمي"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({ ...formData, studentName: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      الجنس *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: 'ذكر' })}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          formData.gender === 'ذكر'
                            ? 'bg-blue-700 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        ذكر (طالب)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: 'أنثى' })}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          formData.gender === 'أنثى'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        أنثى (طالبة)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      تاريخ الميلاد *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      المرحلة الدراسية *
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) =>
                        setFormData({ ...formData, stage: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="مرحلة رياض الأطفال والتمهيدي (KG)">
                        مرحلة رياض الأطفال والتمهيدي (KG)
                      </option>
                      <option value="المرحلة الأساسية (الصفوف 1 - 9)">
                        المرحلة الأساسية (الصفوف 1 - 9)
                      </option>
                      <option value="المرحلة الثانوية العامة (الصفوف 10 - 12)">
                        المرحلة الثانوية العامة (الصفوف 10 - 12)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      الصف المطلوب *
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="تمهيدي أول (KG 1)">تمهيدي أول (KG 1)</option>
                      <option value="تمهيدي ثانٍ (KG 2)">تمهيدي ثانٍ (KG 2)</option>
                      <option value="الصف الأول الأساسي">الصف الأول الأساسي</option>
                      <option value="الصف الثاني الأساسي">الصف الثاني الأساسي</option>
                      <option value="الصف الثالث الأساسي">الصف الثالث الأساسي</option>
                      <option value="الصف الرابع الأساسي">الصف الرابع الأساسي</option>
                      <option value="الصف الخامس الأساسي">الصف الخامس الأساسي</option>
                      <option value="الصف السادس الأساسي">الصف السادس الأساسي</option>
                      <option value="الصف السابع الأساسي">الصف السابع الأساسي</option>
                      <option value="الصف الثامن الأساسي">الصف الثامن الأساسي</option>
                      <option value="الصف التاسع الأساسي">الصف التاسع الأساسي</option>
                      <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                      <option value="الصف الثاني الثانوي (علمي)">الصف الثاني الثانوي (علمي)</option>
                      <option value="الصف الثاني الثانوي (أدبي)">الصف الثاني الثانوي (أدبي)</option>
                      <option value="الصف الثالث الثانوي (علمي)">الصف الثالث الثانوي (علمي)</option>
                      <option value="الصف الثالث الثانوي (أدبي)">الصف الثالث الثانوي (أدبي)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Guardian Info */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
                  2. بيانات ولي الأمر والتواصل
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      اسم ولي الأمر الرباعي *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="اسم الأب أو ولي الأمر"
                      value={formData.parentName}
                      onChange={(e) =>
                        setFormData({ ...formData, parentName: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      رقم الهاتف / الواتساب *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="مثال: 777123456"
                      value={formData.parentPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, parentPhone: e.target.value })
                      }
                      dir="ltr"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      عنوان السكن (صنعاء) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="الحي / الشارع / معلم قريب"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      مهنة ولي الأمر (اختياري)
                    </label>
                    <input
                      type="text"
                      placeholder="الوظيفة أو جهة العمل"
                      value={formData.parentJob}
                      onChange={(e) =>
                        setFormData({ ...formData, parentJob: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ملاحظات إضافية (مثل: الرغبة في الباص المدرسي، إخوة مسجلين بالمدرسة)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="أي استفسار أو ملاحظات تود إضافتها..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 shadow-md flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال طلب التسجيل</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
