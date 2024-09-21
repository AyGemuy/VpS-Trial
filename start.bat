@echo off
:: Menghapus shortcut Epic Games Launcher dari desktop publik
del /f "C:\Users\Public\Desktop\Epic Games Launcher.lnk" > out.txt 2>&1

:: Mengatur komentar server
net config server /srvcomment:"Windows Server 2019 - DannTeam" > out.txt 2>&1

:: Mengaktifkan AutoTray di Explorer
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /V EnableAutoTray /T REG_DWORD /D 0 /F > out.txt 2>&1

:: Menambahkan entri startup untuk wallpaper.bat
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /f /v Wallpaper /t REG_SZ /d D:\a\wallpaper.bat

:: Membuat akun administrator dan menambahkan ke grup administrator
net user administrator @DannTeam /add >nul
net localgroup administrators administrator /add >nul
net user administrator /active:yes >nul

:: Menghapus akun installer
net user installer /delete

:: Mengaktifkan disk performance counters
diskperf -Y >nul

:: Mengatur dan memulai layanan audio
sc config Audiosrv start= auto >nul
sc start audiosrv >nul

:: Memberi hak akses penuh ke folder Temp dan installer untuk administrator
ICACLS C:\Windows\Temp /grant administrator:F >nul
ICACLS C:\Windows\installer /grant administrator:F >nul

:: Pesan sukses instalasi
echo Berhasil di install! Jika Remote Desktop mati, silakan untuk membangun ulang!

:: Menampilkan IP address lokal
echo IP Address lokal:
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| find "IPv4"') do echo %%A

:: Opsi jika menggunakan ngrok untuk mendapatkan IP publik
tasklist | find /i "ngrok.exe" >nul
if %errorlevel%==0 (
    curl -s localhost:4040/api/tunnels | jq -r .tunnels[0].public_url
) else (
    echo Ngrok tidak berjalan, tidak dapat menampilkan IP publik.
)

:: Informasi Remote Desktop
echo Username: administrator
echo Password: Dani@001
echo Masuk ke Remote Desktop!

:: Tunggu selama 10 detik
ping -n 10 127.0.0.1 >nul
