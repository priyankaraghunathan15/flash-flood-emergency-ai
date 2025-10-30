# PowerShell script to set up the complete repository structure

Write-Host "Creating Flash Flood Emergency AI System repository structure..." -ForegroundColor Green

# Create main directories
New-Item -ItemType Directory -Force -Path "docs/presentation" | Out-Null
New-Item -ItemType Directory -Force -Path "docs/diagrams" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/detection" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/analysis" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/response" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/command" | Out-Null
New-Item -ItemType Directory -Force -Path "mcp-servers/evacuation-server" | Out-Null
New-Item -ItemType Directory -Force -Path "mcp-servers/weather-server" | Out-Null
New-Item -ItemType Directory -Force -Path "mcp-servers/resource-server" | Out-Null
New-Item -ItemType Directory -Force -Path "infrastructure/deployment" | Out-Null
New-Item -ItemType Directory -Force -Path "infrastructure/monitoring" | Out-Null
New-Item -ItemType Directory -Force -Path "infrastructure/database/schemas" | Out-Null
New-Item -ItemType Directory -Force -Path "config" | Out-Null
New-Item -ItemType Directory -Force -Path "tests/agent-tests" | Out-Null
New-Item -ItemType Directory -Force -Path "tests/integration-tests" | Out-Null
New-Item -ItemType Directory -Force -Path "tests/a2a-protocol-tests" | Out-Null
New-Item -ItemType Directory -Force -Path "examples/sample-crisis-scenarios" | Out-Null
New-Item -ItemType Directory -Force -Path "examples/demo-scripts" | Out-Null
New-Item -ItemType Directory -Force -Path "examples/agent-conversations" | Out-Null

# Create detection agents directories
New-Item -ItemType Directory -Force -Path "agents/detection/social-media-sentinel" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/detection/environmental-monitor" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/detection/news-alert-scanner" | Out-Null

# Create analysis agents directories
New-Item -ItemType Directory -Force -Path "agents/analysis/situation-assessor" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/analysis/resource-mapper" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/analysis/pattern-analyzer" | Out-Null

# Create response agents directories
New-Item -ItemType Directory -Force -Path "agents/response/emergency-dispatcher" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/response/public-communicator" | Out-Null
New-Item -ItemType Directory -Force -Path "agents/response/medical-triage" | Out-Null

# Create command agent directory
New-Item -ItemType Directory -Force -Path "agents/command/mission-control" | Out-Null

Write-Host "Creating README files for agents..." -ForegroundColor Yellow

# Create placeholder README files for detection agents
$detectionAgents = @("social-media-sentinel", "environmental-monitor", "news-alert-scanner")
foreach ($agent in $detectionAgents) {
    $readmeContent = "# $agent`n`n## Purpose`n[To be documented]`n`n## Configuration`n[To be documented]"
    $readmeContent | Out-File -FilePath "agents/detection/$agent/README.md" -Encoding UTF8
}

# Create placeholder README files for analysis agents
$analysisAgents = @("situation-assessor", "resource-mapper", "pattern-analyzer")
foreach ($agent in $analysisAgents) {
    $readmeContent = "# $agent`n`n## Purpose`n[To be documented]`n`n## Configuration`n[To be documented]"
    $readmeContent | Out-File -FilePath "agents/analysis/$agent/README.md" -Encoding UTF8
}

# Create placeholder README files for response agents
$responseAgents = @("emergency-dispatcher", "public-communicator", "medical-triage")
foreach ($agent in $responseAgents) {
    $readmeContent = "# $agent`n`n## Purpose`n[To be documented]`n`n## Configuration`n[To be documented]"
    $readmeContent | Out-File -FilePath "agents/response/$agent/README.md" -Encoding UTF8
}

# Create placeholder README for mission control
$missionControlReadme = "# mission-control`n`n## Purpose`n[To be documented]`n`n## Configuration`n[To be documented]"
$missionControlReadme | Out-File -FilePath "agents/command/mission-control/README.md" -Encoding UTF8

# Create MCP server placeholder READMEs
$mcpServers = @("evacuation-server", "weather-server", "resource-server")
foreach ($server in $mcpServers) {
    $mcpReadme = "# $server`n`n## Tools Provided`n[To be documented]"
    $mcpReadme | Out-File -FilePath "mcp-servers/$server/README.md" -Encoding UTF8
}

Write-Host "Creating .gitignore..." -ForegroundColor Yellow

# Create .gitignore
$gitignoreContent = @"
# Environment variables
.env
*.env
!environment-template.env

# Python
__pycache__/
*.py[cod]
*.pyclass
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
logs/

# OS
.DS_Store
Thumbs.db

# API Keys and Secrets
*_secret.json
*_secrets.json
credentials.json
api_keys.json

# Database
*.db
*.sqlite

# Temporary files
tmp/
temp/
*.tmp
"@
$gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8

Write-Host "Creating requirements.txt..." -ForegroundColor Yellow

# Create requirements.txt
$requirementsContent = @"
# Core dependencies
anthropic>=0.30.0
requests>=2.31.0
python-dotenv>=1.0.0

# MongoDB
pymongo>=4.5.0

# MCP Protocol
mcp>=0.1.0

# NEST Framework (will be added as git submodule)
# See docs/deployment-guide.md for setup instructions

# Utilities
pyyaml>=6.0
python-json-logger>=2.0.7

# Testing
pytest>=7.4.0
pytest-asyncio>=0.21.0

# Monitoring
psutil>=5.9.0
"@
$requirementsContent | Out-File -FilePath "requirements.txt" -Encoding UTF8

Write-Host "Creating LICENSE..." -ForegroundColor Yellow

# Create LICENSE
$licenseContent = @"
[To be determined - discuss with team]

This is a capstone project for Northeastern University.
Copyright (c) 2025 Group 6
"@
$licenseContent | Out-File -FilePath "LICENSE" -Encoding UTF8

Write-Host ""
Write-Host "Directory structure created successfully!" -ForegroundColor Green
Write-Host ".gitignore created successfully!" -ForegroundColor Green
Write-Host "requirements.txt created successfully!" -ForegroundColor Green
Write-Host "LICENSE placeholder created successfully!" -ForegroundColor Green
Write-Host "Agent README placeholders created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Setup complete! You can now add the main README.md file." -ForegroundColor Cyan