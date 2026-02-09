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
  const isAdmin = profile.role === "admin";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#0f111a] text-gray-200 rounded-3xl overflow-hidden shadow-2xl border border-white/10">

        {/* HEADER */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div>
            <h1 className="text-2xl font-bold text-white">Account</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your profile and session
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </header>

        {/* BODY */}
        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* LEFT PANEL */}
          <aside className="hidden md:flex flex-col gap-6 p-8 border-r border-white/5 bg-[#0b0d15]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white">
                {avatarLetter}
              </div>
              <div>
                <p className="font-semibold text-white">{username}</p>
                <span
                  className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${
                    isAdmin
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  }`}
                >
                  {isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-500 leading-relaxed">
              Your account controls access, identity, and privileges across the
              platform.
            </div>

            <button
              onClick={onLogout}
              className="mt-auto text-sm text-red-400 hover:text-red-300 transition"
            >
              Sign out →
            </button>
          </aside>

          {/* MAIN */}
          <main className="col-span-2 p-8 space-y-10">

            {/* PROFILE */}
            <Section
              title="Profile Information"
              right={
                <button
                  onClick={onSave}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md active:scale-95"
                >
                  Save Changes
                </button>
              }
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white">
                  {avatarLetter}
                </div>

                <div className="w-full max-w-sm">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Username
                  </label>
                  <input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-[#1a1d2e] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
            </Section>

            {/* EMAIL */}
            <Section title="Email">
              <div className="px-4 py-3 rounded-xl bg-[#1a1d2e] border border-white/10 text-sm text-gray-300 break-all">
                {profile.email}
              </div>
            </Section>

            {/* AUTH PROVIDER */}
            <Section title="Authentication Provider">
              <div className="flex items-center gap-4 px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Google OAuth</p>
                  <p className="text-xs text-gray-500">
                    Signed in via Google
                  </p>
                </div>
                <span className="px-3 py-1 text-[10px] uppercase font-bold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  Active
                </span>
              </div>
            </Section>

            {/* MOBILE LOGOUT */}
            <button
              onClick={onLogout}
              className="md:hidden text-red-400 text-sm pt-4"
            >
              Sign out →
            </button>

          </main>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, right }) {
  return (
    <section className="border-b border-white/5 pb-8 last:border-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}
