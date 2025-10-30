# Deployment Guide

This guide provides step-by-step instructions for deploying the Flash Flood Emergency AI System on a cloud server (Linode or similar infrastructure).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Install Dependencies](#install-dependencies)
4. [Configure Environment](#configure-environment)
5. [Setup MongoDB](#setup-mongodb)
6. [Deploy NEST Framework](#deploy-nest-framework)
7. [Deploy MCP Servers](#deploy-mcp-servers)
8. [Deploy Agents](#deploy-agents)
9. [Register Agents with NANDA](#register-agents-with-nanda)
10. [Verify Deployment](#verify-deployment)
11. [Monitoring & Maintenance](#monitoring--maintenance)
12. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts & Credentials

- **Linode Account** (or other cloud provider)
- **Anthropic API Key** - Get from https://console.anthropic.com/
- **MongoDB Instance** - MongoDB Atlas (free tier) or self-hosted
- **GitHub Account** - For cloning the repository

### Recommended Server Specs

- **Instance Type:** g6-standard-4 (or equivalent)
- **RAM:** 8GB minimum
- **CPU:** 4 cores minimum
- **Storage:** 50GB SSD
- **OS:** Ubuntu 22.04 LTS

### Local Requirements

- Git installed
- SSH client
- Text editor (for configuration files)

---

## Server Setup

### Step 1: Create Linode Instance

1. Log into Linode dashboard
2. Click "Create Linode"
3. Select:
   - **Distribution:** Ubuntu 22.04 LTS
   - **Region:** Choose closest to your location
   - **Plan:** Shared CPU → g6-standard-4 (8GB RAM, 4 CPUs)
4. Set root password (save it securely!)
5. Click "Create Linode"
6. Wait for server to boot (2-3 minutes)
7. Note your server IP address

### Step 2: Initial Server Access

```bash
# SSH into your server (replace with your IP)
ssh root@YOUR_SERVER_IP

# Update system packages
apt update && apt upgrade -y

# Install basic utilities
apt install -y curl wget git vim htop
```

### Step 3: Create Non-Root User (Recommended)

```bash
# Create a new user
adduser nanda

# Add user to sudo group
usermod -aG sudo nanda

# Switch to new user
su - nanda
```

---

## Install Dependencies

### Step 1: Install Python 3.11

```bash
# Install Python and pip
sudo apt install -y python3.11 python3.11-venv python3-pip

# Verify installation
python3.11 --version
pip3 --version
```

### Step 2: Install Node.js (for MCP servers)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install MongoDB (if self-hosting)

```bash
# Import MongoDB public key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

**Alternative:** Use MongoDB Atlas (recommended for production)
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

---

## Configure Environment

### Step 1: Clone Repository

```bash
# Navigate to home directory
cd ~

# Clone the repository
git clone https://github.com/YOUR_USERNAME/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai
```

### Step 2: Create Python Virtual Environment

```bash
# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables

```bash
# Copy template to .env
cp config/environment-template.env .env

# Edit .env file with your actual values
nano .env
```

**Fill in these critical values:**

```bash
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# MongoDB (if using Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# Or MongoDB local
MONGODB_URI=mongodb://localhost:27017/

# Agent Base URL (use your server IP)
AGENT_BASE_URL=http://YOUR_SERVER_IP

# NANDA Registry
NANDA_REGISTRY_URL=capregistry.duckdns.org:6900
```

Save and exit (Ctrl+X, Y, Enter)

---

## Setup MongoDB

### Initialize Database and Collections

```bash
# Run MongoDB setup script
python infrastructure/database/mongodb-setup.py
```

This script will:
- Create the database
- Create required collections (agent_facts, events, nanda_index)
- Set up indexes for performance
- Verify connection

---

## Deploy NEST Framework

### Step 1: Clone NEST Framework

```bash
# Navigate to parent directory
cd ~

# Clone the modified NEST framework
git clone https://github.com/kishanpreetam/NEST.git
cd NEST

# Install NEST dependencies
pip install -e .
```

### Step 2: Verify NEST Installation

```bash
# Test NEST installation
python -c "from nanda_core import Agent; print('NEST installed successfully')"
```

---

## Deploy MCP Servers

### Step 1: Navigate to MCP Servers Directory

```bash
cd ~/flash-flood-emergency-ai/mcp-servers
```

### Step 2: Deploy Evacuation MCP Server

```bash
cd evacuation-server

# Install dependencies
npm install

# Start the server (in background)
nohup node server.js > evacuation-mcp.log 2>&1 &

# Verify it's running
curl http://localhost:7000/health
```

### Step 3: Deploy Weather MCP Server

```bash
cd ../weather-server

# Install dependencies
npm install

# Start the server
nohup node server.js > weather-mcp.log 2>&1 &

# Verify
curl http://localhost:7001/health
```

### Step 4: Deploy Resource MCP Server

```bash
cd ../resource-server

# Install dependencies
npm install

# Start the server
nohup node server.js > resource-mcp.log 2>&1 &

# Verify
curl http://localhost:7002/health
```

---

## Deploy Agents

### Option 1: Deploy All Agents at Once

```bash
cd ~/flash-flood-emergency-ai

# Make deployment script executable
chmod +x infrastructure/deployment/deploy-all-agents.sh

# Deploy all 10 agents
./infrastructure/deployment/deploy-all-agents.sh
```

This script will:
- Deploy all 10 agents on ports 6000-6009
- Register each agent with NANDA registry
- Create systemd services for auto-restart
- Generate deployment logs

### Option 2: Deploy Agents Individually

```bash
# Deploy a single agent
./infrastructure/deployment/deploy-single-agent.sh <agent-name> <port>

# Examples:
./infrastructure/deployment/deploy-single-agent.sh social-media-sentinel 6000
./infrastructure/deployment/deploy-single-agent.sh environmental-monitor 6001
```

### Step 3: Enable Auto-Start on Boot

```bash
# Enable all agent services
sudo systemctl enable nanda-social-media-sentinel
sudo systemctl enable nanda-environmental-monitor
sudo systemctl enable nanda-news-alert-scanner
sudo systemctl enable nanda-situation-assessor
sudo systemctl enable nanda-resource-mapper
sudo systemctl enable nanda-pattern-analyzer
sudo systemctl enable nanda-emergency-dispatcher
sudo systemctl enable nanda-public-communicator
sudo systemctl enable nanda-medical-triage
sudo systemctl enable nanda-mission-control
```

---

## Register Agents with NANDA

Agents automatically register with the NANDA registry on startup. To verify registration:

```bash
# Check agent registration
curl http://capregistry.duckdns.org:6900/agents

# Or use the verification script
python infrastructure/monitoring/verify-registration.py
```

Expected output:
```
✓ social-media-sentinel registered
✓ environmental-monitor registered
✓ news-alert-scanner registered
✓ situation-assessor registered
✓ resource-mapper registered
✓ pattern-analyzer registered
✓ emergency-dispatcher registered
✓ public-communicator registered
✓ medical-triage registered
✓ mission-control registered

All 10 agents successfully registered!
```

---

## Verify Deployment

### Step 1: Check Agent Health

```bash
# Run health check script
./infrastructure/monitoring/health-check.sh
```

Expected output:
```
Checking agent health...
✓ Port 6000: social-media-sentinel [HEALTHY]
✓ Port 6001: environmental-monitor [HEALTHY]
✓ Port 6002: news-alert-scanner [HEALTHY]
✓ Port 6003: situation-assessor [HEALTHY]
✓ Port 6004: resource-mapper [HEALTHY]
✓ Port 6005: pattern-analyzer [HEALTHY]
✓ Port 6006: emergency-dispatcher [HEALTHY]
✓ Port 6007: public-communicator [HEALTHY]
✓ Port 6008: medical-triage [HEALTHY]
✓ Port 6009: mission-control [HEALTHY]

All agents are healthy!
```

### Step 2: Test Agent Communication

```bash
# Run A2A protocol test
python tests/a2a-protocol-tests/test-agent-communication.py
```

### Step 3: Run Demo Scenario

```bash
# Execute flash flood demo
python examples/sample-crisis-scenarios/flash-flood-demo.py
```

This will simulate a flash flood crisis and show agent coordination in action.

---

## Monitoring & Maintenance

### View Agent Logs

```bash
# View logs for a specific agent
sudo journalctl -u nanda-social-media-sentinel -f

# View all agent logs
sudo journalctl -u nanda-* -f

# View logs for last hour
sudo journalctl -u nanda-social-media-sentinel --since "1 hour ago"
```

### Monitor System Resources

```bash
# Real-time system monitoring
htop

# Check disk usage
df -h

# Check memory usage
free -h

# Check agent processes
ps aux | grep python
```

### Agent Status Dashboard

```bash
# Launch web dashboard
python infrastructure/monitoring/agent-status-dashboard.py

# Access dashboard at: http://YOUR_SERVER_IP:8080
```

### Regular Maintenance Tasks

**Daily:**
- Check agent health status
- Review error logs
- Monitor system resources

**Weekly:**
- Update system packages: `sudo apt update && sudo apt upgrade`
- Review MongoDB database size
- Backup configuration files

**Monthly:**
- Review and rotate logs
- Update Python dependencies: `pip list --outdated`
- Test disaster recovery procedures

---

## Troubleshooting

### Agent Won't Start

**Check logs:**
```bash
sudo journalctl -u nanda-<agent-name> -n 50
```

**Common issues:**
- Missing environment variables → Check `.env` file
- Port already in use → `sudo lsof -i :<port>` to find conflicting process
- NEST framework not found → Reinstall: `cd ~/NEST && pip install -e .`

### Agent Not Registered with NANDA

**Verify network connectivity:**
```bash
curl http://capregistry.duckdns.org:6900/health
```

**Re-register agent:**
```bash
# Restart the agent service
sudo systemctl restart nanda-<agent-name>

# Check registration
curl http://capregistry.duckdns.org:6900/agents
```

### MongoDB Connection Issues

**Check MongoDB status:**
```bash
sudo systemctl status mongod
```

**Test connection:**
```bash
mongo --eval "db.runCommand({ connectionStatus: 1 })"
```

**Restart MongoDB:**
```bash
sudo systemctl restart mongod
```

### High Memory Usage

**Identify memory-hungry agents:**
```bash
ps aux --sort=-%mem | head -n 15
```

**Restart specific agent:**
```bash
sudo systemctl restart nanda-<agent-name>
```

**Restart all agents:**
```bash
./infrastructure/deployment/restart-all-agents.sh
```

### MCP Server Not Responding

**Check MCP server logs:**
```bash
cd ~/flash-flood-emergency-ai/mcp-servers/<server-name>
tail -f *.log
```

**Restart MCP server:**
```bash
# Find process ID
ps aux | grep "node server.js"

# Kill process
kill <PID>

# Restart
nohup node server.js > server.log 2>&1 &
```

### Agent Communication Failures

**Test A2A protocol:**
```bash
python tests/a2a-protocol-tests/test-single-interaction.py
```

**Check NANDA registry:**
```bash
curl http://capregistry.duckdns.org:6900/agents
```

**Verify network rules:**
```bash
# Check firewall status
sudo ufw status

# Ensure required ports are open
sudo ufw allow 6000:6009/tcp
sudo ufw allow 7000:7002/tcp
```

---

## Security Considerations

### Firewall Configuration

```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow agent ports (if external access needed)
sudo ufw allow 6000:6009/tcp

# Allow MCP server ports (if external access needed)
sudo ufw allow 7000:7002/tcp

# Check status
sudo ufw status
```

### SSL/TLS (Production Deployment)

For production, use HTTPS with SSL certificates:

1. Install Certbot: `sudo apt install certbot`
2. Obtain certificate: `sudo certbot certonly --standalone -d yourdomain.com`
3. Configure Nginx as reverse proxy with SSL
4. Update agent URLs to use HTTPS

### API Key Security

- Never commit `.env` file to GitHub
- Rotate API keys regularly
- Use environment-specific keys (dev, staging, production)
- Implement rate limiting for API endpoints

---

## Next Steps

After successful deployment:

1. **Run Test Scenarios** - Execute demo crisis scenarios to verify system behavior
2. **Setup Monitoring** - Configure alerts for agent failures
3. **Create Backups** - Setup automated backups for MongoDB and configuration files
4. **Documentation** - Document any custom configurations or modifications
5. **Team Training** - Train team members on system operation and monitoring

---

## Additional Resources

- **Architecture Documentation:** [docs/architecture.md](architecture.md)
- **Agent Specifications:** [docs/agent-specifications.md](agent-specifications.md)
- **NEST Framework:** https://github.com/DataWorksAI-com/NEST
- **NANDA Protocol:** Contact DataWorksAI for detailed protocol documentation
- **Support:** Contact Group 6 team or Professor Hema Seshadri

---

**Deployment Complete!** Your Flash Flood Emergency AI System is now operational.
