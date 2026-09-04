import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { ContactMessage } from '../types';

interface ContactSectionProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'sentAt'>) => void;
  onShareLink: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSendMessage,
  onShareLink,
}) => {
  const [formData, setFormData] = useState({
    senderName: '',
    phone: '',
    email: '',
    subject: 'استفسار عام عن التسجيل',
    message: '',
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.phone || !formData.message) return;

    onSendMessage(formData);
    setSentSuccess(true);
    setFormData({
      senderName: '',
      phone: '',
      email: '',
      subject: 'استفسار عام عن التسجيل',
      message: '',
    });
    setTimeout(() => setSentSuccess(false), 5000);
  };

  const cleanPhone = SCHOOL_INFO.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'السلام عليكم ورحمة الله، أود الاستفسار عن مدارس اليمن النموذجية وإجراءات التسجيل للعام الجديد.'
  )}`;

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <Phone className="w-3.5 h-3.5" />
            <span>قنوات التواصل المباشر</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            تواصل مع إدارة المدارس
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            يسعدنا استقبال استفساراتكم وزيارتكم في مقر المدارس بأمانة العاصمة صنعاء
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Right Col: Contact Information Cards & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-7 border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
                بيانات الاتصال ومقر المدارس
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">العنوان الرسمي</div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {SCHOOL_INFO.address}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {SCHOOL_INFO.locationDetails}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">الهاتف الثابت والجوال</div>
                    <a
                      href={`tel:${SCHOOL_INFO.phone}`}
                      className="text-sm font-black text-slate-900 dark:text-white hover:text-blue-600 block"
                      dir="ltr"
                    >
                      {SCHOOL_INFO.phone}
                    </a>
                    <a
                      href={`tel:${SCHOOL_INFO.mobile}`}
                      className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 block mt-0.5"
                      dir="ltr"
                    >
                      {SCHOOL_INFO.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">مواعيد الدوام والاستقبال</div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {SCHOOL_INFO.workingHours}
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      {SCHOOL_INFO.admissionStatus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Actions: WhatsApp and Share */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>محادثة فورية عبر واتساب</span>
                </a>

                <button
                  onClick={onShareLink}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <Share2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>مشاركة رابط موقع المدرسة للطلاب والمعلمين</span>
                </button>
              </div>
            </div>

            {/* School Map Mockup & Direction */}
            <div className="rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 p-5 bg-slate-50 dark:bg-slate-800/60 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>موقع الصرح التعليمي في صنعاء</span>
                </span>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  أمانة العاصمة
                </span>
              </div>
              <div className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-700 relative overflow-hidden flex items-center justify-center border border-slate-300 dark:border-slate-600">
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                <div className="text-center p-4 z-10">
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    مدارس اليمن النموذجية
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    صنعاء، اليمن
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Col: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-7 sm:p-8 border-2 border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                أرسل رسالة أو استفساراً للإدارة
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                سيقوم فريق العلاقات والتسجيل بالرد على استفساركم والتواصل معكم في أقرب وقت.
              </p>

              {sentSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-3 animate-in fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">تم استلام رسالتكم بنجاح!</span>
                    <span className="text-xs">سيتواصل معكم قسم القبول والتسجيل قريباً.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-right">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="اسم ولي الأمر أو الطالب"
                      value={formData.senderName}
                      onChange={(e) =>
                        setFormData({ ...formData, senderName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-right">
                      رقم الهاتف / الواتساب *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="مثال: 777123456"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      dir="ltr"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-right">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      dir="ltr"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-right">
                      موضوع الرسالة *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="استفسار عام عن التسجيل">استفسار عام عن التسجيل</option>
                      <option value="الرسوم الدراسية والخصومات">الرسوم الدراسية والخصومات</option>
                      <option value="مرحلة رياض الأطفال (KG)">مرحلة رياض الأطفال (KG)</option>
                      <option value="المرحلة الأساسية (1 - 9)">المرحلة الأساسية (1 - 9)</option>
                      <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                      <option value="أخرى / اقتراح أو ملاحظة">أخرى / اقتراح أو ملاحظة</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-right">
                    نص الرسالة أو الاستفسار *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="اكتب استفسارك هنا وسنقوم بالرد عليكم بالتفصيل..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white bg-blue-700 hover:bg-blue-800 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة إلى إدارة المدارس</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
