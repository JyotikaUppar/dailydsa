import Head from "next/head";
import Header from "@/components/header";
import HeroStats from "@/components/dashboard/HeroStats";
import Heatmap from "@/components/dashboard/Heatmap";
import TopicPerformance from "@/components/dashboard/TopicPerformance";
import SmartInsights from "@/components/dashboard/SmartInsights";
import RevisionList from "@/components/dashboard/RevisionList";
import GoalTracker from "@/components/dashboard/GoalTracker";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { History } from "lucide-react";

export default function Dashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white selection:bg-primary/30">
        <Header />
        
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-6 pt-32 pb-20">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {userData?.username || 'Challenger'}!</h1>
            <p className="text-gray-400">
              {userData?.solvedProblems?.length > 0 
                ? "Track your DSA preparation intuitively." 
                : "Start your journey by solving your first problem today."}
            </p>
          </div>

          {userData?.solvedProblems?.length > 0 ? (
            <>
              <HeroStats />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <div className="xl:col-span-2 flex flex-col gap-6">
                  <Heatmap />
                  <SmartInsights />
                </div>
                <div className="xl:col-span-1 flex flex-col gap-6">
                  <GoalTracker />
                  <RevisionList />
                </div>
              </div>
              <TopicPerformance />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 rounded-3xl bg-gray-800/50 flex items-center justify-center mb-8 border border-gray-700/50">
                <History className="text-gray-500" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">No activity yet.</h2>
              <p className="text-gray-400 max-w-md mb-8">
                Your streaks, analytics, and insights will appear here once you start solving problems.
              </p>
              <button 
                onClick={() => router.push("/problems")}
                className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-violet-600/20"
              >
                Go to Problems
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
