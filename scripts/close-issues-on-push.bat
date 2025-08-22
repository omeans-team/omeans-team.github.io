@echo off
setlocal enabledelayedexpansion

REM Script untuk menutup issue otomatis setelah push (Windows)
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

echo 🚀 Closing auto-generated issues after push...

REM Mendapatkan informasi commit
for /f "tokens=*" %%i in ('git rev-parse HEAD') do set COMMIT_HASH=%%i
for /f "tokens=*" %%i in ('git log -1 --pretty^=%%B') do set COMMIT_MESSAGE=%%i
for /f "tokens=*" %%i in ('git log -1 --pretty^=%%an') do set AUTHOR=%%i
for /f "tokens=*" %%i in ('git log -1 --pretty^=%%cd --date^=iso') do set DATE=%%i

echo 🔍 Searching for auto-generated issues to close...

REM Mendapatkan semua issue yang terbuka dengan label auto-generated
curl -s -X GET ^
    -H "Authorization: token %GITHUB_TOKEN%" ^
    -H "Accept: application/vnd.github.v3+json" ^
    "https://api.github.com/repos/%REPO_OWNER%/%REPO_NAME%/issues?state=open&labels=auto-generated" > temp_issues.json

REM Mengecek apakah ada issue
findstr /C:"\"number\":" temp_issues.json >nul
if %errorlevel% neq 0 (
    echo ✅ No auto-generated issues to close
    del temp_issues.json 2>nul
    exit /b 0
)

REM Menghitung jumlah issue
set ISSUE_COUNT=0
for /f "tokens=*" %%i in ('findstr /C:"\"number\":" temp_issues.json') do set /a ISSUE_COUNT+=1

echo 🔍 Found %ISSUE_COUNT% auto-generated issues to close

REM Menutup setiap issue
for /f "tokens=2 delims=:," %%i in ('findstr /C:"\"number\":" temp_issues.json') do (
    set ISSUE_NUMBER=%%i
    echo 🔒 Closing issue #!ISSUE_NUMBER!...
    
    REM Menutup issue
    curl -s -X PATCH ^
        -H "Authorization: token %GITHUB_TOKEN%" ^
        -H "Accept: application/vnd.github.v3+json" ^
        -d "{\"state\":\"closed\"}" ^
        "https://api.github.com/repos/%REPO_OWNER%/%REPO_NAME%/issues/!ISSUE_NUMBER!" > temp_close.json
    
    REM Membuat komentar penutupan
    set COMMENT_BODY=## ✅ Issue Closed Automatically

This issue has been automatically closed due to a new push to the `main` branch.

**Commit:** `%COMMIT_HASH:~0,7%`
**Author:** %AUTHOR%
**Date:** %DATE%

**Reason:** New update has been pushed, making this issue outdated.

---
*This comment was automatically added by script.*

    REM Membuat file JSON untuk komentar
    echo { > temp_comment.json
    echo     "body": "%COMMENT_BODY%" >> temp_comment.json
    echo } >> temp_comment.json
    
    curl -s -X POST ^
        -H "Authorization: token %GITHUB_TOKEN%" ^
        -H "Accept: application/vnd.github.v3+json" ^
        -d @temp_comment.json ^
        "https://api.github.com/repos/%REPO_OWNER%/%REPO_NAME%/issues/!ISSUE_NUMBER!/comments" > temp_comment_response.json
    
    REM Mengecek response
    findstr /C:"\"html_url\":" temp_close.json >nul
    if %errorlevel% equ 0 (
        echo ✅ Successfully closed issue #!ISSUE_NUMBER!
        for /f "tokens=2 delims=:," %%j in ('findstr /C:"\"html_url\":" temp_close.json') do (
            echo 🔗 View issue: %%j
        )
    ) else (
        echo ❌ Failed to close issue #!ISSUE_NUMBER!
    )
)

REM Cleanup temporary files
del temp_issues.json 2>nul
del temp_close.json 2>nul
del temp_comment.json 2>nul
del temp_comment_response.json 2>nul

echo 🎉 Successfully closed %ISSUE_COUNT% auto-generated issues

echo.
echo ✅ Script completed!
