import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

import AddShipForm from "./AddShipForm";
import AdminNavbar from "./AdminNavbar";
import AdminProfileModal from "./AdminProfileModal";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  if (!profile) return null;

  // 🚫 HARD BLOCK NON-ADMINS
  if (profile.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <h1 className="text-xl text-red-400">Access Denied</h1>
      </div>
    );
  }

  // 🔓 LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* 🧭 ADMIN NAVBAR */}
      <AdminNavbar
        profile={profile}
        onProfileClick={() => setShowProfile(true)}
        onLogout={logout}
      />

      {/* 🛠️ MAIN ADMIN CONTENT */}
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8 text-indigo-400">
          Admin Panel – Add Ships
        </h1>

        <AddShipForm />
      </div>

      {/* 👤 PROFILE MODAL */}
      {showProfile && (
        <AdminProfileModal
          profile={profile}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}
