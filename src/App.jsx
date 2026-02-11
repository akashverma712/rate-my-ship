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
  const { user, profile, loading, setProfile } = useAuth();

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

  /* ===================== LOGIN (EMAIL OR USERNAME) ===================== */
  const handleLogin = async () => {
    if (!identifier || !password) {
      alert("Enter credentials");
      return;
    }

    // 🔐 Resolve email from username OR email
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .or(`username.eq.${identifier},email.eq.${identifier}`)
      .limit(1)
      .maybeSingle();

    if (error || !data?.email) {
      alert("User not found");
      return;
    }

    // 🔐 Authenticate FIRST (NO role check here)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password
    });

    if (loginError) {
      alert(loginError.message);
    }
  };

  /* ===================== GOOGLE LOGIN ===================== */
  const handleGoogleLogin = async () => {
    if (isAdminLogin) {
      alert("Admin must login using email & password");
      return;
    }

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

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ===================== AUTHENTICATED ===================== */
  if (user && profile) {
    // 🔐 Admin Gate (AFTER login)
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

  /* ===================== AUTH PAGES ===================== */
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
