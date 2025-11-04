import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Zap, Clock, Shield, ArrowRight, Activity, Cpu, Cloud, Target, Share2, CloudRain, Newspaper, Search, MapPin, BarChart3, Radio, Megaphone, HeartPulse } from 'lucide-react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-16 pb-12">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-400/30">
                <Droplets className="w-12 h-12 text-blue-400" strokeWidth={1.5} />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-8 leading-[1.3] bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Flash Flood Emergency AI
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
              Autonomous multi-agent system revolutionizing emergency response through real-time AI coordination
            </p>

            {/* Performance Metrics */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 rounded-3xl p-12 shadow-2xl">
                
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-3">Emergency Response Time Comparison</h3>
                  <p className="text-gray-300 text-lg">Traditional coordination vs AI-powered multi-agent system</p>
                </div>

                <div className="space-y-8 mb-12">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-lg border-2 border-red-500/40">
                          <Clock className="w-6 h-6 text-red-400" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-white">Traditional Response</span>
                      </div>
                      <span className="text-3xl font-bold text-red-400">45-90 minutes</span>
                    </div>
                    <div className="relative h-16 bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500">
                        <div className="h-full flex items-center justify-center">
                          <span className="text-white font-bold text-base">Manual coordination • Phone calls • Paper forms • Human bottlenecks</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg border-2 border-green-500/40">
                          <Zap className="w-6 h-6 text-green-400" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-white">AI-Powered Response</span>
                      </div>
                      <span className="text-3xl font-bold text-green-400">&lt;40 seconds</span>
                    </div>
                    <div className="relative h-16 bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-700">
                      <div className="absolute bg-gradient-to-r from-green-600 to-green-500" style={{ width: '1.5%', height: '100%' }}>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap">
                          <span className="text-white font-bold text-base">10 agents • Instant coordination • Real-time analysis</span>
                        </div>
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="px-4 py-2 bg-green-500/30 rounded-lg border-2 border-green-500/50">
                          <span className="text-green-300 font-bold text-sm uppercase tracking-wider">67× FASTER</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-slate-700">
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl border-2 border-slate-700 hover:border-blue-500/50 transition-all">
                    <div className="inline-block p-3 bg-blue-500/10 rounded-lg border-2 border-blue-500/30 mb-3">
                      <Activity className="w-7 h-7 text-blue-400" strokeWidth={2.5} />
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">Real-Time</div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Analysis</div>
                  </div>
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl border-2 border-slate-700 hover:border-purple-500/50 transition-all">
                    <div className="inline-block p-3 bg-purple-500/10 rounded-lg border-2 border-purple-500/30 mb-3">
                      <Cpu className="w-7 h-7 text-purple-400" strokeWidth={2.5} />
                    </div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">Parallel</div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Processing</div>
                  </div>
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl border-2 border-slate-700 hover:border-green-500/50 transition-all">
                    <div className="inline-block p-3 bg-green-500/10 rounded-lg border-2 border-green-500/30 mb-3">
                      <Zap className="w-7 h-7 text-green-400" strokeWidth={2.5} />
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-2">Zero</div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Human Delay</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-400/50 transition-all">
                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Coordination</h3>
                <p className="text-gray-400 leading-relaxed text-sm">10 autonomous agents executing parallel emergency protocols with instant synchronization</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all">
                <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">NANDA Protocol</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Advanced agent framework enabling intelligent decision-making and seamless collaboration</p>
              </div>

              <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-green-400/50 transition-all">
                <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Deployment</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Production-ready system demonstrating measurable impact on emergency response times</p>
              </div>
            </div>

            {/* Agent Architecture */}
            <div className="mb-16">
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="p-2 bg-purple-600/20 rounded-lg border border-purple-400/30">
                  <Shield className="w-7 h-7 text-purple-400" strokeWidth={2} />
                </div>
                <h2 className="text-3xl font-bold text-center">10 Specialized NANDA Agents</h2>
              </div>
              
              <div className="grid grid-cols-5 gap-3 max-w-6xl mx-auto">
                {[
                  { name: 'Mission Control', icon: Target },
                  { name: 'Social Media', icon: Share2 },
                  { name: 'Environment', icon: CloudRain },
                  { name: 'News Scanner', icon: Newspaper },
                  { name: 'Assessor', icon: Search },
                  { name: 'Resources', icon: MapPin },
                  { name: 'Analyzer', icon: BarChart3 },
                  { name: 'Dispatcher', icon: Radio },
                  { name: 'Communicator', icon: Megaphone },
                  { name: 'Medical', icon: HeartPulse }
                ].map((agent, idx) => {
                  const IconComponent = agent.icon;
                  return (
                    <div 
                      key={idx}
                      className="group bg-slate-900 border-2 border-slate-700 rounded-lg p-5 hover:border-slate-500 transition-all"
                    >
                      <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                        <IconComponent size={24} strokeWidth={1.5} className="text-slate-200 group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors text-center uppercase tracking-wider">
                        {agent.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-10 mb-12 max-w-5xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Cpu className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl font-bold">Technology Stack</h2>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600/30 transition-all">
                    <Activity className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-xl font-bold text-blue-400 mb-1">Claude Sonnet</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">AI Engine</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600/30 transition-all">
                    <Shield className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-xl font-bold text-purple-400 mb-1">NANDA</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Agent Protocol</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-600/30 transition-all">
                    <Zap className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="text-xl font-bold text-green-400 mb-1">Python + React</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Full Stack</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-600/30 transition-all">
                    <Cloud className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="text-xl font-bold text-orange-400 mb-1">Linode</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Cloud Deploy</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button 
                onClick={() => navigate('/dashboard')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3 mx-auto border border-blue-400/30"
              >
                <span>View Live System</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="text-gray-500 mt-4 text-base">Real-time emergency response demonstration</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-gray-500 text-base">Master's Capstone Project | Northeastern University | 2025</p>
          <p className="text-gray-600 mt-2 text-sm">Priyanka Raghunathan | Data Science</p>
        </div>
      </div>
    </div>
  );
}