# setup_node.ps1
# Coded by Antigravity
# Downloads and sets up portable Node.js v20.11.0 LTS for this project

$workDir = "C:\Users\Manoj'S\.gemini\antigravity\scratch\nandeeswaran-portfolio"
$zipUrl = "https://nodejs.org/dist/v20.11.0/node-v20.11.0-win-x64.zip"
$zipFile = Join-Path $workDir "node.zip"
$destFolder = Join-Path $workDir "node-portable"

Write-Host "Creating project directories..."
if (!(Test-Path $workDir)) {
    New-Item -ItemType Directory -Path $workDir -Force | Out-Null
}

Write-Host "Downloading portable Node.js from $zipUrl ..."
try {
    # Using modern WebClient or Invoke-WebRequest
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile -UseBasicParsing
    Write-Host "Download complete. Extracting files..."
    
    # Extract
    if (Test-Path $destFolder) {
        Remove-Item -Recurse -Force $destFolder
    }
    Expand-Archive -Path $zipFile -DestinationPath $workDir
    
    # Rename extracted directory to 'node-portable'
    $extractedDir = Join-Path $workDir "node-v20.11.0-win-x64"
    if (Test-Path $extractedDir) {
        Rename-Item -Path $extractedDir -NewName "node-portable"
        Write-Host "Node.js successfully configured at: $destFolder"
    } else {
        Write-Error "Extracted directory not found!"
    }
} catch {
    Write-Error "Failed to download or configure Node.js: $_"
} finally {
    if (Test-Path $zipFile) {
        Remove-Item -Force $zipFile
    }
}

# Verify Node installation
$nodeExe = Join-Path $destFolder "node.exe"
if (Test-Path $nodeExe) {
    Write-Host "Node version:"
    & $nodeExe -v
    $npmCmd = Join-Path $destFolder "npm.cmd"
    Write-Host "NPM version:"
    & $npmCmd -v
} else {
    Write-Error "Node.js verification failed. node.exe not found."
}
