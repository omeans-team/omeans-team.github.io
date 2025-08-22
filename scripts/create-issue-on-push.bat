@echo off
setlocal enabledelayedexpansion

REM Script untuk membuat issue otomatis ketika push (Windows)
REM Pastikan Anda sudah mengatur GitHub token di environment variable GITHUB_TOKEN

REM Konfigurasi
set REPO_OWNER=omeans-team
set REPO_NAME=omeans-team.github.io
set GITHUB_TOKEN=%GITHUB_TOKEN%

if "%GITHUB_TOKEN%"=="" (
    echo ❌ Error: GITHUB_TOKEN not found
    echo Please set GITHUB_TOKEN environment variable
    echo Usage: set GITHUB_TOKEN=your_token_here
    exit /b 1
)

echo 🚀 Creating issue for latest push...

REM Mendapatkan informasi commit
for /f "tokens=*" %%i in ('git rev-parse HEAD') do set COMMIT_HASH=%%i
for /f "tokens=*" %%i in ('git log -1 --pretty^=%%B') do set COMMIT_MESSAGE=%%i
for /f "tokens=*" %%i in ('git log -1 --pretty^=%%an') do set AUTHOR=%%i
for /f "tokens=*" %%i in ('git log -1 --pretty^=%%cd --date^=iso') do set DATE=%%i

REM Mendapatkan file yang berubah
set CHANGED_FILES=
for /f "tokens=*" %%i in ('git diff --name-only HEAD~1 HEAD 2^>nul') do (
    if "!CHANGED_FILES!"=="" (
        set CHANGED_FILES=%%i
    ) else (
        set CHANGED_FILES=!CHANGED_FILES!, %%i
    )
)

if "!CHANGED_FILES!"=="" set CHANGED_FILES=Initial commit

REM Membuat judul issue
for /f "tokens=1* delims=" %%a in ("%COMMIT_MESSAGE%") do set FIRST_LINE=%%a
set ISSUE_TITLE=🔄 Update: %FIRST_LINE%

REM Membuat body issue
set ISSUE_BODY=## 📝 Update Summary

**Commit:** `%COMMIT_HASH:~0,7%`
**Author:** %AUTHOR%
**Date:** %DATE%

### 📋 Changes Made
%COMMIT_MESSAGE%

### 📁 Files Modified
```
%CHANGED_FILES%
```

### 🔗 Related Links
- **Commit:** [%COMMIT_HASH:~0,7%](https://github.com/%REPO_OWNER%/%REPO_NAME%/commit/%COMMIT_HASH%)
- **Repository:** [%REPO_OWNER%/%REPO_NAME%](https://github.com/%REPO_OWNER%/%REPO_NAME%)

---
*This issue was automatically created on push.*

REM Membuat issue menggunakan GitHub API
curl -s -X POST ^
    -H "Authorization: token %GITHUB_TOKEN%" ^
    -H "Accept: application/vnd.github.v3+json" ^
    -d "{\"title\": \"%ISSUE_TITLE%\", \"body\": \"%ISSUE_BODY%\", \"labels\": [\"auto-generated\", \"update\", \"push\"]}" ^
    "https://api.github.com/repos/%REPO_OWNER%/%REPO_NAME%/issues" > temp_response.json

REM Mengecek response (sederhana)
findstr /C:"\"number\":" temp_response.json >nul
if %errorlevel% equ 0 (
    echo ✅ Issue created successfully
    echo 🔗 Check your GitHub repository for the new issue
) else (
    echo ❌ Failed to create issue
    echo Check temp_response.json for details
)

del temp_response.json 2>nul

echo.
echo �� Script completed!
