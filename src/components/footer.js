// use native <img> for external favicons/icons

export default function Footer() {
  return (
    <footer className="py-20 border-t border-gray-800/50 bg-[#0f1117]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">
              D
            </div>
            <span className="text-xl font-black text-white tracking-tighter">DailyDSA</span>
          </div>

          <span className="block text-gray-500 font-medium max-w-xs mx-auto text-sm leading-relaxed">
            Elevating developer consistency through algorithmic intelligence.
          </span>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-violet-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Contact</a>
          </div>

          <div className="pt-8 border-t border-gray-800/30 w-full max-w-md mx-auto">
            <span className="block text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} DailyDSA • All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}