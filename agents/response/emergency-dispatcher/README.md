# Emergency Dispatcher Agent

**Tier:** Response  
**Role:** External communication and emergency services coordination  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Emergency Dispatcher is a critical communication agent within the NANDA flash flood emergency response system's Response tier. It serves as the primary interface between the NANDA system and external emergency services, coordinating with 911 dispatch centers, emergency management agencies, and public alert systems.

## Purpose

External emergency coordination is essential for:
- Real-time communication with 911 dispatch centers
- Coordination with fire, police, and EMS services
- Public alert dissemination (SMS, emergency broadcast, mobile apps)
- First responder deployment coordination
- Emergency management system integration
- Media coordination and public information management

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Multi-channel communication protocols
- Real-time message routing and prioritization
- A2A (Agent-to-Agent) protocol communication
- External API integration layer

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
├── Response Tier (Current)
│   ├── Resource Coordinator
│   ├── Route Planner
│   ├── Evacuation Manager
│   └── Emergency Dispatcher ← YOU ARE HERE
└── Command Tier
    └── Command Center
```

### Communication Flow
- **Receives from:** 
  - Situation Assessor (incident severity and impact)
  - Resource Coordinator (resource deployment status)
  - Evacuation Manager (evacuation status)
  - Command Center (authorization directives)
  
- **Sends to:** 
  - 911 Dispatch Centers
  - Emergency Management Systems
  - Public Alert Systems
  - Command Center (confirmations)

- **Protocol:** A2A messaging via NEST framework + External APIs

## Core Capabilities

### 1. 911 Dispatch Integration
- Automated incident reporting to dispatch centers
- Real-time status updates
- Resource request coordination
- CAD system integration

### 2. Public Alert Management
- Emergency alert broadcasting (WEA)
- SMS mass notifications
- Mobile app push notifications
- Multi-language support

### 3. First Responder Coordination
- Fire department communication
- Police coordination
- EMS service integration
- Unit status tracking

### 4. Emergency Management Integration
- State emergency management agencies
- Local emergency operations centers
- Situation report generation

## Performance Metrics

- **Target Response Time:** < 5 seconds for critical alerts
- **System Contribution:** Enables sub-40-second overall response
- **Delivery Success Rate:** 99.5%+ for critical alerts
- **Concurrent Alerts:** 200+ simultaneous dispatches

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "messaging": "A2A Protocol + External APIs",
  "database": "PostgreSQL",
  "queue": "Redis",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 4 vCPU, 8GB RAM
- **Storage:** SSD with message audit logs
- **Network:** Private VLAN + public API endpoints

## Installation & Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# NEST framework
npm install @dataworksai/nest
```

### Environment Variables
```bash
# Agent Configuration
AGENT_NAME=emergency-dispatcher
AGENT_TIER=response
AGENT_ID=response-dispatcher-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8084

# Database
DISPATCH_DB_URI=postgresql://user:pass@db.example.com:5432/dispatch
REDIS_URI=redis://cache.example.com:6379

# 911 Dispatch Integration
DISPATCH_911_ENDPOINT=https://dispatch911.example.com/api/v1
DISPATCH_911_API_KEY=your-dispatch-api-key

# Emergency Management
STATE_EMA_ENDPOINT=https://ema.state.gov/api
EMA_API_KEY=your-ema-api-key

# Public Alerts
IPAWS_ENDPOINT=https://ipaws.fema.gov/api
IPAWS_API_KEY=your-ipaws-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token

# Performance
MAX_CONCURRENT_DISPATCHES=200
RETRY_ATTEMPTS=3
DELIVERY_TIMEOUT=10000
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/response/emergency-dispatcher

# Install dependencies
npm install

# Configure environment
cp .env.example .env
vim .env

# Run in development mode
npm run dev

# Run tests
npm test
```

### Deployment
```bash
# Build for production
npm run build

# Deploy to Linode
npm run deploy:linode

# Verify agent registration
npm run verify:registry
```

## Usage

### Emergency Dispatch
```javascript
import { EmergencyDispatcher } from './agent';

const dispatcher = new EmergencyDispatcher({
  database: process.env.DISPATCH_DB_URI,
  queue: process.env.REDIS_URI
});

// Dispatch emergency alert
const alert = {
  incident: {
    id: 'incident-20251211-001',
    type: 'flash-flood',
    severity: 'extreme',
    location: { lat: 42.3601, lon: -71.0589 }
  }
};

const dispatch = await dispatcher.dispatchEmergency(alert);
```

### Response Format
```json
{
  "dispatchId": "disp-20251211-143000",
  "timestamp": "2025-12-11T14:30:00Z",
  "dispatches": {
    "dispatch911": {
      "status": "delivered",
      "deliveryTime": "1.2 seconds",
      "confirmed": true
    },
    "publicAlert": {
      "wea": { "status": "delivered", "recipients": 3500 },
      "sms": { "status": "delivered", "sent": 1200 }
    },
    "emergencyManagement": {
      "status": "delivered",
      "confirmed": true
    }
  },
  "summary": {
    "totalChannels": 8,
    "delivered": 8,
    "totalRecipients": 8997,
    "averageDeliveryTime": "1.9 seconds"
  }
}
```

### A2A Communication
```javascript
// Receive situation assessment
dispatcher.on('message:situation-assessor', async (message) => {
  if (message.data.severity.score >= 7) {
    const dispatch = await dispatcher.dispatchEmergency({
      incident: message.data,
      priority: 'critical'
    });
    
    await dispatcher.send('command-center', {
      type: 'dispatch-confirmation',
      dispatchId: dispatch.dispatchId
    });
  }
});
```

## Alert Severity Levels

- **Extreme (9-10):** Immediate threat, all channels, WEA highest priority
- **Severe (7-8):** Significant threat, multiple channels, WEA activation
- **Warning (5-6):** Potential threat, selected channels
- **Advisory (1-4):** Monitor situation, limited channels

## Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# External API tests
npm run test:external

# Full workflow
npm run test:e2e
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8084/health
```

### Key Metrics
- `dispatches_total` - Total emergency dispatches
- `delivery_success_rate` - Message delivery success
- `dispatch_duration_seconds` - Dispatch processing time
- `failed_deliveries_total` - Failed deliveries

## Troubleshooting

**Failed Dispatch**
```bash
npm run check:dispatch911
npm run verify:dispatch-auth
npm run logs:dispatch
```

**Alert Delivery Issues**
```bash
npm run check:ipaws
npm run check:sms
npm run logs:delivery
```

## Project Context

### NANDA System
NANDA (Network of Autonomous Distributed Agents) achieves sub-40-second flash flood emergency response through coordination of 10 specialized agents.

**Performance:** 67-135x faster than traditional methods

### Team
**Group 6 - Northeastern University**

### Sponsors
- **Professor:** Hema Seshadri
- **Industry Sponsor:** Javi Vindas (DataWorksAI)

## Related Documentation

- [NANDA System Architecture](../../../docs/architecture.md)
- [A2A Protocol Specification](../../../docs/a2a-protocol.md)
- [NEST Framework Documentation](https://github.com/DataWorksAI/NEST)
- [Response Tier Overview](../README.md)

## Related Agents

**Response Tier:**
- Resource Coordinator
- Route Planner
- Evacuation Manager

**Upstream:**
- Situation Assessor (Analysis)
- Command Center (Command)

