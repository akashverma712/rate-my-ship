export default function Navbar({ username, onAvatarClick }) {
  const initial = username?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0a0b14]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            🚢
          </div>
          <h1 className="font-black text-xl text-white">
            Rate My Ship<span className="text-indigo-500">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-white">
                {username || "User"}
              </span>
            </div>

            <button
              onClick={onAvatarClick}
              className="p-[2px] rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500"
            >
              <div className="w-10 h-10 bg-[#0f111a] rounded-[14px] flex items-center justify-center">
                <span className="font-black text-white">{initial}</span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}
