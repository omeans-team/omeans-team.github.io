#!/bin/bash

# Script untuk membuat issue otomatis dengan fitur canggih
# Pastikan Anda sudah mengatur GitHub token di environment variable GITHUB_TOKEN

# Konfigurasi
REPO_OWNER="omeans-team"
REPO_NAME="omeans-team.github.io"
GITHUB_TOKEN="${GITHUB_TOKEN:-$1}"

# Fungsi untuk mendeteksi tipe perubahan
detect_change_type() {
    local files="$1"
    local commit_message="$2"
    
    local detected_types=""
    
    # Deteksi berdasarkan ekstensi file
    if echo "$files" | grep -qE '\.(js|jsx|ts|tsx|css|scss|html|vue|svelte)$'; then
        detected_types="$detected_types frontend"
    fi
    
    if echo "$files" | grep -qE '\.(py|java|cpp|c|cs|php|rb|go|rs|swift|kt)$'; then
        detected_types="$detected_types backend"
    fi
    
    if echo "$files" | grep -qE '\.(sql|db|sqlite|mdb)$'; then
        detected_types="$detected_types database"
    fi
    
    if echo "$files" | grep -qE '\.(json|yaml|yml|toml|ini|conf|config)$'; then
        detected_types="$detected_types config"
    fi
    
    if echo "$files" | grep -qE '\.(md|txt|rst|adoc)$'; then
        detected_types="$detected_types docs"
    fi
    
    if echo "$files" | grep -qE '\.(png|jpg|jpeg|gif|svg|ico|mp4|mp3|pdf)$'; then
        detected_types="$detected_types assets"
    fi
    
    # Deteksi berdasarkan commit message
    local msg_lower=$(echo "$commit_message" | tr '[:upper:]' '[:lower:]')
    
    if echo "$msg_lower" | grep -qE '(security|auth|password|token|key|secret)'; then
        detected_types="$detected_types security"
    fi
    
    if echo "$msg_lower" | grep -qE '(performance|optimization|cache|speed)'; then
        detected_types="$detected_types performance"
    fi
    
    if echo "$msg_lower" | grep -qE '(fix|bug|error|issue|problem)'; then
        detected_types="$detected_types bugfix"
    fi
    
    if echo "$msg_lower" | grep -qE '(feature|add|new|implement)'; then
        detected_types="$detected_types feature"
    fi
    
    if echo "$msg_lower" | grep -qE '(refactor|cleanup|restructure)'; then
        detected_types="$detected_types refactor"
    fi
    
    if echo "$msg_lower" | grep -qE '(test|spec|unit|integration)'; then
        detected_types="$detected_types test"
    fi
    
    echo "$detected_types" | tr ' ' '\n' | sort -u | tr '\n' ' ' | sed 's/^ *//;s/ *$//'
}

# Fungsi untuk generate label berdasarkan tipe perubahan
generate_labels() {
    local change_types="$1"
    local labels="auto-generated update push"
    
    for type in $change_types; do
        case $type in
            frontend) labels="$labels frontend" ;;
            backend) labels="$labels backend" ;;
            database) labels="$labels database" ;;
            config) labels="$labels configuration" ;;
            docs) labels="$labels documentation" ;;
            assets) labels="$labels assets" ;;
            security) labels="$labels security" ;;
            performance) labels="$labels performance" ;;
            bugfix) labels="$labels bug" ;;
            feature) labels="$labels enhancement" ;;
            refactor) labels="$labels refactor" ;;
            test) labels="$labels testing" ;;
        esac
    done
    
    echo "$labels"
}

# Fungsi untuk generate komentar berdasarkan topik
generate_comment() {
    local change_types="$1"
    local commit_message="$2"
    local changed_files="$3"
    
    local comment="## 📝 Update Summary\n\n"
    
    # Analisis topik berdasarkan tipe perubahan
    local topics=""
    if echo "$change_types" | grep -q "security"; then
        topics="$topics 🔒 Security improvements\n"
    fi
    if echo "$change_types" | grep -q "performance"; then
        topics="$topics ⚡ Performance optimizations\n"
    fi
    if echo "$change_types" | grep -q "bugfix"; then
        topics="$topics 🐛 Bug fixes\n"
    fi
    if echo "$change_types" | grep -q "feature"; then
        topics="$topics ✨ New features\n"
    fi
    if echo "$change_types" | grep -q "refactor"; then
        topics="$topics 🔧 Code refactoring\n"
    fi
    if echo "$change_types" | grep -q "test"; then
        topics="$topics 🧪 Testing improvements\n"
    fi
    if echo "$change_types" | grep -q "docs"; then
        topics="$topics 📚 Documentation updates\n"
    fi
    if echo "$change_types" | grep -q "frontend"; then
        topics="$topics 🎨 Frontend changes\n"
    fi
    if echo "$change_types" | grep -q "backend"; then
        topics="$topics ⚙️ Backend changes\n"
    fi
    if echo "$change_types" | grep -q "database"; then
        topics="$topics 🗄️ Database changes\n"
    fi
    if echo "$change_types" | grep -q "config"; then
        topics="$topics ⚙️ Configuration updates\n"
    fi
    
    if [ ! -z "$topics" ]; then
        comment="$comment### 🎯 Main Topics\n$topics\n"
    fi
    
    # Analisis file yang berubah
    local file_types=$(echo "$changed_files" | sed 's/.*\.//' | sort | uniq -c | sed 's/^ *//')
    if [ ! -z "$file_types" ]; then
        comment="$comment### 📁 File Type Analysis\n"
        echo "$file_types" | while read count ext; do
            comment="$comment- **${ext^^}**: $count file(s)\n"
        done
        comment="$comment\n"
    fi
    
    # Rekomendasi berdasarkan perubahan
    local recommendations=""
    if echo "$change_types" | grep -q "security"; then
        recommendations="$recommendations 🔍 Consider security testing\n"
        recommendations="$recommendations 📋 Review access controls\n"
    fi
    if echo "$change_types" | grep -q "performance"; then
        recommendations="$recommendations 📊 Monitor performance metrics\n"
        recommendations="$recommendations ⚡ Consider caching strategies\n"
    fi
    if echo "$change_types" | grep -q "database"; then
        recommendations="$recommendations 💾 Backup database before deployment\n"
        recommendations="$recommendations 🔍 Test database migrations\n"
    fi
    if echo "$change_types" | grep -q "frontend"; then
        recommendations="$recommendations 🎨 Test UI/UX changes\n"
        recommendations="$recommendations 📱 Verify responsive design\n"
    fi
    
    if [ ! -z "$recommendations" ]; then
        comment="$comment### 💡 Recommendations\n$recommendations\n"
    fi
    
    echo "$comment"
}

# Fungsi untuk mendapatkan informasi commit
get_commit_info() {
    local commit_hash=$(git rev-parse HEAD)
    local commit_message=$(git log -1 --pretty=%B)
    local author=$(git log -1 --pretty=%an)
    local date=$(git log -1 --pretty=%cd --date=iso)
    local changed_files=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || echo "Initial commit")
    
    echo "COMMIT_HASH=$commit_hash"
    echo "COMMIT_MESSAGE=$commit_message"
    echo "AUTHOR=$author"
    echo "DATE=$date"
    echo "CHANGED_FILES=$changed_files"
}

# Fungsi untuk menutup issue lama
close_existing_issues() {
    local commit_hash="$1"
    local commit_message="$2"
    local author="$3"
    local date="$4"
    local change_types="$5"
    
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
        
        # Membuat komentar penutupan dengan status
        local close_comment="## ✅ Issue Auto Close Complete

This issue has been automatically closed due to a new push to the \`main\` branch.

**Status:** Auto Close Complete ✅
**Triggered by:** New push
**Commit:** \`${commit_hash:0:7}\`
**Author:** $author
**Date:** $date

**Reason:** New update has been pushed, making this issue outdated.

**Change Types Detected:** ${change_types:-General update}

---
*This comment was automatically added by script.*"

        # Membuat file JSON temporary untuk komentar
        local json_file=$(mktemp)
        cat > "$json_file" << EOF
{
    "body": "$close_comment"
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

# Fungsi untuk membuat issue baru
create_new_issue() {
    local commit_hash="$1"
    local commit_message="$2"
    local author="$3"
    local date="$4"
    local changed_files="$5"
    local change_types="$6"
    
    # Generate labels
    local labels=$(generate_labels "$change_types")
    echo "🏷️ Generated labels: $labels"
    
    # Generate komentar
    local custom_comment=$(generate_comment "$change_types" "$commit_message" "$changed_files")
    
    # Membuat judul issue
    local issue_title="🔄 Update: $(echo "$commit_message" | head -n1)"
    
    # Membuat body issue
    local issue_body="${custom_comment}**Commit:** \`${commit_hash:0:7}\`\n**Author:** $author\n**Date:** $date\n\n### 📋 Changes Made\n$commit_message\n\n### 📁 Files Modified\n\`\`\`\n$changed_files\n\`\`\`\n\n### 🔗 Related Links\n- **Commit:** [${commit_hash:0:7}](https://github.com/$REPO_OWNER/$REPO_NAME/commit/$commit_hash)\n- **Repository:** [$REPO_OWNER/$REPO_NAME](https://github.com/$REPO_OWNER/$REPO_NAME)\n\n---\n*This issue was automatically created by script on push.*"

    # Membuat file JSON temporary
    local json_file=$(mktemp)
    cat > "$json_file" << EOF
{
    "title": "$issue_title",
    "body": "$issue_body",
    "labels": ["$(echo $labels | tr ' ' '","')"],
    "assignees": ["$author"]
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
        echo "👤 Auto-assigned to: $author"
        echo "🏷️ Labels applied: $labels"
    else
        echo "❌ Failed to create issue"
        echo "Response: $response"
    fi
}

# Main script
main() {
    echo "🚀 Smart issue management for latest push..."
    
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
    
    # Deteksi tipe perubahan
    local change_types=$(detect_change_type "$CHANGED_FILES" "$COMMIT_MESSAGE")
    echo "🔍 Detected change types: $change_types"
    
    # Menutup issue lama
    close_existing_issues "$COMMIT_HASH" "$COMMIT_MESSAGE" "$AUTHOR" "$DATE" "$change_types"
    
    # Membuat issue baru
    create_new_issue "$COMMIT_HASH" "$COMMIT_MESSAGE" "$AUTHOR" "$DATE" "$CHANGED_FILES" "$change_types"
}

# Menjalankan script
main "$@"
