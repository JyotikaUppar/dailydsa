import { useState } from "react";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, ChevronRight, Target, Lock, 
  Activity, Sparkles, AlertCircle, Zap, TrendingUp, BarChart3, Clock, 
  ChevronDown, BookOpen, GitCommit
} from "lucide-react";

export default function Roadmaps() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Onboarding State
  const [goal, setGoal] = useState("Google");
  const [level, setLevel] = useState("Intermediate");
  const [intensity, setIntensity] = useState(50); // 0 to 100

  // Interaction State
  const [expandedNode, setExpandedNode] = useState(null);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsGenerated(true);
    }, 2000);
  };

  const companies = ["Google", "Amazon", "Meta", "Product Startup"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <>
      <Head>
        <title>Command Center | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white selection:bg-primary/30 font-sans pb-20">
        <Header />
        
        {/* Dynamic Radial Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/5 blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/5 blur-[150px]" />
        </div>

        <main className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32">
          
          <AnimatePresence mode="wait">
            {!isGenerated && !loading && (
              <motion.div 
                key="onboarding"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">
                    Initialize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Path</span>
                  </h1>
                  <p className="text-gray-400 text-lg tracking-tight">AI-calibrated roadmap for elite engineering interviews.</p>
                </div>

                <div className="bg-[#151821]/80 backdrop-blur-2xl border border-[#2d313f] rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-black/50 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

                  <div className="space-y-12">
                    {/* Goal Selection */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} className="text-primary" /> Target Trajectory
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {companies.map(c => (
                          <button 
                            key={c}
                            onClick={() => setGoal(c)}
                            className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden ${
                              goal === c 
                              ? 'bg-violet-500/10 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
                              : 'bg-[#1a1d27]/40 border-gray-800/80 hover:border-gray-700 hover:bg-[#1a1d27]/80'
                            }`}
                          >
                            <span className={`font-semibold tracking-tight ${goal === c ? 'text-white' : 'text-gray-400'}`}>{c}</span>
                            {goal === c && (
                              <motion.div layoutId="goalGlow" className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Level Selection */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Activity size={14} className="text-primary" /> Skill Calibration
                      </h3>
                      <div className="flex bg-[#1a1d27]/50 p-1.5 rounded-2xl border border-[#2d313f]/50">
                        {levels.map(l => (
                          <button
                            key={l}
                            onClick={() => setLevel(l)}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold tracking-tight transition-all relative ${
                              level === l ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            {level === l && (
                              <motion.div layoutId="levelBg" className="absolute inset-0 bg-[#2d313f] rounded-xl border border-gray-600/30 shadow-sm" />
                            )}
                            <span className="relative z-10">{l}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Intensity Slider */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Zap size={14} className="text-primary" /> Preparation Intensity
                        </h3>
                        <span className="text-xs font-mono text-violet-400 font-bold bg-violet-500/10 px-3 py-1 rounded-lg">
                          {intensity < 33 ? 'Low' : intensity < 66 ? 'Medium' : 'High'} Pace
                        </span>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={intensity} 
                          onChange={(e) => setIntensity(Number(e.target.value))}
                          className="w-full h-2 bg-[#1a1d27] rounded-lg appearance-none cursor-pointer accent-violet-500 hover:accent-violet-400 transition-all border border-[#2d313f]/50"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleGenerate}
                      className="w-full relative group overflow-hidden bg-white text-gray-900 font-bold text-lg py-4 rounded-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] tracking-tight"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Initialize Command Center <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-[#1a1d27] rounded-full shadow-inner"></div>
                  <div className="absolute inset-0 border-4 border-violet-500 rounded-full border-t-transparent animate-spin drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-violet-400 animate-pulse" size={24} />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Synthesizing Adaptive Architecture</h2>
                  <p className="text-gray-500 font-mono text-sm">Calibrating nodes for {goal} • {level}</p>
                </div>
              </motion.div>
            )}

            {isGenerated && !loading && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
              >
                {/* --- LEFT SIDEBAR (Operational Stats) --- */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Readiness Score */}
                  <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-6 relative overflow-hidden group shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition group-hover:bg-violet-500/20" />
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Target size={14} className="text-violet-400" /> Projected Readiness
                    </h3>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-6xl font-black text-white tracking-tighter leading-none">42</span>
                      <span className="text-xl text-gray-600 font-bold pb-1">%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1a1d27] rounded-full overflow-hidden mt-6">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "42%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-gradient-to-r from-violet-600 to-indigo-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]" 
                      />
                    </div>
                  </div>

                  {/* Micro Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#12141a] border border-[#2d313f] rounded-2xl p-5 shadow-lg">
                      <Zap size={18} className="text-yellow-400 mb-2 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                      <div className="text-2xl font-bold text-white mb-0.5 tracking-tight">85%</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Consistency</div>
                    </div>
                    <div className="bg-[#12141a] border border-[#2d313f] rounded-2xl p-5 shadow-lg">
                      <Clock size={18} className="text-blue-400 mb-2 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]" />
                      <div className="text-2xl font-bold text-white mb-0.5 tracking-tight">14d</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Until Next Phase</div>
                    </div>
                  </div>
                </div>

                {/* --- CENTER PANEL (Action & Intelligence Graph) --- */}
                <div className="lg:col-span-6 space-y-8 mt-2 lg:mt-0">
                  {/* Daily Mission Header */}
                  <div className="bg-gradient-to-br from-[#1b1933] to-[#12141a] border border-[#3b346d] rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-violet-900/10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
                          Today's Mission 
                          <span className="bg-violet-500/20 text-violet-300 text-[10px] px-2 py-1 uppercase tracking-widest font-bold rounded-md border border-violet-500/30">
                            Day 14
                          </span>
                        </h2>
                        <p className="text-violet-200/50 mt-1 text-sm">Consistency compounds. Secure your daily win.</p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 px-3 py-1.5 rounded-lg shadow-inner">
                        <TrendingUp size={14} className="text-green-400" />
                        <span className="text-sm font-bold text-white tracking-tight">+4%</span>
                        <span className="text-xs text-gray-500">Mastery</span>
                      </div>
                    </div>

                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center gap-4 bg-black/30 border border-white/5 p-4 rounded-2xl group cursor-pointer hover:bg-black/50 transition duration-300 shadow-sm">
                        <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-violet-400 group-hover:bg-violet-500/10 transition" />
                        <span className="font-medium text-gray-300 text-sm tracking-tight">Solve 2 <span className="text-white font-bold">Sliding Window</span> Problems</span>
                      </div>
                      <div className="flex items-center gap-4 bg-black/30 border border-white/5 p-4 rounded-2xl group cursor-pointer hover:bg-black/50 transition duration-300 shadow-sm">
                        <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-violet-400 group-hover:bg-violet-500/10 transition" />
                        <span className="font-medium text-gray-300 text-sm tracking-tight">Blind revise <span className="text-white font-bold">Binary Search</span> (10 mins)</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Architecture Flow */}
                  <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-8 shadow-xl relative overflow-hidden">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-10 flex items-center gap-2">
                      <GitCommit size={14} className="text-primary" /> Dependency Architecture
                    </h3>
                    
                    <div className="relative py-4 mb-4">
                      {/* Central Animated Line */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#1a1d27] -translate-y-1/2 z-0 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          className="h-full bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                        />
                      </div>
                      
                      <div className="flex justify-between items-center relative z-10">
                        {/* Node 1: Completed */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/50 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                            <CheckCircle2 size={18} />
                          </div>
                          <span className="text-xs font-bold text-gray-400 tracking-tight">Arrays</span>
                        </div>

                        {/* Node 2: Active */}
                        <div 
                          className="flex flex-col items-center gap-3 cursor-pointer group"
                          onClick={() => setExpandedNode(expandedNode === 'sliding' ? null : 'sliding')}
                        >
                          <div className="relative">
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1] }} 
                              transition={{ repeat: Infinity, duration: 2 }} 
                              className="absolute inset-0 bg-violet-500 rounded-xl blur-md opacity-40" 
                            />
                            <div className="w-12 h-12 rounded-xl bg-violet-600 border border-violet-400 flex items-center justify-center text-white relative z-10 shadow-lg transition-transform group-hover:scale-110">
                              <Activity size={20} />
                            </div>
                          </div>
                          <span className="text-xs font-bold text-white tracking-tight">Sliding Window</span>
                        </div>

                        {/* Node 3: Locked */}
                        <div className="flex flex-col items-center gap-3 opacity-60">
                          <div className="w-10 h-10 rounded-xl bg-[#1a1d27] border border-[#2d313f] flex items-center justify-center text-gray-500">
                            <Lock size={16} />
                          </div>
                          <span className="text-xs font-bold text-gray-500 tracking-tight">Two Pointers</span>
                        </div>
                        
                        {/* Node 4: Locked */}
                        <div className="flex flex-col items-center gap-3 opacity-30 hidden sm:flex">
                          <div className="w-10 h-10 rounded-xl bg-[#1a1d27] border border-[#2d313f] flex items-center justify-center text-gray-600">
                            <Lock size={16} />
                          </div>
                          <span className="text-xs font-bold text-gray-600 tracking-tight">Trees</span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Intelligence Node Detail */}
                    <AnimatePresence>
                      {expandedNode === 'sliding' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          className="overflow-hidden mt-6"
                        >
                          <div className="bg-[#0f1117] border border-[#2d313f] p-5 rounded-2xl shadow-inner">
                            <div className="flex items-center justify-between border-b border-[#2d313f] pb-3 mb-3">
                              <h4 className="font-bold text-white text-sm">Sliding Window Intelligence</h4>
                              <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-1 rounded">Mastery: 42%</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-1.5">Identified Weakness</span>
                                <ul className="text-xs text-gray-400 space-y-1.5">
                                  <li className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">•</span> Variable window size logic</li>
                                  <li className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">•</span> Shrinking phase edge cases</li>
                                </ul>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-1.5">Recommended Action</span>
                                <div className="bg-[#1a1d27] p-2 rounded-lg border border-[#2d313f] flex items-center gap-3 cursor-pointer hover:bg-[#2d313f]/50 transition">
                                  <BookOpen size={16} className="text-violet-400" />
                                  <div>
                                    <div className="text-xs font-bold text-gray-200">Longest Substring</div>
                                    <div className="text-[10px] text-gray-500 font-mono">LeetCode #3 • Medium</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* --- RIGHT PANEL (Vulnerabilities & AI Coach) --- */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* System Intelligence */}
                  <div className="bg-gradient-to-b from-[#181a29] to-[#12141a] border border-indigo-900/30 rounded-3xl p-6 relative shadow-lg">
                    <div className="absolute top-4 right-4 bg-indigo-500/10 p-1.5 rounded-full text-indigo-400">
                      <Sparkles size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      System Intelligence
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed mb-5 tracking-tight">
                      Your retention in <strong className="text-white font-bold">Recursion</strong> is declining. 
                      Based on your solve velocity, memory decay is likely.
                    </p>
                    <div className="bg-black/30 rounded-xl p-4 border border-white/5 shadow-inner">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-2">Automated Fix</span>
                      <ul className="space-y-2 text-xs text-gray-400">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <span>Added 2 recursion problems to your revision queue.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Deep Vulnerability Scan */}
                  <div className="bg-[#1a1515] border border-red-900/30 rounded-3xl p-6 shadow-lg">
                    <h3 className="text-xs font-bold text-red-500/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertCircle size={14} /> Vulnerability Scan
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-gray-200 font-bold tracking-tight">Dynamic Programming</span>
                          <span className="text-red-400 font-mono text-xs font-bold">18%</span>
                        </div>
                        <div className="w-full h-1 bg-red-950/50 rounded-full overflow-hidden mb-3">
                          <div className="w-[18%] h-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                        </div>
                        <div className="bg-black/30 rounded-lg p-3 border border-red-900/20">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Root Causes</span>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li className="flex items-center gap-1.5"><span className="text-red-500/50">-</span> Memoization state errors</li>
                            <li className="flex items-center gap-1.5"><span className="text-red-500/50">-</span> Low revisit frequency</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Decay */}
                  <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-6 shadow-lg">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <BarChart3 size={14} className="text-blue-400" /> Mastery Distribution
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: "Arrays & Hashing", val: 91, color: "bg-green-500" },
                        { name: "Two Pointers", val: 64, color: "bg-yellow-500" },
                      ].map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-gray-300 font-medium">{skill.name}</span>
                            <span className="text-gray-500 font-mono">{skill.val}%</span>
                          </div>
                          <div className="w-full h-1 bg-[#1a1d27] rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.val}%` }}
                              transition={{ delay: 0.8, duration: 1 }}
                              className={`h-full ${skill.color}`} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}
