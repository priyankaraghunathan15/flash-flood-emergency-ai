# Social Media Sentinel Agent

**Tier:** Detection  
**Role:** Social media monitoring and real-time intelligence gathering  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Social Media Sentinel is a critical early detection agent within the NANDA flash flood emergency response system's Detection tier. It monitors social media platforms in real-time, detects flood-related posts, analyzes community signals, and provides ground-truth intelligence to complement sensor and weather data.

## Purpose

Social media monitoring is essential for:
- Real-time citizen reports of flooding incidents
- Early detection before official sensors activate
- Ground-truth validation of sensor data
- Community sentiment and panic level assessment
- Affected area verification and mapping
- Missing person reports and rescue requests
- Infrastructure damage reports from the public
- Misinformation and rumor detection

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Real-time social media stream processing
- Natural language processing and sentiment analysis
- Geolocation extraction and mapping
- A2A (Agent-to-Agent) protocol communication
- Machine learning for signal classification

### Agent Positioning
```
NANDA System Hierarchy:
├── Detection Tier (Current)
│   ├── Alert Generator
│   ├── Weather Monitor
│   └── Social Media Sentinel ← YOU ARE HERE
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
  - Public Communicator (published updates for monitoring)
  - Command Center (monitoring parameters and keywords)
  
- **Sends to:** 
  - Alert Generator (social signals for alert validation)
  - Situation Assessor (ground-truth reports and sentiment)
  - Pattern Analyzer (social media trends)
  - Command Center (critical social intelligence)

- **Protocol:** A2A messaging via NEST framework

## Core Capabilities

### 1. Real-Time Stream Monitoring
- Twitter/X stream monitoring with keywords
- Facebook public posts and group monitoring
- Instagram hashtag and location tracking
- Reddit community monitoring
- Nextdoor neighborhood reports
- TikTok video analysis
- Multi-platform simultaneous monitoring

### 2. Flood Signal Detection
- Keyword and hashtag filtering
- Image analysis for flood evidence
- Video content analysis
- Geolocation extraction from posts
- Timestamp correlation
- User credibility scoring

### 3. Natural Language Processing
- Sentiment analysis (panic, concern, calm)
- Urgency level classification
- Information extraction (locations, casualties)
- Language detection and translation
- Sarcasm and joke filtering
- Context understanding

### 4. Intelligence Gathering
- Eyewitness report aggregation
- Affected area boundary mapping
- Infrastructure damage reports
- Rescue request identification
- Missing person alerts
- Resource need identification

### 5. Verification & Validation
- Cross-platform verification
- Multiple source confirmation
- Bot and spam filtering
- Fake news detection
- Image reverse search
- Timestamp and location validation

### 6. Trend Analysis
- Emerging topic detection
- Spike pattern recognition
- Geographic clustering
- Temporal correlation
- Viral content tracking
- Misinformation spread monitoring

## Performance Metrics

- **Target Response Time:** < 5 seconds per post analysis
- **System Contribution:** Enables sub-40-second overall response
- **Stream Processing:** 1,000+ posts/minute
- **Signal Detection Accuracy:** 88-93%
- **False Positive Rate:** < 8%
- **Geolocation Success:** 65-75% of relevant posts

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "nlp": "spaCy, NLTK, Transformers",
  "ml": "TensorFlow.js, scikit-learn",
  "vision": "OpenCV, TensorFlow Vision",
  "database": "PostgreSQL + TimescaleDB",
  "streaming": "Apache Kafka",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 8 vCPU, 16GB RAM (high throughput)
- **Storage:** SSD with time-series database
- **Network:** High-bandwidth for stream processing
- **Streaming:** Kafka for message queue

## Installation & Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# NEST framework
npm install @dataworksai/nest

# Python 3.9+ (for NLP models)
python3 --version
```

### Environment Variables
```bash
# Agent Configuration
AGENT_NAME=social-media-sentinel
AGENT_TIER=detection
AGENT_ID=detection-social-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8087

# Database
SOCIAL_DB_URI=postgresql://user:pass@db.example.com:5432/social
TIMESERIES_DB_URI=postgresql://user:pass@db.example.com:5432/timeseries

# Streaming
KAFKA_BROKERS=kafka1.example.com:9092,kafka2.example.com:9092
KAFKA_TOPIC=social-media-stream

# Social Media APIs
TWITTER_API_KEY=your-twitter-key
TWITTER_API_SECRET=your-twitter-secret
TWITTER_BEARER_TOKEN=your-bearer-token
FACEBOOK_ACCESS_TOKEN=your-facebook-token
INSTAGRAM_ACCESS_TOKEN=your-instagram-token
REDDIT_CLIENT_ID=your-reddit-client
REDDIT_CLIENT_SECRET=your-reddit-secret

# NLP Services
NLP_MODEL_PATH=./models/flood-classifier.onnx
SENTIMENT_MODEL_PATH=./models/sentiment-analysis.onnx
OPENAI_API_KEY=your-openai-key

# Image Analysis
VISION_MODEL_PATH=./models/flood-detection-vision.h5
IMAGE_HOSTING_API=your-image-api-key

# Monitoring Parameters
FLOOD_KEYWORDS=flood,flooding,water,inundation,deluge,rising water
FLOOD_HASHTAGS=#flood,#flooding,#flashflood,#emergency
MONITORED_LOCATIONS=Boston,Cambridge,Somerville
GEOFENCE_RADIUS=50  # km
MIN_CONFIDENCE=0.75

# Performance
MAX_STREAM_RATE=1000  # posts per minute
BATCH_SIZE=50
PROCESSING_THREADS=8
CACHE_TTL=300
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/detection/social-media-sentinel

# Install dependencies
npm install
pip install -r requirements.txt

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

# Deploy ML models
npm run models:deploy

# Deploy to Linode
npm run deploy:linode

# Verify agent registration
npm run verify:registry

# Start stream monitoring
npm run stream:start
```

## Usage

### Social Media Monitoring
```javascript
import { SocialMediaSentinel } from './agent';

const sentinel = new SocialMediaSentinel({
  database: process.env.SOCIAL_DB_URI,
  streaming: {
    kafka: process.env.KAFKA_BROKERS
  },
  apis: {
    twitter: {
      key: process.env.TWITTER_API_KEY,
      bearer: process.env.TWITTER_BEARER_TOKEN
    }
  },
  models: {
    nlp: process.env.NLP_MODEL_PATH,
    sentiment: process.env.SENTIMENT_MODEL_PATH
  }
});

// Start monitoring
await sentinel.startMonitoring({
  keywords: ['flood', 'flooding', 'water rising'],
  hashtags: ['#flood', '#flashflood'],
  locations: ['Boston', 'Cambridge'],
  geofence: { lat: 42.3601, lon: -71.0589, radius: 50 }
});
```

### Response Format
```json
{
  "signalId": "soc-20251211-143000",
  "timestamp": "2025-12-11T14:30:00Z",
  "detectionType": "social-media",
  "source": "twitter",
  "posts": [
    {
      "postId": "1234567890",
      "author": "@bostonresident",
      "text": "Water rising fast on Main St! Already knee-deep. Cars stuck. People need help! #flood #boston",
      "timestamp": "2025-12-11T14:29:45Z",
      "location": {
        "extracted": "Main St, Boston",
        "coordinates": { "lat": 42.3601, "lon": -71.0589 },
        "confidence": 0.89
      },
      "media": [
        {
          "type": "image",
          "url": "https://example.com/image.jpg",
          "analysis": {
            "containsFlood": true,
            "waterDepth": "knee-high",
            "confidence": 0.92
          }
        }
      ],
      "sentiment": "urgent",
      "urgency": 0.87,
      "credibility": 0.85
    }
  ],
  "aggregatedSignal": {
    "postCount": 23,
    "uniqueUsers": 19,
    "locationCluster": {
      "center": { "lat": 42.3601, "lon": -71.0589 },
      "radius": 0.5,
      "affectedArea": "Downtown Boston"
    },
    "commonKeywords": ["water rising", "cars stuck", "need help"],
    "avgUrgency": 0.82,
    "sentimentDistribution": {
      "panic": 0.35,
      "concern": 0.50,
      "calm": 0.15
    },
    "timeSpan": "5 minutes"
  },
  "validation": {
    "crossPlatform": true,
    "multipleSources": true,
    "imageVerified": true,
    "locationVerified": true,
    "confidence": 0.91
  },
  "intelligence": {
    "affectedInfrastructure": ["Main St", "Bridge"],
    "reportedCasualties": 0,
    "rescueRequests": 3,
    "trafficImpact": "severe",
    "publicMood": "concerned but responding"
  },
  "recommendations": [
    "Validate with sensor data",
    "Dispatch first responders to Main St",
    "Issue public alert for downtown area",
    "Monitor for escalation"
  ],
  "processingTime": "3.8 seconds"
}
```

### A2A Communication
```javascript
// Send social signals to Alert Generator
sentinel.on('signal:detected', async (signal) => {
  if (signal.validation.confidence >= 0.80) {
    await sentinel.send('alert-generator', {
      type: 'social-signal',
      priority: signal.aggregatedSignal.avgUrgency >= 0.75 ? 'high' : 'medium',
      data: signal
    });
  }
});

// Send ground-truth to Situation Assessor
sentinel.on('intelligence:gathered', async (intel) => {
  await sentinel.send('situation-assessor', {
    type: 'ground-truth-report',
    data: intel
  });
});

// Alert Command Center of critical signals
sentinel.on('signal:critical', async (signal) => {
  await sentinel.send('command-center', {
    type: 'critical-social-intelligence',
    priority: 'immediate',
    data: signal
  });
});
```

## Signal Classification

### Urgency Levels
```javascript
const urgencyScore = {
  critical: urgency >= 0.90,  // "need help now", "trapped"
  high: urgency >= 0.75,      // "water rising fast", "evacuate"
  medium: urgency >= 0.50,    // "flooding reported", "caution"
  low: urgency < 0.50         // "light flooding", "puddles"
};
```

### Post Types
- **Eyewitness Report:** Direct observation of flooding
- **Rescue Request:** Call for help, trapped individuals
- **Infrastructure Damage:** Roads, bridges, utilities
- **Safety Warning:** Community alerts to others
- **Resource Need:** Requests for supplies, shelter
- **Misinformation:** False or misleading content
- **General Discussion:** Background conversation

### Credibility Scoring
```javascript
credibilityScore = weightedSum([
  accountAge * 0.15,
  followerCount * 0.10,
  verifiedStatus * 0.20,
  postHistory * 0.15,
  locationMatch * 0.20,
  mediaEvidence * 0.20
]);
```

## Testing

```bash
# Unit tests
npm run test:unit

# NLP model tests
npm run test:nlp

# Stream processing tests
npm run test:stream

# Integration tests
npm run test:integration

# Image analysis tests
npm run test:vision

# Performance tests
npm run test:performance
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8087/health
```

### Key Metrics
- `posts_processed_total` - Total posts analyzed
- `signals_detected_total` - Flood signals identified
- `processing_duration_seconds` - Analysis time per post
- `stream_throughput` - Posts per minute
- `false_positive_rate` - Incorrect detections
- `credibility_avg` - Average post credibility
- `geolocation_success_rate` - Location extraction success

## Troubleshooting

**Stream Connection Issues**
```bash
npm run check:stream
npm run verify:api-keys
npm run stream:reconnect
```

**High False Positive Rate**
```bash
npm run models:retrain
npm run tune:confidence-threshold
npm run validate:keywords
```

**NLP Processing Slowdown**
```bash
npm run optimize:batch-size
npm run scale:processing-threads
npm run check:model-performance
```

**Geolocation Failures**
```bash
npm run test:geolocation
npm run update:location-database
npm run verify:geocoding-api
```

## Content Analysis

### Image Analysis
```javascript
// Detect flood in images
const analysis = await sentinel.analyzeImage({
  url: imageUrl,
  features: ['flood-detection', 'water-depth', 'infrastructure-damage']
});
```

### Video Analysis
```javascript
// Extract keyframes and analyze
const videoAnalysis = await sentinel.analyzeVideo({
  url: videoUrl,
  frameSampling: 1,  // every second
  features: ['flood-detection', 'people-count', 'urgency']
});
```

### Text Analysis
```javascript
// Extract structured information
const extraction = await sentinel.extractInformation({
  text: postText,
  extract: ['location', 'casualties', 'infrastructure', 'time']
});
```

## Privacy & Ethics

### Privacy Protection
- No personal identification collection
- Aggregated statistics only
- No individual tracking
- Public posts only (no private messages)
- Anonymized data storage
- GDPR compliance

### Ethical Guidelines
- Transparent monitoring practices
- Respect user privacy
- No profiling or targeting
- Emergency use only
- Human oversight required
- Regular bias audits

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

**Downstream:**
- Situation Assessor (Analysis)
- Pattern Analyzer (Analysis)
- Command Center (Command)

