#Requires -RunAsAdministrator
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Altensor Academy - IIS Deploy Skripti   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Cari qovluq və hədəf wwwroot qovluğu
$sourceDir = $PSScriptRoot
if (-not $sourceDir) { $sourceDir = Get-Location }
$destDir = "C:\inetpub\wwwroot"

# 2. IIS quraşdırılması yoxlanılır (yoxdursa avtomatik quraşdırılır)
Write-Host "`n[1/5] IIS statusu yoxlanılır..." -ForegroundColor Yellow
if (Get-Command Install-WindowsFeature -ErrorAction SilentlyContinue) {
    $iisFeature = Get-WindowsFeature -Name Web-Server
    if (-not $iisFeature.Installed) {
        Write-Host "IIS Windows Server-də quraşdırılır..." -ForegroundColor Yellow
        Install-WindowsFeature -Name Web-Server -IncludeManagementTools | Out-Null
    } else {
        Write-Host "IIS artıq quraşdırılıb." -ForegroundColor Green
    }
} elseif (Get-Command Enable-WindowsOptionalFeature -ErrorAction SilentlyContinue) {
    Write-Host "IIS modulu aktivləşdirilir..." -ForegroundColor Yellow
    Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole,IIS-WebServerManagementTools -All -NoRestart | Out-Null
}

# 3. Faylları birbaşa wwwroot-a kopyalayırıq
Write-Host "`n[2/5] Fayllar wwwroot qovluğuna kopyalanır ($destDir)..." -ForegroundColor Yellow
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# Köhnə default IIS mavi pəncərə fayllarını silirik
Remove-Item -Path "$destDir\iisstart.*" -Force -ErrorAction SilentlyContinue

Copy-Item -Path "$sourceDir\*" -Destination $destDir -Recurse -Force -Exclude "deploy-iis.ps1"
Write-Host "Fayllar wwwroot qovluğuna kopyalandı." -ForegroundColor Green

# 4. İcazələrin verilməsi (IIS_IUSRS və IUSR)
Write-Host "`n[3/5] IIS istifadəçi icazələri tənzimlənir..." -ForegroundColor Yellow
icacls $destDir /grant "IIS_IUSRS:(OI)(CI)RX" /t /q | Out-Null
icacls $destDir /grant "IUSR:(OI)(CI)RX" /t /q | Out-Null
Write-Host "İcazələr təyin olundu." -ForegroundColor Green

# 5. IIS Default Web Site aktiv edilir
Write-Host "`n[4/5] IIS Web Saytı tənzimlənir..." -ForegroundColor Yellow
Import-Module WebAdministration
Start-Website -Name "Default Web Site" -ErrorAction SilentlyContinue
Write-Host "IIS Saytı aktivdir." -ForegroundColor Green

# 6. Windows Firewall port 80 açılır və IIS restart olunur
Write-Host "`n[5/5] Firewall port 80 və IIS yenilənir..." -ForegroundColor Yellow
$firewallRule = Get-NetFirewallRule -DisplayName "AltensorAcademy-HTTP-80" -ErrorAction SilentlyContinue
if (-not $firewallRule) {
    New-NetFirewallRule -DisplayName "AltensorAcademy-HTTP-80" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow | Out-Null
}
iisreset /restart | Out-Null

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  Təbriklər! Sayt uğurla deploy olundu." -ForegroundColor Green
Write-Host "  Yoxlamaq üçün brauzerdə açın: http://localhost" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
