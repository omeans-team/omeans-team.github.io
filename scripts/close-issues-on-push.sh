#!/bin/bash

# Script untuk menutup issue otomatis setelah push
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
    
    echo "COMMIT_HASH=$commit_hash"
    echo "COMMIT_MESSAGE=$commit_message"
    echo "AUTHOR=$author"
    echo "DATE=$date"
}

# Fungsi untuk menutup issue
close_issues() {
    local commit_hash=$1
    local commit_message=$2
    local author=$3
    local date=$4
    
    echo "🔍 Searching for auto-generated issues to close..."
    
    # Mendapatkan semua issue yang terbuka dengan label auto-generated
    local response=$(curl -s -X GET \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues?state=open&labels=auto-generated")
    
    # Mengecek apakah ada issue
    local issue_count=$(echo "$response" | grep -o '"number":[0-9]*' | wc -l)
    
    if [ "$issue_count" -eq 0 ]; then
        echo "✅ No auto-generated issues to close"
        return
    fi
    
    echo "🔍 Found $issue_count auto-generated issues to close"
    
    # Menutup setiap issue
    local issue_numbers=$(echo "$response" | grep -o '"number":[0-9]*' | cut -d':' -f2)
    
    for issue_number in $issue_numbers; do
        echo "🔒 Closing issue #$issue_number..."
        
        # Menutup issue
        local close_response=$(curl -s -X PATCH \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            -d '{"state":"closed"}' \
            "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$issue_number")
        
        # Membuat komentar penutupan
        local comment_body="## ✅ Issue Closed Automatically

This issue has been automatically closed due to a new push to the \`main\` branch.

**Commit:** \`${commit_hash:0:7}\`
**Author:** $author
**Date:** $date

**Reason:** New update has been pushed, making this issue outdated.

---
*This comment was automatically added by script.*"

        # Membuat file JSON temporary untuk komentar
        local json_file=$(mktemp)
        cat > "$json_file" << EOF
{
    "body": "$comment_body"
}
EOF

        local comment_response=$(curl -s -X POST \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            -d @"$json_file" \
            "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$issue_number/comments")
        
        # Hapus file temporary
        rm -f "$json_file"
        
        # Mengecek response
        local html_url=$(echo "$close_response" | grep -o '"html_url":"[^"]*"' | cut -d'"' -f4)
        
        if [ ! -z "$html_url" ]; then
            echo "✅ Successfully closed issue #$issue_number"
            echo "🔗 View issue: $html_url"
        else
            echo "❌ Failed to close issue #$issue_number"
        fi
    done
    
    echo "🎉 Successfully closed $issue_count auto-generated issues"
}

# Main script
main() {
    echo "🚀 Closing auto-generated issues after push..."
    
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
    
    # Menutup issue
    close_issues "$COMMIT_HASH" "$COMMIT_MESSAGE" "$AUTHOR" "$DATE"
}

# Menjalankan script
main "$@"
