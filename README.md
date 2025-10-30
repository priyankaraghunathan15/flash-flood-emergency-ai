# Flash Flood Emergency AI System

A distributed multi-agent AI system that coordinates emergency response to flash flood crises in **under 40 seconds** - achieving a **67-135x improvement** over traditional emergency response times (45+ minutes).

## The Problem

Traditional emergency response systems face critical delays:
- **Manual monitoring** of multiple information sources (social media, weather stations, news)
- **Sequential coordination** between different emergency departments
- **Human bottlenecks** in information processing and decision-making
- **Result:** 45+ minutes from crisis detection to coordinated response

In flash flood scenarios, every second counts. Lives are lost in these critical minutes.

## Our Solution

A network of 10 autonomous AI agents working in parallel across a 4-tier architecture, using the NANDA (Network of Autonomous Distributed Agents) protocol for coordination:

```
Detection Layer (Tier 1)     →  Monitors multiple sources simultaneously
    ↓
Analysis Layer (Tier 2)      →  Assesses situation in parallel
    ↓
Response Layer (Tier 3)      →  Coordinates emergency actions
    ↓
Command Layer (Tier 4)       →  Orchestrates entire response
```

**Result:** Crisis detected, analyzed, and response coordinated in **under 40 seconds**.

## System Architecture

### 4-Tier Agent Design

**Tier 1: Detection Agents**
- **Social Media Sentinel** - Monitors Twitter, Facebook, local community posts for flood reports
- **Environmental Monitor** - Tracks weather stations, river gauges, precipitation data
- **News Alert Scanner** - Scans local news, emergency broadcasts, official alerts

**Tier 2: Analysis Agents**
- **Situation Assessor** - Evaluates crisis severity, affected areas, risk levels
- **Resource Mapper** - Identifies available emergency resources, shelters, evacuation routes
- **Pattern Analyzer** - Detects patterns, predicts flood progression, identifies high-risk zones

**Tier 3: Response Agents**
- **Emergency Dispatcher** - Coordinates first responder deployment
- **Public Communicator** - Issues evacuation orders, safety instructions, updates
- **Medical Triage** - Prioritizes medical response, identifies vulnerable populations

**Tier 4: Command Control**
- **Mission Control Orchestrator** - Coordinates all agents, maintains situational awareness, ensures coherent response

### How Agents Communicate

Agents use the **A2A (Agent-to-Agent) Protocol** to coordinate:
- Agents discover each other via the NANDA Registry
- Direct communication using @mentions (e.g., `@situation-assessor analyze this flood report`)
- Asynchronous message passing for parallel processing
- Structured responses with confidence scores and urgency levels

## Technology Stack

- **Framework:** NEST (modified fork from DataWorksAI-com/NEST)
- **LLM:** Anthropic Claude Sonnet 4.5
- **Agent Protocol:** NANDA Registry + A2A Protocol
- **MCP Servers:** 
  - Evacuation Server (route generation, risk zone monitoring)
  - Weather Server (flood risk assessment, precipitation data)
  - Resource Server (emergency facilities, shelter tracking)
- **Database:** MongoDB (agent memory, event tracking, resource state)
- **Deployment:** Linode Cloud Infrastructure
- **Registry:** capregistry.duckdns.org:6900

## Quick Start

### Prerequisites

- Python 3.9+
- Anthropic API key
- Linode account (or other cloud provider)
- MongoDB instance
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp config/environment-template.env .env
# Edit .env with your API keys and settings
```

### Configuration

1. **Set up your API keys** in `.env`:
   ```
   ANTHROPIC_API_KEY=your_key_here
   MONGODB_URI=your_mongodb_connection_string
   NANDA_REGISTRY_URL=capregistry.duckdns.org:6900
   ```

2. **Configure agents** in `config/agents-config.json`:
   - Review the 10 agent specifications
   - Adjust system prompts if needed
   - Set deployment ports (default: 6000-6009)

### Deployment

```bash
# Deploy all 10 agents
./infrastructure/deployment/deploy-all-agents.sh

# Verify agents are registered
./infrastructure/monitoring/health-check.sh

# View agent status
python infrastructure/monitoring/agent-status-dashboard.py
```

### Testing

```bash
# Run a sample crisis scenario
python examples/sample-crisis-scenarios/flash-flood-demo.py

# View agent-to-agent communication
python examples/demo-scripts/show-a2a-protocol.py
```

## Documentation

- **[Architecture Deep Dive](docs/architecture.md)** - Detailed system design and decision rationale
- **[Deployment Guide](docs/deployment-guide.md)** - Step-by-step deployment instructions
- **[Agent Specifications](docs/agent-specifications.md)** - Individual agent roles and capabilities
- **[Problem Statement](docs/problem-statement.md)** - Why we built this system
- **[Framework Migration](docs/framework-migration.md)** - Our journey from streamlined-adapter to NEST

## Examples & Demos

- **[Flash Flood Scenario Walkthrough](examples/flash-flood-scenario.md)** - Complete crisis response simulation
- **[Agent Conversations](examples/agent-conversations.md)** - Real A2A protocol message exchanges
- **[Emergency Timeline](examples/emergency-timeline.md)** - Second-by-second breakdown of response

## Project Structure

```
flash-flood-emergency-ai/
├── agents/              # 10 agent implementations organized by tier
├── mcp-servers/         # Evacuation, Weather, and Resource MCP servers
├── infrastructure/      # Deployment scripts, monitoring, database setup
├── config/              # Agent configurations and environment templates
├── docs/                # Comprehensive documentation
├── examples/            # Demo scenarios and sample outputs
└── tests/               # Agent tests and integration tests
```

## Results & Impact

### Performance Metrics
- **Response Time:** Under 40 seconds (vs 45+ minutes traditional)
- **Parallel Processing:** 10 agents working simultaneously
- **Agent Coordination:** Real-time A2A protocol communication
- **Crisis Detection:** Multi-source monitoring (social media + weather + news)

### Real-World Capabilities
- Evacuation route generation based on real-time flood data
- Risk zone identification and priority mapping
- Resource allocation optimization
- Public communication coordination
- Medical triage for vulnerable populations

## Team & Acknowledgments

**Group 6 - Northeastern University Capstone Project**

**Project Sponsor:** Javi Vindas, DataWorksAI

**Course Instructor:** Professor Hema Seshadri

**Built with:** NANDA (Network of Autonomous Distributed Agents) framework

## License

[To be determined - discuss with team]

This is a capstone project for Northeastern University.

## Contributing

This is a capstone project for Northeastern University. For collaboration within Group 6, please see our internal contribution guidelines.

---

**Status:** Active Development | December 2025 Graduation Milestone

**Registry:** All agents deployed and registered at capregistry.duckdns.org:6900
