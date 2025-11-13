@echo off
cd /d "%~dp0"
REM Chạy RPC ngầm không hiển thị terminal
start "" /B npm start
exit /b 0
