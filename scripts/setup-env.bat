@echo off
setlocal enabledelayedexpansion

REM Script untuk setup environment variables

echo 🔧 Setting up environment for auto issue creation...

REM Mengecek apakah GITHUB_TOKEN sudah diset
if "!GITHUB_TOKEN!"=="" (
    echo ❌ GITHUB_TOKEN not found!
    echo.
    echo 📋 Setup Instructions:
    echo 1. Buat Personal Access Token di GitHub:
    echo    - Buka GitHub Settings → Developer settings → Personal access tokens
    echo    - Klik 'Generate new token (classic)'
    echo    - Pilih scope 'repo' atau 'public_repo'
    echo    - Copy token yang dihasilkan
    echo.
    echo 2. Set environment variable:
    echo    set GITHUB_TOKEN=your_token_here
    echo.
    echo 3. Atau tambahkan ke environment variables Windows:
    echo    - Buka System Properties → Environment Variables
    echo    - Add new variable GITHUB_TOKEN
    echo.
    echo 4. Test dengan menjalankan:
    echo    scripts\create-issue-on-push.bat
) else (
    echo ✅ GITHUB_TOKEN found!
    echo 🔗 Token: !GITHUB_TOKEN:~0,10!...
)

echo.
echo 🎉 Setup completed!
echo 📝 Now when you push, an issue will be automatically created.
