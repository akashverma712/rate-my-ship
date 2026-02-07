import React from "react";

export default function AdminNavbar({ profile, onProfileClick, onLogout }) {
  return (
    <nav className="w-full h-16 bg-black border-b border-white/10 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-white">
        Admin Panel 🚢
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={onProfileClick}
          className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10"
        >
          {profile.username}
        </button>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
