#!/bin/bash

# Script to set up the complete repository structure
# Run this in your cloned repository directory

echo "Creating Flash Flood Emergency AI System repository structure..."

# Create main directories
mkdir -p docs/{presentation,diagrams}
mkdir -p agents/{detection,analysis,response,command}
mkdir -p mcp-servers/{evacuation-server,weather-server,resource-server}
mkdir -p infrastructure/{deployment,monitoring,database/schemas}
mkdir -p config
mkdir -p tests/{agent-tests,integration-tests,a2a-protocol-tests}
mkdir -p examples/{sample-crisis-scenarios,demo-scripts,agent-conversations}

# Create detection agents directories
mkdir -p agents/detection/social-media-sentinel
mkdir -p agents/detection/environmental-monitor
mkdir -p agents/detection/news-alert-scanner

# Create analysis agents directories
mkdir -p agents/analysis/situation-assessor
mkdir -p agents/analysis/resource-mapper
mkdir -p agents/analysis/pattern-analyzer

# Create response agents directories
mkdir -p agents/response/emergency-dispatcher
mkdir -p agents/response/public-communicator
mkdir -p agents/response/medical-triage

# Create command agent directory
mkdir -p agents/command/mission-control

# Create placeholder README files in each agent directory
for agent_dir in agents/detection/* agents/analysis/* agents/response/* agents/command/*; do
    if [ -d "$agent_dir" ]; then
        agent_name=$(basename "$agent_dir")
        echo "# ${agent_name^}" > "$agent_dir/README.md"
        echo "" >> "$agent_dir/README.md"
        echo "## Purpose" >> "$agent_dir/README.md"
        echo "[To be documented]" >> "$agent_dir/README.md"
        echo "" >> "$agent_dir/README.md"
        echo "## Configuration" >> "$agent_dir/README.md"
        echo "[To be documented]" >> "$agent_dir/README.md"
    fi
done

# Create MCP server placeholder READMEs
for mcp_dir in mcp-servers/*; do
    if [ -d "$mcp_dir" ]; then
        server_name=$(basename "$mcp_dir")
        echo "# ${server_name^}" > "$mcp_dir/README.md"
        echo "" >> "$mcp_dir/README.md"
        echo "## Tools Provided" >> "$mcp_dir/README.md"
        echo "[To be documented]" >> "$mcp_dir/README.md"
    fi
done

# Create .gitignore
cat > .gitignore << 'EOF'
# Environment variables
.env
*.env
!environment-template.env

# Python
__pycache__/
*.py[cod]
*$py.class
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
EOF

# Create requirements.txt placeholder
cat > requirements.txt << 'EOF'
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
EOF

# Create LICENSE placeholder
cat > LICENSE << 'EOF'
[To be determined - discuss with team]

This is a capstone project for Northeastern University.
Copyright (c) 2025 Group 6
EOF

echo ""
echo "✓ Directory structure created!"
echo "✓ .gitignore created"
echo "✓ requirements.txt created"
echo "✓ LICENSE placeholder created"
echo "✓ Agent README placeholders created"
echo ""
echo "Next steps:"
echo "1. Copy the README.md content from the previous artifact"
echo "2. Create documentation files in docs/"
echo "3. Add configuration templates in config/"
echo "4. Commit and push to GitHub"