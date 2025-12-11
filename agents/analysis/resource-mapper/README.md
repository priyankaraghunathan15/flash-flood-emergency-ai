# Resource Mapper Agent

**Tier:** Analysis  
**Role:** Real-time resource availability mapping and tracking  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Resource Mapper is a critical agent within the NANDA flash flood emergency response system. It maintains real-time awareness of all available emergency resources, their locations, status, and capabilities, enabling optimal resource allocation during crisis response.

## Purpose

Real-time resource mapping is essential for:
- Tracking emergency service locations (fire, police, EMS)
- Monitoring hospital and medical facility availability
- Mapping evacuation shelters and safe zones
- Tracking rescue equipment and vehicle availability
- Monitoring road closures and route accessibility
- Identifying volunteer and community resource availability
- Managing supply inventories (food, water, medical supplies)

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Real-time resource status tracking
- Geospatial indexing and proximity search
- A2A (Agent-to-Agent) protocol communication
- Dynamic resource availability updates
- Capacity and capability modeling

### Agent Positioning
```
NANDA System Hierarchy:
├── Detection Tier
│   ├── Alert Generator
│   ├── Weather Monitor
│   └── Social Media Analyzer
├── Analysis Tier (Current)
│   ├── Pattern Analyzer
│   ├── Resource Mapper ← YOU ARE HERE
│   └── Situation Assessor
├── Response Tier
│   ├── Resource Coordinator
│   ├── Route Planner
│   └── Evacuation Manager
└── Command Tier
    └── Command Center
```

### Communication Flow
- **Receives from:** 
  - Alert Generator (incident locations)
  - Weather Monitor (affected areas)
  - Resource Coordinator (resource status updates)
  - Route Planner (accessibility changes)
  
- **Sends to:** 
  - Resource Coordinator (resource availability data)
  - Route Planner (resource locations for routing)
  - Situation Assessor (resource coverage analysis)
  - Command Center (resource status reports)

- **Protocol:** A2A messaging via NEST framework

## Core Capabilities

### 1. Resource Inventory Management
- Emergency Services (Fire, Police, EMS, Rescue Teams)
- Medical Facilities (Hospitals, Clinics, Field Units)
- Shelters (Schools, Community Centers, Hotels)
- Equipment (Boats, Helicopters, Pumps, Generators)
- Supplies (Food, Water, Medical Kits, Blankets)
- Personnel (First Responders, Volunteers, Specialists)

### 2. Geospatial Mapping
- Real-time location tracking of mobile resources
- Proximity search for nearest available resources
- Coverage area analysis for emergency services
- Accessibility mapping based on road conditions
- Multi-layer resource visualization

### 3. Capacity Tracking
- Current vs. maximum capacity monitoring
- Resource utilization rates
- Availability status (available, deployed, unavailable)
- Response time estimates based on location
- Resource capability matching to incident needs

### 4. Dynamic Updates
- Real-time status changes from field operations
- Integration with external emergency management systems
- Automatic capacity recalculation
- Resource deployment tracking
- Return-to-service monitoring

## Performance Metrics

- **Target Response Time:** < 8 seconds for resource queries
- **System Contribution:** Enables sub-40-second overall response
- **Geospatial Query Speed:** < 2 seconds for proximity searches
- **Update Latency:** < 3 seconds for status changes
- **Resource Coverage:** 100+ emergency assets tracked
- **Concurrent Queries:** 100+ queries/minute

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "geospatial": "PostGIS / MongoDB Geospatial",
  "messaging": "A2A Protocol",
  "cache": "Redis (resource status)",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 4 vCPU, 8GB RAM
- **Storage:** Geospatial database with indexing
- **Network:** Private VLAN for agent communication
- **Cache Layer:** Redis for fast resource lookups

## Installation & Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# NEST framework
npm install @dataworksai/nest

# PostGIS or MongoDB with geospatial support
# Redis for caching
```

### Environment Variables
```bash
# Agent Configuration
AGENT_NAME=resource-mapper
AGENT_TIER=analysis
AGENT_ID=analysis-resource-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8082

# Database
RESOURCE_DB_URI=postgresql://user:pass@db.example.com:5432/resources
GEOSPATIAL_INDEX=postgis

# Cache
REDIS_URI=redis://cache.example.com:6379
CACHE_TTL=300

# External Systems
EMERGENCY_MGMT_API=https://ems.gov/api
EMS_API_KEY=your-api-key

# Performance
MAX_CONCURRENT_QUERIES=100
PROXIMITY_SEARCH_RADIUS=50  # km
UPDATE_BATCH_SIZE=50
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/analysis/resource-mapper

# Install dependencies
npm install

# Setup database
npm run db:setup
npm run db:seed

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

# Deploy to Linode
npm run deploy:linode

# Verify agent registration
npm run verify:registry

# Initialize resource database
npm run resources:init
```

## Usage

### Resource Query
```javascript
import { ResourceMapper } from './agent';

const mapper = new ResourceMapper({
  database: process.env.RESOURCE_DB_URI,
  cache: process.env.REDIS_URI
});

// Query resources near incident location
const resources = await mapper.findNearbyResources({
  location: { lat: 42.3601, lon: -71.0589 },
  radius: 10,  // km
  types: ['rescue-team', 'hospital', 'shelter'],
  status: 'available'
});
```

### Response Format
```json
{
  "queryId": "res-20251211-143000",
  "location": { "lat": 42.3601, "lon": -71.0589 },
  "radius": 10,
  "timestamp": "2025-12-11T14:30:00Z",
  "resources": [
    {
      "id": "rescue-team-001",
      "type": "rescue-team",
      "name": "Boston Fire Rescue Squad 3",
      "location": { "lat": 42.3555, "lon": -71.0602 },
      "distance": 0.6,
      "status": "available",
      "capacity": {
        "personnel": 6,
        "boats": 2,
        "equipment": ["rescue-gear", "medical-kit"]
      },
      "responseTime": "4 minutes",
      "capabilities": ["water-rescue", "medical-first-aid"],
      "contact": "+1-617-555-0100"
    },
    {
      "id": "hospital-015",
      "type": "hospital",
      "name": "Massachusetts General Hospital",
      "location": { "lat": 42.3632, "lon": -71.0686 },
      "distance": 1.2,
      "status": "available",
      "capacity": {
        "beds": 45,
        "icu": 12,
        "emergency": 8
      },
      "responseTime": "7 minutes",
      "capabilities": ["trauma", "emergency", "critical-care"],
      "contact": "+1-617-555-0200"
    },
    {
      "id": "shelter-042",
      "type": "shelter",
      "name": "Central Community Center",
      "location": { "lat": 42.3580, "lon": -71.0550 },
      "distance": 0.8,
      "status": "available",
      "capacity": {
        "people": 200,
        "current": 0,
        "remaining": 200
      },
      "amenities": ["food", "water", "blankets", "medical"],
      "accessibility": "wheelchair-accessible",
      "contact": "+1-617-555-0300"
    }
  ],
  "summary": {
    "totalFound": 3,
    "byType": {
      "rescue-team": 1,
      "hospital": 1,
      "shelter": 1
    },
    "avgResponseTime": "5.3 minutes",
    "coverageGaps": []
  },
  "queryTime": "1.8 seconds"
}
```

### Resource Status Update
```javascript
// Update resource status
await mapper.updateResourceStatus({
  resourceId: 'rescue-team-001',
  status: 'deployed',
  location: { lat: 42.3601, lon: -71.0589 },
  deployedTo: 'incident-20251211-001',
  estimatedReturn: '2025-12-11T16:00:00Z'
});
```

### Capacity Check
```javascript
// Check shelter capacity
const capacity = await mapper.checkCapacity({
  type: 'shelter',
  location: { lat: 42.3601, lon: -71.0589 },
  radius: 15,
  requiredCapacity: 500
});
```

### A2A Communication Example
```javascript
// Receive resource request from Resource Coordinator
mapper.on('message:resource-coordinator', async (message) => {
  if (message.type === 'resource-query') {
    const resources = await mapper.findNearbyResources(message.data);
    
    await mapper.send('resource-coordinator', {
      type: 'resource-availability',
      queryId: message.queryId,
      data: resources
    });
  }
});

// Send status update to Command Center
mapper.on('resource:status-change', async (update) => {
  await mapper.send('command-center', {
    type: 'resource-status-update',
    priority: 'medium',
    data: update
  });
});
```

## Resource Types

### Emergency Services
```javascript
{
  type: 'rescue-team',
  capabilities: ['water-rescue', 'technical-rescue', 'search-rescue'],
  equipment: ['boats', 'ropes', 'medical-kits'],
  personnel: 4-8
}
```

### Medical Facilities
```javascript
{
  type: 'hospital',
  capabilities: ['trauma', 'emergency', 'surgery', 'critical-care'],
  capacity: { beds, icu, emergency },
  services: ['ambulance', 'helicopter']
}
```

### Shelters
```javascript
{
  type: 'shelter',
  capacity: { people, pets },
  amenities: ['food', 'water', 'medical', 'blankets'],
  accessibility: ['wheelchair', 'medical-equipment']
}
```

### Equipment
```javascript
{
  type: 'equipment',
  category: ['vehicle', 'boat', 'helicopter', 'pump', 'generator'],
  status: 'available|deployed|maintenance',
  location: { mobile|fixed }
}
```

## Testing

### Unit Tests
```bash
npm run test:unit

# Test geospatial queries
npm run test:geospatial

# Test coverage
npm run test:coverage
```

### Integration Tests
```bash
# Test A2A communication
npm run test:integration

# Test with Resource Coordinator
npm run test:coordinator
```

### Performance Tests
```bash
# Benchmark query performance
npm run test:performance

# Load testing
npm run test:load

# Geospatial index performance
npm run test:geo-performance
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8082/health
```

### Metrics Endpoint
```bash
curl http://localhost:8082/metrics
```

### Key Metrics
- `resource_queries_total` - Total resource queries processed
- `resource_query_duration_seconds` - Query duration histogram
- `resources_tracked` - Total resources in system
- `resource_availability_rate` - % of resources available
- `cache_hit_rate` - Resource query cache hit rate
- `geospatial_query_duration` - Proximity search performance

## Troubleshooting

### Common Issues

**Slow Geospatial Queries**
```bash
# Check geospatial index
npm run geo:check-index

# Rebuild spatial index
npm run geo:reindex

# Verify database performance
npm run db:analyze
```

**Stale Resource Data**
```bash
# Force cache refresh
npm run cache:flush

# Sync with external systems
npm run sync:external

# Verify update pipeline
npm run updates:verify
```

**Resource Status Mismatch**
```bash
# Reconcile resource states
npm run resources:reconcile

# Check update logs
npm run logs:updates

# Manual status correction
npm run resources:correct
```

## Performance Optimization

### Caching Strategy
- Resource locations cached for 5 minutes
- Status updates cached for 1 minute
- Geospatial query results cached for 2 minutes
- Capacity calculations cached for 3 minutes

### Database Optimization
- Geospatial indexes on location columns
- Composite indexes on (type, status, location)
- Partitioning by resource type
- Connection pooling for high concurrency

### Query Optimization
- Bounding box pre-filtering for proximity searches
- Batch status updates
- Lazy loading of detailed resource info
- Parallel queries for multiple resource types

## Data Sources

### Internal
- Resource registration database
- Deployment tracking system
- Capacity management system

### External Integration
- Emergency Management Systems (EMS)
- 911 Dispatch Centers
- Hospital Emergency Departments
- Red Cross Shelter Network
- Municipal Resource Databases

### Real-time Updates
- Field operations mobile apps
- Resource status webhooks
- Automated vehicle tracking
- Facility management systems

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
- [Resource Database Schema](./docs/schema.md)

## Related Agents

**Analysis Tier:**
- Pattern Analyzer (historical pattern analysis)
- Situation Assessor (real-time situation assessment)

**Upstream Dependencies:**
- Alert Generator (Detection)
- Weather Monitor (Detection)

**Downstream Consumers:**
- Resource Coordinator (Response)
- Route Planner (Response)
- Evacuation Manager (Response)
- Command Center (Command)

