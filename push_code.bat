@echo off
echo Envoi du code vers GitHub (Nouvelle URL)...
"C:\Users\Darich30\AppData\Local\GitHubDesktop\app-3.5.4\resources\app\git\cmd\git.exe" remote set-url origin https://github.com/peleir080-byte/cceabt-.git
"C:\Users\Darich30\AppData\Local\GitHubDesktop\app-3.5.4\resources\app\git\cmd\git.exe" push -u origin main
echo.
echo Opération terminée. Vous pouvez fermer cette fenêtre.
pause
