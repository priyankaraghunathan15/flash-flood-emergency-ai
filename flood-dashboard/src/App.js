import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { Target, Share2, CloudRain, Newspaper, Search, MapPin, BarChart3, Radio, Megaphone, HeartPulse, Volume2, VolumeX } from 'lucide-react';

const API_BASE = '/.netlify/functions/api-proxy';

function App() {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [crisis, setCrisis] = useState(null);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeAgents, setActiveAgents] = useState(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousActiveAgents = useRef(new Set());

  const agents = [
    { id: 'mission-control', name: 'Mission Control', icon: Target, color: '#ef4444' },
    { id: 'social-media-sentinel', name: 'Social Media', icon: Share2, color: '#3b82f6' },
    { id: 'environmental-monitor', name: 'Environment', icon: CloudRain, color: '#06b6d4' },
    { id: 'news-alert-scanner', name: 'News Scanner', icon: Newspaper, color: '#8b5cf6' },
    { id: 'situation-assessor', name: 'Assessor', icon: Search, color: '#f59e0b' },
    { id: 'resource-mapper', name: 'Resources', icon: MapPin, color: '#10b981' },
    { id: 'pattern-analyzer', name: 'Analyzer', icon: BarChart3, color: '#ec4899' },
    { id: 'emergency-dispatcher', name: 'Dispatcher', icon: Radio, color: '#dc2626' },
    { id: 'public-communicator', name: 'Communicator', icon: Megaphone, color: '#6366f1' },
    { id: 'medical-triage', name: 'Medical', icon: HeartPulse, color: '#14b8a6' }
  ];

  const triggerScenario = async (scenarioKey) => {
    try {
      await axios.post(`${API_BASE}/clear`);
      setMessages([]);
      setCrisis(null);
      setProgress(0);
      setElapsedTime(0);
      setActiveAgents(new Set());
      setIsComplete(false);
      setStartTime(Date.now());
      setScenario(scenarioKey);

      await axios.post(`${API_BASE}/trigger/${scenarioKey}`);
    } catch (error) {
      console.error('Error triggering scenario:', error);
    }
  };

  useEffect(() => {
    if (!scenario || isComplete) return;

    const pollMessages = setInterval(async () => {
      try {
        const [messagesRes, crisisRes] = await Promise.all([
          axios.get(`${API_BASE}/messages`),
          axios.get(`${API_BASE}/crisis`)
        ]);

        setMessages(messagesRes.data);  
        setCrisis(crisisRes.data);

        // Check if scenario is complete
        if (crisisRes.data.status === 'complete') {
          setIsComplete(true);
          // Don't update active agents anymore - keep them as they are
          return;
        }

        const recentAgents = new Set();
        const now = Date.now();
        messagesRes.data.forEach(msg => {
          const msgTime = new Date(msg.timestamp).getTime();
          if (now - msgTime < 5000) {
            recentAgents.add(msg.from);
            recentAgents.add(msg.to);
          }
        });
        setActiveAgents(recentAgents);

      } catch (error) {
        console.error('Error polling:', error);
      }
    }, 2000);

    return () => clearInterval(pollMessages);
  }, [scenario, isComplete]);

  useEffect(() => {
    if (!startTime || isComplete) return;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
      
      const progressPercent = Math.min((elapsed / 40) * 100, 100);
      setProgress(progressPercent);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, isComplete]);

  return (
    <div className="app">
      <header className="header">
        <h1>Emergency Response AI</h1>
        <div className="scenarios">
          <button 
            className="btn-high"
            onClick={() => triggerScenario('high_severity')}
            disabled={scenario && !isComplete}
          >
            High Severity Flood
          </button>
          <button 
            className="btn-medium"
            onClick={() => triggerScenario('medium_severity')}
            disabled={scenario && !isComplete}
          >
            Medium Severity Flood
          </button>
          <button 
            className="btn-false"
            onClick={() => triggerScenario('false_alarm')}
            disabled={scenario && !isComplete}
          >
            False Alarm Test
          </button>
        </div>
      </header>

      <main className="main-content">
        {scenario && crisis ? (
          <>
            <div className={`status-bar ${isComplete ? 'complete' : ''}`}>
              <h2>
                {isComplete ? '✓ Response Coordinated' : `Active Emergency - ${crisis.location}`}
              </h2>
              <p>
                {isComplete 
                  ? `Completed in ${elapsedTime}s - ${Math.round(((40 - elapsedTime) / 40) * 100)}% faster than target`
                  : `${agents.length} agents coordinating response`
                }
              </p>
            </div>

            <div className="progress-section">
              <h3>Response Timeline</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="progress-text">
                <span>Started: {crisis.detected}</span>
                <span>Elapsed: {elapsedTime}s</span>
                <span>Target: 40s</span>
              </div>
            </div>

            <div className="agents-section">
              <h3>Agent Activity</h3>
              <div className="agents-grid">
                {agents.map(agent => (
                  <div 
                    key={agent.id}
                    className={`agent-card ${activeAgents.has(agent.id) ? 'active' : ''}`}
                  >
                    <div className="agent-icon" style={{ 
                      background: activeAgents.has(agent.id) ? agent.color : '#334155' 
                    }}>
                      <agent.icon size={28} strokeWidth={2.5} />
                    </div>
                    <div className="agent-name">{agent.name}</div>
                    <div className="agent-status">
                      {activeAgents.has(agent.id) ? 'Active' : 'Idle'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="messages-section">
              <h3>Live Agent Messages</h3>
              <div className="messages-container">
                {messages.length === 0 ? (
                  <div className="idle-message">Waiting for agent messages...</div>
                ) : (
                  messages.map((msg, idx) => (
                    <div key={idx} className="message" data-type={msg.type}>
                      <div className="message-header">
                        <div className="message-agent">
                          {msg.from} → {msg.to}
                          <span className={`message-type-badge ${msg.type}`}>
                            {msg.type}
                          </span>
                        </div>
                        <span className="message-time">{msg.time}</span>
                      </div>
                      <div className="message-content">{msg.text}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="idle-state">
            <div className="idle-icon">🚨</div>
            <h2>No Active Emergency</h2>
            <p>Select a scenario above to begin demonstration</p>
          </div>
        )}
      </main>
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="floating-mute-button"
        title={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}

export default App;