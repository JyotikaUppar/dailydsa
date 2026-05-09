import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, Info, Clock, Sparkles } from "lucide-react";
import { insightsData } from "./data";

const InsightIcon = ({ type }) => {
  switch (type) {
    case "warning": return <AlertCircle className="text-orange-400" size={20} />;
    case "success": return <TrendingUp className="text-green-400" size={20} />;
    case "alert": return <Clock className="text-red-400" size={20} />;
    case "info":
    default: return <Info className="text-blue-400" size={20} />;
  }
};

export default function SmartInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 backdrop-blur-xl border border-indigo-500/30 p-6 rounded-3xl relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 opacity-10">
        <Sparkles size={120} className="text-primary" />
      </div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Sparkles className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">AI Study Insights</h3>
          <p className="text-sm text-indigo-200/70">Personalized recommendations for your prep</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {insightsData.map((insight, idx) => (
          <div key={idx} className="flex gap-4 p-4 bg-gray-900/40 rounded-2xl border border-gray-700/50 hover:bg-gray-800/60 transition-colors">
            <div className="mt-0.5">
              <InsightIcon type={insight.type} />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {insight.message}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
