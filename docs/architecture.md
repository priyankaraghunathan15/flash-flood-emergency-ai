# System Architecture

## Overview

The Flash Flood Emergency AI System is a distributed multi-agent system designed to detect, analyze, and coordinate responses to flash flood emergencies in under 40 seconds. The system uses 10 specialized AI agents organized in a 4-tier architecture, communicating via the A2A (Agent-to-Agent) protocol through the NANDA registry.

## Architecture Principles

### 1. Parallel Processing
Unlike traditional sequential emergency response systems, our agents work simultaneously across all tiers, dramatically reducing response time from 45+ minutes to under 40 seconds.

### 2. Specialized Agents
Each agent has a specific role and expertise, allowing for focused and efficient task execution. Agents are designed following the single responsibility principle.

### 3. Autonomous Coordination
Agents discover and communicate with each other autonomously through the NANDA registry, without requiring central orchestration for basic operations.

### 4. Layered Architecture
The 4-tier design ensures clear separation of concerns: detection, analysis, response, and command coordination.

## 4-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TIER 4: COMMAND                          │
│                   Mission Control                            │
│              (Orchestration & Coordination)                  │
└─────────────────────────────────────────────────────────────┘
                            ↑
                            │
┌─────────────────────────────────────────────────────────────┐
│                    TIER 3: RESPONSE                         │
│     Emergency Dispatcher | Public Communicator              │
│              Medical Triage                                  │
│           (Action & Communication)                           │
└─────────────────────────────────────────────────────────────┘
                            ↑
                            │
┌─────────────────────────────────────────────────────────────┐
│                    TIER 2: ANALYSIS                         │
│    Situation Assessor | Resource Mapper                     │
│              Pattern Analyzer                                │
│        (Processing & Decision Support)                       │
└─────────────────────────────────────────────────────────────┘
                            ↑
                            │
┌─────────────────────────────────────────────────────────────┐
│                    TIER 1: DETECTION                        │
│  Social Media Sentinel | Environmental Monitor              │
│            News Alert Scanner                                │
│          (Data Collection & Monitoring)                      │
└─────────────────────────────────────────────────────────────┘
```

### Tier 1: Detection Layer

**Purpose:** Continuous monitoring of multiple information sources to detect flood events as early as possible.

**Agents:**

1. **Social Media Sentinel (Port 6000)**
   - Monitors Twitter, Facebook, Reddit for flood-related posts
   - Uses natural language processing to identify genuine emergencies
   - Extracts location, severity, and timestamp information
   - Provides real-time citizen reports

2. **Environmental Monitor (Port 6001)**
   - Tracks weather stations, river gauges, precipitation sensors
   - Monitors water level changes and rainfall intensity
   - Detects abnormal environmental patterns
   - Provides quantitative flood risk data

3. **News Alert Scanner (Port 6002)**
   - Scans local news outlets, emergency broadcasts
   - Monitors official weather service alerts
   - Tracks government emergency declarations
   - Provides authoritative confirmation of events

**Data Flow:** Detection agents push alerts to Analysis tier agents when flood indicators are detected.

### Tier 2: Analysis Layer

**Purpose:** Process raw detection data to assess severity, identify resources, and predict flood progression.

**Agents:**

4. **Situation Assessor (Port 6003)**
   - Evaluates crisis severity (1-10 scale)
   - Identifies affected geographic areas
   - Determines risk levels for different zones
   - Prioritizes response actions based on urgency
   - Correlates data from multiple detection sources

5. **Resource Mapper (Port 6004)**
   - Identifies available emergency resources (shelters, hospitals, rescue teams)
   - Maps evacuation routes and safe zones
   - Tracks resource availability and capacity
   - Optimizes resource allocation based on need

6. **Pattern Analyzer (Port 6005)**
   - Detects flood progression patterns
   - Predicts likely flood paths and timing
   - Identifies high-risk zones before flooding occurs
   - Provides predictive intelligence for proactive response

**Data Flow:** Analysis agents receive alerts from Detection tier, process them, and send actionable intelligence to Response tier.

### Tier 3: Response Layer

**Purpose:** Execute coordinated response actions based on analysis, including emergency dispatch, public communication, and medical triage.

**Agents:**

7. **Emergency Dispatcher (Port 6006)**
   - Coordinates first responder deployment
   - Prioritizes rescue operations
   - Manages resource allocation to affected areas
   - Tracks response team status and locations

8. **Public Communicator (Port 6007)**
   - Issues evacuation orders and safety instructions
   - Provides real-time updates to affected populations
   - Coordinates messaging across multiple channels
   - Manages public information flow

9. **Medical Triage (Port 6008)**
   - Identifies vulnerable populations (elderly, disabled, medical facilities)
   - Prioritizes medical response based on risk
   - Coordinates ambulance and medical resource deployment
   - Manages patient evacuation from healthcare facilities

**Data Flow:** Response agents receive directives from Mission Control and situation updates from Analysis tier, then execute coordinated actions.

### Tier 4: Command Layer

**Purpose:** Orchestrate the entire crisis response, maintain situational awareness, and ensure coherent multi-agent coordination.

**Agent:**

10. **Mission Control (Port 6009)**
    - Maintains complete situational awareness across all agents
    - Orchestrates multi-agent coordination
    - Resolves conflicts between agent recommendations
    - Makes strategic decisions for complex scenarios
    - Monitors overall system health and agent performance
    - Provides unified command interface

**Data Flow:** Mission Control receives updates from all tiers, coordinates cross-tier communication, and provides strategic direction.

## Agent-to-Agent (A2A) Protocol

### Communication Model

Agents communicate using the A2A protocol, which provides:

1. **Agent Discovery:** Agents register with the NANDA registry and discover each other dynamically
2. **Direct Messaging:** Agents send structured messages using @mentions
3. **Asynchronous Communication:** Non-blocking message passing for parallel processing
4. **Structured Responses:** Agents return confidence scores, urgency levels, and structured data

### Message Format

```json
{
  "from": "social-media-sentinel",
  "to": "situation-assessor",
  "message_type": "flood_alert",
  "content": {
    "location": "Downtown Boston",
    "severity": "high",
    "confidence": 0.85,
    "timestamp": "2025-10-30T14:23:00Z",
    "source": "multiple_social_media_posts"
  }
}
```

### Communication Patterns

**1. Detection → Analysis:**
```
Social Media Sentinel → Situation Assessor
Environmental Monitor → Situation Assessor + Pattern Analyzer
News Alert Scanner → Situation Assessor
```

**2. Analysis → Response:**
```
Situation Assessor → Mission Control + Emergency Dispatcher
Resource Mapper → Emergency Dispatcher + Medical Triage
Pattern Analyzer → Public Communicator + Emergency Dispatcher
```

**3. Response Coordination:**
```
Mission Control → All Response Agents (strategic direction)
Response Agents ↔ Response Agents (tactical coordination)
```

## Technology Stack

### Core Framework: NEST

We use a modified version of the NEST framework (forked from DataWorksAI-com/NEST) with the following enhancements:

1. **Custom System Prompts:** Added support for environment variable-based system prompts
2. **Public URL Configuration:** Support for cloud deployment with public-facing URLs
3. **Automated Deployment:** Scripts for deploying multiple agents simultaneously

### Large Language Model: Anthropic Claude

- **Model:** Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
- **Capabilities:** Advanced reasoning, tool use, long context window
- **Role:** Powers each agent's decision-making and natural language processing

### Model Context Protocol (MCP)

MCP servers provide agents with access to external tools and real-time data:

#### 1. Evacuation MCP Server (Port 7000)
**Tools:**
- `generate_evacuation_route`: Creates optimal evacuation paths
- `identify_risk_zones`: Maps high-risk flood areas
- `find_safe_zones`: Locates safe gathering points

#### 2. Weather MCP Server (Port 7001)
**Tools:**
- `get_current_weather`: Real-time weather conditions
- `get_flood_risk_assessment`: Flood probability analysis
- `get_precipitation_forecast`: Rainfall predictions

#### 3. Resource MCP Server (Port 7002)
**Tools:**
- `find_shelters`: Locates emergency shelters with capacity
- `find_hospitals`: Identifies medical facilities
- `track_resources`: Monitors resource availability

### Database: MongoDB

**Collections:**

1. **agent_facts:** Stores agent knowledge and learned information
2. **events:** Records all crisis events and responses
3. **nanda_index:** Maintains agent registry and discovery information

**Purpose:**
- Persistent memory across agent sessions
- Historical data for pattern analysis
- Audit trail of crisis responses

### NANDA Registry

- **URL:** `capregistry.duckdns.org:6900`
- **Purpose:** Central registry for agent discovery and coordination
- **Functionality:** Agents register their capabilities and discover other agents dynamically

## Deployment Architecture

### Infrastructure

**Cloud Platform:** Linode
**Instance Type:** g6-standard-4 (8GB RAM, 4 CPUs)
**Operating System:** Ubuntu 22.04 LTS

### Port Allocation

```
Detection Tier:     6000-6002
Analysis Tier:      6003-6005
Response Tier:      6006-6008
Command Tier:       6009
MCP Servers:        7000-7002
MongoDB:            27017
```

### Network Architecture

```
Internet
    ↓
[Load Balancer / Nginx] (Optional)
    ↓
┌─────────────────────────────────────┐
│         Agent Cluster               │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 6000 │ │ 6001 │ │ 6002 │ ...    │
│  └──────┘ └──────┘ └──────┘        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│         MCP Server Cluster          │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 7000 │ │ 7001 │ │ 7002 │        │
│  └──────┘ └──────┘ └──────┘        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│           MongoDB                   │
│           :27017                    │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│        NANDA Registry               │
│  capregistry.duckdns.org:6900      │
└─────────────────────────────────────┘
```

## Crisis Response Timeline

### Target: Under 40 Seconds

**0-5 seconds:** Detection
- Social media posts detected
- Environmental sensors trigger alerts
- News alerts confirmed

**5-15 seconds:** Analysis
- Situation severity assessed
- Resources mapped
- Patterns analyzed

**15-30 seconds:** Response Planning
- Emergency dispatch coordinated
- Evacuation routes generated
- Public communications prepared

**30-40 seconds:** Action Execution
- First responders deployed
- Evacuation orders issued
- Medical resources mobilized

**Traditional System Comparison:** 45+ minutes (67-135x slower)

## Scalability Considerations

### Horizontal Scaling

Each tier can be scaled independently:
- Add more Detection agents for broader monitoring
- Add more Analysis agents for deeper processing
- Add more Response agents for larger geographic coverage

### Vertical Scaling

Individual agents can be upgraded:
- More powerful LLM models for complex reasoning
- Additional MCP servers for specialized tools
- Increased database capacity for historical data

### Geographic Distribution

System can be deployed across multiple regions:
- Regional agent clusters for local crises
- Cross-region coordination through NANDA registry
- Distributed MCP servers for reduced latency

## Security & Reliability

### Agent Authentication

- Each agent has a unique identifier and secret key
- All A2A communications are authenticated
- NANDA registry validates agent credentials

### Fault Tolerance

- Agents operate independently; failure of one doesn't crash the system
- MongoDB provides data persistence and recovery
- Health monitoring detects and alerts on agent failures

### Data Privacy

- Sensitive location data is encrypted
- Personal information is anonymized in social media monitoring
- Access controls limit data visibility

## Performance Metrics

### Key Performance Indicators

1. **Detection Time:** Time from event occurrence to first detection
2. **Analysis Time:** Time to assess situation and generate recommendations
3. **Response Time:** End-to-end time from detection to action
4. **Coordination Efficiency:** Number of successful agent-to-agent interactions
5. **Resource Utilization:** Percentage of available resources deployed effectively

### Monitoring

- Real-time agent health checks
- Performance dashboards
- Alert notifications for system anomalies
- Historical trend analysis

## Future Enhancements

### Planned Improvements

1. **Multi-Crisis Support:** Expand beyond floods to earthquakes, wildfires, severe weather
2. **Machine Learning:** Add predictive models trained on historical crisis data
3. **Advanced Visualization:** Real-time crisis dashboards and maps
4. **Mobile Integration:** Mobile apps for first responders and citizens
5. **International Deployment:** Multi-language support and global coordination

### Research Opportunities

1. **Agent Learning:** Agents improve strategies based on past crises
2. **Human-AI Collaboration:** Enhanced interfaces for human emergency managers
3. **Optimization Algorithms:** Advanced resource allocation and routing
4. **Cross-System Integration:** Integration with existing emergency management systems

## Conclusion

The Flash Flood Emergency AI System demonstrates the power of distributed multi-agent architectures for time-critical applications. By leveraging specialized agents, parallel processing, and autonomous coordination, the system achieves a 67-135x improvement in response time compared to traditional emergency response systems.

The 4-tier architecture provides clear separation of concerns while enabling seamless coordination, and the A2A protocol allows for scalable, flexible communication between agents. As the system evolves, it can be extended to handle additional crisis types and scaled to serve larger geographic regions.
