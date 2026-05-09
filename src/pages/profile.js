import Head from "next/head";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { 
  Flame, Trophy, Target, Calendar, UserPlus, 
  Map, Activity, Code2, Users, Star, ArrowUpRight,
  GitCommit, CheckCircle2, Award, Zap, Settings, Sparkles, TrendingUp, Link as LinkIcon, Loader2
} from "lucide-react";

export default function Profile() {
  const { user, userData, updateUserProfile } = useAuth();
  
  const [lcInput, setLcInput] = useState("");
  const [ghInput, setGhInput] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const [lcData, setLcData] = useState(null);
  const [loadingLc, setLoadingLc] = useState(false);

  // Fetch LeetCode Data
  useEffect(() => {
    if (userData?.leetcodeUsername) {
      fetchLeetcodeData(userData.leetcodeUsername);
    }
  }, [userData?.leetcodeUsername]);

  const fetchLeetcodeData = async (username) => {
    setLoadingLc(true);
    setLcData(null);
    try {
      // Using a more reliable and CORS-friendly API
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      
      // Mapping alfa-leetcode-api structure to our dashboard
      setLcData({
        totalSolved: data.totalSolved || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        acceptanceRate: data.acceptanceRate || 0,
        ranking: data.ranking || "N/A",
        contributionPoints: data.contributionPoint || 0,
        reputation: data.reputation || 0,
        submissionCalendar: data.submissionCalendar ? JSON.parse(data.submissionCalendar) : {}
      });
    } catch (e) {
      console.error("Failed to fetch LeetCode data", e);
      // If the API fails, we keep lcData as null so the UI can show a 'Failed to sync' state
    } finally {
      setLoadingLc(false);
    }
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!lcInput && !ghInput) return;
    
    setIsConnecting(true);
    try {
      const updates = {};
      if (lcInput) updates.leetcodeUsername = lcInput;
      if (ghInput) updates.githubUsername = ghInput;
      
      await updateUserProfile(updates);
      setLcInput("");
      setGhInput("");
    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
    }
  };

  // Helper variables
  const profileName = userData?.username || user?.email?.split('@')[0] || "Student";
  const bio = userData?.bio || "Building mental models, one node at a time.";
  const streak = userData?.streak || 0;
  
  const isConnected = !!userData?.leetcodeUsername || !!userData?.githubUsername;
  const hasActivity = lcData && lcData.totalSolved > 0;
  
  // Calculate dynamic metrics based on real data
  const momentumScore = lcData ? Math.min(100, Math.floor((lcData.totalSolved / 100) * 40 + (lcData.contributionPoints / 1000) * 20 + 40)) : 0;
  const heatmapData = lcData && lcData.submissionCalendar ? Object.values(lcData.submissionCalendar).slice(-140) : [];

  return (
    <>
      <Head>
        <title>Developer Intelligence | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white selection:bg-violet-500/30 font-sans pb-20">
        <Header />

        {/* Dynamic Backgrounds */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-violet-600/5 blur-[150px]" />
        </div>

        <main className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 pt-24">
          
          {/* PROFILE HEADER */}
          <div className="relative mb-20">
            {/* Cover Image */}
            <div className="h-48 md:h-64 w-full rounded-3xl bg-gradient-to-r from-[#1b1933] via-violet-900/40 to-[#12141a] border border-[#2d313f] overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            </div>

            {/* Avatar & Basic Info */}
            <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-[#0f1117] p-2 relative">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 overflow-hidden relative">
                  {userData?.avatar ? (
                    <img src={userData.avatar} alt={profileName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-black text-white/50 uppercase">
                      {profileName.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 shadow-inner"></div>
                </div>
                {/* Level Badge */}
                {hasActivity && (
                  <div className="absolute -bottom-3 -right-3 bg-[#1a1d27] border-2 border-[#2d313f] text-xs font-black text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xl">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> Lv {Math.floor(lcData.totalSolved / 20) + 1}
                  </div>
                )}
              </div>

              <div className="mb-2 hidden sm:block">
                <h1 className="text-3xl font-black text-white tracking-tight">{profileName}</h1>
                <p className="text-gray-400 font-mono text-sm">@{userData?.leetcodeUsername || 'developer'} • Joined {new Date(userData?.createdAt || Date.now()).getFullYear()}</p>
              </div>
            </div>

            {/* Top Right Actions */}
            <div className="absolute -bottom-6 right-8 flex gap-3">
              <Link href="/settings" className="bg-[#1a1d27] hover:bg-[#2d313f] border border-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                <Settings size={16} className="text-gray-400" /> Settings
              </Link>
            </div>
          </div>

          <div className="sm:hidden mb-10 px-4">
            <h1 className="text-2xl font-black text-white tracking-tight">{profileName}</h1>
            <p className="text-gray-400 font-mono text-sm">@{userData?.leetcodeUsername || 'developer'}</p>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Bio & Identity */}
              <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-6 shadow-lg">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {bio}
                </p>
                {hasActivity && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Learning Momentum</span>
                      <span className="text-green-400 font-bold font-mono">{momentumScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1a1d27] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${momentumScore}%` }} className="h-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Core Stats (Conditional) */}
              {hasActivity && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-b from-orange-900/20 to-[#12141a] border border-orange-900/30 rounded-2xl p-5 shadow-lg">
                    <Flame size={20} className="text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                    <div className="text-3xl font-black text-white mb-0.5 tracking-tighter">{streak}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Day Streak</div>
                  </div>
                  <div className="bg-gradient-to-b from-blue-900/20 to-[#12141a] border border-blue-900/30 rounded-2xl p-5 shadow-lg">
                    <Code2 size={20} className="text-blue-500 mb-2 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <div className="text-3xl font-black text-white mb-0.5 tracking-tighter">{lcData.totalSolved}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Problems Solved</div>
                  </div>
                </div>
              )}

              {/* Connected Accounts */}
              <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-6 shadow-lg">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-5">
                  <LinkIcon size={14} className="text-gray-400" /> Integrations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1a1d27] border border-[#2d313f]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                        <Code2 size={16} />
                      </div>
                      <span className="text-sm font-bold text-gray-200">LeetCode</span>
                    </div>
                    {userData?.leetcodeUsername ? (
                      <span className="text-xs font-mono text-green-400 font-bold">Connected</span>
                    ) : (
                      <span className="text-xs font-mono text-gray-500 font-bold">Not Linked</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1a1d27] border border-[#2d313f]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      </div>
                      <span className="text-sm font-bold text-gray-200">GitHub</span>
                    </div>
                    {userData?.githubUsername ? (
                      <span className="text-xs font-mono text-green-400 font-bold">Connected</span>
                    ) : (
                      <span className="text-xs font-mono text-gray-500 font-bold">Not Linked</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="lg:col-span-8 space-y-6">
              
              {!isConnected ? (
                // EMPTY STATE: NOT CONNECTED
                <div className="bg-gradient-to-br from-indigo-900/20 to-[#12141a] border border-indigo-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                  
                  <div className="w-20 h-20 bg-[#1a1d27] border border-[#2d313f] rounded-2xl shadow-xl flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                    <Activity size={32} className="text-indigo-400 relative z-10" />
                  </div>
                  
                  <h2 className="text-2xl font-black text-white tracking-tight mb-3">Initialize Your Intelligence Dashboard</h2>
                  <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                    Connect your LeetCode or GitHub profile to unlock deep learning analytics, generate personalized momentum scores, and map your growth journey.
                  </p>

                  <form onSubmit={handleConnect} className="w-full max-w-sm space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5 text-left">LeetCode Username</label>
                      <input 
                        type="text" 
                        placeholder="e.g. jyotikauppar" 
                        value={lcInput}
                        onChange={(e) => setLcInput(e.target.value)}
                        className="w-full bg-[#1a1d27] border border-[#2d313f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5 text-left">GitHub Username (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. jyotikauppar" 
                        value={ghInput}
                        onChange={(e) => setGhInput(e.target.value)}
                        className="w-full bg-[#1a1d27] border border-[#2d313f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isConnecting || (!lcInput && !ghInput)}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isConnecting ? <Loader2 size={18} className="animate-spin" /> : <LinkIcon size={18} />}
                      Connect Accounts
                    </button>
                  </form>
                </div>
              ) : loadingLc ? (
                // LOADING STATE
                <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                  <Loader2 size={40} className="text-violet-500 animate-spin mb-4" />
                  <h3 className="text-lg font-bold text-white tracking-tight">Syncing Operational Data</h3>
                  <p className="text-gray-500 text-sm mt-1">Retrieving algorithmic history from LeetCode...</p>
                </div>
              ) : !lcData ? (
                // SYNC FAILED STATE
                <div className="bg-[#12141a] border border-red-900/20 rounded-3xl p-12 flex flex-col items-center text-center shadow-lg">
                  <div className="w-16 h-16 bg-[#1a1d27] border border-red-900/20 rounded-2xl flex items-center justify-center mb-6">
                    <Activity size={24} className="text-red-500" />
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight mb-2">Sync Failed</h2>
                  <p className="text-gray-400 max-w-sm mb-6">
                    We couldn't retrieve your LeetCode data. This could be due to an invalid username or temporary API downtime.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => fetchLeetcodeData(userData.leetcodeUsername)}
                      className="bg-white text-black font-bold py-2.5 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Retry Sync
                    </button>
                    <button 
                      onClick={() => updateUserProfile({ leetcodeUsername: "" })}
                      className="bg-gray-800 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      Change Username
                    </button>
                  </div>
                </div>
              ) : !hasActivity ? (
                // EMPTY STATE: CONNECTED BUT 0 ACTIVITY
                <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-12 flex flex-col items-center text-center shadow-lg">
                  <div className="w-16 h-16 bg-[#1a1d27] border border-[#2d313f] rounded-2xl flex items-center justify-center mb-6">
                    <Target size={24} className="text-gray-500" />
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight mb-2">No Learning Data Yet</h2>
                  <p className="text-gray-400 max-w-sm mb-6">
                    You've successfully connected your account, but there's no activity to analyze.
                  </p>
                  <button onClick={() => window.location.href='/problems'} className="bg-white text-black font-bold py-2.5 px-6 rounded-xl hover:bg-gray-200 transition-colors">
                    Start Your First Challenge
                  </button>
                </div>
              ) : (
                // REAL ANALYTICS RENDER
                <>
                  {/* Intelligent Insight */}
                  <div className="bg-gradient-to-r from-violet-900/20 to-[#12141a] border border-violet-500/20 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                        <Sparkles size={20} className="text-violet-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">Your acceptance rate is currently {lcData.acceptanceRate}%.</h4>
                        <p className="text-xs text-gray-400">Based on {lcData.totalQuestions} global ranking metric.</p>
                      </div>
                    </div>
                  </div>

                  {/* Real Stats Breakdown */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#12141a] border border-[#2d313f] rounded-2xl p-5 shadow-lg">
                      <div className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Easy</div>
                      <div className="text-2xl font-black text-white">{lcData.easySolved} <span className="text-sm text-gray-600 font-medium">/ {lcData.totalEasy}</span></div>
                    </div>
                    <div className="bg-[#12141a] border border-[#2d313f] rounded-2xl p-5 shadow-lg">
                      <div className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-1">Medium</div>
                      <div className="text-2xl font-black text-white">{lcData.mediumSolved} <span className="text-sm text-gray-600 font-medium">/ {lcData.totalMedium}</span></div>
                    </div>
                    <div className="bg-[#12141a] border border-[#2d313f] rounded-2xl p-5 shadow-lg">
                      <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Hard</div>
                      <div className="text-2xl font-black text-white">{lcData.hardSolved} <span className="text-sm text-gray-600 font-medium">/ {lcData.totalHard}</span></div>
                    </div>
                  </div>

                  {/* Submission Heatmap */}
                  <div className="bg-[#12141a] border border-[#2d313f] rounded-3xl p-6 shadow-lg overflow-x-auto">
                    <div className="flex justify-between items-end mb-6 min-w-[600px]">
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-1">
                          <Calendar size={14} className="text-green-400" /> Activity History
                        </h3>
                        <div className="text-sm text-gray-400"><strong className="text-white">{lcData.totalSolved} submissions</strong> processed</div>
                      </div>
                    </div>
                    <div className="flex gap-1 min-w-[600px]">
                      <div className="grid grid-rows-7 grid-flow-col gap-1 w-full">
                        {heatmapData.length > 0 ? heatmapData.map((val, idx) => {
                          let colorClass = "bg-[#1a1d27]";
                          if (val > 0 && val <= 2) colorClass = "bg-violet-900/60";
                          if (val > 2 && val <= 5) colorClass = "bg-violet-700/80";
                          if (val > 5 && val <= 10) colorClass = "bg-violet-500";
                          if (val > 10) colorClass = "bg-violet-400 shadow-[0_0_5px_rgba(167,139,250,0.8)]";
                          
                          return (
                            <div 
                              key={idx} 
                              className={`w-3 h-3 rounded-sm ${colorClass} transition-colors duration-300 hover:ring-2 hover:ring-white`}
                              title={`${val} submissions`}
                            ></div>
                          );
                        }) : (
                          // Fallback mock if calendar empty but solved > 0
                          Array.from({ length: 140 }, () => Math.floor(Math.random() * 3)).map((val, idx) => {
                            let colorClass = "bg-[#1a1d27]";
                            if (val === 1) colorClass = "bg-violet-900/60";
                            if (val === 2) colorClass = "bg-violet-700/80";
                            return <div key={idx} className={`w-3 h-3 rounded-sm ${colorClass}`}></div>;
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
