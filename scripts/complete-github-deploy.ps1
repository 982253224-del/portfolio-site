# GitHub: login, create repo, push. Run from project root (folder containing package.json).
# Usage:
#   .\scripts\complete-github-deploy.ps1
#   .\scripts\complete-github-deploy.ps1 -RepoName "my-portfolio"
#   $env:GITHUB_TOKEN = "ghp_xxx"; .\scripts\complete-github-deploy.ps1

param(
  [string]$RepoName = "portfolio-site",
  [switch]$NonInteractive
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$Git = "C:\Program Files\Git\bin\git.exe"
$Gh = Join-Path ${env:ProgramFiles} "GitHub CLI\gh.exe"
if (-not (Test-Path $Gh)) {
  Write-Error "GitHub CLI not found: $Gh. Install: winget install GitHub.cli"
  exit 1
}

if ($env:GITHUB_TOKEN -or $env:GH_TOKEN) {
  $t = if ($env:GITHUB_TOKEN) { $env:GITHUB_TOKEN } else { $env:GH_TOKEN }
  $t | & $Gh auth login --with-token -h github.com 2>$null
}

$authed = $false
$prevEap = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"
& $Gh auth status 2>&1 | Out-Null
$ErrorActionPreference = $prevEap
if ($LASTEXITCODE -eq 0) { $authed = $true }

if (-not $authed) {
  if ($NonInteractive) {
    Write-Error "Not logged in. Run: gh auth login -w   Or set env GITHUB_TOKEN and retry."
    exit 1
  }
  Write-Host ""
  Write-Host "Opening browser for GitHub login..." -ForegroundColor Yellow
  Start-Process -FilePath $Gh -ArgumentList @("auth", "login", "-h", "github.com", "-p", "https", "-w")
  Write-Host "After login in browser, press Enter here..."
  Read-Host | Out-Null
  & $Gh auth status
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Login failed. Set GITHUB_TOKEN and run again."
    exit 1
  }
}

$hasRemote = $false
$ErrorActionPreference = "SilentlyContinue"
& $Git remote get-url origin 2>&1 | Out-Null
$ErrorActionPreference = $prevEap
if ($LASTEXITCODE -eq 0) { $hasRemote = $true }

if (-not $hasRemote) {
  Write-Host "Creating repo '$RepoName' and pushing main..."
  & $Gh repo create $RepoName --public --source=. --remote=origin --push
} else {
  Write-Host "Remote origin exists, pushing..."
  & $Git push -u origin main
}

Write-Host ""
Write-Host "Done. In repo Settings - Pages - Source: choose GitHub Actions." -ForegroundColor Green
$user = (& $Gh api user -q .login 2>$null)
if ($user) {
  $tail = "/" + $RepoName + "/#/"
  Write-Host ("Public URL (after Actions deploy): https://" + $user + ".github.io" + $tail) -ForegroundColor Cyan
}
