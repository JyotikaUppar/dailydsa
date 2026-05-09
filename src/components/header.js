import Logo from "../images/ddlogo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Bell, User, Settings, LogOut, Map, BarChart2, Users, ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const router = useRouter();
  const { user, userData, logout } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkClass = (path) => {
    const isActive = router.pathname === path || (path !== '/' && router.pathname.startsWith(`${path}/`));
    return `block px-3 py-2 rounded-md transition-all text-sm font-medium ${
      isActive 
      ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]' 
      : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
        ? 'bg-[#0f1117]/80 backdrop-blur-md border-gray-800 shadow-xl' 
        : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/">
            <img src={Logo?.src ?? Logo} className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-900/30 border border-gray-800/60 p-1 rounded-xl backdrop-blur-sm">
          <Link href="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
          <Link href="/problems" className={getLinkClass('/problems')}>Problems</Link>
          <Link href="/roadmaps" className={getLinkClass('/roadmaps')}>Roadmaps</Link>
          <Link href="/discuss" className={getLinkClass('/discuss')}>Discuss</Link>
        </nav>

        {/* Right Side (Auth & Mobile Toggle) */}
        <div className="flex items-center gap-4">
          
          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-2"
              >
                Log in
              </Link>
              <Link 
                href="/signup"
                className="flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-white/5 border border-gray-700 rounded-lg hover:bg-white/10 hover:border-gray-600 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-violet-500 rounded-full border border-[#0f1117]"></span>
              </button>

              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-1 rounded-full border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-200 hidden lg:block">
                    {userData?.username || user.email?.split('@')[0]}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center overflow-hidden">
                    {userData?.avatar ? (
                      <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-violet-400" />
                    )}
                  </div>
                  <ChevronDown size={14} className="text-gray-400 mr-1" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-[#151821]/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-800/60 mb-2">
                        <p className="text-sm font-bold text-white truncate">{userData?.username || user.email?.split('@')[0]}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <div className="px-2 space-y-1">
                        <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl transition-colors">
                          <User size={16} className="text-gray-400" /> My Profile
                        </Link>
                        <Link href="/roadmaps" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl transition-colors">
                          <Map size={16} className="text-gray-400" /> My Roadmap
                        </Link>
                        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl transition-colors">
                          <BarChart2 size={16} className="text-gray-400" /> Progress Analytics
                        </Link>
                        <Link href="/friends" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl transition-colors">
                          <Users size={16} className="text-gray-400" /> Friends
                        </Link>
                      </div>

                      <div className="px-2 mt-2 pt-2 border-t border-gray-800/60 space-y-1">
                        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl transition-colors">
                          <Settings size={16} className="text-gray-400" /> Settings
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                        >
                          <LogOut size={16} className="text-red-400/70" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-current transition duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0f1117]/95 backdrop-blur-xl border-b border-gray-800"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              <Link href="/dashboard" className={getLinkClass('/dashboard')} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link href="/problems" className={getLinkClass('/problems')} onClick={() => setMobileMenuOpen(false)}>Problems</Link>
              <Link href="/roadmaps" className={getLinkClass('/roadmaps')} onClick={() => setMobileMenuOpen(false)}>Roadmaps</Link>
              <Link href="/discuss" className={getLinkClass('/discuss')} onClick={() => setMobileMenuOpen(false)}>Discuss</Link>
              
              <div className="h-px bg-gray-800 my-2"></div>
              
              {!user ? (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Link 
                    href="/login"
                    className="flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-gray-800 rounded-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/signup"
                    className="flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-violet-600 rounded-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/profile" className={getLinkClass('/profile')} onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                  <Link href="/settings" className={getLinkClass('/settings')} onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="mt-2 flex items-center justify-center px-4 py-3 text-sm font-bold text-red-400 bg-red-500/10 rounded-xl text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
