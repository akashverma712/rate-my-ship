import React, { useState } from "react";
import { supabase } from "./lib/supabase";
import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/layout/Navbar";
import AccountModal from "./components/account/AccountModal";
import AuthCard from "./components/auth/AuthCard";
import ShipList from "./components/ships/ShipList";
import AdminDashboard from "./admin/AdminDashboard";
import ElevenLabsBot from "./components/ElevenLabsBot";

export default function App() {
  const { user, profile, setProfile } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAccount, setShowAccount] = useState(false);

  /* ===================== REGISTER (USERS ONLY) ===================== */
  const handleRegister = async () => {
    if (isAdminLogin) {
      alert("Admins cannot register");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) alert(error.message);
    else setIsLogin(true);
  };

  /* ===================== LOGIN (USER + ADMIN) ===================== */
  const handleLogin = async () => {
    if (!identifier) {
      alert("Enter username or email");
      return;
    }

    // 1. Fetch profile using username OR email
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("email, role")
      .or(`username.eq.${identifier},email.eq.${identifier}`)
      .single();

    if (profileError || !profileData) {
      alert("User not found");
      return;
    }

    // 2. Admin role check BEFORE login
    if (isAdminLogin && profileData.role !== "admin") {
      alert("Admins only");
      return;
    }

    // 3. Authenticate (password-based)
    const { error } = await supabase.auth.signInWithPassword({
      email: profileData.email,
      password
    });

    if (error) alert(error.message);
  };

  /* ===================== GOOGLE LOGIN ===================== */
  const handleGoogleLogin = async () => {
    // Allow Google login for BOTH user & admin
    await supabase.auth.signInWithOAuth({
      provider: "google"
    });
  };

  /* ===================== UPDATE USERNAME ===================== */
  const updateUsername = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ username: newUsername })
      .eq("id", user.id);

    if (!error) {
      setProfile({ ...profile, username: newUsername });
      setShowAccount(false);
    }
  };

  /* ===================== LOGOUT ===================== */
  const logout = async () => {
    await supabase.auth.signOut();
  };

  /* ===================== AUTHENTICATED ===================== */
  if (user && profile) {
    // 🔐 Admin Gate
    if (profile.role === "admin") {
      return <AdminDashboard />;
    }

    // 👤 Normal User
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar
          username={profile.username}
          onAvatarClick={() => {
            setNewUsername(profile.username);
            setShowAccount(true);
          }}
        />

        <ShipList user={user} profile={profile} />

        {showAccount && (
          <AccountModal
            profile={profile}
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            onSave={updateUsername}
            onLogout={logout}
            onClose={() => setShowAccount(false)}
          />
        )}
      </div>
    );
  }

  /* ===================== AUTH PAGE ===================== */
  return (
    <>
      <AuthCard
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isAdminLogin={isAdminLogin}
        setIsAdminLogin={setIsAdminLogin}
        setIdentifier={setIdentifier}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={isLogin ? handleLogin : handleRegister}
        onGoogle={handleGoogleLogin}
      />
      <ElevenLabsBot />
    </>
  );
}
