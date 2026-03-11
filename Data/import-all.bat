@echo off
REM Sanity Portfolio Data Import Script for Windows
REM This script imports all dummy data files into your Sanity dataset

setlocal enabledelayedexpansion

REM Resolve paths
set "DATA_DIR=%~dp0"
set "ROOT_DIR=%DATA_DIR%.."

REM Default dataset name
set DATASET=%1
if "%DATASET%"=="" set DATASET=production

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   Sanity Portfolio Data Import Script             ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Ensure we're running from the repo root so the local Sanity project context is available
pushd "%ROOT_DIR%" >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Unable to navigate to project root: "%ROOT_DIR%"
    exit /b 1
)

REM Check that dependencies are installed (Sanity CLI commands require local project context)
if not exist "node_modules\sanity\package.json" (
    echo [ERROR] Dependencies are not installed in the project root.
    echo Run one of the following from the project root, then try again:
    echo   pnpm install
    echo   npm install
    echo   yarn install
    popd >nul 2>nul
    exit /b 1
)

REM Pick an executor that uses the local install
set "SANITY_CMD="
where pnpm >nul 2>nul
if not errorlevel 1 (
    set "SANITY_CMD=pnpm -s exec sanity"
) else (
    set "SANITY_CMD=npx sanity"
)

REM Verify Data directory exists (relative to root)
if not exist "Data\skills.ndjson" (
    echo [ERROR] Cannot find "Data\skills.ndjson"
    echo Make sure you're running this from the repository that contains the Data folder.
    popd >nul 2>nul
    exit /b 1
)

echo Dataset: %DATASET%
echo Import Mode: Replace existing documents
echo.

REM Confirm before proceeding
set /p CONFIRM="Continue with import? This will replace existing documents. [y/N]: "
if /i not "%CONFIRM%"=="y" (
    echo Import cancelled.
    popd >nul 2>nul
    exit /b 0
)

echo.
echo Starting import...
echo.

REM Import files in order
set FILES=skills.ndjson profile.ndjson education.ndjson experience.ndjson projects.ndjson blog.ndjson services.ndjson achievements.ndjson certifications.ndjson testimonials.ndjson navigation.ndjson siteSettings.ndjson contact.ndjson

set COUNT=0
for %%F in (%FILES%) do (
    set /a COUNT+=1
    if exist "Data\%%F" (
        echo [!COUNT!/13] Importing %%F...
        call %SANITY_CMD% dataset import "Data\%%F" "%DATASET%" --replace
        if errorlevel 1 (
            echo [ERROR] Failed to import %%F
            popd >nul 2>nul
            exit /b 1
        )
        echo [SUCCESS] Successfully imported %%F
        echo.
    ) else (
        echo [WARNING] %%F not found, skipping...
        echo.
    )
)

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   ✓ Import Complete!                              ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Visit your Sanity Studio to verify the data
echo   2. Upload images to documents with image fields
echo   3. Customize the content with your actual information
echo   4. Test your frontend application
echo.
echo Happy building! 🚀

popd >nul 2>nul

