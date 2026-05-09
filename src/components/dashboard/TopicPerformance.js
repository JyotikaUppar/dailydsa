import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { topicPerformanceData, topicStats } from "./data";

export default function TopicPerformance() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 p-6 rounded-3xl flex flex-col"
      >
        <h3 className="text-xl font-bold text-white mb-2">Topic Mastery</h3>
        <p className="text-sm text-gray-400 mb-6">Your accuracy across different DSA concepts.</p>
        <div className="flex-1 w-full min-h-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicPerformanceData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6B7280" }} />
              <Radar name="Accuracy" dataKey="A" stroke="#7c3aed" fill="#8b5cf6" fillOpacity={0.5} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 p-6 rounded-3xl flex flex-col"
      >
        <h3 className="text-xl font-bold text-white mb-2">Detailed Analytics</h3>
        <p className="text-sm text-gray-400 mb-6">Attempts vs Solved across topics.</p>
        <div className="flex-1 w-full min-h-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
            <BarChart data={topicStats} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="topic" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: "#374151", opacity: 0.4 }}
                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
              />
              <Bar dataKey="attempts" name="Total Attempts" fill="#4B5563" radius={[4, 4, 0, 0]} />
              <Bar dataKey="solved" name="Successfully Solved" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
