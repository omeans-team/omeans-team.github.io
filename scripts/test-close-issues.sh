#!/bin/bash

# Script untuk test penutupan issue

echo "🧪 Testing issue closing..."

# Mengecek apakah GITHUB_TOKEN tersedia
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not found!"
    echo "Please set GITHUB_TOKEN environment variable first."
    exit 1
fi

# Menjalankan script penutupan issue
echo "🚀 Closing auto-generated issues..."
./scripts/close-issues-on-push.sh

echo "✅ Test completed!"
