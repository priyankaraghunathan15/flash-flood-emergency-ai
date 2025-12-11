# Public Communicator Agent

**Tier:** Response  
**Role:** Public information management and community engagement  
**System:** NANDA (Network of Autonomous Distributed Agents)

## Overview

The Public Communicator is a specialized information dissemination agent within the NANDA flash flood emergency response system's Response tier. It manages public-facing communications, provides real-time updates, answers community inquiries, and maintains transparent information flow during flash flood emergencies.

## Purpose

Public communication is essential for:
- Real-time incident updates to affected communities
- Safety instructions and guidance dissemination
- Social media monitoring and response
- Community inquiry management and FAQ handling
- Multi-channel information distribution
- Public trust and transparency maintenance
- Misinformation detection and correction
- Post-incident information and recovery guidance

## System Architecture

### Framework
Built on **NEST** (Network of Embedded Semantic Tools) from DataWorksAI:
- Multi-channel content distribution
- Natural language generation for updates
- Social media API integration
- A2A (Agent-to-Agent) protocol communication
- Community sentiment analysis

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
│   ├── Medical Triage
│   └── Public Communicator ← YOU ARE HERE
└── Command Tier
    └── Command Center
```

### Communication Flow
- **Receives from:** 
  - Situation Assessor (incident status and updates)
  - Evacuation Manager (evacuation progress and instructions)
  - Route Planner (road closures and safe routes)
  - Medical Triage (safety and health guidance)
  - Command Center (approved public messaging)
  
- **Sends to:** 
  - Social Media Analyzer (public sentiment feedback)
  - Command Center (public communication reports)
  - Emergency Dispatcher (coordination for alerts)

- **Protocol:** A2A messaging via NEST framework

## Core Capabilities

### 1. Multi-Channel Communication
- Social media posting (Twitter, Facebook, Instagram)
- Website updates and emergency pages
- Mobile app notifications
- Email newsletters
- Community hotline information
- Digital signage updates

### 2. Real-Time Updates
- Incident status progression
- Evacuation instructions and updates
- Road closure notifications
- Shelter availability information
- Safety guidance and tips
- All-clear notifications

### 3. Community Engagement
- Social media monitoring and response
- Public inquiry handling
- FAQ generation and updates
- Chatbot integration for common questions
- Community feedback collection
- Accessibility accommodations (sign language, Braille)

### 4. Content Generation
- Automated update templates
- Multi-language content translation
- Age-appropriate messaging (children, elderly)
- Visual content creation (maps, infographics)
- Video briefing scripts
- Press release drafts

### 5. Misinformation Management
- False information detection
- Rumor tracking and correction
- Fact-checking coordination
- Authoritative source verification
- Coordinated correction campaigns

### 6. Sentiment Analysis
- Public mood monitoring
- Concern identification
- Panic level assessment
- Community needs detection
- Communication effectiveness tracking

## Performance Metrics

- **Target Response Time:** < 3 seconds for standard updates
- **System Contribution:** Enables sub-40-second overall response
- **Update Frequency:** Every 5-15 minutes during active incidents
- **Multi-Channel Distribution:** < 5 seconds across all platforms
- **Inquiry Response Time:** < 2 minutes for automated responses
- **Public Reach:** 10,000+ simultaneous audience

## Technical Stack

### Dependencies
```json
{
  "framework": "NEST (DataWorksAI)",
  "runtime": "Node.js 18+",
  "database": "PostgreSQL",
  "messaging": "A2A Protocol",
  "social": "Twitter API, Facebook Graph API",
  "nlp": "OpenAI GPT / Claude API",
  "monitoring": "NEST Telemetry"
}
```

### Infrastructure
- **Platform:** Linode cloud hosting
- **Compute:** 4 vCPU, 8GB RAM
- **Storage:** SSD with content archive
- **Network:** Private VLAN + public API endpoints
- **CDN:** Content delivery for media assets

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
AGENT_NAME=public-communicator
AGENT_TIER=response
AGENT_ID=response-public-001

# A2A Protocol
A2A_ENDPOINT=https://nest-registry.linode.example.com
A2A_PORT=8086

# Database
CONTENT_DB_URI=postgresql://user:pass@db.example.com:5432/content
MESSAGE_LOG_URI=postgresql://user:pass@db.example.com:5432/messages

# Social Media APIs
TWITTER_API_KEY=your-twitter-key
TWITTER_API_SECRET=your-twitter-secret
TWITTER_ACCESS_TOKEN=your-access-token
TWITTER_ACCESS_SECRET=your-access-secret
FACEBOOK_PAGE_TOKEN=your-facebook-token
FACEBOOK_PAGE_ID=your-page-id
INSTAGRAM_ACCESS_TOKEN=your-instagram-token

# Website Integration
WEBSITE_CMS_API=https://website.example.com/api
WEBSITE_API_KEY=your-website-key
EMERGENCY_PAGE_URL=https://emergency.example.com

# Mobile App
FIREBASE_PROJECT_ID=your-firebase-project
FIREBASE_API_KEY=your-firebase-key
PUSH_NOTIFICATION_KEY=your-push-key

# NLP Services
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
TRANSLATION_API_KEY=your-translation-key

# Content Settings
DEFAULT_LANGUAGE=en
SUPPORTED_LANGUAGES=en,es,zh,pt,fr
UPDATE_FREQUENCY=300  # seconds
MAX_TWEET_LENGTH=280
MAX_POST_LENGTH=2000

# Performance
MAX_CONCURRENT_POSTS=50
RATE_LIMIT_WINDOW=900  # 15 minutes
```

### Local Development
```bash
# Clone repository
git clone https://github.com/priyankaraghunathan15/flash-flood-emergency-ai.git
cd flash-flood-emergency-ai/agents/response/public-communicator

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

### Public Update
```javascript
import { PublicCommunicator } from './agent';

const communicator = new PublicCommunicator({
  database: process.env.CONTENT_DB_URI,
  social: {
    twitter: {
      key: process.env.TWITTER_API_KEY,
      secret: process.env.TWITTER_API_SECRET
    },
    facebook: {
      token: process.env.FACEBOOK_PAGE_TOKEN
    }
  }
});

// Publish incident update
const update = await communicator.publishUpdate({
  incident: {
    id: 'incident-20251211-001',
    status: 'active',
    severity: 'high',
    location: 'Downtown Boston'
  },
  message: {
    type: 'evacuation-update',
    priority: 'high',
    content: 'Evacuation of Zone A is 60% complete. Shelter available at Central Community Center.'
  }
});
```

### Response Format
```json
{
  "updateId": "pub-20251211-143000",
  "timestamp": "2025-12-11T14:30:00Z",
  "incident": {
    "id": "incident-20251211-001",
    "status": "active"
  },
  "publications": {
    "twitter": {
      "status": "published",
      "tweetId": "1234567890",
      "url": "https://twitter.com/BostonEmergency/status/1234567890",
      "reach": 3500,
      "timestamp": "14:30:02"
    },
    "facebook": {
      "status": "published",
      "postId": "9876543210",
      "url": "https://facebook.com/BostonEmergency/posts/9876543210",
      "reach": 5200,
      "timestamp": "14:30:03"
    },
    "website": {
      "status": "published",
      "pageId": "emergency-update-001",
      "url": "https://emergency.example.com/updates/001",
      "timestamp": "14:30:01"
    },
    "mobileApp": {
      "status": "published",
      "notificationsSent": 8500,
      "delivered": 8497,
      "timestamp": "14:30:04"
    }
  },
  "content": {
    "en": "🚨 EVACUATION UPDATE: Zone A evacuation 60% complete. Shelter available at Central Community Center (123 Main St). Bring ID and essentials. Pets welcome. #BostonFlood",
    "es": "🚨 ACTUALIZACIÓN DE EVACUACIÓN: Evacuación de Zona A 60% completa. Refugio disponible en Centro Comunitario Central (123 Main St). Traiga ID y artículos esenciales. Se aceptan mascotas.",
    "zh": "🚨 疏散更新：A区疏散完成60%。中央社区中心有庇护所（主街123号）。请携带身份证件和必需品。欢迎携带宠物。"
  },
  "engagement": {
    "likes": 142,
    "shares": 67,
    "comments": 23,
    "sentiment": "concerned but calm"
  },
  "processingTime": "2.3 seconds"
}
```

### A2A Communication
```javascript
// Receive situation updates
communicator.on('message:situation-assessor', async (message) => {
  const update = await communicator.generateUpdate({
    situation: message.data,
    type: 'status-update',
    urgency: message.data.severity.level
  });
  
  await communicator.publishUpdate(update);
  
  // Notify Command Center
  await communicator.send('command-center', {
    type: 'public-update-published',
    updateId: update.updateId
  });
});

// Receive evacuation updates
communicator.on('message:evacuation-manager', async (message) => {
  await communicator.publishUpdate({
    type: 'evacuation-progress',
    data: message.data
  });
});

// Send sentiment analysis
communicator.on('sentiment:detected', async (sentiment) => {
  await communicator.send('social-media-analyzer', {
    type: 'public-sentiment',
    data: sentiment
  });
});
```

## Content Templates

### Incident Alert
```
🚨 FLASH FLOOD ALERT

Flash flooding reported in [LOCATION].
Status: [ACTIVE/DEVELOPING/RECEDING]
Severity: [LEVEL]

ACTIONS:
• [ACTION_1]
• [ACTION_2]

Shelter: [SHELTER_NAME] ([ADDRESS])
Updates: [URL]
#[HASHTAG]
```

### Evacuation Notice
```
⚠️ EVACUATION NOTICE

Immediate evacuation ordered for [ZONES].
Time: [TIMEFRAME]

WHAT TO BRING:
• ID and important documents
• Medications
• Phone charger
• Essentials for 72 hours

Shelter: [SHELTER_NAME]
Pets: [POLICY]
Assistance: Call [PHONE]

#[HASHTAG]
```

### All-Clear
```
✅ ALL CLEAR

Flash flood emergency in [LOCATION] has ended.
Time: [TIMESTAMP]

NEXT STEPS:
• Return only when authorities confirm safe
• Check for damage before entering buildings
• Report hazards: [PHONE]
• Cleanup resources: [URL]

Thank you for your cooperation.
#[HASHTAG]
```

## Testing

```bash
# Unit tests
npm run test:unit

# Content generation tests
npm run test:content

# Social media API tests
npm run test:social

# Integration tests
npm run test:integration

# Multi-language tests
npm run test:languages
```

## Monitoring & Telemetry

### Health Check
```bash
curl http://localhost:8086/health
```

### Key Metrics
- `updates_published_total` - Total public updates
- `publication_duration_seconds` - Publication time
- `channel_reach_total` - Total audience reached
- `engagement_rate` - Public engagement metrics
- `sentiment_score` - Community sentiment
- `misinformation_detected` - False info instances

## Troubleshooting

**Social Media API Failures**
```bash
npm run check:social-apis
npm run verify:tokens
npm run test:credentials
```

**Content Generation Issues**
```bash
npm run test:templates
npm run validate:content
npm run check:nlp-service
```

**Multi-Language Problems**
```bash
npm run test:translation
npm run validate:languages
npm run check:translation-api
```

## Communication Guidelines

### Tone & Style
- **Clear and Direct:** No jargon, simple language
- **Calm but Urgent:** Serious without causing panic
- **Action-Oriented:** Tell people what to do
- **Empathetic:** Acknowledge concerns and fears
- **Factual:** Accurate, verified information only

### Best Practices
- Update every 5-15 minutes during active incidents
- Use consistent hashtags for tracking
- Include visual aids (maps, photos) when possible
- Respond to questions within 2 minutes
- Correct misinformation immediately
- Acknowledge uncertainty when appropriate

### Accessibility
- Alt text for all images
- Closed captions for videos
- Simple language (8th-grade reading level)
- Multiple languages for diverse communities
- Phone hotline for non-digital access

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
- Emergency Dispatcher
- Evacuation Manager
- Medical Triage

**Upstream:**
- Situation Assessor (Analysis)
- Social Media Analyzer (Detection)

