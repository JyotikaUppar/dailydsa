import Head from "next/head";
import Header from "@/components/header";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, MessageCircle, Share2, Search } from "lucide-react";

const discussions = [
  { id: 1, title: "How to approach dynamic programming on trees?", author: "algo_master", replies: 24, upvotes: 156, tags: ["Dynamic Programming", "Trees"] },
  { id: 2, title: "Google Interview Experience - L4 SWE", author: "code_ninja", replies: 89, upvotes: 432, tags: ["Interview Experience", "Google"] },
  { id: 3, title: "Optimal way to find cycle in a directed graph", author: "graph_guru", replies: 12, upvotes: 45, tags: ["Graphs", "Algorithms"] },
  { id: 4, title: "My 100-day streak journey on DailyDSA!", author: "streak_chaser", replies: 45, upvotes: 210, tags: ["Motivation", "Journey"] },
];

export default function Discuss() {
  return (
    <>
      <Head>
        <title>Discuss | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white">
        <Header />
        
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px]" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-6 pt-32 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Community Discuss</h1>
              <p className="text-gray-400">Join the conversation with fellow DSA enthusiasts.</p>
            </div>
            <button className="bg-primary hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20">
              New Topic
            </button>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-700/50 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search discussions..." 
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <select className="bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors hidden sm:block">
                <option>Most Recent</option>
                <option>Most Upvoted</option>
                <option>Unanswered</option>
              </select>
            </div>
            
            <div className="divide-y divide-gray-700/50">
              {discussions.map((post, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={post.id} 
                  className="p-6 hover:bg-gray-800/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex flex-col items-center gap-1 bg-gray-800 p-2 rounded-xl border border-gray-700">
                      <ThumbsUp size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-bold text-gray-300">{post.upvotes}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-semibold uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-400">Posted by <span className="text-gray-300 font-medium">@{post.author}</span> • 2 hours ago</p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <MessageCircle size={16} />
                        <span className="text-sm font-medium">{post.replies}</span>
                      </div>
                    </div>
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
