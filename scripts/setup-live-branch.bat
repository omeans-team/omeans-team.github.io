@echo off
setlocal enabledelayedexpansion

REM Script untuk setup branch live dari branch main (Windows)
REM Branch live akan berisi static files yang aman untuk publikasi

echo 🚀 Setting up live branch for public deployment...

REM Konfigurasi
set MAIN_BRANCH=main
set LIVE_BRANCH=live
for /f "tokens=*" %%i in ('git config --get remote.origin.url') do set REPO_URL=%%i
for /f "tokens=4 delims=/." %%i in ("%REPO_URL%") do set REPO_NAME=%%i

echo 📋 Configuration:
echo   - Main branch: %MAIN_BRANCH% (private development)
echo   - Live branch: %LIVE_BRANCH% (public static files)
echo   - Repository: %REPO_NAME%

REM Mengecek apakah sudah di branch main
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="%MAIN_BRANCH%" (
    echo ❌ Error: You must be on the %MAIN_BRANCH% branch to setup live branch
    echo Current branch: %CURRENT_BRANCH%
    echo Please checkout to %MAIN_BRANCH% first:
    echo   git checkout %MAIN_BRANCH%
    exit /b 1
)

REM Mengecek apakah live branch sudah ada
git show-ref --verify --quiet refs/heads/%LIVE_BRANCH%
if %errorlevel% equ 0 (
    echo ⚠️  Live branch already exists. Do you want to recreate it? (y/N)
    set /p response=
    if /i not "!response!"=="y" (
        echo ❌ Setup cancelled
        exit /b 1
    )
    
    echo 🗑️  Deleting existing live branch...
    git branch -D %LIVE_BRANCH%
)

REM Build static files
echo 🔨 Building static files...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the build errors first.
    exit /b 1
)

REM Membuat live branch dari static files
echo 🌿 Creating live branch...
git checkout --orphan %LIVE_BRANCH%

REM Menghapus semua file kecuali static files
echo 🧹 Cleaning up live branch...
git rm -rf .

REM Copy static files dari out directory
echo 📁 Copying static files...
xcopy /E /I /Y out\* . >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ No static files found in 'out' directory
    echo Please make sure your build process generates files in the 'out' directory
    git checkout %MAIN_BRANCH%
    exit /b 1
)

REM Menambahkan .nojekyll untuk GitHub Pages
echo. > .nojekyll

REM Membuat README untuk live branch
echo # 🚀 Live Branch - Static Files > README.md
echo. >> README.md
echo This branch contains the compiled static files for public deployment. >> README.md
echo. >> README.md
echo ## 📋 Information >> README.md
echo. >> README.md
echo - **Source Branch:** `%MAIN_BRANCH%` (private development) >> README.md
echo - **Live Branch:** `%LIVE_BRANCH%` (public static files) >> README.md
echo - **Auto-Deploy:** Yes (via GitHub Actions) >> README.md
echo - **Last Updated:** %date% %time% >> README.md
echo. >> README.md
echo ## 🔗 Links >> README.md
echo. >> README.md
echo - **Live Site:** https://%REPO_NAME%.github.io/ >> README.md
echo - **Source Code:** https://github.com/omeans-team/%REPO_NAME%/tree/%MAIN_BRANCH% >> README.md
echo. >> README.md
echo ## ⚠️ Important >> README.md
echo. >> README.md
echo - **DO NOT** edit files directly in this branch >> README.md
echo - **DO NOT** commit sensitive information to this branch >> README.md
echo - All changes should be made in the `%MAIN_BRANCH%` branch >> README.md
echo - This branch is automatically updated via GitHub Actions >> README.md
echo. >> README.md
echo ## 🔧 Development >> README.md
echo. >> README.md
echo To make changes: >> README.md
echo. >> README.md
echo 1. Switch to `%MAIN_BRANCH%` branch >> README.md
echo 2. Make your changes >> README.md
echo 3. Build the project: `npm run build` >> README.md
echo 4. Commit and push to `%MAIN_BRANCH%` >> README.md
echo 5. GitHub Actions will automatically deploy to this branch >> README.md
echo. >> README.md
echo --- >> README.md
echo *This branch is automatically managed by GitHub Actions.* >> README.md

REM Commit static files
echo 💾 Committing static files...
git add .
git commit -m "🚀 Initial live branch setup with static files

- Auto-generated from %MAIN_BRANCH% branch
- Contains compiled static files only
- Safe for public deployment
- Managed by GitHub Actions"

REM Push live branch
echo 📤 Pushing live branch to remote...
git push origin %LIVE_BRANCH%

REM Kembali ke main branch
echo 🔄 Switching back to %MAIN_BRANCH%...
git checkout %MAIN_BRANCH%

echo ✅ Live branch setup completed!
echo.
echo 📋 Next steps:
echo 1. Configure GitHub Pages to use '%LIVE_BRANCH%' branch
echo 2. Set up branch protection rules for '%LIVE_BRANCH%'
echo 3. Test the deployment by pushing to '%MAIN_BRANCH%'
echo.
echo 🔗 GitHub Pages Settings:
echo   Repository Settings ^> Pages ^> Source: Deploy from a branch
echo   Branch: %LIVE_BRANCH%
echo   Folder: / (root)
echo.
echo 🔒 Branch Protection (Recommended):
echo   - Require pull request reviews before merging
echo   - Restrict pushes that create files
echo   - Allow force pushes: Disabled
echo   - Allow deletions: Disabled
