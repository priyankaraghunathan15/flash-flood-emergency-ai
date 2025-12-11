# Environmental Monitor Agent

**Tier:** Response  
**Role:** Environmental hazard assessment and safety monitoring  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Environmental Monitor is a specialized safety assessment agent within the NANDA flash flood emergency response system's Response tier. It monitors environmental hazards created by flooding, assesses contamination risks, tracks infrastructure damage impacts, and provides safety guidance to protect responders and affected populations from secondary hazards.

## Purpose

Environmental monitoring is essential for:
- Water contamination and quality assessment
- Hazardous material release detection and tracking
- Air quality monitoring (sewage, chemicals, mold)
- Electrical hazard identification (downed power lines)
- Structural stability assessment
- Disease vector monitoring (waterborne illness risks)
- Soil contamination and erosion tracking
- Long-term environmental impact assessment

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Multi-sensor environmental data integration
- Real-time hazard detection and classification
- A2A (Agent-to-Agent) protocol communication
- Predictive risk modeling

### Agent Positioning
```
NANDA System Hierarchy:
├── Detection Tier
│   ├── Alert Generator
│   ├── Weather Monitor
│   ├── Social Media Sentinel
│   └── News Alert Scanner
├── Analysis Tier
│   ├── Pattern Analyzer
│   ├── Resource Mapper
│   └── Situation Assessor
├── Response Tier (Current)
│   ├── Resource Coordinator
│   ├── Route Planner
│   ├── Evacuation Manager
│   ├── Emergency Dispatcher
│   ├── Medical Triage
│   ├── Public Communicator
│   └── Environmental Monitor ← YOU ARE HERE
└── Command Tier
    └── Command Center
```

### Communication Flow
- **Receives from:** 
  - Situation Assessor (flood extent and severity)
  - Resource Mapper (critical infrastructure locations)
  - Weather Monitor (precipitation and temperature data)
  - Social Media Sentinel (hazard reports from public)
  
- **Sends to:** 
  - Medical Triage (health hazard alerts)
  - Evacuation Manager (safety zone updates)
  - Route Planner (hazardous area avoidance)
  - Public Communicator (safety warnings)
  - Command Center (environmental status reports)

- **Protocol:** A2A messaging via NEST framework

## Core Capabilities

### 1. Water Quality Monitoring
- Bacterial contamination detection (E. coli, coliform)
- Chemical contamination tracking (industrial, agricultural)
- Sewage overflow identification
- Heavy metal presence assessment
- pH and dissolved oxygen monitoring
- Safe water source identification

### 2. Hazardous Material Tracking
- Industrial facility breach detection
- Chemical storage area flooding
- Petroleum product releases
- Agricultural chemical runoff
- Gas station contamination
- Household hazardous waste dispersion

### 3. Air Quality Assessment
- Sewage gas detection
- Chemical vapor monitoring
- Mold and mildew risk assessment
- Particulate matter from debris
- Carbon monoxide from generators
- Natural gas leak detection

### 4. Electrical Hazard Detection
- Downed power line identification
- Submerged electrical equipment
- Electrified water body detection
- Transformer damage assessment
- Underground utility exposure

### 5. Structural Safety Assessment
- Building stability evaluation
- Bridge and road integrity
- Dam and levee condition monitoring
- Foundation erosion detection
- Collapse risk identification

### 6. Disease Vector Monitoring
- Waterborne pathogen risk assessment
- Mosquito breeding site identification
- Rodent displacement tracking
- Contaminated food supply identification
- Disease outbreak prediction

### 7. Long-Term Impact Assessment
- Soil contamination mapping
- Groundwater contamination prediction
- Ecosystem damage evaluation
- Agricultural land impact assessment
- Cleanup priority identification

## Performance Metrics

- **Target Response Time:** < 10 seconds for hazard assessment
- **System Contribution:** Enables sub-40-second overall response
- **Hazard Detection Accuracy:** 89-94%
- **Sensor Integration:** 100+ environmental sensors
- **Risk Prediction Accuracy:** 85-91%
- **Concurrent Monitoring:** 50+ hazard types simultaneously

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "database": "PostgreSQL + PostGIS",
  "ml": "TensorFlow.js",
  "geospatial": "Turf.js, GDAL",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 4 vCPU, 8GB RAM
- **Storage:** SSD with geospatial database
- **Network:** Private VLAN for sensor data
- **Integration:** IoT sensor network connectivity

## Installation & Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# NEST framework
npm install @dataworksai/nest

# PostGIS for geospatial data
psql --version
```

### Environment Variables
```bash
# Agent Configuration
AGENT_NAME=environmental-monitor
AGENT_TIER=response
AGENT_ID=response-environment-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8089

# Database
ENV_DB_URI=postgresql://user:pass@db.example.com:5432/environment
GEOSPATIAL_DB_URI=postgresql://user:pass@db.example.com:5432/postgis

# Environmental Data APIs
EPA_API_ENDPOINT=https://epa.gov/api
WATER_QUALITY_API=https://waterdata.usgs.gov/api
AIR_QUALITY_API=https://airnow.gov/api
HAZMAT_DATABASE=https://hazmat.gov/api
EPA_API_KEY=your-epa-key

# Sensor Networks
IOT_SENSOR_ENDPOINT=https://sensors.example.com/api
WATER_SENSOR_API=your-sensor-api-key
AIR_SENSOR_API=your-air-sensor-key
STRUCTURAL_SENSOR_API=your-structural-key

# Infrastructure Data
CRITICAL_FACILITIES_DB=https://facilities.example.com/api
UTILITY_NETWORK_API=https://utilities.example.com/api
INDUSTRIAL_SITES_API=https://industrial.example.com/api

# ML Models
CONTAMINATION_MODEL_PATH=./models/contamination-predictor.onnx
HAZARD_MODEL_PATH=./models/hazard-classifier.onnx

# Assessment Parameters
CONTAMINATION_THRESHOLD=high
ELECTRICAL_HAZARD_RADIUS=100  # meters
STRUCTURAL_RISK_THRESHOLD=0.75
DISEASE_RISK_WINDOW=72  # hours

# Performance
MAX_CONCURRENT_ASSESSMENTS=50
SENSOR_POLL_INTERVAL=60  # seconds
CACHE_TTL=180
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/response/environmental-monitor

# Install dependencies
npm install

# Configure environment
cp .env.example .env
vim .env

# Setup geospatial database
npm run db:setup-postgis

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

# Initialize sensor connections
npm run sensors:init
```

## Usage

### Environmental Assessment
```javascript
import { EnvironmentalMonitor } from './agent';

const monitor = new EnvironmentalMonitor({
  database: process.env.ENV_DB_URI,
  apis: {
    epa: process.env.EPA_API_ENDPOINT,
    waterQuality: process.env.WATER_QUALITY_API,
    sensors: process.env.IOT_SENSOR_ENDPOINT
  },
  models: {
    contamination: process.env.CONTAMINATION_MODEL_PATH,
    hazard: process.env.HAZARD_MODEL_PATH
  }
});

// Assess environmental hazards
const assessment = await monitor.assessEnvironmentalHazards({
  incident: {
    id: 'incident-20251211-001',
    location: { lat: 42.3601, lon: -71.0589 },
    floodExtent: 2.3,  // sq km
    waterDepth: 1.5,   // meters
    duration: 3        // hours
  }
});
```

### Response Format
```json
{
  "assessmentId": "env-20251211-143000",
  "timestamp": "2025-12-11T14:30:00Z",
  "incident": {
    "id": "incident-20251211-001",
    "location": { "lat": 42.3601, "lon": -71.0589 }
  },
  "waterQuality": {
    "status": "contaminated",
    "severity": "high",
    "contaminants": [
      {
        "type": "sewage",
        "level": "high",
        "source": "combined sewer overflow",
        "risk": "waterborne disease"
      },
      {
        "type": "petroleum",
        "level": "moderate",
        "source": "gas station breach",
        "location": { "lat": 42.3605, "lon": -71.0595 }
      }
    ],
    "safeWaterSources": [
      {
        "type": "bottled water distribution",
        "location": "Community Center",
        "capacity": "5000 bottles"
      }
    ],
    "recommendations": [
      "Do not drink flood water",
      "Boil water advisories in effect",
      "Avoid skin contact with flood water"
    ]
  },
  "hazardousMaterials": {
    "detected": true,
    "incidents": [
      {
        "facilityId": "industrial-042",
        "facilityName": "ABC Chemical Plant",
        "location": { "lat": 42.3610, "lon": -71.0600 },
        "materials": ["industrial solvents", "cleaning chemicals"],
        "releaseVolume": "estimated 500 gallons",
        "dispersalRadius": 0.8,  // km
        "healthRisk": "high",
        "evacuationZone": {
          "radius": 1.0,  // km
          "population": 450
        }
      }
    ],
    "recommendations": [
      "Evacuate 1km radius around ABC Chemical",
      "Deploy hazmat response team",
      "Establish decontamination stations",
      "Monitor air quality continuously"
    ]
  },
  "airQuality": {
    "status": "moderate concern",
    "hazards": [
      {
        "type": "sewage gas",
        "level": "moderate",
        "locations": ["downtown area"],
        "healthImpact": "respiratory irritation"
      },
      {
        "type": "chemical vapors",
        "level": "low",
        "source": "industrial release",
        "healthImpact": "potential headaches, nausea"
      }
    ],
    "recommendations": [
      "Use respirators in affected areas",
      "Avoid prolonged outdoor exposure",
      "Monitor for symptoms"
    ]
  },
  "electricalHazards": {
    "detected": true,
    "hazards": [
      {
        "type": "downed power lines",
        "count": 8,
        "locations": [
          { "lat": 42.3598, "lon": -71.0587, "address": "Main St & 5th Ave" }
        ],
        "dangerZone": 100,  // meters
        "status": "reported to utility"
      },
      {
        "type": "submerged electrical equipment",
        "locations": ["basement parking garages", "subway stations"],
        "risk": "electrified water"
      }
    ],
    "recommendations": [
      "Stay 100m away from downed lines",
      "Assume all water is electrified",
      "Do not enter flooded basements",
      "Wait for utility clearance"
    ]
  },
  "structuralHazards": {
    "assessed": true,
    "atRisk": [
      {
        "type": "building",
        "location": { "lat": 42.3602, "lon": -71.0590 },
        "address": "456 River St",
        "risk": "foundation erosion",
        "severity": "moderate",
        "action": "evacuate and inspect"
      },
      {
        "type": "bridge",
        "name": "Main Street Bridge",
        "location": { "lat": 42.3600, "lon": -71.0585 },
        "risk": "undermining",
        "severity": "high",
        "action": "close immediately"
      }
    ],
    "recommendations": [
      "Close Main Street Bridge",
      "Evacuate 456 River St",
      "Conduct structural inspections before re-entry"
    ]
  },
  "diseaseRisk": {
    "waterborne": {
      "risk": "high",
      "pathogens": ["E. coli", "Giardia", "Hepatitis A"],
      "exposureRoutes": ["ingestion", "skin contact", "inhalation"],
      "onsetWindow": "24-72 hours",
      "symptoms": ["diarrhea", "vomiting", "fever"]
    },
    "vector": {
      "risk": "moderate",
      "concerns": ["mosquito breeding", "rodent displacement"],
      "timeline": "7-14 days post-flood",
      "diseases": ["West Nile Virus", "Leptospirosis"]
    },
    "recommendations": [
      "Distribute water purification tablets",
      "Establish medical monitoring",
      "Implement vector control measures",
      "Tetanus vaccination for responders"
    ]
  },
  "longTermImpact": {
    "soilContamination": {
      "affected": "15 hectares",
      "contaminants": ["petroleum", "heavy metals", "sewage"],
      "remediationRequired": true,
      "agriculturalImpact": "moderate"
    },
    "ecosystemDamage": {
      "waterways": "moderate contamination",
      "wetlands": "sedimentation",
      "wildlife": "habitat disruption"
    },
    "cleanupPriority": [
      "Hazardous material sites",
      "Water supply infrastructure",
      "Critical facilities",
      "Residential areas"
    ]
  },
  "safetyZones": {
    "restricted": [
      {
        "area": "ABC Chemical 1km radius",
        "reason": "hazmat contamination",
        "duration": "until cleared by EPA"
      },
      {
        "area": "Main Street Bridge",
        "reason": "structural instability",
        "duration": "until inspection complete"
      }
    ],
    "caution": [
      {
        "area": "downtown flood zone",
        "reason": "electrical hazards, contamination",
        "precautions": "protective equipment required"
      }
    ]
  },
  "recommendations": {
    "immediate": [
      "Deploy hazmat team to ABC Chemical",
      "Close Main Street Bridge",
      "Issue boil water advisory",
      "Establish decontamination stations"
    ],
    "shortTerm": [
      "Conduct air quality monitoring",
      "Inspect critical structures",
      "Begin water treatment",
      "Vector control measures"
    ],
    "longTerm": [
      "Soil remediation planning",
      "Ecosystem restoration",
      "Infrastructure hardening",
      "Disease surveillance"
    ]
  },
  "confidence": 0.88,
  "processingTime": "8.4 seconds"
}
```

### A2A Communication
```javascript
// Receive flood assessment
monitor.on('message:situation-assessor', async (message) => {
  const assessment = await monitor.assessEnvironmentalHazards(message.data);
  
  // Alert Medical Triage of health hazards
  await monitor.send('medical-triage', {
    type: 'health-hazard-alert',
    priority: 'high',
    data: {
      waterQuality: assessment.waterQuality,
      diseaseRisk: assessment.diseaseRisk
    }
  });
  
  // Update Evacuation Manager with safety zones
  await monitor.send('evacuation-manager', {
    type: 'safety-zone-update',
    data: assessment.safetyZones
  });
  
  // Inform Route Planner of hazardous areas
  await monitor.send('route-planner', {
    type: 'hazard-avoidance',
    data: assessment.electricalHazards
  });
  
  // Send public safety warnings
  await monitor.send('public-communicator', {
    type: 'environmental-safety-warning',
    data: assessment.recommendations
  });
});
```

## Hazard Classification

### Critical (Priority 1)
- Hazmat releases requiring evacuation
- Electrified water bodies
- Structural collapse imminent
- Acute health threats

### High (Priority 2)
- Sewage contamination
- Downed power lines
- Chemical vapor exposure
- Structural instability

### Medium (Priority 3)
- Water quality concerns
- Air quality issues
- Vector breeding sites
- Foundation erosion

### Low (Priority 4)
- Long-term soil contamination
- Ecosystem impacts
- Aesthetic concerns
- Minor structural damage

## Testing

```bash
# Unit tests
npm run test:unit

# Sensor integration tests
npm run test:sensors

# Contamination model tests
npm run test:contamination

# Integration tests
npm run test:integration

# Geospatial analysis tests
npm run test:geospatial
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8089/health
```

### Key Metrics
- `assessments_total` - Total environmental assessments
- `hazards_detected_total` - Total hazards identified
- `assessment_duration_seconds` - Processing time
- `contamination_incidents` - Contamination events
- `sensor_readings_total` - Sensor data points processed
- `prediction_accuracy` - Risk prediction accuracy

## Troubleshooting

**Sensor Connection Issues**
```bash
npm run check:sensors
npm run verify:sensor-endpoints
npm run sensors:reconnect
```

**Contamination Model Issues**
```bash
npm run models:validate
npm run models:recalibrate
npm run test:prediction-accuracy
```

**Geospatial Query Slowdown**
```bash
npm run optimize:postgis
npm run index:rebuild
npm run cache:warm
```

## Safety Guidelines

### Responder Protection
- PPE requirements for contaminated areas
- Decontamination procedures
- Exposure time limits
- Medical monitoring protocols

### Public Safety
- Water safety advisories
- Electrical hazard warnings
- Structural safety guidance
- Health precaution instructions

### Environmental Protection
- Contamination containment
- Wildlife protection measures
- Ecosystem preservation
- Cleanup best practices

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
- Medical Triage
- Evacuation Manager
- Route Planner
- Public Communicator

**Upstream:**
- Situation Assessor (Analysis)
- Resource Mapper (Analysis)

