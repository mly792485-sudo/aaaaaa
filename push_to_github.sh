#!/usr/bin/env bash
# سكريبت الرفع التلقائي لمستودع GitHub لمدارس اليمن النموذجية
# الاستخدام:
# ./push_to_github.sh https://github.com/USERNAME/REPO_NAME.git

set -e

REPO_URL=$1

if [ -z "$REPO_URL" ]; then
  echo "=================================================="
  echo "❌ يرجى تزويد رابط مستودع GitHub الخاص بك."
  echo "مثال:"
  echo "  ./push_to_github.sh https://github.com/YOUR_USER/yemen-model-schools.git"
  echo "=================================================="
  exit 1
fi

echo "🚀 جاري ربط المستودع: $REPO_URL ..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git branch -M main

echo "📤 جاري رفع كامل ملفات المشروع إلى فرع main..."
git push -u origin main --force

echo "=================================================="
echo "✅ تم تصدير التطبيق والموقع بالكامل بنجاح إلى GitHub!"
echo "=================================================="
