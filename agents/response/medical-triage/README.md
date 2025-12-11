# Medical Triage Agent

**Tier:** Response  
**Role:** Medical emergency assessment and resource prioritization  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Medical Triage Agent is a specialized healthcare coordination agent within the NANDA flash flood emergency response system's Response tier. It assesses medical needs, prioritizes casualties, coordinates medical resources, and ensures efficient allocation of healthcare services during flash flood emergencies.

## Purpose

Medical triage coordination is essential for:
- Rapid assessment of medical emergency severity
- Prioritization of casualties based on medical need
- Coordination of ambulance and medical unit deployment
- Hospital capacity management and patient routing
- Field hospital and medical shelter setup
- Medical supply inventory and distribution
- Coordination with EMS and healthcare facilities

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Medical assessment algorithms
- Resource optimization for healthcare assets
- A2A (Agent-to-Agent) protocol communication
- Real-time capacity tracking

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
│   ├── Emergency Dispatcher
│   └── Medical Triage ← YOU ARE HERE
└── Command Tier
    └── Command Center
```

### Communication Flow
- **Receives from:** 
  - Situation Assessor (casualty estimates, impact assessment)
  - Resource Mapper (medical facility availability)
  - Social Media Analyzer (injury reports)
  - Evacuation Manager (evacuation medical needs)
  
- **Sends to:** 
  - Resource Coordinator (medical resource requests)
  - Emergency Dispatcher (ambulance dispatch requests)
  - Route Planner (medical transport routing)
  - Command Center (medical status reports)

- **Protocol:** A2A messaging via NEST framework

## Core Capabilities

### 1. Medical Needs Assessment
- Casualty estimation based on incident severity
- Injury type prediction from flood characteristics
- Population vulnerability analysis (elderly, disabled, chronic illness)
- Medical emergency prioritization
- Mass casualty incident (MCI) classification

### 2. Triage Classification
- **Immediate (Red):** Life-threatening, requires immediate care
- **Delayed (Yellow):** Serious but stable, can wait
- **Minor (Green):** Walking wounded, minimal care needed
- **Expectant (Black):** Deceased or unsurvivable injuries

### 3. Medical Resource Coordination
- Ambulance dispatch prioritization
- Medical unit deployment (paramedics, EMTs)
- Hospital bed availability tracking
- ICU and emergency room capacity monitoring
- Medical supply allocation

### 4. Healthcare Facility Management
- Hospital capacity monitoring
- Patient routing to appropriate facilities
- Field hospital setup coordination
- Medical shelter establishment
- Specialty care facility identification (trauma, pediatric)

### 5. Medical Supply Management
- Essential supply inventory tracking
- Distribution prioritization
- Resupply coordination
- Medical equipment deployment

## Performance Metrics

- **Target Response Time:** < 10 seconds for triage assessment
- **System Contribution:** Enables sub-40-second overall response
- **Triage Accuracy:** 92-96% (validated against field assessments)
- **Resource Optimization:** 85%+ efficient allocation
- **Concurrent Assessments:** 40+ incidents/minute

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "database": "PostgreSQL",
  "messaging": "A2A Protocol",
  "ml": "TensorFlow.js",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 4 vCPU, 8GB RAM
- **Storage:** SSD with medical assessment logs
- **Network:** Private VLAN for agent communication

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
AGENT_NAME=medical-triage
AGENT_TIER=response
AGENT_ID=response-medical-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8085

# Database
MEDICAL_DB_URI=postgresql://user:pass@db.example.com:5432/medical
TRIAGE_LOG_URI=postgresql://user:pass@db.example.com:5432/triage

# Healthcare Integration
HOSPITAL_NETWORK_API=https://hospitals.example.com/api
EMS_DISPATCH_API=https://ems.example.com/api
MEDICAL_SUPPLY_API=https://supplies.example.com/api
HEALTH_API_KEY=your-health-api-key

# ML Models
CASUALTY_MODEL_PATH=./models/casualty-prediction.onnx
TRIAGE_MODEL_PATH=./models/triage-classifier.onnx

# Assessment Parameters
MCI_THRESHOLD=10  # casualties
HOSPITAL_CAPACITY_THRESHOLD=0.85
AMBULANCE_RESPONSE_TIME=8  # minutes

# Performance
MAX_CONCURRENT_ASSESSMENTS=40
CACHE_TTL=300
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/response/medical-triage

# Install dependencies
npm install

# Download ML models
npm run models:download

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

### Medical Assessment
```javascript
import { MedicalTriage } from './agent';

const triage = new MedicalTriage({
  database: process.env.MEDICAL_DB_URI,
  models: {
    casualty: process.env.CASUALTY_MODEL_PATH,
    triage: process.env.TRIAGE_MODEL_PATH
  }
});

// Assess medical needs
const assessment = await triage.assessMedicalNeeds({
  incident: {
    id: 'incident-20251211-001',
    location: { lat: 42.3601, lon: -71.0589 },
    severity: 8.2,
    affectedPopulation: 3500
  },
  situation: {
    floodDepth: 1.5,  // meters
    waterVelocity: 'high',
    duration: '2+ hours',
    infrastructure: ['roads', 'power', 'water']
  }
});
```

### Response Format
```json
{
  "assessmentId": "med-20251211-143000",
  "timestamp": "2025-12-11T14:30:00Z",
  "incident": {
    "id": "incident-20251211-001",
    "location": { "lat": 42.3601, "lon": -71.0589 },
    "affectedPopulation": 3500
  },
  "medicalNeeds": {
    "estimatedCasualties": 45,
    "masscasualtyIncident": true,
    "injuryTypes": {
      "drowning": 12,
      "trauma": 18,
      "hypothermia": 8,
      "waterborne": 5,
      "chronic": 2
    },
    "vulnerablePopulations": {
      "elderly": 15,
      "disabled": 8,
      "children": 12,
      "chronicIllness": 10
    }
  },
  "triagePriorities": {
    "immediate": {
      "count": 12,
      "conditions": ["drowning", "severe trauma", "cardiac"],
      "timeframe": "0-15 minutes"
    },
    "delayed": {
      "count": 18,
      "conditions": ["moderate trauma", "hypothermia"],
      "timeframe": "15-60 minutes"
    },
    "minor": {
      "count": 15,
      "conditions": ["minor injuries", "shock"],
      "timeframe": "1-4 hours"
    }
  },
  "resourceRequirements": {
    "ambulances": {
      "als": 8,
      "bls": 6,
      "priority": "immediate"
    },
    "medicalUnits": {
      "paramedics": 12,
      "emts": 8,
      "nurses": 4
    },
    "facilities": {
      "traumaCenter": 2,
      "generalHospital": 1,
      "fieldHospital": 1
    },
    "supplies": {
      "oxygenTanks": 20,
      "traumaKits": 15,
      "blankets": 50,
      "ivFluids": 40
    }
  },
  "hospitalRouting": {
    "traumaPatients": {
      "facility": "Mass General Hospital",
      "distance": 1.2,
      "capacity": 8,
      "eta": "6 minutes"
    },
    "generalPatients": {
      "facility": "Boston Medical Center",
      "distance": 2.1,
      "capacity": 12,
      "eta": "9 minutes"
    }
  },
  "medicalShelters": [
    {
      "location": "Central Community Center",
      "capacity": 100,
      "staffing": "2 nurses, 4 EMTs",
      "supplies": "basic first aid, AEDs"
    }
  ],
  "recommendations": [
    "Deploy 8 ALS ambulances immediately",
    "Establish field triage at evacuation points",
    "Alert Mass General of incoming trauma patients",
    "Setup medical shelter at Community Center",
    "Request mutual aid from neighboring jurisdictions"
  ],
  "confidence": 0.91,
  "processingTime": "8.7 seconds"
}
```

### A2A Communication
```javascript
// Receive situation assessment
triage.on('message:situation-assessor', async (message) => {
  const assessment = await triage.assessMedicalNeeds(message.data);
  
  // Request medical resources
  await triage.send('resource-coordinator', {
    type: 'medical-resource-request',
    data: assessment.resourceRequirements
  });
  
  // Request ambulance dispatch
  await triage.send('emergency-dispatcher', {
    type: 'ambulance-dispatch',
    priority: 'immediate',
    data: assessment.triagePriorities
  });
  
  // Update Command Center
  await triage.send('command-center', {
    type: 'medical-status',
    data: assessment
  });
});

// Receive resource availability
triage.on('message:resource-mapper', async (message) => {
  // Update hospital capacity data
  await triage.updateHospitalCapacity(message.data);
});
```

## Triage Protocols

### START Triage System
- **Respirations:** Check breathing
- **Perfusion:** Check circulation
- **Mental Status:** Check consciousness
- Priority assignment based on vital signs

### Mass Casualty Assessment
```javascript
const mciLevel = {
  green: casualties < 10,
  yellow: casualties >= 10 && casualties < 50,
  red: casualties >= 50 && casualties < 100,
  black: casualties >= 100
};
```

### Injury Prediction Model
```javascript
// Based on flood characteristics
injuryTypes = predictInjuries({
  floodDepth: depth,
  waterVelocity: velocity,
  duration: duration,
  infrastructure: damage,
  population: demographics
});
```

## Testing

```bash
# Unit tests
npm run test:unit

# Triage algorithm tests
npm run test:triage

# ML model tests
npm run test:models

# Integration tests
npm run test:integration

# Performance tests
npm run test:performance
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8085/health
```

### Key Metrics
- `medical_assessments_total` - Total medical assessments
- `assessment_duration_seconds` - Assessment time
- `triage_accuracy` - Triage classification accuracy
- `casualties_estimated` - Total casualties estimated
- `ambulances_dispatched` - Ambulances deployed
- `hospital_capacity_utilization` - Hospital capacity usage

## Troubleshooting

**Inaccurate Casualty Estimates**
```bash
npm run models:calibrate
npm run validate:predictions
npm run models:retrain
```

**Hospital Capacity Issues**
```bash
npm run check:hospitals
npm run sync:capacity
npm run hospitals:refresh
```

**Resource Coordination Failures**
```bash
npm run check:resources
npm run verify:integration
npm run logs:coordination
```

## Medical Integration

### Hospital Network API
```javascript
// Query hospital capacity
const capacity = await triage.getHospitalCapacity({
  location: { lat, lon },
  radius: 25,  // km
  specialties: ['trauma', 'emergency']
});
```

### EMS Dispatch Integration
```javascript
// Request ambulance dispatch
await triage.dispatchAmbulance({
  priority: 'immediate',
  type: 'ALS',
  location: { lat, lon },
  patient: 'cardiac arrest',
  destination: 'Mass General Hospital'
});
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
- Emergency Dispatcher
- Route Planner
- Evacuation Manager

**Upstream:**
- Situation Assessor (Analysis)
- Resource Mapper (Analysis)

