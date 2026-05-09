export const heatmapData = Array.from({ length: 90 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));
  const count = Math.floor(Math.random() * 5); // 0 to 4 problems
  return {
    date: date.toISOString().split("T")[0],
    count,
    topics: count > 0 ? ["Arrays", "Strings", "DP"].slice(0, Math.ceil(Math.random() * 3)) : [],
  };
});

export const topicPerformanceData = [
  { subject: "Arrays", A: 85, fullMark: 100 },
  { subject: "Strings", A: 70, fullMark: 100 },
  { subject: "DP", A: 45, fullMark: 100 },
  { subject: "Graphs", A: 60, fullMark: 100 },
  { subject: "Trees", A: 90, fullMark: 100 },
  { subject: "Greedy", A: 65, fullMark: 100 },
  { subject: "Backtracking", A: 50, fullMark: 100 },
];

export const topicStats = [
  { topic: "Arrays", accuracy: 88, attempts: 120, solved: 105, avgTime: "15m" },
  { topic: "Trees", accuracy: 92, attempts: 80, solved: 74, avgTime: "18m" },
  { topic: "Graphs", accuracy: 65, attempts: 50, solved: 32, avgTime: "35m" },
  { topic: "DP", accuracy: 48, attempts: 90, solved: 43, avgTime: "45m" },
];

export const questionsToRevise = [
  { id: 1, title: "Longest Increasing Subsequence", titleSlug: "longest-increasing-subsequence", difficulty: "Medium", lastSolved: "12 days ago", topic: "DP" },
  { id: 2, title: "Course Schedule II", titleSlug: "course-schedule-ii", difficulty: "Medium", lastSolved: "25 days ago", topic: "Graphs" },
  { id: 3, title: "N-Queens", titleSlug: "n-queens", difficulty: "Hard", lastSolved: "1 month ago", topic: "Backtracking" },
  { id: 4, title: "Word Ladder", titleSlug: "word-ladder", difficulty: "Hard", lastSolved: "incorrect", topic: "Graphs" },
];

export const insightsData = [
  { type: "warning", message: "You are weak in Dynamic Programming. Accuracy is below 50%." },
  { type: "success", message: "Your graph-solving accuracy improved by 18% this week!" },
  { type: "info", message: "You haven’t revised Trees in 10 days. Spaced repetition needed." },
  { type: "alert", message: "Your solving speed decreases after 11 PM. Rest recommended." }
];

export const userStats = {
  streak: 14,
  totalSolved: 342,
  weeklyProgress: 85, // out of 100
  avgTime: "22m",
  strongest: "Trees",
  weakest: "DP",
  productivityScore: 92,
  burnoutRisk: "Low"
};
