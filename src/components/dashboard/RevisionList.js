import { motion } from "framer-motion";
import { questionsToRevise } from "./data";
import { ArrowRight, History } from "lucide-react";

export default function RevisionList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 p-6 rounded-3xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Questions to Revise</h3>
          <p className="text-sm text-gray-400 mt-1">Based on spaced repetition & weak topics</p>
        </div>
        <button className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1">
          View all <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {questionsToRevise.map((q) => (
          <div key={q.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-900/50 rounded-2xl border border-gray-700/30 hover:border-primary/50 transition-colors group">
            <div className="mb-3 sm:mb-0">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-white font-medium group-hover:text-primary transition-colors">{q.title}</h4>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  q.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : 
                  q.difficulty === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 
                  'bg-green-500/20 text-green-400'
                }`}>
                  {q.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="px-2 py-0.5 bg-gray-800 rounded">{q.topic}</span>
                <span className="flex items-center gap-1">
                  <History size={12} />
                  {q.lastSolved === 'incorrect' ? <span className="text-red-400">Solved Incorrectly</span> : `Last: ${q.lastSolved}`}
                </span>
              </div>
            </div>
            <a 
              href={`https://leetcode.com/problems/${q.titleSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary/20 text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/0 hover:shadow-primary/25 w-full sm:w-auto text-center"
            >
              Revise Now
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
