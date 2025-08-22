#!/bin/bash

# Script untuk membuat issue otomatis ketika push
# Pastikan Anda sudah mengatur GitHub token di environment variable GITHUB_TOKEN

# Konfigurasi
REPO_OWNER="omeans-team"
REPO_NAME="omeans-team.github.io"
GITHUB_TOKEN="${GITHUB_TOKEN:-$1}"

# Fungsi untuk mendapatkan informasi commit
get_commit_info() {
    local commit_hash=$(git rev-parse HEAD)
    local commit_message=$(git log -1 --pretty=%B)
    local author=$(git log -1 --pretty=%an)
    local date=$(git log -1 --pretty=%cd --date=iso)
    local changed_files=$(git diff --name-only HEAD~1 HEAD 2>/dev/null | tr '\n' ', ' || echo "Initial commit")
    
    echo "COMMIT_HASH=$commit_hash"
    echo "COMMIT_MESSAGE=$commit_message"
    echo "AUTHOR=$author"
    echo "DATE=$date"
    echo "CHANGED_FILES=$changed_files"
}

# Fungsi untuk membuat issue
create_issue() {
    local commit_hash=$1
    local commit_message=$2
    local author=$3
    local date=$4
    local changed_files=$5
    
    # Membuat judul issue
    local issue_title="🔄 Update: $(echo "$commit_message" | head -n1)"
    
    # Membuat body issue
    local issue_body="## 📝 Update Summary

**Commit:** \`${commit_hash:0:7}\`
**Author:** $author
**Date:** $date

### 📋 Changes Made
$commit_message

### 📁 Files Modified
\`\`\`
$changed_files
\`\`\`

### 🔗 Related Links
- **Commit:** [${commit_hash:0:7}](https://github.com/$REPO_OWNER/$REPO_NAME/commit/$commit_hash)
- **Repository:** [$REPO_OWNER/$REPO_NAME](https://github.com/$REPO_OWNER/$REPO_NAME)

---
*This issue was automatically created on push.*"

    # Membuat file JSON temporary
    local json_file=$(mktemp)
    cat > "$json_file" << EOF
{
    "title": "$issue_title",
    "body": "$issue_body",
    "labels": ["auto-generated", "update", "push"]
}
EOF

    # Membuat issue menggunakan GitHub API
    local response=$(curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -d @"$json_file" \
        "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues")
    
    # Hapus file temporary
    rm -f "$json_file"
    
    # Mengecek response
    local issue_number=$(echo "$response" | grep -o '"number":[0-9]*' | cut -d':' -f2)
    local html_url=$(echo "$response" | grep -o '"html_url":"[^"]*"' | cut -d'"' -f4)
    
    if [ ! -z "$issue_number" ]; then
        echo "✅ Issue created successfully: #$issue_number"
        echo "🔗 View issue: $html_url"
    else
        echo "❌ Failed to create issue"
        echo "Response: $response"
    fi
}

# Main script
main() {
    echo "🚀 Creating issue for latest push..."
    
    # Mengecek apakah GITHUB_TOKEN tersedia
    if [ -z "$GITHUB_TOKEN" ]; then
        echo "❌ Error: GITHUB_TOKEN not found"
        echo "Please set GITHUB_TOKEN environment variable or pass it as argument"
        echo "Usage: $0 <github_token>"
        exit 1
    fi
    
    # Mendapatkan informasi commit
    local commit_info=$(get_commit_info)
    eval "$commit_info"
    
    # Membuat issue
    create_issue "$COMMIT_HASH" "$COMMIT_MESSAGE" "$AUTHOR" "$DATE" "$CHANGED_FILES"
}

# Menjalankan script
main "$@"
