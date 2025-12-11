# News Alert Scanner Agent

**Tier:** Detection  
**Role:** News media monitoring and official alert aggregation  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The News Alert Scanner is a media intelligence agent within the NANDA flash flood emergency response system's Detection tier. It monitors news outlets, emergency broadcasts, government alerts, and official channels to detect flood incidents, validate information, and provide authoritative context to complement sensor data and social signals.

## Purpose

News and alert monitoring is essential for:
- Official emergency alert detection (EAS, IPAWS)
- Breaking news coverage of flood incidents
- Government agency announcements and warnings
- Weather service alerts and advisories
- Local news station emergency reports
- Press release monitoring from authorities
- Cross-validation of incident information
- Historical context and similar event references

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Multi-source news feed aggregation
- RSS/Atom feed monitoring
- Web scraping and content extraction
- A2A (Agent-to-Agent) protocol communication
- Natural language understanding for news content

### Agent Positioning
```
NANDA System Hierarchy:
├── Detection Tier (Current)
│   ├── Alert Generator
│   ├── Weather Monitor
│   ├── Social Media Sentinel
│   └── News Alert Scanner ← YOU ARE HERE
├── Analysis Tier
│   ├── Pattern Analyzer
│   ├── Resource Mapper
│   └── Situation Assessor
├── Response Tier
│   ├── Resource Coordinator
│   ├── Route Planner
│   ├── Evacuation Manager
│   ├── Emergency Dispatcher
│   ├── Medical Triage
│   └── Public Communicator
└── Command Tier
    └── Command Center
```

### Communication Flow
- **Receives from:** 
  - Command Center (monitoring parameters and priorities)
  - Weather Monitor (correlation with weather alerts)
  
- **Sends to:** 
  - Alert Generator (official alert validation)
  - Situation Assessor (authoritative context)
  - Pattern Analyzer (historical event data)
  - Command Center (critical news intelligence)

- **Protocol:** A2A messaging via NEST framework

## Core Capabilities

### 1. Official Alert Monitoring
- IPAWS (Integrated Public Alert & Warning System)
- Emergency Alert System (EAS) broadcasts
- NOAA Weather Radio alerts
- FEMA notifications
- State emergency management alerts
- Local government emergency broadcasts
- Wireless Emergency Alerts (WEA)

### 2. News Source Monitoring
- National news networks (CNN, NBC, ABC, CBS, Fox)
- Local news stations and affiliates
- Wire services (AP, Reuters, Bloomberg)
- Online news platforms
- Government news releases
- Emergency management press releases
- Weather service bulletins

### 3. Content Analysis
- Breaking news detection
- Incident extraction (who, what, when, where)
- Severity assessment from reporting
- Official statement identification
- Expert quote extraction
- Casualty and damage reports
- Timeline reconstruction

### 4. Source Verification
- Authoritative source identification
- Cross-reference validation
- Official vs. unofficial distinction
- Publication timestamp verification
- Retraction and correction tracking
- Editorial vs. factual content separation

### 5. Alert Correlation
- Multi-source confirmation
- Sensor data validation
- Social media cross-reference
- Weather alert correlation
- Geographic boundary verification
- Timeline synchronization

## Performance Metrics

- **Target Response Time:** < 8 seconds per article analysis
- **System Contribution:** Enables sub-40-second overall response
- **Source Monitoring:** 200+ feeds simultaneously
- **Detection Accuracy:** 94-98% (official sources)
- **False Positive Rate:** < 3%
- **Update Frequency:** Real-time to 5-minute intervals

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "scraping": "Puppeteer, Cheerio",
  "nlp": "spaCy, Transformers",
  "rss": "feedparser, rss-parser",
  "database": "PostgreSQL",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 4 vCPU, 8GB RAM
- **Storage:** SSD with article archive
- **Network:** High-bandwidth for feed polling
- **Cache:** Redis for deduplication

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
AGENT_NAME=news-alert-scanner
AGENT_TIER=detection
AGENT_ID=detection-news-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8088

# Database
NEWS_DB_URI=postgresql://user:pass@db.example.com:5432/news
ALERT_DB_URI=postgresql://user:pass@db.example.com:5432/alerts
REDIS_URI=redis://cache.example.com:6379

# Official Alert APIs
IPAWS_ENDPOINT=https://ipaws.fema.gov/api
IPAWS_API_KEY=your-ipaws-key
NOAA_ALERTS_ENDPOINT=https://api.weather.gov/alerts
FEMA_API_ENDPOINT=https://fema.gov/api
STATE_EMA_ENDPOINT=https://ema.state.gov/api

# News APIs
NEWS_API_KEY=your-newsapi-key
GOOGLE_NEWS_API_KEY=your-google-news-key
BING_NEWS_API_KEY=your-bing-news-key

# RSS Feeds
FEED_UPDATE_INTERVAL=300  # 5 minutes
MAX_FEEDS=200
FEED_TIMEOUT=10000  # ms

# Web Scraping
USER_AGENT=NANDA-NewsScanner/1.0
SCRAPE_TIMEOUT=15000
MAX_CONCURRENT_SCRAPES=10

# NLP Models
NLP_MODEL_PATH=./models/news-classifier.onnx
ENTITY_MODEL_PATH=./models/entity-extraction.onnx

# Filtering
FLOOD_KEYWORDS=flood,flooding,flash flood,inundation,deluge
MONITORED_REGIONS=Massachusetts,Boston,New England
MIN_RELEVANCE=0.80
MIN_AUTHORITY=0.85

# Performance
CACHE_TTL=3600
DEDUP_WINDOW=86400  # 24 hours
MAX_ARTICLES_PER_SCAN=100
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/detection/news-alert-scanner

# Install dependencies
npm install

# Configure environment
cp .env.example .env
vim .env

# Import RSS feeds
npm run feeds:import

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

# Start monitoring
npm run monitor:start
```

## Usage

### News Monitoring
```javascript
import { NewsAlertScanner } from './agent';

const scanner = new NewsAlertScanner({
  database: process.env.NEWS_DB_URI,
  cache: process.env.REDIS_URI,
  apis: {
    ipaws: process.env.IPAWS_ENDPOINT,
    noaa: process.env.NOAA_ALERTS_ENDPOINT,
    newsApi: process.env.NEWS_API_KEY
  },
  models: {
    nlp: process.env.NLP_MODEL_PATH
  }
});

// Start monitoring
await scanner.startMonitoring({
  keywords: ['flood', 'flash flood', 'flooding'],
  regions: ['Boston', 'Massachusetts'],
  sources: ['official', 'news', 'weather']
});
```

### Response Format
```json
{
  "scanId": "news-20251211-143000",
  "timestamp": "2025-12-11T14:30:00Z",
  "detectionType": "news-alert",
  "alerts": [
    {
      "alertId": "ipaws-20251211-001",
      "type": "official-alert",
      "source": "IPAWS",
      "authority": "FEMA",
      "severity": "Extreme",
      "urgency": "Immediate",
      "certainty": "Observed",
      "title": "Flash Flood Emergency",
      "description": "Flash flooding in progress in downtown Boston. Immediate evacuation recommended.",
      "location": {
        "area": "Downtown Boston, MA",
        "polygon": [[42.3601, -71.0589], [42.3620, -71.0600], [42.3590, -71.0580]],
        "affectedPopulation": 3500
      },
      "issued": "2025-12-11T14:28:00Z",
      "expires": "2025-12-11T17:28:00Z",
      "authorityScore": 1.0
    }
  ],
  "newsArticles": [
    {
      "articleId": "news-20251211-001",
      "source": "Boston Globe",
      "sourceType": "local-news",
      "authorityScore": 0.92,
      "title": "Flash Flooding Hits Downtown Boston",
      "url": "https://bostonglobe.com/article/flash-flood-2025",
      "published": "2025-12-11T14:29:30Z",
      "excerpt": "Severe flash flooding struck downtown Boston this afternoon, with water levels rising rapidly on Main Street...",
      "entities": {
        "locations": ["Main Street", "Downtown Boston", "Financial District"],
        "casualties": "No injuries reported",
        "officials": ["Mayor Michelle Wu", "Fire Chief"],
        "infrastructure": ["Main Street closed", "MBTA service disrupted"]
      },
      "relevanceScore": 0.96,
      "sentiment": "serious",
      "keyPoints": [
        "Flooding began at 2:25 PM",
        "Main Street closed to traffic",
        "Evacuation shelters opened",
        "No injuries reported so far"
      ]
    }
  ],
  "aggregatedIntelligence": {
    "incidentConfirmed": true,
    "officialAlertPresent": true,
    "newsConfirmation": true,
    "sourceCount": 8,
    "firstReportTime": "2025-12-11T14:28:00Z",
    "consensusLocation": "Downtown Boston",
    "consensusSeverity": "high",
    "officialActions": [
      "Emergency alert issued",
      "Evacuation recommended",
      "Shelters opened"
    ],
    "reportedImpact": {
      "casualties": "none confirmed",
      "infrastructure": "roads closed, transit disrupted",
      "evacuations": "in progress",
      "economicImpact": "businesses closed"
    }
  },
  "validation": {
    "multiSourceConfirmed": true,
    "officialVerification": true,
    "timelineConsistent": true,
    "locationVerified": true,
    "confidence": 0.97
  },
  "recommendations": [
    "Treat as confirmed incident",
    "Correlate with sensor data",
    "Monitor for updates every 5 minutes",
    "Alert Command Center immediately"
  ],
  "processingTime": "6.2 seconds"
}
```

### A2A Communication
```javascript
// Send official alerts to Alert Generator
scanner.on('official-alert:detected', async (alert) => {
  await scanner.send('alert-generator', {
    type: 'official-alert',
    priority: 'critical',
    data: alert
  });
});

// Send news intelligence to Situation Assessor
scanner.on('news:analyzed', async (intelligence) => {
  await scanner.send('situation-assessor', {
    type: 'news-intelligence',
    data: intelligence
  });
});

// Alert Command Center of critical developments
scanner.on('breaking-news:critical', async (news) => {
  await scanner.send('command-center', {
    type: 'breaking-news-alert',
    priority: 'immediate',
    data: news
  });
});

// Provide historical context to Pattern Analyzer
scanner.on('historical-reference:found', async (context) => {
  await scanner.send('pattern-analyzer', {
    type: 'historical-context',
    data: context
  });
});
```

## Source Categories

### Official Sources (Authority: 0.95-1.0)
- FEMA alerts
- NOAA Weather Service
- State Emergency Management
- Local government emergency notifications
- National Weather Service bulletins
- USGS flood warnings

### Major News (Authority: 0.85-0.95)
- AP, Reuters wire services
- Major networks (CNN, NBC, ABC, CBS)
- National newspapers (NYT, WSJ, WaPo)
- Regional major outlets

### Local News (Authority: 0.75-0.90)
- Local TV stations
- Local newspapers
- Regional radio stations
- Community news sites

### Specialty (Authority: 0.70-0.85)
- Weather outlets (Weather Channel, Weather Underground)
- Emergency management blogs
- First responder networks
- Scientific publications

## Content Extraction

### Key Information Extracted
```javascript
const extraction = {
  incident: {
    type: 'flash flood',
    location: 'Downtown Boston',
    startTime: '2025-12-11T14:25:00Z',
    severity: 'high'
  },
  impact: {
    casualties: 'none reported',
    infrastructure: ['roads', 'transit'],
    evacuations: 'in progress',
    economicImpact: 'moderate'
  },
  response: {
    agencies: ['Fire', 'Police', 'EMS'],
    actions: ['evacuations', 'road closures'],
    shelters: ['Community Center']
  },
  officials: [
    { name: 'Mayor Wu', quote: '...', role: 'Mayor' }
  ]
};
```

## Testing

```bash
# Unit tests
npm run test:unit

# Feed parsing tests
npm run test:feeds

# Scraping tests
npm run test:scraping

# NLP extraction tests
npm run test:extraction

# Integration tests
npm run test:integration

# Alert API tests
npm run test:alerts
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8088/health
```

### Key Metrics
- `articles_scanned_total` - Total articles processed
- `alerts_detected_total` - Official alerts detected
- `scan_duration_seconds` - Processing time per article
- `feed_update_latency` - RSS feed polling latency
- `source_reliability_avg` - Average source authority
- `detection_accuracy` - Incident detection accuracy

## Troubleshooting

**Feed Connection Issues**
```bash
npm run check:feeds
npm run verify:rss-endpoints
npm run feeds:refresh
```

**API Rate Limiting**
```bash
npm run check:rate-limits
npm run rotate:api-keys
npm run scale:request-rate
```

**Scraping Failures**
```bash
npm run test:scraping
npm run update:selectors
npm run check:user-agent
```

**Duplicate Detection**
```bash
npm run check:dedup-cache
npm run tune:similarity-threshold
npm run clean:duplicates
```

## RSS Feed Management

### Feed Sources
```javascript
const feeds = {
  official: [
    'https://alerts.weather.gov/cap/ma.atom',
    'https://fema.gov/rss/disasters.xml'
  ],
  news: [
    'https://bostonglobe.com/rss/breaking',
    'https://boston.com/feed'
  ],
  weather: [
    'https://weather.gov/alerts/ma.rss',
    'https://wunderground.com/rss/boston'
  ]
};
```

### Feed Management
```bash
# Add new feed
npm run feeds:add -- --url "https://example.com/rss" --category "news"

# Remove feed
npm run feeds:remove -- --id "feed-001"

# List all feeds
npm run feeds:list

# Test feed
npm run feeds:test -- --id "feed-001"
```

## Alert Priority System

### Critical (Priority 1)
- Official emergency alerts (IPAWS, EAS)
- Breaking news from major networks
- Government emergency announcements
- Immediate threat notifications

### High (Priority 2)
- Weather service warnings
- Local news breaking reports
- Major infrastructure incidents
- Casualty reports

### Medium (Priority 3)
- Weather advisories
- Developing situations
- Official statements
- Expert analysis

### Low (Priority 4)
- Background coverage
- Historical context
- Opinion pieces
- General discussion

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
- [Detection Tier Overview](../README.md)

## Related Agents

**Detection Tier:**
- Alert Generator
- Weather Monitor
- Social Media Sentinel

**Downstream:**
- Situation Assessor (Analysis)
- Pattern Analyzer (Analysis)
- Command Center (Command)

