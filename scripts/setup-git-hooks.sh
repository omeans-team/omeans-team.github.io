#!/bin/bash

# Script untuk setup Git hooks agar otomatis membuat issue setelah push

echo "🔧 Setting up Git hooks for auto issue creation..."

# Membuat direktori hooks jika belum ada
mkdir -p .git/hooks

# Membuat post-push hook
cat > .git/hooks/post-push << 'EOF'
#!/bin/bash

# Git hook untuk membuat issue otomatis setelah push
# Hook ini akan dipanggil setelah git push berhasil

echo "🚀 Auto creating issue for push..."

# Mendapatkan path ke script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ISSUE_SCRIPT="$PROJECT_ROOT/scripts/create-issue-on-push.sh"

# Mengecek apakah script ada
if [ ! -f "$ISSUE_SCRIPT" ]; then
    echo "❌ Issue creation script not found: $ISSUE_SCRIPT"
    exit 0  # Exit dengan success agar tidak mengganggu push
fi

# Mengecek apakah script executable
if [ ! -x "$ISSUE_SCRIPT" ]; then
    echo "🔧 Making script executable..."
    chmod +x "$ISSUE_SCRIPT"
fi

# Mengecek apakah GITHUB_TOKEN tersedia
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  GITHUB_TOKEN not found. Skipping issue creation."
    echo "   Set GITHUB_TOKEN environment variable to enable auto issue creation."
    exit 0
fi

# Menjalankan script pembuatan issue
echo "📝 Creating issue..."
"$ISSUE_SCRIPT"

echo "✅ Git hook completed!"
EOF

# Membuat hook executable
chmod +x .git/hooks/post-push

# Membuat script untuk menjalankan hook setelah push
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash

# Hook ini akan dipanggil setelah commit
# Kita akan menandai bahwa ada commit baru

echo "📝 Commit completed. Issue will be created on next push."
EOF

chmod +x .git/hooks/post-commit

# Membuat script untuk setup environment
cat > scripts/setup-env.sh << 'EOF'
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
EOF

chmod +x scripts/setup-env.sh

# Membuat script untuk test
cat > scripts/test-issue-creation.sh << 'EOF'
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
EOF

chmod +x scripts/test-issue-creation.sh

echo "✅ Git hooks setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set GITHUB_TOKEN environment variable:"
echo "   export GITHUB_TOKEN='your_token_here'"
echo ""
echo "2. Test setup:"
echo "   ./scripts/test-issue-creation.sh"
echo ""
echo "3. Make a commit and push to see it in action!"
echo ""
echo "🔗 Documentation: README_AUTO_ISSUE.md"
