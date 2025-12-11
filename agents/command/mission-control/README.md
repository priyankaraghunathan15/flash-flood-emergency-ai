# Command Center Agent (Mission Control)

**Tier:** Command  
**Role:** Central coordination and decision authority  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Command Center is the apex agent in the NANDA flash flood emergency response system. It serves as the central intelligence hub, receiving inputs from all tiers, making final strategic decisions, coordinating overall response efforts, and providing unified situational awareness to human operators and emergency management officials.

## Purpose

Central command and control is critical for:
- Unified situational awareness across all system components
- Strategic decision-making and response authorization
- Cross-tier coordination and conflict resolution
- Human operator interface and oversight
- Emergency alert dissemination to authorities and public
- Performance monitoring and system optimization
- Audit trail and compliance documentation
- Escalation management for complex scenarios

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Multi-agent orchestration and coordination
- Real-time dashboard and visualization
- A2A (Agent-to-Agent) protocol hub
- Decision engine with override capabilities
- Comprehensive telemetry and logging

### Agent Positioning
```
NANDA System Hierarchy:
├── Detection Tier
│   ├── Alert Generator
│   ├── Weather Monitor
│   └── Social Media Analyzer
├── Analysis Tier
│   ├── Pattern Analyzer
│   ├── Resource Mapper
│   └── Situation Assessor
├── Response Tier
│   ├── Resource Coordinator
│   ├── Route Planner
│   └── Evacuation Manager
└── Command Tier (Current)
    └── Command Center ← YOU ARE HERE (MISSION CONTROL)
```

### Communication Flow
- **Receives from:** ALL agents (9 subordinate agents)
  - **Detection Tier:** Alert Generator, Weather Monitor, Social Media Analyzer
  - **Analysis Tier:** Pattern Analyzer, Resource Mapper, Situation Assessor
  - **Response Tier:** Resource Coordinator, Route Planner, Evacuation Manager
  
- **Sends to:** ALL agents + External Systems
  - Coordination directives to all tiers
  - Strategic guidance and overrides
  - External alerts to emergency management systems
  - Public notifications and warnings
  - Human operator dashboard updates

- **Protocol:** A2A messaging hub via NEST framework

## Core Capabilities

### 1. Unified Situational Awareness
- Real-time aggregation of all agent reports
- Multi-dimensional situation visualization
- Timeline tracking and event correlation
- System-wide status monitoring
- Performance metrics dashboard
- Alert prioritization and triage

### 2. Strategic Decision Engine
- Automated response authorization
- Multi-criteria decision analysis
- Risk-benefit assessment
- Resource allocation approval
- Evacuation order authorization
- Escalation protocol execution

### 3. Cross-Tier Coordination
- Agent task assignment and prioritization
- Conflict resolution between agents
- Load balancing across system
- Deadlock detection and resolution
- Priority override mechanisms
- System-wide synchronization

### 4. Human Operator Interface
- Interactive command dashboard
- Real-time situation map
- Agent status monitoring
- Manual override controls
- Alert management interface
- Decision support visualizations

### 5. External System Integration
- Emergency Management System (EMS) integration
- 911 dispatch center connectivity
- Public alert systems (SMS, emergency broadcast)
- Government notification channels
- Media coordination interfaces
- Inter-agency communication

### 6. Audit & Compliance
- Complete decision audit trail
- Response timeline documentation
- Performance metrics logging
- Compliance reporting
- Post-incident analysis data
- System health monitoring

## Performance Metrics

- **Target Response Time:** < 5 seconds for command decisions
- **System Orchestration:** Enables sub-40-second end-to-end response
- **Dashboard Update Latency:** < 1 second real-time updates
- **Decision Confidence:** 94-97% human operator agreement
- **System Uptime:** 99.95% availability target
- **Concurrent Operations:** 50+ simultaneous incidents

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "frontend": "React 18 + TypeScript",
  "visualization": "D3.js, Mapbox GL",
  "messaging": "A2A Protocol Hub",
  "database": "PostgreSQL + Redis",
  "monitoring": "NEST Telemetry + Prometheus"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 8 vCPU, 32GB RAM (high availability)
- **Storage:** Redundant SSD with backup
- **Network:** Multi-zone deployment with failover
- **Load Balancer:** High-availability configuration
- **Backup:** Real-time replication to secondary site

## Installation & Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# NEST framework
npm install @dataworksai/nest

# PostgreSQL 14+
psql --version

# Redis 7+
redis-cli --version
```

### Environment Variables
```bash
# Agent Configuration
AGENT_NAME=command-center
AGENT_TIER=command
AGENT_ID=command-center-001

# A2A Protocol Hub
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_HUB_PORT=8080
A2A_WEBSOCKET_PORT=8081

# Database
COMMAND_DB_URI=postgresql://user:pass@db.example.com:5432/command
EVENT_STORE_URI=postgresql://user:pass@db.example.com:5432/events
AUDIT_DB_URI=postgresql://user:pass@db.example.com:5432/audit

# Cache & Session
REDIS_URI=redis://cache.example.com:6379
SESSION_SECRET=your-secure-session-secret

# External Systems
EMS_API_ENDPOINT=https://ems.gov/api
EMS_API_KEY=your-ems-api-key
DISPATCH_911_ENDPOINT=https://dispatch.example.com/api
PUBLIC_ALERT_ENDPOINT=https://alerts.example.com/api
PUBLIC_ALERT_API_KEY=your-alert-api-key

# Dashboard
DASHBOARD_PORT=3000
DASHBOARD_URL=https://command.nanda.example.com
WS_HEARTBEAT_INTERVAL=30000

# Security
JWT_SECRET=your-jwt-secret
OPERATOR_AUTH_REQUIRED=true
API_RATE_LIMIT=1000  # requests per minute

# Decision Engine
AUTO_APPROVE_THRESHOLD=0.85
HUMAN_APPROVAL_REQUIRED_SEVERITY=critical
DECISION_TIMEOUT=10000  # ms

# Performance
MAX_CONCURRENT_INCIDENTS=50
EVENT_BUFFER_SIZE=10000
TELEMETRY_SAMPLING_RATE=1.0
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/command/command-center

# Install dependencies
npm install
cd dashboard && npm install && cd ..

# Setup databases
npm run db:setup
npm run db:seed

# Configure environment
cp .env.example .env
vim .env

# Start backend
npm run dev

# Start dashboard (separate terminal)
cd dashboard && npm run dev

# Run tests
npm test

# Run with full monitoring
npm run start:monitor
```

### Deployment
```bash
# Build for production
npm run build
cd dashboard && npm run build && cd ..

# Deploy to Linode
npm run deploy:linode

# Deploy dashboard
npm run deploy:dashboard

# Verify agent registration
npm run verify:registry

# Initialize command center
npm run command:init

# Start high-availability mode
npm run start:ha
```

## Usage

### Command Center Initialization
```javascript
import { CommandCenter } from './agent';

const commandCenter = new CommandCenter({
  database: process.env.COMMAND_DB_URI,
  cache: process.env.REDIS_URI,
  externalSystems: {
    ems: process.env.EMS_API_ENDPOINT,
    dispatch: process.env.DISPATCH_911_ENDPOINT,
    publicAlert: process.env.PUBLIC_ALERT_ENDPOINT
  }
});

// Initialize A2A hub
await commandCenter.initializeHub();

// Start dashboard server
await commandCenter.startDashboard();

// Begin monitoring all agents
await commandCenter.monitorAllAgents();
```

### Incident Processing
```javascript
// Command Center receives situation assessment
commandCenter.on('message:situation-assessor', async (message) => {
  const situation = message.data;
  
  // Make strategic decision
  const decision = await commandCenter.makeDecision(situation);
  
  // Coordinate response across tiers
  await commandCenter.coordinateResponse(decision);
  
  // Update dashboard
  await commandCenter.updateDashboard(situation, decision);
  
  // Send external alerts if needed
  if (decision.severity >= 7) {
    await commandCenter.sendExternalAlerts(decision);
  }
});
```

### Decision Format
```json
{
  "decisionId": "cmd-20251211-143000",
  "timestamp": "2025-12-11T14:30:05Z",
  "incident": {
    "id": "incident-20251211-001",
    "location": { "lat": 42.3601, "lon": -71.0589 },
    "severity": 8.2,
    "status": "active"
  },
  "decision": {
    "approved": true,
    "confidence": 0.93,
    "approvalType": "automatic",
    "strategy": "immediate-evacuation",
    "priorities": [
      {
        "action": "evacuate-zone-a",
        "priority": 1,
        "authorized": true,
        "resources": ["rescue-team-001", "rescue-team-003"]
      },
      {
        "action": "deploy-medical-teams",
        "priority": 2,
        "authorized": true,
        "resources": ["medical-unit-005"]
      },
      {
        "action": "activate-shelters",
        "priority": 3,
        "authorized": true,
        "resources": ["shelter-042", "shelter-018"]
      }
    ],
    "resourceAuthorization": {
      "rescueTeams": 3,
      "medicalUnits": 2,
      "shelters": 2,
      "estimatedCost": "$45,000"
    },
    "externalNotifications": {
      "ems": true,
      "dispatch911": true,
      "publicAlert": true,
      "media": false
    },
    "timeline": {
      "decisionTime": "4.2 seconds",
      "expectedCompletion": "35 minutes",
      "milestones": [
        { "time": "+5 min", "action": "Teams deployed" },
        { "time": "+15 min", "action": "Evacuation 50% complete" },
        { "time": "+35 min", "action": "All clear achieved" }
      ]
    }
  },
  "coordination": {
    "analysisUsed": ["situation-assessor", "pattern-analyzer"],
    "resourcesAllocated": ["resource-coordinator"],
    "routesOptimized": ["route-planner"],
    "evacuationManaged": ["evacuation-manager"]
  },
  "humanOverride": {
    "available": true,
    "required": false,
    "operator": null
  },
  "auditTrail": {
    "decisionBasis": "Severity 8.2 + historical precedent",
    "alternativesConsidered": ["staged-evacuation", "shelter-in-place"],
    "riskAssessment": "High risk justifies immediate action",
    "complianceChecks": ["resource-availability", "legal-authority"]
  }
}
```

### Dashboard WebSocket API
```javascript
// Connect to real-time dashboard
const ws = new WebSocket('wss://command.nanda.example.com/ws');

ws.on('message', (data) => {
  const update = JSON.parse(data);
  
  switch(update.type) {
    case 'incident-update':
      // Update incident display
      break;
    case 'agent-status':
      // Update agent health indicators
      break;
    case 'decision-made':
      // Show new decision in timeline
      break;
    case 'alert-sent':
      // Update external alert status
      break;
  }
});

// Send manual override
ws.send(JSON.stringify({
  type: 'manual-override',
  decisionId: 'cmd-20251211-143000',
  action: 'approve',
  operator: 'operator-001'
}));
```

### External Alert Integration
```javascript
// Send alert to Emergency Management System
await commandCenter.sendEMSAlert({
  severity: 'high',
  location: { lat: 42.3601, lon: -71.0589 },
  affectedPopulation: 3500,
  recommendedAction: 'Immediate evacuation',
  resources: ['rescue-team-001', 'medical-unit-005']
});

// Send public alert
await commandCenter.sendPublicAlert({
  type: 'emergency',
  title: 'Flash Flood Warning',
  message: 'Immediate evacuation required for Zone A',
  affectedAreas: ['Zone A', 'Zone B'],
  channels: ['sms', 'emergency-broadcast', 'mobile-app']
});

// Notify 911 dispatch
await commandCenter.notifyDispatch({
  incidentType: 'flash-flood',
  location: 'Downtown Boston',
  priority: 'critical',
  units: ['rescue-team-001', 'rescue-team-003']
});
```

## Dashboard Features

### Real-Time Map View
- Live incident locations
- Agent deployment status
- Resource positions
- Evacuation zones
- Road closures
- Shelter locations

### Incident Timeline
- Chronological event feed
- Decision history
- Alert notifications
- Agent communications
- External system integrations

### Agent Status Panel
- Health indicators for all 9 agents
- Performance metrics
- Response times
- Error logs
- Communication status

### Decision Control Panel
- Pending decisions requiring approval
- Manual override controls
- Resource authorization
- Alert management
- Escalation controls

### Analytics Dashboard
- System performance metrics
- Response time analytics
- Resource utilization
- Historical trends
- Predictive insights

## Testing

### Unit Tests
```bash
npm run test:unit

# Test decision engine
npm run test:decisions

# Test coordination logic
npm run test:coordination

# Test coverage
npm run test:coverage
```

### Integration Tests
```bash
# Test A2A hub
npm run test:hub

# Test with all agents
npm run test:system

# Test external integrations
npm run test:external
```

### End-to-End Tests
```bash
# Full system test
npm run test:e2e

# Simulate complete incident
npm run test:scenario

# Load testing
npm run test:load
```

### Dashboard Tests
```bash
cd dashboard

# Component tests
npm run test

# E2E dashboard tests
npm run test:e2e
```

## Monitoring & Telemetry

### Health Check
```bash
curl https://command.nanda.example.com/health
```

### Metrics Endpoint
```bash
curl https://command.nanda.example.com/metrics
```

### Key Metrics
- `incidents_total` - Total incidents processed
- `decisions_made` - Total decisions issued
- `decision_duration_seconds` - Decision latency
- `agent_health_score` - Per-agent health (0-1)
- `external_alerts_sent` - Alerts to external systems
- `human_overrides_total` - Manual interventions
- `system_uptime_seconds` - Uptime tracking
- `coordination_latency` - Cross-tier coordination time

### Alerting
- Agent failure detection
- Decision timeout alerts
- External system connectivity issues
- Resource exhaustion warnings
- Performance degradation alerts

## Troubleshooting

### Common Issues

**Agent Communication Failure**
```bash
# Check A2A hub status
npm run hub:status

# Verify agent registry
npm run agents:list

# Restart A2A hub
npm run hub:restart

# Check agent connectivity
npm run agents:ping-all
```

**Dashboard Not Updating**
```bash
# Check WebSocket connection
npm run ws:check

# Verify Redis connection
redis-cli ping

# Restart dashboard
npm run dashboard:restart

# Check event stream
npm run events:monitor
```

**Decision Engine Timeout**
```bash
# Check decision queue
npm run decisions:queue

# Review timeout logs
npm run logs:decisions

# Increase timeout threshold
# Edit DECISION_TIMEOUT in .env
```

**External Alert Failure**
```bash
# Test external connectivity
npm run external:test-all

# Check API credentials
npm run external:verify-auth

# Review alert queue
npm run alerts:queue

# Retry failed alerts
npm run alerts:retry
```

## High Availability Configuration

### Failover Setup
```bash
# Primary Command Center
PRIMARY_NODE=true
FAILOVER_NODES=command-center-002,command-center-003

# Heartbeat configuration
HEARTBEAT_INTERVAL=10000
FAILOVER_TIMEOUT=30000
```

### Load Balancing
```bash
# Nginx configuration for dashboard
upstream command_dashboard {
  server command-center-001:3000;
  server command-center-002:3000;
  server command-center-003:3000;
}
```

### Data Replication
```bash
# PostgreSQL streaming replication
# Redis cluster mode
# Real-time backup to secondary site
```

## Security

### Authentication
- JWT-based operator authentication
- Role-based access control (RBAC)
- Multi-factor authentication support
- Session management with Redis

### Authorization
- Operator permissions hierarchy
- Action-level authorization
- Audit logging for all actions
- IP whitelist for external systems

### Data Protection
- Encryption at rest (database)
- TLS/SSL for all communications
- API key rotation
- Secure credential storage

## Decision Engine Logic

### Automated Approval Criteria
```javascript
const shouldAutoApprove = (situation) => {
  return (
    situation.confidence >= 0.85 &&
    situation.severity < 9 &&
    situation.resourcesAvailable &&
    !situation.conflictingReports &&
    situation.timeToDecide < 60  // seconds
  );
};
```

### Human Override Triggers
- Severity ≥ 9 (critical incidents)
- Confidence < 0.75 (uncertain situations)
- Resource conflicts detected
- Multi-jurisdictional coordination required
- Novel scenario (no historical precedent)

### Escalation Protocol
1. **Level 1:** Automated response (severity < 7)
2. **Level 2:** Operator notification (severity 7-8)
3. **Level 3:** Approval required (severity 9)
4. **Level 4:** Executive override (severity 10)

## API Documentation

### REST API Endpoints

```bash
# Get current incidents
GET /api/incidents

# Get incident details
GET /api/incidents/:id

# Get agent status
GET /api/agents/:agentId/status

# Manual decision override
POST /api/decisions/:id/override

# Send external alert
POST /api/alerts/external

# Get system metrics
GET /api/metrics

# Get audit trail
GET /api/audit/:incidentId
```

### WebSocket Events

```javascript
// Client → Server
{
  type: 'manual-override' | 'approve-decision' | 'modify-response',
  payload: { ... }
}

// Server → Client
{
  type: 'incident-update' | 'decision-made' | 'agent-status' | 'alert-sent',
  payload: { ... }
}
```

## Performance Optimization

### Caching Strategy
- Decision templates cached
- Agent status cached for 10 seconds
- Map tiles cached indefinitely
- Resource queries cached for 5 minutes

### Database Optimization
- Indexed on timestamp, severity, location
- Partitioned by date for audit logs
- Connection pooling for high concurrency
- Read replicas for analytics queries

### WebSocket Optimization
- Binary protocol for high-frequency updates
- Client-side throttling for map updates
- Selective subscriptions for operators
- Automatic reconnection with backoff

## Project Context

### NANDA System
NANDA (Network of Autonomous Distributed Agents) is a distributed AI system for flash flood emergency response that achieves sub-40-second response times through coordination of 10 specialized agents.

**Performance:** 67-135x faster than traditional emergency response methods

**Command Center Role:** Orchestrates all 9 subordinate agents, provides unified situational awareness, makes strategic decisions, and serves as the human-AI interface.

### Team
**Group 6 - Northeastern University**

### Sponsors
- **Professor:** Hema Seshadri
- **Industry Sponsor:** Javi Vindas (DataWorksAI)

### Presentations
- MCP Night at MIT
- Boston Chapter meetup at Akamai Technologies

## Contributing

This agent is part of an academic capstone project. For contributions or questions:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
4. Contact team for review

## Related Documentation

- [NANDA System Architecture](../../docs/architecture.md)
- [A2A Protocol Specification](../../docs/a2a-protocol.md)
- [NEST Framework Documentation](https://github.com/DataWorksAI/NEST)
- [Deployment Guide](../../docs/deployment.md)
- [Dashboard User Guide](./docs/dashboard-guide.md)
- [Operator Manual](./docs/operator-manual.md)
- [Decision Engine Guide](./docs/decision-engine.md)

## Related Agents

**All Subordinate Agents:**

**Detection Tier:**
- Alert Generator
- Weather Monitor
- Social Media Analyzer

**Analysis Tier:**
- Pattern Analyzer
- Resource Mapper
- Situation Assessor

**Response Tier:**
- Resource Coordinator
- Route Planner
- Evacuation Manager


## Quick Start for Operators

### Emergency Response Checklist
1. ✅ Monitor dashboard for incoming alerts
2. ✅ Review automated decisions for approval
3. ✅ Override decisions when needed
4. ✅ Coordinate with external agencies
5. ✅ Monitor agent health status
6. ✅ Document all manual actions




