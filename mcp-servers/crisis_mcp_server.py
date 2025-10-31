#!/usr/bin/env python3
"""
Unified Crisis Response MCP Server - NANDA Project
Implements Javi's requirements: evacuation routing + community evacuation workflow
"""

import asyncio
import json
from datetime import datetime
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

app = Server("crisis-response-tools")

# Mock geospatial and real-time data
RISK_ZONES = {
    "Boston": {
        "high_risk": ["Downtown Waterfront", "Seaport District", "Back Bay Lower Areas"],
        "medium_risk": ["Cambridge Riverside", "Charlestown Lowlands"],
        "low_risk": ["Beacon Hill", "Brookline", "Newton"]
    }
}

ROAD_STATUS = {
    "Boston": {
        "I-93 North": {"status": "Clear", "congestion": "Low"},
        "I-93 South": {"status": "Flooded", "congestion": "Blocked"},
        "Mass Pike West": {"status": "Clear", "congestion": "Moderate"},
        "Storrow Drive": {"status": "Flooded", "congestion": "Blocked"},
        "Route 1 North": {"status": "Clear", "congestion": "Low"}
    }
}

WATER_LEVELS = {
    "Boston": {
        "Charles River": {"level": 8.5, "normal": 5.0, "flood_stage": 10.0, "status": "Rising"},
        "Fort Point Channel": {"level": 7.2, "normal": 4.5, "flood_stage": 8.0, "status": "Rising"}
    }
}

SAFE_SHELTERS = {
    "Boston": [
        {"name": "North Boston High School", "capacity": 500, "current": 150, "address": "123 Main St"},
        {"name": "West End Community Center", "capacity": 300, "current": 80, "address": "456 Oak Ave"},
        {"name": "Brookline Emergency Shelter", "capacity": 400, "current": 50, "address": "789 Elm St"}
    ]
}

HOSPITALS = {
    "Boston": [
        {"name": "Boston General Hospital", "total_beds": 200, "available_beds": 50, "emergency_beds": 20},
        {"name": "City Medical Center", "total_beds": 150, "available_beds": 30, "emergency_beds": 15}
    ]
}

WEATHER_DATA = {
    "Boston": {
        "temperature": 45,
        "humidity": 85,
        "pressure": 1008,
        "conditions": "heavy rain",
        "wind_speed": 15,
        "rainfall_1h": 1.2,
        "rainfall_3h": 2.8
    }
}


@app.list_tools()
async def list_tools() -> list[Tool]:
    """List all available crisis response tools"""
    return [
        # JAVI'S REQUIREMENT: Evacuation Route Generation
        Tool(
            name="generate_evacuation_route",
            description="Generate safe evacuation route using geospatial data and real-time road status",
            inputSchema={
                "type": "object",
                "properties": {
                    "from_location": {"type": "string", "description": "Starting location"},
                    "city": {"type": "string", "description": "City name"}
                },
                "required": ["from_location", "city"]
            }
        ),
        # JAVI'S REQUIREMENT: Step 1 - Monitor Risk Zones
        Tool(
            name="monitor_risk_zones",
            description="Monitor risk zones using water level feed and terrain data",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"}
                },
                "required": ["city"]
            }
        ),
        # JAVI'S REQUIREMENT: Step 1 + 2 - Complete Community Evacuation Workflow
        Tool(
            name="execute_community_evacuation",
            description="Execute full community evacuation workflow: monitor risk zones, plan routes, dispatch alerts",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"}
                },
                "required": ["city"]
            }
        ),
        # Additional Tools: Weather
        Tool(
            name="get_flood_risk",
            description="Assess flood risk level based on weather conditions",
            inputSchema={
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"}
                },
                "required": ["location"]
            }
        ),
        # Additional Tools: Resources
        Tool(
            name="find_emergency_resources",
            description="Find shelters and hospitals with capacity information",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"}
                },
                "required": ["city"]
            }
        )
    ]


@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Execute crisis response tool"""
    
    # JAVI'S REQUIREMENT: generate_evacuation_route
    if name == "generate_evacuation_route":
        from_loc = arguments["from_location"]
        city = arguments["city"]
        
        roads = ROAD_STATUS.get(city, {})
        shelters = SAFE_SHELTERS.get(city, [])
        
        clear_routes = [r for r, s in roads.items() if s["status"] == "Clear"]
        blocked = [r for r, s in roads.items() if s["status"] != "Clear"]
        
        result = f"""EVACUATION ROUTE GENERATED

From: {from_loc}
City: {city}

SAFE ROUTES (Real-time Road Status):
"""
        for i, route in enumerate(clear_routes, 1):
            info = roads[route]
            result += f"\n{i}. {route} - {info['congestion']} congestion"
        
        result += f"\n\nAVOID (Flooded Roads): {', '.join(blocked)}"
        
        if shelters:
            best = min(shelters, key=lambda s: s['current']/s['capacity'])
            avail = best['capacity'] - best['current']
            result += f"\n\nNEAREST SHELTER: {best['name']}\nAddress: {best['address']}\nAvailable Spaces: {avail}"
        
        return [TextContent(type="text", text=result)]
    
    # JAVI'S REQUIREMENT: Step 1 - monitor_risk_zones
    elif name == "monitor_risk_zones":
        city = arguments["city"]
        water = WATER_LEVELS.get(city, {})
        zones = RISK_ZONES.get(city, {})
        
        result = f"""RISK ZONE MONITORING - {city}
Community Evacuation Support - Step 1

WATER LEVELS (Real-time Feed):
"""
        for w, d in water.items():
            pct = ((d['level']-d['normal'])/(d['flood_stage']-d['normal']))*100
            status = "CRITICAL" if pct >= 80 else "WARNING" if pct >= 60 else "WATCH"
            result += f"\n{w}: {d['level']} ft - {status} ({pct:.0f}% to flood stage, {d['status']})"
        
        result += f"\n\nRISK ZONES (Terrain Data):"
        result += f"\nHIGH RISK: {', '.join(zones.get('high_risk', []))}"
        result += f"\nMEDIUM RISK: {', '.join(zones.get('medium_risk', []))}"
        result += f"\nLOW RISK: {', '.join(zones.get('low_risk', []))}"
        
        return [TextContent(type="text", text=result)]
    
    # JAVI'S REQUIREMENT: Step 1 + 2 - execute_community_evacuation
    elif name == "execute_community_evacuation":
        city = arguments["city"]
        
        result = f"""COMMUNITY EVACUATION WORKFLOW - {city}

STEP 1: MONITOR RISK ZONES
"""
        # Monitor water levels
        water = WATER_LEVELS.get(city, {})
        critical_count = 0
        for w, d in water.items():
            pct = ((d['level']-d['normal'])/(d['flood_stage']-d['normal']))*100
            if pct >= 80:
                critical_count += 1
                result += f"\nCRITICAL: {w} at {d['level']} ft ({pct:.0f}% to flood, {d['status']})"
        
        # Identify risk zones
        zones = RISK_ZONES.get(city, {})
        high_risk = zones.get('high_risk', [])
        result += f"\n\nRisk Assessment: {len(high_risk)} HIGH RISK zones identified"
        result += f"\nAffected Areas: {', '.join(high_risk)}"
        
        result += f"\n\nSTEP 2: AUTOMATICALLY PLAN AND DISPATCH"
        
        # Generate evacuation routes
        roads = ROAD_STATUS.get(city, {})
        clear = [r for r, s in roads.items() if s["status"] == "Clear"]
        result += f"\n\nSafe Evacuation Routes (Geospatial Data + Real-time Status):"
        for route in clear:
            result += f"\n  - {route} ({roads[route]['congestion']} congestion)"
        
        # Find shelters
        shelters = SAFE_SHELTERS.get(city, [])
        total_capacity = sum(s['capacity'] - s['current'] for s in shelters)
        result += f"\n\nDesignated Shelters:"
        for shelter in shelters:
            avail = shelter['capacity'] - shelter['current']
            result += f"\n  - {shelter['name']}: {avail} spaces available"
        
        # Dispatch alerts
        result += f"\n\nEVACUATION ALERT DISPATCHED:"
        result += f"\n{'='*60}"
        result += f"\nEMERGENCY EVACUATION ORDER"
        result += f"\n\nAffected Areas: {', '.join(high_risk)}"
        result += f"\nRecommended Routes: {', '.join(clear[:2])}"
        result += f"\nShelter Locations: {', '.join([s['name'] for s in shelters])}"
        result += f"\nTotal Shelter Capacity: {total_capacity} people"
        result += f"\n{'='*60}"
        
        result += f"\n\nWORKFLOW STATUS: COMPLETE"
        result += f"\nTime: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        
        return [TextContent(type="text", text=result)]
    
    # Additional Tool: Flood Risk
    elif name == "get_flood_risk":
        location = arguments["location"]
        data = WEATHER_DATA.get(location, WEATHER_DATA["Boston"])
        
        humidity = data['humidity']
        pressure = data['pressure']
        rain_1h = data['rainfall_1h']
        
        risk_score = 0
        warnings = []
        
        if humidity > 85:
            risk_score += 3
            warnings.append("VERY HIGH humidity detected")
        
        if pressure < 1000:
            risk_score += 3
            warnings.append("LOW pressure (storm system present)")
        
        if rain_1h > 2:
            risk_score += 4
            warnings.append("HEAVY rainfall detected")
        elif rain_1h > 1:
            risk_score += 3
            warnings.append("MODERATE rainfall")
        
        if risk_score >= 7:
            risk_level = "EXTREME"
        elif risk_score >= 5:
            risk_level = "HIGH"
        elif risk_score >= 3:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"
        
        result = f"""FLOOD RISK ASSESSMENT - {location}

RISK LEVEL: {risk_level}

Current Conditions:
- Humidity: {humidity}%
- Pressure: {pressure} hPa
- Rainfall (1h): {rain_1h:.2f} inches
- Weather: {data['conditions']}

Risk Score: {risk_score}/10

Warnings:
{chr(10).join(warnings) if warnings else 'All conditions normal'}

Recommendation: {'IMMEDIATE ACTION REQUIRED' if risk_level == 'EXTREME' else 'MONITOR SITUATION CLOSELY' if risk_level in ['HIGH', 'MEDIUM'] else 'CONTINUE MONITORING'}
"""
        return [TextContent(type="text", text=result)]
    
    # Additional Tool: Emergency Resources
    elif name == "find_emergency_resources":
        city = arguments["city"]
        shelters = SAFE_SHELTERS.get(city, [])
        hospitals = HOSPITALS.get(city, [])
        
        result = f"""EMERGENCY RESOURCES - {city}

SHELTERS:
"""
        for shelter in shelters:
            available = shelter['capacity'] - shelter['current']
            result += f"\n- {shelter['name']}: {available}/{shelter['capacity']} available"
            result += f"\n  Address: {shelter['address']}"
        
        result += "\n\nHOSPITALS:"
        for hospital in hospitals:
            result += f"\n- {hospital['name']}: {hospital['available_beds']} beds, {hospital['emergency_beds']} emergency"
        
        total_shelter_capacity = sum(s['capacity'] - s['current'] for s in shelters)
        total_hospital_beds = sum(h['available_beds'] for h in hospitals)
        
        result += f"\n\nSUMMARY:"
        result += f"\nTotal Shelter Capacity: {total_shelter_capacity} people"
        result += f"\nTotal Hospital Beds: {total_hospital_beds} beds"
        
        return [TextContent(type="text", text=result)]
    
    return [TextContent(type="text", text=f"Unknown tool: {name}")]


async def main():
    """Run the unified crisis response MCP server"""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())

if __name__ == "__main__":
    asyncio.run(main())
