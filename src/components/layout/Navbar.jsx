import React from "react";

export default function Navbar({ username, onAvatarClick }) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0a0b14]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform duration-300">
            <span className="text-lg">🚢</span>
          </div>
          <h1 className="font-black text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">
            Rate My Ship<span className="text-indigo-500">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-500 hover:text-white transition-colors relative">
            
            <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0a0b14]"></span>
          </button>

          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-bold text-white leading-none">{username}</span>
             
            </div>

            <button
              onClick={onAvatarClick}
              className="relative group p-[2px] rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 active:scale-90 transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              <div className="w-10 h-10 bg-[#0f111a] rounded-[14px] flex items-center justify-center overflow-hidden group-hover:bg-transparent transition-colors">
                <span className="font-black text-white group-hover:scale-110 transition-transform">
                  {username[0].toUpperCase() || "U"}
                </span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}