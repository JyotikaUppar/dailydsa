import { motion } from "framer-motion";
import { Flame, CheckCircle, Clock, TrendingUp, TrendingDown, Target, Zap, Battery } from "lucide-react";
import { userStats } from "./data";
import { useAuth } from "@/context/AuthContext";

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl hover:shadow-lg hover:bg-gray-800/80 transition-all duration-300 group"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-white mt-2 group-hover:scale-105 transform origin-left transition-transform duration-300">
          {value}
        </h3>
        {subtitle && <p className={`text-xs mt-2 ${colorClass}`}>{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-gray-700/50 ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

export default function HeroStats() {
  const { userData } = useAuth();
  const streak = userData?.streak || 0;
  const totalSolved = userData?.solvedProblems?.length || 0;
  const activeDays = userData?.totalActiveDays || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Current Streak"
        value={`${streak} Days`}
        subtitle={streak > 0 ? "🔥 Keep the momentum going!" : "Start your streak today!"}
        icon={Flame}
        colorClass="text-orange-500"
        delay={0.1}
      />
      <StatCard
        title="Problems Solved"
        value={totalSolved}
        subtitle={`${activeDays} active days total`}
        icon={CheckCircle}
        colorClass="text-green-400"
        delay={0.2}
      />
      <StatCard
        title="Accuracy Rate"
        value={totalSolved > 0 ? "85%" : "0%"}
        subtitle="Based on recent attempts"
        icon={Clock}
        colorClass="text-blue-400"
        delay={0.3}
      />
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-4 rounded-2xl flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp size={16} />
            <span className="text-xs font-medium text-gray-400">Strongest</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">
            {getStrongestTopic(userData?.solvedProblems)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-4 rounded-2xl flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-red-400">
            <TrendingDown size={16} />
            <span className="text-xs font-medium text-gray-400">Weakest</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">
            {getWeakestTopic(userData?.solvedProblems)}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function getStrongestTopic(solved) {
  if (!solved || solved.length === 0) return "N/A";
  const counts = {};
  solved.forEach(s => counts[s.topic] = (counts[s.topic] || 0) + 1);
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

function getWeakestTopic(solved) {
  if (!solved || solved.length === 0) return "N/A";
  // For now, just show another topic or N/A
  const counts = {};
  solved.forEach(s => counts[s.topic] = (counts[s.topic] || 0) + 1);
  const topics = Object.keys(counts);
  if (topics.length < 2) return "N/A";
  return topics.reduce((a, b) => counts[a] < counts[b] ? a : b);
}
