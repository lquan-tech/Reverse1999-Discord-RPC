$WshShell = New-Object -ComObject WScript.Shell
$StartupFolder = [System.IO.Path]::Combine($env:APPDATA, 'Microsoft\Windows\Start Menu\Programs\Startup')
$ShortcutPath = [System.IO.Path]::Combine($StartupFolder, 'Reverse1999RPC.lnk')

# Tạo shortcut
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = 'd:\Tools\Reverse 199 rpc\run-rpc-hidden.vbs'
$Shortcut.WorkingDirectory = 'd:\Tools\Reverse 199 rpc'
$Shortcut.WindowStyle = 7  # Minimized
$Shortcut.Save()

Write-Host 'Shortcut created successfully!'
Write-Host 'Startup folder: ' $StartupFolder
Write-Host 'RPC will run hidden in background on next startup!'
