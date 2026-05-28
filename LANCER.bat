@echo off
title Zelktris Agency — Serveurs
color 0A
cls

echo.
echo  ============================================
echo   Zelktris Agency — Demarrage des serveurs
echo  ============================================
echo.

REM Aller dans le dossier du site
cd /d "%~dp0"

REM Verifier Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Python n'est pas installe ou pas dans le PATH.
    echo Telecharger Python sur https://python.org
    pause
    exit /b 1
)

REM Verifier Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ATTENTION] Node.js non trouve - l'API backend ne demarrera pas.
    echo Le site fonctionnera quand meme sans le backend.
    echo.
)

REM Liberer le port 8080 si occupe
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080 "') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [1/2] Demarrage du serveur site  (port 8080)...
start "ZELKTRIS Site" /D "%~dp0" cmd /k python -m http.server 8080

echo [2/2] Demarrage de l'API backend (port 4000)...
if exist "%~dp0backend\server.js" (
    start "ZELKTRIS API" /D "%~dp0backend" cmd /k node server.js
) else (
    echo [INFO] Dossier backend non trouve, API ignoree.
)

REM Attendre 2 secondes pour que les serveurs demarrent
timeout /t 2 /nobreak >nul

echo.
echo  ============================================
echo   Serveurs demarres !
echo   Site  : http://localhost:8080
echo   API   : http://localhost:4000
echo  ============================================
echo.

REM Ouvrir le site dans le navigateur par defaut
echo Ouverture du site dans le navigateur...
start "" "http://localhost:8080/index.html"

echo.
echo  Ferme cette fenetre pour arreter les serveurs.
echo  (les fenetres "ZELKTRIS Site" et "ZELKTRIS API" doivent rester ouvertes)
echo.
pause
