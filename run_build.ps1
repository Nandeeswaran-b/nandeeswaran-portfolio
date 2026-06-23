# run_build.ps1
# Coded by Antigravity
# Prepends the portable Node.js path and executes a Next.js build check

$nodePath = "C:\Users\Manoj'S\.gemini\antigravity\scratch\nandeeswaran-portfolio\node-portable"
$frontendPath = "C:\Users\Manoj'S\.gemini\antigravity\scratch\nandeeswaran-portfolio\frontend"

Write-Host "Prepending portable Node.js to PATH..."
$env:PATH = "$nodePath;$env:PATH"

Write-Host "Starting Next.js production build check..."
Set-Location -Path $frontendPath
npm run build
