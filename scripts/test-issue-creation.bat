@echo off
setlocal enabledelayedexpansion

REM Script untuk test pembuatan issue

echo 🧪 Testing issue creation...

REM Mengecek apakah GITHUB_TOKEN tersedia
if "!GITHUB_TOKEN!"=="" (
    echo ❌ GITHUB_TOKEN not found!
    echo Please set GITHUB_TOKEN environment variable first.
    exit /b 1
)

REM Menjalankan script pembuatan issue
echo 🚀 Creating test issue...
scripts\create-issue-on-push.bat

echo ✅ Test completed!
