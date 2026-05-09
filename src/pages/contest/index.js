import Head from "next/head";
import Header from "@/components/header";
import { motion } from "framer-motion";
import { Trophy, Timer, Users, Star } from "lucide-react";

export default function Contest() {
  return (
    <>
      <Head>
        <title>Contests | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white">
        <Header />
        
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px]" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-6 pt-32 pb-20">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Weekly Contests</h1>
            <p className="text-gray-400">Compete globally, earn rating points, and climb the leaderboard.</p>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-indigo-900/20 backdrop-blur-xl border border-primary/30 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              <Trophy size={200} />
            </div>
            <div className="relative z-10 md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Registration Open
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">DailyDSA Weekly #42</h2>
              <p className="text-gray-300 mb-8 text-lg">4 algorithmic challenges. 90 minutes. Will you make it to the global top 100?</p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Timer className="text-primary" />
                  <span className="font-semibold text-white">Starts in: 2d 14h 30m</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="text-cyan-400" />
                  <span className="font-semibold text-white">4,231 Registered</span>
                </div>
              </div>

              <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-white/10 text-lg">
                Register Now
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6">Past Contests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[41, 40, 39, 38, 37, 36].map((num, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={num} 
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/60 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white">Weekly #{num}</h4>
                  <div className="bg-gray-800 px-2 py-1 rounded text-xs font-semibold text-gray-400">Ended</div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Participants</span>
                    <span className="text-gray-200 font-medium">~5,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Winner</span>
                    <span className="text-primary font-medium flex items-center gap-1"><Star size={12}/> tourist_algo</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-sm border border-gray-700 hover:border-gray-600">
                  Virtual Participation
                </button>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
