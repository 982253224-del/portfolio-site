# 完成 GitHub 远程创建并推送（需先登录 GitHub CLI 或设置 GITHUB_TOKEN）
# 用法（在项目根目录 react\react 下）:
#   .\scripts\complete-github-deploy.ps1
#   .\scripts\complete-github-deploy.ps1 -RepoName "my-portfolio"
# 或使用 Token（classic PAT，需勾选 repo）:
#   $env:GITHUB_TOKEN = "ghp_xxxxxxxx"; .\scripts\complete-github-deploy.ps1

param(
  [string]$RepoName = "portfolio-site",
  # 未登录时不弹浏览器，仅报错（供 CI）；本地请去掉该参数
  [switch]$NonInteractive
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$Git = "C:\Program Files\Git\bin\git.exe"
$Gh = Join-Path ${env:ProgramFiles} "GitHub CLI\gh.exe"
if (-not (Test-Path $Gh)) {
  Write-Error "未找到 GitHub CLI：$Gh ，请先安装：winget install GitHub.cli"
}

# 使用环境变量中的 Token 非交互登录（可选）
if ($env:GITHUB_TOKEN -or $env:GH_TOKEN) {
  $t = if ($env:GITHUB_TOKEN) { $env:GITHUB_TOKEN } else { $env:GH_TOKEN }
  $t | & $Gh auth login --with-token -h github.com 2>$null
}

$authed = $false
try {
  & $Gh auth status 2>$null | Out-Null
  if ($LASTEXITCODE -eq 0) { $authed = $true }
} catch { }

if (-not $authed) {
  if ($NonInteractive) {
    Write-Error "未登录 GitHub。请在项目根目录执行: gh auth login -w   或设置 `$env:GITHUB_TOKEN 后重试。"
  }
  Write-Host ""
  Write-Host "尚未登录 GitHub。将尝试打开浏览器完成登录（GitHub CLI）..." -ForegroundColor Yellow
  Start-Process -FilePath $Gh -ArgumentList @("auth", "login", "-h", "github.com", "-p", "https", "-w")
  Write-Host "请在浏览器中完成授权，然后回到此窗口按 Enter 继续..."
  Read-Host
  & $Gh auth status
  if ($LASTEXITCODE -ne 0) {
    Write-Error "仍未登录。也可设置环境变量 GITHUB_TOKEN 后重新运行本脚本。"
  }
}

$hasRemote = $false
try {
  & $Git remote get-url origin 2>$null | Out-Null
  if ($LASTEXITCODE -eq 0) { $hasRemote = $true }
} catch { }

if (-not $hasRemote) {
  Write-Host "正在创建远程仓库 '$RepoName' 并推送 main ..."
  & $Gh repo create $RepoName --public --source=. --remote=origin --push
} else {
  Write-Host "已存在 origin，执行 push ..."
  & $Git push -u origin main
}

Write-Host ""
Write-Host "完成。请到 GitHub 仓库 Settings -> Pages -> Source 选择 GitHub Actions。" -ForegroundColor Green
$user = (& $Gh api user -q .login 2>$null)
if ($user) {
  Write-Host "站点（部署成功后）: https://$user.github.io/$RepoName/#/" -ForegroundColor Cyan
}
