@echo off
echo Starting Math Worksheet...
cd /d "%~dp0"
start http://localhost:5173
npm run dev
pause
