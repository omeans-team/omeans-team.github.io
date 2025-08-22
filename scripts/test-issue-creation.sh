#!/bin/bash

# Script untuk test pembuatan issue

echo "🧪 Testing issue creation..."

# Mengecek apakah GITHUB_TOKEN tersedia
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not found!"
    echo "Please set GITHUB_TOKEN environment variable first."
    exit 1
fi

# Menjalankan script pembuatan issue
echo "🚀 Creating test issue..."
./scripts/create-issue-on-push.sh

echo "✅ Test completed!"
