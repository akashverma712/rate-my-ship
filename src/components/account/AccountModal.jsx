import React from "react";

export default function AccountPage({
  profile,
  newUsername,
  setNewUsername,
  onSave,
  onLogout,
  onClose
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0b14]/90 backdrop-blur-md flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-[#0f111a] text-gray-200 rounded-3xl flex overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 h-[650px]">
        
        <aside className="w-64 border-r border-white/5 bg-[#0a0b14]/50 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <span className="text-indigo-400 text-sm">🛡️</span>
              </div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Settings</h2>
            </div>
            
            <nav className="space-y-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-inner">
                <span className="text-lg">👤</span> 
                <span className="font-medium">Profile</span>
              </div>
            </nav>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-all duration-300 group px-4"
          >
            <span className="group-hover:translate-x-1 transition-transform">Sign Out →</span>
          </button>
        </aside>

        <main className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-[#0f111a] via-[#131625] to-[#0f111a]">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
              <p className="text-gray-500 mt-2 text-sm">Update your personal information and profile visibility.</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <Section
              title="Personal Identity"
              right={
                <button
                  onClick={onSave}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] active:scale-95"
                >
                  Save Changes
                </button>
              }
            >
              <div className="flex items-center gap-8 mt-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl ring-4 ring-indigo-500/10">
                    {profile.username[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#10b981] border-[6px] border-[#0f111a] rounded-full shadow-lg"></div>
                </div>
                
                <div className="flex flex-col gap-2 grow max-w-sm">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Username</label>
                  <input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="bg-[#1a1d2e] border border-white/5 rounded-2xl px-5 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all shadow-inner"
                    placeholder="Set your alias"
                  />
                </div>
              </div>
            </Section>

            <Section title="Email Address">
              <div className="mt-2 inline-flex items-center gap-3 px-5 py-3 bg-[#1a1d2e] border border-white/5 rounded-2xl text-gray-300 shadow-inner">
                <span className="text-gray-500 text-xs">@</span>
                <span className="font-medium">{profile.email}</span>
              </div>
            </Section>

            <Section title="Linked Services">
              <div className="flex items-center gap-4 mt-2 p-5 bg-white/[0.03] border border-white/5 rounded-3xl w-fit group hover:bg-white/[0.05] transition-colors">
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">Google Account</span>
                  <span className="text-xs text-gray-500">{profile.email}</span>
                </div>
                <div className="ml-6 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Active
                </div>
              </div>
            </Section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children, right }) {
  return (
    <div className="py-10 border-b border-white/5 last:border-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white/90 mb-4">{title}</h3>
        {children}
      </div>
      <div className="ml-6">
        {right}
      </div>
    </div>
  );
}