import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Users, Clock, CheckCircle, Shield, Waves, Radio, TrendingUp, Navigation, Building2, Phone, Zap, Activity } from 'lucide-react';

function App() {
  const [responseTime, setResponseTime] = useState(0);
  const [stage, setStage] = useState('detecting');

  useEffect(() => {
    if (responseTime < 40) {
      const timer = setInterval(() => {
        setResponseTime(prev => {
          const next = prev + 1;
          if (next >= 8 && next < 20) setStage('analyzing');
          else if (next >= 20) setStage('responding');
          return next;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [responseTime]);

  const updates = [
    { time: '2:23:05', text: 'Flood detected on Main Street from multiple reports', type: 'detection' },
    { time: '2:23:08', text: 'Weather service confirms heavy rainfall in the area', type: 'detection' },
    { time: '2:23:12', text: 'Risk assessment complete: High severity flood event', type: 'analysis' },
    { time: '2:23:18', text: 'Emergency shelters identified and notified', type: 'analysis' },
    { time: '2:23:25', text: 'Emergency vehicles dispatched to Main Street', type: 'response' },
    { time: '2:23:30', text: 'Public evacuation alert sent to 5,000 residents', type: 'response' },
    { time: '2:23:35', text: 'Local hospitals prepared for incoming patients', type: 'response' }
  ];

  const activeResponses = [
    { icon: Navigation, title: 'Emergency Units', detail: '3 fire trucks, 2 rescue teams en route', status: 'active', color: 'blue' },
    { icon: Radio, title: 'Evacuation Alert', detail: 'SMS and broadcast sent to affected area', status: 'complete', color: 'green' },
    { icon: Building2, title: 'Shelters Activated', detail: '4 locations, capacity for 2,000 people', status: 'active', color: 'purple' },
    { icon: Phone, title: 'Hospitals Notified', detail: 'ER teams on standby at 3 hospitals', status: 'active', color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Emergency Response AI
                </h1>
                <p className="text-slate-600 text-sm">Multi-agent crisis coordination system</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-emerald-700">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Alert Hero */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-orange-500"></div>
          <div className="relative p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-5">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-3xl font-bold text-white">Active Flood Emergency</h2>
                    <span className="bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-white">
                      HIGH SEVERITY
                    </span>
                  </div>
                  <p className="text-white/90 text-lg mb-4">Main Street, Downtown Area</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <Users className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">~5,000 affected</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <Waves className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">Water rising rapidly</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center min-w-[140px]">
                <div className="text-white/80 text-sm font-medium mb-1">Response Time</div>
                <div className="text-5xl font-bold text-white mb-1">{responseTime}</div>
                <div className="text-white/80 text-sm">seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">10</div>
            <div className="text-sm text-slate-600">AI Agents Active</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">67x</div>
            <div className="text-sm text-slate-600">Faster Response</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Radio className="w-6 h-6 text-purple-600" />
              </div>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">4</div>
            <div className="text-sm text-slate-600">Shelters Activated</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">HIGH</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">8/10</div>
            <div className="text-sm text-slate-600">Report Confidence</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Crisis Details */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Crisis Overview</h3>
              
              <div className="space-y-4">
                <div className="group hover:bg-slate-50 p-4 rounded-xl transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</div>
                      <div className="font-semibold text-slate-900">Main Street, Downtown</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-slate-50 p-4 rounded-xl transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Affected Population</div>
                      <div className="font-semibold text-slate-900">~5,000 residents</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-slate-50 p-4 rounded-xl transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Waves className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Water Status</div>
                      <div className="font-semibold text-red-600">Rising Rapidly</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-blue-50 p-4 rounded-xl transition-colors border-2 border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">First Detected</div>
                      <div className="font-semibold text-blue-900">2:23 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Phases */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Response Phases</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-xl transition-all ${stage === 'detecting' || stage === 'analyzing' || stage === 'responding' ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${stage === 'detecting' || stage === 'analyzing' || stage === 'responding' ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Detection</div>
                      <div className="text-sm text-slate-600">Multi-source monitoring</div>
                    </div>
                    {(stage === 'detecting' || stage === 'analyzing' || stage === 'responding') && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  </div>
                </div>

                <div className={`p-4 rounded-xl transition-all ${stage === 'analyzing' || stage === 'responding' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${stage === 'analyzing' || stage === 'responding' ? 'bg-blue-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Analysis</div>
                      <div className="text-sm text-slate-600">Risk assessment & planning</div>
                    </div>
                    {(stage === 'analyzing' || stage === 'responding') && stage !== 'detecting' && <CheckCircle className="w-5 h-5 text-blue-500" />}
                    {stage === 'analyzing' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                  </div>
                </div>

                <div className={`p-4 rounded-xl transition-all ${stage === 'responding' ? 'bg-purple-50 border-2 border-purple-200' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${stage === 'responding' ? 'bg-purple-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Response</div>
                      <div className="text-sm text-slate-600">Emergency coordination</div>
                    </div>
                    {stage === 'responding' && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Actions */}
          <div className="col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Active Responses</h3>
              <div className="space-y-4">
                {activeResponses.map((response, idx) => {
                  const Icon = response.icon;
                  const colorMap = {
                    blue: { bg: 'bg-blue-100', icon: 'text-blue-600', border: 'border-blue-200' },
                    green: { bg: 'bg-emerald-100', icon: 'text-emerald-600', border: 'border-emerald-200' },
                    purple: { bg: 'bg-purple-100', icon: 'text-purple-600', border: 'border-purple-200' },
                    orange: { bg: 'bg-orange-100', icon: 'text-orange-600', border: 'border-orange-200' }
                  };
                  const colors = colorMap[response.color];
                  
                  return (
                    <div key={idx} className={`group hover:shadow-md transition-all p-5 rounded-xl border-2 ${colors.border} bg-slate-50 hover:bg-white`}>
                      <div className="flex items-start gap-4">
                        <div className={`${colors.bg} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-slate-900">{response.title}</h4>
                            {response.status === 'complete' ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{response.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Success Banner */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Response Coordinated</h3>
                </div>
                <p className="text-emerald-50 mb-5">All emergency services notified. Evacuation procedures underway.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold text-white mb-1">67x</div>
                    <div className="text-sm text-emerald-50">Faster response</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold text-white mb-1">&lt;40s</div>
                    <div className="text-sm text-emerald-50">Total time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Live Activity</h3>
              <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">
                {updates.map((update, idx) => (
                  <div key={idx} className="relative pl-7 pb-5 border-l-2 border-slate-200 last:border-0 last:pb-0">
                    <div className={`absolute left-0 top-1 w-4 h-4 rounded-full -translate-x-[9px] ring-4 ring-white ${
                      update.type === 'detection' ? 'bg-blue-500' :
                      update.type === 'analysis' ? 'bg-yellow-500' :
                      'bg-emerald-500'
                    }`}></div>
                    <div className="text-xs font-mono text-slate-500 mb-1">{update.time}</div>
                    <div className="text-sm font-medium text-slate-900 leading-relaxed">{update.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;