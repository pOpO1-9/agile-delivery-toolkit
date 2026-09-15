@echo off
title Agile Delivery Toolkit
cd /d "%~dp0web"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js n'est pas installe.
  echo Telechargez-le ici: https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Premiere ouverture: installation des dependances...
  call npm install
  if errorlevel 1 (
    echo Echec de npm install.
    pause
    exit /b 1
  )
)

echo Ouverture du kit dans le navigateur...
start "" "http://127.0.0.1:5173/"
call npm run dev -- --host 127.0.0.1 --port 5173
