# run_dev.ps1
# Coded by Antigravity
# Prepends the portable Node.js path to environment PATH and starts Next.js dev server

$nodePath = "C:\Users\Manoj'S\.gemini\antigravity\scratch\nandeeswaran-portfolio\node-portable"
$frontendPath = "C:\Users\Manoj'S\.gemini\antigravity\scratch\nandeeswaran-portfolio\frontend"

Write-Host "Prepending portable Node.js to PATH..."
$env:PATH = "$nodePath;$env:PATH"

Write-Host "Current Node Version:"
node -v

Write-Host "Starting Next.js development server..."
Set-Location -Path $frontendPath
npm run dev
