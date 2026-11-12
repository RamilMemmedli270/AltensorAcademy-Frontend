#Requires -RunAsAdministrator
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Altensor Academy - IIS Deploy Skripti   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Cari qovluq və hədəf qovluğu təyin edirik
$sourceDir = $PSScriptRoot
if (-not $sourceDir) { $sourceDir = Get-Location }
$destDir = "C:\inetpub\AltensorAcademy"

# 2. IIS quraşdırılması yoxlanılır (yoxdursa avtomatik quraşdırılır)
Write-Host "`n[1/6] IIS statusu yoxlanılır..." -ForegroundColor Yellow
if (Get-Command Install-WindowsFeature -ErrorAction SilentlyContinue) {
    # Windows Server üçün
    $iisFeature = Get-WindowsFeature -Name Web-Server
    if (-not $iisFeature.Installed) {
        Write-Host "IIS Windows Server-də quraşdırılır..." -ForegroundColor Yellow
        Install-WindowsFeature -Name Web-Server -IncludeManagementTools | Out-Null
    } else {
        Write-Host "IIS artıq quraşdırılıb." -ForegroundColor Green
    }
} elseif (Get-Command Enable-WindowsOptionalFeature -ErrorAction SilentlyContinue) {
    # Windows Desktop (10/11) üçün
    Write-Host "IIS modulu aktivləşdirilir..." -ForegroundColor Yellow
    Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole,IIS-WebServerManagementTools -All -NoRestart | Out-Null
}

# 3. Faylları C:\inetpub\AltensorAcademy qovluğuna kopyalayırıq
Write-Host "`n[2/6] Fayllar hədəf qovluğa kopyalanır ($destDir)..." -ForegroundColor Yellow
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

Copy-Item -Path "$sourceDir\*" -Destination $destDir -Recurse -Force -Exclude "deploy-iis.ps1"
Write-Host "Fayllar uğurla kopyalandı." -ForegroundColor Green

# 4. İcazələrin verilməsi (IIS_IUSRS və IUSR)
Write-Host "`n[3/6] IIS istifadəçi icazələri tənzimlənir..." -ForegroundColor Yellow
icacls $destDir /grant "IIS_IUSRS:(OI)(CI)RX" /t /q | Out-Null
icacls $destDir /grant "IUSR:(OI)(CI)RX" /t /q | Out-Null
Write-Host "İcazələr təyin olundu." -ForegroundColor Green

# 5. IIS Saytının konfiqurasiyası
Write-Host "`n[4/6] IIS Web Saytı tənzimlənir..." -ForegroundColor Yellow
Import-Module WebAdministration

# Port 80 toqquşması olmasın deyə mövcud 'Default Web Site' dayandırılır və ya aradan qaldırılır
if (Get-Website -Name "Default Web Site" -ErrorAction SilentlyContinue) {
    Stop-Website -Name "Default Web Site" -ErrorAction SilentlyContinue
}

# Köhnə sayt varsa silib yenidən quraşdırırıq
if (Get-Website -Name "AltensorAcademy" -ErrorAction SilentlyContinue) {
    Remove-Website -Name "AltensorAcademy" -ErrorAction SilentlyContinue
}

New-Website -Name "AltensorAcademy" -Port 80 -PhysicalPath $destDir -ApplicationPool "DefaultAppPool" | Out-Null
Start-Website -Name "AltensorAcademy"
Write-Host "IIS Saytı (AltensorAcademy, Port: 80) işə salındı." -ForegroundColor Green

# 6. Windows Firewall port 80 açılır
Write-Host "`n[5/6] Firewall port 80 açılır..." -ForegroundColor Yellow
$firewallRule = Get-NetFirewallRule -DisplayName "AltensorAcademy-HTTP-80" -ErrorAction SilentlyContinue
if (-not $firewallRule) {
    New-NetFirewallRule -DisplayName "AltensorAcademy-HTTP-80" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow | Out-Null
}
Write-Host "Firewall qaydası aktivdir." -ForegroundColor Green

# 7. IIS yenidən başladılır
Write-Host "`n[6/6] IIS yenilənir (iisreset)..." -ForegroundColor Yellow
iisreset /restart | Out-Null

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  Təbriklər! Sayt uğurla deploy olundu." -ForegroundColor Green
Write-Host "  Yoxlamaq üçün brauzerdə açın: http://localhost" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green

