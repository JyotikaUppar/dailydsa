import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";

const getLevelColor = (count) => {
  if (count === 0) return "bg-gray-800";
  if (count === 1) return "bg-primary/40";
  if (count === 2) return "bg-primary/60";
  if (count === 3) return "bg-primary/80";
  return "bg-primary";
};

export default function Heatmap() {
  const [tooltip, setTooltip] = useState(null);
  const { userData } = useAuth();

  const heatmapData = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (89 - i));
      const dateStr = date.toISOString().split("T")[0];
      
      const solvesOnDay = userData?.solvedProblems?.filter(p => 
        p.solvedAt && p.solvedAt.startsWith(dateStr)
      ) || [];
      
      return {
        date: dateStr,
        count: solvesOnDay.length,
        topics: [...new Set(solvesOnDay.map(p => p.topic))]
      };
    });
  }, [userData?.solvedProblems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 p-6 rounded-3xl"
    >
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Daily Activity</h3>
          <p className="text-sm text-gray-400 mt-1">90 days of DSA practice</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/80"></div>
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-wrap gap-1.5 justify-start max-w-full">
          {heatmapData.map((day, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-sm transition-colors duration-200 cursor-pointer hover:ring-2 ring-white/50 ${getLevelColor(day.count)}`}
              onMouseEnter={() => setTooltip({ ...day, index: i })}
              onMouseLeave={() => setTooltip(null)}
            ></div>
          ))}
        </div>

        {tooltip && (
          <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 p-3 rounded-xl shadow-2xl z-10 w-48 pointer-events-none">
            <p className="text-xs text-gray-400 mb-1">{tooltip.date}</p>
            <p className="text-sm font-bold text-white mb-1">
              {tooltip.count} problems solved
            </p>
            {tooltip.topics.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {tooltip.topics.map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
