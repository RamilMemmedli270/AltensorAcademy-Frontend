#Requires -RunAsAdministrator
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

Write-Host "=== Altensor Academy Yeniləmə ===" -ForegroundColor Cyan
Write-Host "1. Son dəyişikliklər GitHub-dan çəkilir..." -ForegroundColor Yellow
git pull

Write-Host "2. Yeni fayllar sayt qovluğuna kopyalanır..." -ForegroundColor Yellow
$source = $PSScriptRoot
if (-not $source) { $source = Get-Location }
$dest = "C:\inetpub\wwwroot"

Copy-Item -Path "$source\*" -Destination $dest -Recurse -Force -Exclude ".git", "deploy-iis.ps1", "update.ps1"

Write-Host "`nSayt uğurla yeniləndi!" -ForegroundColor Green
