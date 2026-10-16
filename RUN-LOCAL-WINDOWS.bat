@echo off
cd /d "%~dp0"
echo Starting Golden Properties website at http://localhost:8000
py -m http.server 8000
pause
