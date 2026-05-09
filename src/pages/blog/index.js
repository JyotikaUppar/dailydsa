import Head from "next/head";
import Header from "@/components/header";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogs = [
  { id: 1, title: "Mastering Sliding Window Technique in 7 Days", excerpt: "A complete guide to understanding and applying the sliding window technique to solve array and string problems optimally.", author: "Jane Doe", date: "Oct 24, 2026", readTime: "8 min read", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "Top 5 Graph Algorithms Every Dev Should Know", excerpt: "From Dijkstra's to topological sorting, these five graph algorithms will prepare you for 80% of graph interview questions.", author: "John Smith", date: "Oct 20, 2026", readTime: "12 min read", image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto=format&fit=crop" },
  { id: 3, title: "How I Cracked Meta Using DailyDSA", excerpt: "My journey of consistent practice, spaced repetition, and focusing on weak topics that led to a senior SWE offer.", author: "Alice Chen", date: "Oct 15, 2026", readTime: "5 min read", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" },
];

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white">
        <Header />
        
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-6 pt-32 pb-20">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Engineering Blog</h1>
            <p className="text-gray-400 text-lg">Insights, tutorials, and success stories from the DailyDSA community and core team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={blog.id} 
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {blog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">{blog.author}</span>
                    <button className="text-primary group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
