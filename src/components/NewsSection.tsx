import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  ChevronLeft,
  Sparkles,
  Tag,
  AlertCircle,
  X,
  Share2,
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';

interface NewsSectionProps {
  articles: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const categories = ['الكل', 'إعلان', 'أخبار', 'فعاليات', 'تكريم', 'أكاديمي'];

  const filteredArticles =
    selectedCategory === 'الكل'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <section
      id="news"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
            <Newspaper className="w-3.5 h-3.5" />
            <span>المركز الإعلامي والمستجدات</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            الأخبار والإعلانات المدرسية
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            تابع آخر أخبار مدارس اليمن النموذجية، الإعلانات الهامة، نتائج التكريم، ومواعيد الأنشطة
          </p>

          {/* Categories Bar */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-xs shadow-xs">
                      {article.category}
                    </span>
                    {article.isImportant && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-xs animate-pulse">
                        هام
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                  <span>قراءة الخبر كاملاً</span>
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95">
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white text-slate-900 shadow-md">
                  {selectedArticle.category}
                </span>
                {selectedArticle.isImportant && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md">
                    إعلان هام
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>المركز الإعلامي لمدارس اليمن النموذجية</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {selectedArticle.title}
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {selectedArticle.summary}
                </p>
              </div>

              <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
                {selectedArticle.content}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedArticle.title,
                        text: selectedArticle.summary,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(
                        `${selectedArticle.title}\n${selectedArticle.summary}\n${window.location.href}`
                      );
                      alert('تم نسخ تفاصيل الخبر للمشاركة!');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة الخبر</span>
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
