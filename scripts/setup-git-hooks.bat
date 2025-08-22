@echo off
setlocal enabledelayedexpansion

REM Script untuk setup Git hooks agar otomatis membuat issue setelah push (Windows)

echo 🔧 Setting up Git hooks for auto issue creation...

REM Membuat direktori hooks jika belum ada
if not exist ".git\hooks" mkdir ".git\hooks"

REM Membuat post-push hook
(
echo @echo off
echo setlocal enabledelayedexpansion
echo.
echo REM Git hook untuk membuat issue otomatis setelah push
echo REM Hook ini akan dipanggil setelah git push berhasil
echo.
echo echo 🚀 Auto creating issue for push...
echo.
echo REM Mendapatkan path ke script
echo set SCRIPT_DIR=%~dp0
echo set PROJECT_ROOT=%SCRIPT_DIR%..\..
echo set ISSUE_SCRIPT=!PROJECT_ROOT!\scripts\create-issue-on-push.bat
echo.
echo REM Mengecek apakah script ada
echo if not exist "!ISSUE_SCRIPT!" ^(
echo     echo ❌ Issue creation script not found: !ISSUE_SCRIPT!
echo     exit /b 0
echo ^)
echo.
echo REM Mengecek apakah GITHUB_TOKEN tersedia
echo if "!GITHUB_TOKEN!"=="" ^(
echo     echo ⚠️  GITHUB_TOKEN not found. Skipping issue creation.
echo     echo    Set GITHUB_TOKEN environment variable to enable auto issue creation.
echo     exit /b 0
echo ^)
echo.
echo REM Menjalankan script pembuatan issue
echo echo 📝 Creating issue...
echo "!ISSUE_SCRIPT!"
echo.
echo echo ✅ Git hook completed!
) > .git\hooks\post-push

REM Membuat post-commit hook
(
echo @echo off
echo REM Hook ini akan dipanggil setelah commit
echo REM Kita akan menandai bahwa ada commit baru
echo.
echo echo 📝 Commit completed. Issue will be created on next push.
) > .git\hooks\post-commit

REM Membuat script untuk setup environment
(
echo @echo off
echo setlocal enabledelayedexpansion
echo.
echo REM Script untuk setup environment variables
echo.
echo echo 🔧 Setting up environment for auto issue creation...
echo.
echo REM Mengecek apakah GITHUB_TOKEN sudah diset
echo if "!GITHUB_TOKEN!"=="" ^(
echo     echo ❌ GITHUB_TOKEN not found!
echo     echo.
echo     echo 📋 Setup Instructions:
echo     echo 1. Buat Personal Access Token di GitHub:
echo     echo    - Buka GitHub Settings → Developer settings → Personal access tokens
echo     echo    - Klik 'Generate new token ^(classic^)'
echo     echo    - Pilih scope 'repo' atau 'public_repo'
echo     echo    - Copy token yang dihasilkan
echo     echo.
echo     echo 2. Set environment variable:
echo     echo    set GITHUB_TOKEN=your_token_here
echo     echo.
echo     echo 3. Atau tambahkan ke environment variables Windows:
echo     echo    - Buka System Properties → Environment Variables
echo     echo    - Add new variable GITHUB_TOKEN
echo     echo.
echo     echo 4. Test dengan menjalankan:
echo     echo    scripts\create-issue-on-push.bat
echo ^) else ^(
echo     echo ✅ GITHUB_TOKEN found!
echo     echo 🔗 Token: !GITHUB_TOKEN:~0,10!...
echo ^)
echo.
echo echo.
echo echo 🎉 Setup completed!
echo echo 📝 Now when you push, an issue will be automatically created.
) > scripts\setup-env.bat

REM Membuat script untuk test
(
echo @echo off
echo setlocal enabledelayedexpansion
echo.
echo REM Script untuk test pembuatan issue
echo.
echo echo 🧪 Testing issue creation...
echo.
echo REM Mengecek apakah GITHUB_TOKEN tersedia
echo if "!GITHUB_TOKEN!"=="" ^(
echo     echo ❌ GITHUB_TOKEN not found!
echo     echo Please set GITHUB_TOKEN environment variable first.
echo     exit /b 1
echo ^)
echo.
echo REM Menjalankan script pembuatan issue
echo echo 🚀 Creating test issue...
echo scripts\create-issue-on-push.bat
echo.
echo echo ✅ Test completed!
) > scripts\test-issue-creation.bat

echo ✅ Git hooks setup completed!
echo.
echo 📋 Next steps:
echo 1. Set GITHUB_TOKEN environment variable:
echo    set GITHUB_TOKEN=your_token_here
echo.
echo 2. Test setup:
echo    scripts\test-issue-creation.bat
echo.
echo 3. Make a commit and push to see it in action!
echo.
echo 🔗 Documentation: README_AUTO_ISSUE.md
