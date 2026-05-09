import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { 
  User, Shield, Bell, Link as LinkIcon, 
  Code2, Save, Loader2, Camera, Trash2, 
  AlertCircle, ChevronRight, CheckCircle2
} from "lucide-react";

export default function Settings() {
  const { user, userData, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Form states
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    avatar: "",
    leetcodeUsername: "",
    githubUsername: ""
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        bio: userData.bio || "",
        avatar: userData.avatar || "",
        leetcodeUsername: userData.leetcodeUsername || "",
        githubUsername: userData.githubUsername || ""
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      await updateUserProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "integrations", label: "Integrations", icon: LinkIcon },
    { id: "account", label: "Account", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <>
      <Head>
        <title>Settings | Daily DSA</title>
      </Head>
      <div className="min-h-screen bg-[#0f1117] text-white selection:bg-violet-500/30 font-sans pb-20">
        <Header />

        {/* Radial Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-violet-600/5 blur-[150px]" />
        </div>

        <main className="relative z-10 max-w-[1000px] mx-auto px-4 md:px-8 pt-28">
          
          <div className="flex flex-col md:flex-row gap-10 items-start">
            
            {/* SIDEBAR TABS */}
            <aside className="w-full md:w-64 space-y-1">
              <h1 className="text-2xl font-black text-white tracking-tight mb-6 px-3">Settings</h1>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id 
                    ? "bg-violet-600/10 text-violet-400 border border-violet-500/20" 
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/40"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="ml-auto">
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </button>
              ))}
            </aside>

            {/* CONTENT AREA */}
            <div className="flex-1 w-full bg-[#12141a] border border-[#2d313f] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.form
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  
                  {activeTab === "profile" && (
                    <>
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-tight mb-1">Public Profile</h2>
                        <p className="text-sm text-gray-500 mb-6">Manage how you appear to the community.</p>
                        
                        <div className="space-y-6">
                          {/* Avatar Section */}
                          <div className="flex items-center gap-6 p-4 rounded-2xl bg-black/20 border border-white/5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-black shadow-lg overflow-hidden">
                              {formData.avatar ? (
                                <img src={formData.avatar} className="w-full h-full object-cover" />
                              ) : (
                                formData.username?.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Avatar URL</label>
                              <input 
                                type="text" 
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full md:w-80 bg-[#1a1d27] border border-[#2d313f] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Username</label>
                              <input 
                                type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full bg-[#1a1d27] border border-[#2d313f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Email Address</label>
                              <input 
                                type="email" 
                                value={user?.email || ""} 
                                disabled
                                className="w-full bg-[#0f1117] border border-[#2d313f] rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Bio</label>
                            <textarea 
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              rows={4}
                              className="w-full bg-[#1a1d27] border border-[#2d313f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                              placeholder="Tell us about your learning journey..."
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "integrations" && (
                    <>
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-tight mb-1">Integrations</h2>
                        <p className="text-sm text-gray-500 mb-6">Power your dashboard with real-world data.</p>
                        
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-[#1a1d27] border border-[#2d313f] space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                                <Code2 size={20} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">LeetCode Sync</h4>
                                <p className="text-xs text-gray-500">Fetches your solved problems and activity.</p>
                              </div>
                            </div>
                            <input 
                              type="text" 
                              name="leetcodeUsername"
                              value={formData.leetcodeUsername}
                              onChange={handleChange}
                              placeholder="LeetCode Username"
                              className="w-full bg-[#0f1117] border border-[#2d313f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                            />
                          </div>

                          <div className="p-5 rounded-2xl bg-[#1a1d27] border border-[#2d313f] space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-white">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">GitHub Connection</h4>
                                <p className="text-xs text-gray-500">Track your commits and consistency.</p>
                              </div>
                            </div>
                            <input 
                              type="text" 
                              name="githubUsername"
                              value={formData.githubUsername}
                              onChange={handleChange}
                              placeholder="GitHub Username"
                              className="w-full bg-[#0f1117] border border-[#2d313f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gray-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "account" && (
                    <>
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-bold text-white tracking-tight mb-1">Security</h2>
                          <p className="text-sm text-gray-500 mb-6">Manage your account credentials.</p>
                          <button type="button" className="text-sm font-bold text-violet-400 hover:text-violet-300">Change password</button>
                        </div>

                        <div className="pt-6 border-t border-red-900/20">
                          <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-2">Danger Zone</h2>
                          <p className="text-xs text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                          <button type="button" className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                            <Trash2 size={16} /> Delete Account
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "notifications" && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell size={48} className="text-gray-800 mb-4" />
                      <h3 className="text-lg font-bold text-white">Notification Preferences</h3>
                      <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">
                        We're currently finalizing the notification engine. Stay tuned for streak reminders and contest alerts!
                      </p>
                    </div>
                  )}

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-6 border-t border-[#2d313f] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {saveSuccess && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.9 }} 
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-green-400 text-xs font-bold flex items-center gap-1.5"
                        >
                          <CheckCircle2 size={14} /> Profile updated successfully
                        </motion.span>
                      )}
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-white text-black font-black px-8 py-3 rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      Save Changes
                    </button>
                  </div>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
