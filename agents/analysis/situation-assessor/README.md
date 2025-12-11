# Situation Assessor Agent

**Tier:** Analysis  
**Role:** Real-time situation analysis and impact assessment  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Situation Assessor is the central intelligence agent within the NANDA flash flood emergency response system's Analysis tier. It synthesizes data from all Detection tier agents, combines it with pattern analysis and resource mapping, and generates comprehensive situational awareness reports that drive response decisions.

## Purpose

Real-time situation assessment is critical for:
- Synthesizing multi-source intelligence into actionable insights
- Assessing current flood severity and impact scope
- Predicting flood progression and escalation scenarios
- Evaluating risk levels for affected populations
- Determining priority response zones
- Generating comprehensive situational awareness reports
- Providing decision support for command operations

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Multi-source data fusion and correlation
- Real-time situation modeling
- A2A (Agent-to-Agent) protocol communication
- Decision support analytics
- Impact assessment algorithms

### Agent Positioning
```
NANDA System Hierarchy:
├── Detection Tier
│   ├── Alert Generator
│   ├── Weather Monitor
│   └── Social Media Analyzer
├── Analysis Tier (Current)
│   ├── Pattern Analyzer
│   ├── Resource Mapper
│   └── Situation Assessor ← YOU ARE HERE
├── Response Tier
│   ├── Resource Coordinator
│   ├── Route Planner
│   └── Evacuation Manager
└── Command Tier
    └── Command Center
```

### Communication Flow
- **Receives from:** 
  - Alert Generator (flood detection alerts)
  - Weather Monitor (meteorological forecasts)
  - Social Media Analyzer (social signals & reports)
  - Pattern Analyzer (historical context)
  - Resource Mapper (resource availability)
  
- **Sends to:** 
  - Resource Coordinator (situation-based resource needs)
  - Route Planner (impact areas for routing)
  - Evacuation Manager (priority evacuation zones)
  - Command Center (comprehensive situation reports)

- **Protocol:** A2A messaging via NEST framework

## Core Capabilities

### 1. Multi-Source Data Fusion
- Correlates alerts from multiple detection sources
- Validates and cross-references flood reports
- Resolves conflicting information
- Weights data by source reliability
- Maintains temporal coherence of events

### 2. Impact Assessment
- Population at risk analysis
- Infrastructure vulnerability assessment
- Critical facility exposure (hospitals, schools, utilities)
- Economic impact estimation
- Environmental damage assessment
- Cascading failure risk analysis

### 3. Severity Classification
- Flood severity scoring (1-10 scale)
- Multi-dimensional risk assessment
- Priority zone determination
- Escalation prediction
- Threat level categorization

### 4. Situation Modeling
- Real-time flood extent mapping
- Progression timeline prediction
- Multiple scenario analysis (best/likely/worst case)
- Dynamic risk recalculation
- Continuous situation evolution tracking

### 5. Decision Support
- Actionable recommendations generation
- Resource requirement estimates
- Evacuation priority sequencing
- Response strategy suggestions
- Time-critical decision flagging

## Performance Metrics

- **Target Response Time:** < 12 seconds for full assessment
- **System Contribution:** Enables sub-40-second overall response
- **Data Fusion Latency:** < 5 seconds from multi-source inputs
- **Assessment Accuracy:** 91-95% (validated post-incident)
- **False Positive Rate:** < 5%
- **Concurrent Assessments:** 30+ situations/minute

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "analytics": "TensorFlow.js / ONNX",
  "geospatial": "Turf.js / GeoJSON",
  "messaging": "A2A Protocol",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 8 vCPU, 16GB RAM (higher for ML inference)
- **Storage:** SSD with event database
- **Network:** Private VLAN for agent communication
- **ML Models:** Pre-trained impact assessment models

## Installation & Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# NEST framework
npm install @dataworksai/nest

# ML runtime
npm install @tensorflow/tfjs-node
```

### Environment Variables
```bash
# Agent Configuration
AGENT_NAME=situation-assessor
AGENT_TIER=analysis
AGENT_ID=analysis-situation-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8083

# Database
SITUATION_DB_URI=postgresql://user:pass@db.example.com:5432/situations
EVENT_STORE_URI=postgresql://user:pass@db.example.com:5432/events

# ML Models
IMPACT_MODEL_PATH=./models/impact-assessment.onnx
SEVERITY_MODEL_PATH=./models/severity-classifier.onnx

# Data Sources
POPULATION_DATA_URI=https://census.example.com/api
INFRASTRUCTURE_DATA_URI=https://gis.example.com/api
ELEVATION_DATA_URI=https://terrain.example.com/api

# Assessment Parameters
SEVERITY_THRESHOLDS='{"low":3,"medium":5,"high":7,"critical":9}'
CONFIDENCE_THRESHOLD=0.75
FUSION_TIMEOUT=5000  # ms

# Performance
MAX_CONCURRENT_ASSESSMENTS=30
CACHE_TTL=180  # seconds
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/analysis/situation-assessor

# Install dependencies
npm install

# Download ML models
npm run models:download

# Configure environment
vim .env

# Run in development mode
npm run dev

# Run tests
npm test

# Run with monitoring
npm run start:monitor
```

### Deployment
```bash
# Build for production
npm run build

# Deploy ML models
npm run models:deploy

# Deploy to Linode
npm run deploy:linode

# Verify agent registration
npm run verify:registry

# Warm up ML models
npm run models:warmup
```

## Usage

### Situation Assessment
```javascript
import { SituationAssessor } from './agent';

const assessor = new SituationAssessor({
  database: process.env.SITUATION_DB_URI,
  models: {
    impact: process.env.IMPACT_MODEL_PATH,
    severity: process.env.SEVERITY_MODEL_PATH
  }
});

// Assess incoming situation
const inputs = {
  alert: {
    location: { lat: 42.3601, lon: -71.0589 },
    severity: "high",
    source: "sensor-network",
    timestamp: "2025-12-11T14:30:00Z"
  },
  weather: {
    rainfall: 85,
    duration: 3,
    forecast: "continuing"
  },
  social: {
    reportCount: 47,
    sentiment: "urgent",
    keywords: ["flooding", "water rising", "emergency"]
  },
  patterns: {
    historicalMatches: 3,
    seasonalRisk: "high",
    confidence: 0.89
  },
  resources: {
    nearbyTeams: 5,
    availableShelters: 3,
    avgResponseTime: "5.3 minutes"
  }
};

const assessment = await assessor.assess(inputs);
```

### Response Format
```json
{
  "assessmentId": "sit-20251211-143000",
  "timestamp": "2025-12-11T14:30:00Z",
  "location": {
    "center": { "lat": 42.3601, "lon": -71.0589 },
    "affectedArea": {
      "type": "Polygon",
      "coordinates": [[...]]
    },
    "radius": 2.3
  },
  "severity": {
    "score": 8.2,
    "level": "high",
    "trend": "escalating",
    "confidence": 0.91
  },
  "impact": {
    "population": {
      "atRisk": 3500,
      "immediate": 1200,
      "evacuation": 800
    },
    "infrastructure": {
      "roads": ["Main St", "River Rd", "Bridge Ave"],
      "utilities": ["Power Station 3", "Water Pump 7"],
      "critical": ["Fire Station 2", "Elementary School"]
    },
    "facilities": {
      "hospitals": 1,
      "schools": 3,
      "shelters": 2
    },
    "economic": {
      "estimated": "$2.5M",
      "confidence": "medium"
    }
  },
  "progression": {
    "current": "active flooding",
    "timeline": [
      {
        "time": "+10 minutes",
        "status": "Peak water levels",
        "severity": 8.5
      },
      {
        "time": "+30 minutes",
        "status": "Expansion to Zone B",
        "severity": 7.8
      },
      {
        "time": "+60 minutes",
        "status": "Beginning to recede",
        "severity": 6.2
      }
    ],
    "peakTime": "14:40 UTC",
    "duration": "2-3 hours"
  },
  "scenarios": {
    "best": {
      "impact": "moderate",
      "containment": "15 minutes",
      "casualties": "unlikely"
    },
    "likely": {
      "impact": "significant",
      "containment": "45 minutes",
      "casualties": "possible injuries"
    },
    "worst": {
      "impact": "severe",
      "containment": "2+ hours",
      "casualties": "likely injuries, possible fatalities"
    }
  },
  "priorities": [
    {
      "zone": "Zone A",
      "priority": 1,
      "action": "Immediate evacuation",
      "population": 800,
      "timeframe": "Next 15 minutes"
    },
    {
      "zone": "Zone B",
      "priority": 2,
      "action": "Prepare for evacuation",
      "population": 1200,
      "timeframe": "Next 30 minutes"
    }
  ],
  "recommendations": {
    "response": [
      "Deploy 3 rescue teams to Zone A",
      "Open 2 emergency shelters",
      "Close Main St and River Rd bridges",
      "Issue emergency alert to affected areas"
    ],
    "resources": {
      "rescue-teams": 3,
      "medical-units": 2,
      "shelters": 2,
      "transport": "5 buses"
    },
    "timeline": "Initiate within 5 minutes"
  },
  "confidence": {
    "overall": 0.91,
    "bySource": {
      "sensors": 0.95,
      "weather": 0.92,
      "social": 0.78,
      "patterns": 0.89
    }
  },
  "processingTime": "10.7 seconds",
  "dataFreshness": {
    "detection": "2.1 seconds",
    "weather": "4.3 seconds",
    "social": "3.8 seconds",
    "patterns": "12.3 seconds",
    "resources": "1.8 seconds"
  }
}
```

### A2A Communication Example
```javascript
// Receive inputs from multiple sources
let assessmentInputs = {};

assessor.on('message:alert-generator', (message) => {
  assessmentInputs.alert = message.data;
  tryAssessment();
});

assessor.on('message:weather-monitor', (message) => {
  assessmentInputs.weather = message.data;
  tryAssessment();
});

assessor.on('message:social-media-analyzer', (message) => {
  assessmentInputs.social = message.data;
  tryAssessment();
});

assessor.on('message:pattern-analyzer', (message) => {
  assessmentInputs.patterns = message.data;
  tryAssessment();
});

assessor.on('message:resource-mapper', (message) => {
  assessmentInputs.resources = message.data;
  tryAssessment();
});

async function tryAssessment() {
  // Wait for minimum required inputs
  if (hasMinimumData(assessmentInputs)) {
    const assessment = await assessor.assess(assessmentInputs);
    
    // Distribute to Response tier
    await Promise.all([
      assessor.send('resource-coordinator', {
        type: 'situation-assessment',
        data: assessment
      }),
      assessor.send('route-planner', {
        type: 'impact-areas',
        data: assessment.location
      }),
      assessor.send('evacuation-manager', {
        type: 'evacuation-priorities',
        data: assessment.priorities
      }),
      assessor.send('command-center', {
        type: 'situation-report',
        priority: assessment.severity.level,
        data: assessment
      })
    ]);
    
    // Reset for next assessment
    assessmentInputs = {};
  }
}
```

## Assessment Algorithms

### Severity Scoring
```javascript
severityScore = weightedSum([
  alertSeverity * 0.25,
  weatherIntensity * 0.20,
  socialUrgency * 0.15,
  historicalSeverity * 0.20,
  populationAtRisk * 0.20
]);
```

### Impact Calculation
```javascript
impact = {
  population: calculatePopulationAtRisk(floodExtent, censusData),
  infrastructure: assessInfrastructure(floodExtent, gisData),
  economic: estimateEconomicImpact(severity, duration, area),
  cascading: analyzeCascadingRisks(criticalFacilities)
};
```

### Confidence Scoring
```javascript
confidence = harmonicMean([
  sourceReliability,
  dataFreshness,
  crossValidation,
  historicalAccuracy
]);
```

## Testing

### Unit Tests
```bash
npm run test:unit

# Test assessment algorithms
npm run test:algorithms

# Test ML models
npm run test:models

# Test coverage
npm run test:coverage
```

### Integration Tests
```bash
# Test A2A communication
npm run test:integration

# Test with all Analysis tier agents
npm run test:tier

# Test full pipeline
npm run test:pipeline
```

### Performance Tests
```bash
# Benchmark assessment time
npm run test:performance

# Load testing
npm run test:load

# ML inference performance
npm run test:inference
```

### Validation Tests
```bash
# Test with historical events
npm run test:historical

# Validate accuracy
npm run test:accuracy
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8083/health
```

### Metrics Endpoint
```bash
curl http://localhost:8083/metrics
```

### Key Metrics
- `assessments_total` - Total assessments performed
- `assessment_duration_seconds` - Assessment duration histogram
- `assessment_accuracy` - Post-incident validation accuracy
- `data_fusion_latency` - Multi-source fusion time
- `ml_inference_duration` - ML model inference time
- `false_positive_rate` - False alarm rate

## Troubleshooting

### Common Issues

**Slow Assessments**
```bash
# Check ML model performance
npm run models:benchmark

# Verify data source latency
npm run sources:check

# Profile assessment pipeline
npm run profile:assessment
```

**Inaccurate Assessments**
```bash
# Validate input data quality
npm run validate:inputs

# Check model calibration
npm run models:calibrate

# Review historical accuracy
npm run accuracy:report
```

**Missing Data Fusion**
```bash
# Check source connectivity
npm run sources:ping

# Verify message routing
npm run routing:check

# Review fusion timeouts
npm run fusion:diagnostics
```

## Performance Optimization

### Caching Strategy
- Population data cached for 1 hour
- Infrastructure data cached for 6 hours
- Assessment results cached for 3 minutes
- ML inference results cached for 1 minute

### Model Optimization
- ONNX runtime for fast inference
- Model quantization for reduced size
- Batch prediction when possible
- Pre-warmed model instances

### Data Fusion Optimization
- Parallel source queries
- Partial assessment with incomplete data
- Progressive enhancement as data arrives
- Timeout-based fallbacks

## ML Models

### Impact Assessment Model
- **Type:** Regression (impact magnitude)
- **Inputs:** 23 features (location, weather, population, infrastructure)
- **Output:** Impact score (0-10)
- **Accuracy:** 93% within ±1 score
- **Inference Time:** < 50ms

### Severity Classifier
- **Type:** Multi-class classification
- **Classes:** Low, Medium, High, Critical
- **Inputs:** 18 features (sensor data, weather, social signals)
- **Accuracy:** 91% precision, 89% recall
- **Inference Time:** < 30ms

## Project Context

### NANDA System
NANDA (Network of Autonomous Distributed Agents) is a distributed AI system for flash flood emergency response that achieves sub-40-second response times through coordination of 10 specialized agents.

**Performance:** 67-135x faster than traditional emergency response methods

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

- [NANDA System Architecture](../../../docs/architecture.md)
- [A2A Protocol Specification](../../../docs/a2a-protocol.md)
- [NEST Framework Documentation](https://github.com/DataWorksAI/NEST)
- [Deployment Guide](../../../docs/deployment.md)
- [Analysis Tier Overview](../README.md)
- [Assessment Algorithms](./docs/algorithms.md)
- [ML Models Guide](./docs/models.md)

## Related Agents

**Analysis Tier:**
- Pattern Analyzer (historical patterns)
- Resource Mapper (resource availability)

**Upstream Dependencies:**
- Alert Generator (Detection)
- Weather Monitor (Detection)
- Social Media Analyzer (Detection)

**Downstream Consumers:**
- Resource Coordinator (Response)
- Route Planner (Response)
- Evacuation Manager (Response)
- Command Center (Command)


