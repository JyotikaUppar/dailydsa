import { motion } from "framer-motion";
import { Target, Trophy } from "lucide-react";
import { userStats } from "./data";

export default function GoalTracker() {
  const progress = userStats.weeklyProgress;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 p-6 rounded-3xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="text-primary" size={20} />
            Weekly Goal
          </h3>
          <p className="text-sm text-gray-400 mt-1">20 problems to solve this week</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">{progress}%</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Completed</p>
        </div>
      </div>

      <div className="relative h-4 bg-gray-900 rounded-full overflow-hidden mb-4 border border-gray-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 to-primary rounded-full relative"
        >
          <div className="absolute inset-0 bg-white/20 blur-sm"></div>
        </motion.div>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
        <span>0</span>
        <span className="flex items-center gap-1 text-yellow-500">
          <Trophy size={14} /> 20
        </span>
      </div>
      
      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center gap-4">
        <div className="bg-primary/20 p-2 rounded-xl text-primary">
          <Target size={20} />
        </div>
        <div>
          <p className="text-white font-medium text-sm">Almost there!</p>
          <p className="text-gray-400 text-xs mt-0.5">Solve 3 more problems to reach your goal.</p>
        </div>
      </div>
    </motion.div>
  );
}
