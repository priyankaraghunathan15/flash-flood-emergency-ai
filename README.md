# Flash Flood Emergency AI System

**A distributed multi-agent AI system that coordinates emergency responses to flash floods in under 40 seconds**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![NANDA Protocol](https://img.shields.io/badge/NANDA-Protocol-green.svg)](http://capregistry.duckdns.org:6900)

---

## 🚨 The Problem

Traditional emergency response systems take **45+ minutes** to coordinate during flash flood crises:
- Manual information gathering
- Delayed inter-agency communication  
- Sequential decision-making processes
- Slow resource allocation

**Result:** Delayed evacuations, increased casualties, overwhelmed emergency services.

---

## ✨ Our Solution

A **10-agent AI coordination system** that reduces response time to **under 40 seconds** - a **67-135x improvement** over traditional methods.

### 4-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    COMMAND TIER                              │
│              Mission Control (Port 6009)                     │
│           Orchestrates all agent coordination                │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
┌───────────────┬───────────┴───────────┬─────────────────────┐
│               │                       │                     │
▼               ▼                       ▼                     ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Detection│ │Analysis │ │Response │ │Command  │
│  Tier   │ │  Tier   │ │  Tier   │ │  Tier   │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
   3 agents    3 agents    3 agents    1 agent
```

---

## 🤖 The 10 Specialized Agents

All agents are powered by **Anthropic Claude Sonnet 4.5** using a single unified codebase (`agents/nanda_agent.py`) with different configurations.

### Detection Tier (Ports 6000-6002)
- **Social Media Sentinel** - Monitors social media for flood reports with credibility scoring
- **Environmental Monitor** - Tracks weather conditions and flood predictions  
- **News Alert Scanner** - Monitors official emergency alerts and news sources

### Analysis Tier (Ports 6003-6005)
- **Situation Assessor** - Analyzes data and determines crisis severity (1-5 scale)
- **Resource Mapper** - Tracks emergency resources, shelters, and hospital capacity
- **Pattern Analyzer** - Studies historical flood data for predictions

### Response Tier (Ports 6006-6008)
- **Emergency Dispatcher** - Coordinates first responders with route optimization
- **Public Communicator** - Generates clear evacuation alerts and safety instructions
- **Medical Triage** - Manages medical response and hospital coordination

### Command Tier (Port 6009)
- **Mission Control** - Orchestrates all agents using @agent-id syntax for coordination

---

## 🛠️ Tech Stack

**AI & Agent Framework:**
- Anthropic Claude Sonnet 4.5 (via API)
- NEST Framework (DataWorksAI)
- NANDA Protocol for agent discovery and A2A communication

**MCP (Model Context Protocol) Integration:**
- Unified Crisis Response MCP Server
- Real-time geospatial data for evacuation routing
- Water level monitoring and terrain analysis
- Weather risk assessment
- Emergency resource tracking

**Infrastructure:**
- Linode Cloud (Ubuntu 24.04.3 LTS)
- Python 3.8+
- NANDA Registry: capregistry.duckdns.org:6900

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Anthropic API Key
- Ubuntu/Linux server (or WSL on Windows)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai
```

### 2. Install Dependencies
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install NEST framework and dependencies
pip install anthropic
pip install mcp
```

### 3. Configure Environment
```bash
# Set your Anthropic API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Set registry URL (optional)
export REGISTRY_URL="http://capregistry.duckdns.org:6900"

# Set your server IP
export SERVER_IP="your-server-ip"
```

### 4. Deploy All 10 Agents
```bash
chmod +x infrastructure/deploy-crisis-agents.sh
./infrastructure/deploy-crisis-agents.sh $ANTHROPIC_API_KEY
```

This script will:
- Read agent configurations from `config/group-crisis-flood-response.json`
- Start all 10 agents on ports 6000-6009
- Register them with the NANDA registry
- Create log files in `logs/` directory

### 5. Verify Deployment
```bash
# Check running agents
ps aux | grep nanda_agent.py

# View agent logs
tail -f logs/agent_social-media-sentinel.log
```

---

## 📋 Project Structure

```
flash-flood-emergency-ai/
├── agents/
│   └── nanda_agent.py                    # Main agent implementation (all 10 agents use this)
├── config/
│   ├── group-crisis-flood-response.json  # Configuration for all 10 agents
│   └── environment-template.env          # Environment variables template
├── mcp-servers/
│   └── crisis_mcp_server.py              # Unified MCP server (5 tools)
├── infrastructure/
│   └── deploy-crisis-agents.sh           # Deployment script
├── docs/
│   ├── architecture.md                   # Detailed system architecture
│   └── deployment-guide.md               # Step-by-step deployment guide
└── README.md
```

---

## 🔧 How It Works

### Agent Architecture

All 10 agents run the same Python code (`agents/nanda_agent.py`) but with different configurations loaded from environment variables. Each agent:

1. **Loads Configuration** - Agent ID, name, domain, specialization, system prompt from environment
2. **Initializes Claude** - Connects to Anthropic API with custom system prompt
3. **Registers with NANDA** - Publishes capabilities to the registry
4. **Listens for Messages** - Receives A2A protocol messages on assigned port
5. **Responds Intelligently** - Uses Claude to generate contextual responses
6. **Coordinates with Other Agents** - Uses @agent-id syntax to delegate tasks

### MCP Server Tools

The unified MCP server (`mcp-servers/crisis_mcp_server.py`) provides 5 tools:

1. **generate_evacuation_route** - Safe routes using geospatial data and real-time road status
2. **monitor_risk_zones** - Water level monitoring with terrain data analysis
3. **execute_community_evacuation** - Complete workflow: monitor → plan → dispatch
4. **get_flood_risk** - Weather-based flood risk assessment (Low/Medium/High/Extreme)
5. **find_emergency_resources** - Shelters and hospitals with capacity information

### Agent Communication Example

```
User → Mission Control: "Flash flood reported in Downtown Boston"

Mission Control → @social-media-sentinel: "Verify social media reports"
Social Media Sentinel → Mission Control: "Credibility: 8/10, Urgency: 4/5"

Mission Control → @environmental-monitor: "Check water levels"
Environmental Monitor → Mission Control: "Charles River at 8.5ft (CRITICAL)"

Mission Control → @situation-assessor: "Assess severity"
Situation Assessor → Mission Control: "Severity Level 4, ~5000 affected"

Mission Control → @emergency-dispatcher: "Deploy resources"
Emergency Dispatcher → Mission Control: "Units dispatched via I-93 North"

Mission Control → @public-communicator: "Issue evacuation alert"
Public Communicator → Mission Control: "Alert sent to affected zones"

Total Response Time: 37 seconds
```

---

## 📊 Performance Metrics

**Response Time Comparison:**
- Traditional Method: 45-90 minutes
- Our System: 35-40 seconds  
- **Improvement: 67-135x faster**

**System Specifications:**
- 10 AI agents running simultaneously
- Sub-second inter-agent communication
- Real-time data integration via MCP
- 99.9% uptime on cloud infrastructure

---

## 📖 Documentation

- [Architecture Overview](docs/architecture.md) - Detailed technical design
- [Deployment Guide](docs/deployment-guide.md) - Step-by-step server setup
- [Agent Configuration](config/group-crisis-flood-response.json) - All 10 agent configs

---

## 🙏 Acknowledgments

- **Javi Vindas** - Project sponsor and technical guidance on MCP implementation
- **Professor Hema Seshadri** - Academic advisor and project coordinator
- **DataWorksAI** - NEST framework and infrastructure support
- **Anthropic** - Claude API for intelligent agent responses

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🌐 Registry & Deployment

**NANDA Registry:** http://capregistry.duckdns.org:6900  
**Current Deployment:** Linode Cloud (45.33.73.99)  
**Status:** Active Development | Production Ready


