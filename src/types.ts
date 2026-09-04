export type NewsCategory = 'إعلان' | 'أخبار' | 'فعاليات' | 'تكريم' | 'أكاديمي';

export interface NewsArticle {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  summary: string;
  content: string;
  image: string;
  isImportant?: boolean;
}

export interface SchoolStage {
  id: string;
  title: string;
  subtitle: string;
  grades: string;
  description: string;
  highlights: string[];
  iconName: string;
  badge: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  qualification: string;
  experienceYears?: number;
  avatarBg: string;
}

export interface WorkPrinciple {
  id: number;
  text: string;
  category: string;
}

export interface SchoolObjective {
  id: number;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export type GalleryCategory = 'الكل' | 'مرافق المدرسة' | 'المعامل والتقنية' | 'الأنشطة المدرسية' | 'المناسبات والتكريم';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  caption: string;
}

export interface StudentApplication {
  id: string;
  studentName: string;
  gender: 'ذكر' | 'أنثى';
  birthDate: string;
  stage: string;
  grade: string;
  parentName: string;
  parentPhone: string;
  parentJob?: string;
  address: string;
  notes?: string;
  status: 'قيد المراجعة' | 'مقبول مبدئياً' | 'تم التواصل' | 'مرفوض';
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  sentAt: string;
}
