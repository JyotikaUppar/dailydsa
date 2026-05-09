import Head from "next/head";
import Header from "@/components/header";
import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp, Zap, Medal, Users } from "lucide-react";

const leaderboardData = [
  { rank: 1, username: "algo_master", xp: 14500, streak: 120, level: 42, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { rank: 2, username: "code_ninja", xp: 12300, streak: 85, level: 38, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { rank: 3, username: "graph_guru", xp: 11200, streak: 45, level: 35, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi" },
  { rank: 4, username: "dp_destroyer", xp: 9800, streak: 21, level: 31, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" },
  { rank: 5, username: "tree_traverser", xp: 8500, streak: 14, level: 28, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily" },
  { rank: 6, username: "array_ace", xp: 7200, streak: 5, level: 24, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max" },
];

export default function Leaderboard() {
  return (
    <>
      <Head>
        <title>Leaderboard | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white">
        <Header />
        
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[150px]" />
        </div>

        <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 xl:px-6 pt-32 pb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Global Leaderboard</h1>
            <p className="text-gray-400 text-lg">Compete with friends and developers worldwide.</p>
          </div>

          {/* Top 3 Podium */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 mt-8 hidden sm:flex">
            {/* Rank 2 */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
              <img src={leaderboardData[1].avatar} className="w-20 h-20 rounded-full border-4 border-gray-400 mb-4 bg-gray-800" alt="avatar" />
              <div className="w-32 h-32 bg-gradient-to-t from-gray-800 to-gray-700/50 rounded-t-2xl flex flex-col items-center justify-start pt-4 border border-b-0 border-gray-600">
                <span className="text-2xl font-bold text-gray-300">2</span>
                <span className="text-sm font-semibold truncate w-24 text-center mt-2">{leaderboardData[1].username}</span>
                <span className="text-xs text-primary font-bold">{leaderboardData[1].xp} XP</span>
              </div>
            </motion.div>
            
            {/* Rank 1 */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center z-10 relative">
              <div className="absolute -top-12">
                <Trophy size={40} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              </div>
              <img src={leaderboardData[0].avatar} className="w-24 h-24 rounded-full border-4 border-yellow-400 mb-4 bg-gray-800 shadow-[0_0_20px_rgba(250,204,21,0.3)]" alt="avatar" />
              <div className="w-36 h-40 bg-gradient-to-t from-yellow-900/40 to-yellow-600/20 rounded-t-2xl flex flex-col items-center justify-start pt-4 border border-b-0 border-yellow-500/50">
                <span className="text-3xl font-bold text-yellow-400">1</span>
                <span className="text-base font-semibold truncate w-28 text-center mt-2">{leaderboardData[0].username}</span>
                <span className="text-sm text-yellow-400 font-bold">{leaderboardData[0].xp} XP</span>
              </div>
            </motion.div>

            {/* Rank 3 */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center">
              <img src={leaderboardData[2].avatar} className="w-20 h-20 rounded-full border-4 border-orange-700 mb-4 bg-gray-800" alt="avatar" />
              <div className="w-32 h-28 bg-gradient-to-t from-orange-900/30 to-orange-800/30 rounded-t-2xl flex flex-col items-center justify-start pt-4 border border-b-0 border-orange-700/50">
                <span className="text-2xl font-bold text-orange-400">3</span>
                <span className="text-sm font-semibold truncate w-24 text-center mt-2">{leaderboardData[2].username}</span>
                <span className="text-xs text-primary font-bold">{leaderboardData[2].xp} XP</span>
              </div>
            </motion.div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-700/50 flex gap-4 bg-gray-800/30">
              <div className="flex-1 text-sm font-semibold text-gray-400 uppercase tracking-wider pl-4">Rank / User</div>
              <div className="w-24 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Streak</div>
              <div className="w-24 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right pr-4">XP</div>
            </div>
            
            <div className="divide-y divide-gray-700/50">
              {leaderboardData.map((user, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={user.rank} 
                  className="flex items-center p-4 hover:bg-gray-800/40 transition-colors group"
                >
                  <div className="w-12 text-center font-bold text-lg text-gray-500 group-hover:text-white transition-colors">
                    {user.rank}
                  </div>
                  <div className="flex-1 flex items-center gap-4 pl-4">
                    <img src={user.avatar} className="w-10 h-10 rounded-full bg-gray-800" alt="avatar" />
                    <div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors">{user.username}</h4>
                      <span className="text-xs text-gray-400">Level {user.level}</span>
                    </div>
                  </div>
                  <div className="w-24 text-right flex items-center justify-end gap-1 font-semibold text-gray-300">
                    <Zap size={14} className="text-orange-400" /> {user.streak}
                  </div>
                  <div className="w-24 text-right pr-4 font-bold text-primary">
                    {user.xp}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
