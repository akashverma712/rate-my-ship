import React from "react";

export default function AccountPage({
  profile,
  newUsername,
  setNewUsername,
  onSave,
  onLogout,
  onClose
}) {
  if (!profile) return null;

  const username = profile.username || "Anonymous";
  const avatarLetter = username.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0b14]/90 backdrop-blur-md flex justify-center items-center p-2 sm:p-4">
      <div className="w-full max-w-5xl bg-[#0f111a] text-gray-200 rounded-3xl flex flex-col sm:flex-row overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 max-h-[95vh]">

        {/* SIDEBAR (hidden on mobile) */}
        <aside className="hidden sm:flex w-64 border-r border-white/5 bg-[#0a0b14]/50 p-8 flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <span className="text-indigo-400 text-sm">🛡️</span>
              </div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                Settings
              </h2>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <span className="text-lg">👤</span>
              <span className="font-medium">Profile</span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:text-red-400 transition px-4"
          >
            Sign Out →
          </button>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6 sm:p-12 overflow-y-auto bg-gradient-to-br from-[#0f111a] via-[#131625] to-[#0f111a]">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Account Settings
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Manage your profile & identity
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          <div className="space-y-10">
            {/* PROFILE */}
            <Section
              title="Personal Identity"
              right={
                <button
                  onClick={onSave}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg active:scale-95"
                >
                  Save
                </button>
              }
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-xl">
                  {avatarLetter}
                </div>

                <div className="w-full max-w-sm">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                    Username
                  </label>
                  <input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Set your alias"
                    className="mt-2 w-full bg-[#1a1d2e] border border-white/5 rounded-2xl px-5 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
            </Section>

            {/* EMAIL */}
            <Section title="Email Address">
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#1a1d2e] border border-white/5 rounded-2xl text-gray-300">
                <span className="text-gray-500 text-xs">@</span>
                <span className="font-medium break-all">{profile.email}</span>
              </div>
            </Section>

            {/* GOOGLE */}
            <Section title="Linked Services">
              <div className="flex flex-wrap items-center gap-4 p-5 bg-white/[0.03] border border-white/5 rounded-3xl">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Google Account</p>
                  <p className="text-xs text-gray-500 break-all">
                    {profile.email}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[10px] font-bold uppercase">
                  Active
                </span>
              </div>
            </Section>

            {/* MOBILE LOGOUT */}
            <button
              onClick={onLogout}
              className="sm:hidden text-red-400 text-sm mt-6"
            >
              Sign Out →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children, right }) {
  return (
    <div className="border-b border-white/5 pb-8 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}
