import React from "react";

export default function AdminProfileModal({ profile, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-[#0a0b14] border border-white/10 rounded-3xl p-8 text-white relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

        <div className="space-y-4 text-sm">
          <div>
            <span className="text-gray-400">Username</span>
            <p className="font-semibold">{profile.username}</p>
          </div>

          <div>
            <span className="text-gray-400">Email</span>
            <p className="font-semibold">{profile.email}</p>
          </div>

          <div>
            <span className="text-gray-400">Role</span>
            <p className="font-semibold uppercase text-indigo-400">
              {profile.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
