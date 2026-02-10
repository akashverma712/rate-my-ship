import React from "react";

export default function AdminProfileModal({ profile, onClose }) {
  if (!profile) return null;

  const username = profile.username || "Admin";
  const avatarLetter = username.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0f111a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div>
            <h2 className="text-2xl font-bold text-white">Admin Profile</h2>
            <p className="text-sm text-gray-500 mt-1">
              Administrative identity & access
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8">

          {/* IDENTITY */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-xl">
              {avatarLetter}
            </div>

            <div>
              <p className="text-lg font-semibold text-white">{username}</p>
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
                Admin
              </span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 gap-6">

            <InfoRow
              label="Username"
              value={profile.username}
            />

            <InfoRow
              label="Email"
              value={profile.email}
            />

            <InfoRow
              label="Role"
              value={profile.role.toUpperCase()}
              highlight
            />

          </div>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 border-t border-white/5 bg-[#0b0d15] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">
        {label}
      </span>
      <div
        className={`px-4 py-3 rounded-xl border text-sm font-medium ${
          highlight
            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
            : "bg-[#1a1d2e] text-white border-white/10"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
