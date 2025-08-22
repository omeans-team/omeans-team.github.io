#!/bin/bash

# Script untuk setup environment variables

echo "🔧 Setting up environment for auto issue creation..."

# Mengecek apakah GITHUB_TOKEN sudah diset
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not found!"
    echo ""
    echo "📋 Setup Instructions:"
    echo "1. Buat Personal Access Token di GitHub:"
    echo "   - Buka GitHub Settings → Developer settings → Personal access tokens"
    echo "   - Klik 'Generate new token (classic)'"
    echo "   - Pilih scope 'repo' atau 'public_repo'"
    echo "   - Copy token yang dihasilkan"
    echo ""
    echo "2. Set environment variable:"
    echo "   export GITHUB_TOKEN='your_token_here'"
    echo ""
    echo "3. Atau tambahkan ke ~/.bashrc atau ~/.zshrc:"
    echo "   echo 'export GITHUB_TOKEN=\"your_token_here\"' >> ~/.bashrc"
    echo ""
    echo "4. Reload shell atau jalankan:"
    echo "   source ~/.bashrc"
    echo ""
    echo "5. Test dengan menjalankan:"
    echo "   ./scripts/create-issue-on-push.sh"
else
    echo "✅ GITHUB_TOKEN found!"
    echo "🔗 Token: ${GITHUB_TOKEN:0:10}..."
fi

echo ""
echo "🎉 Setup completed!"
echo "📝 Now when you push, an issue will be automatically created."
