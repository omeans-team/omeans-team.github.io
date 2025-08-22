@echo off
setlocal enabledelayedexpansion

REM Script untuk test penutupan issue

echo 🧪 Testing issue closing...

REM Mengecek apakah GITHUB_TOKEN tersedia
if "!GITHUB_TOKEN!"=="" (
    echo ❌ GITHUB_TOKEN not found!
    echo Please set GITHUB_TOKEN environment variable first.
    exit /b 1
)

REM Menjalankan script penutupan issue
echo 🚀 Closing auto-generated issues...
scripts\close-issues-on-push.bat

echo ✅ Test completed!
