import React, { useState } from "react";
import { supabase } from "./lib/supabase";
import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/layout/Navbar";
import AccountModal from "./components/account/AccountModal";
import AuthCard from "./components/auth/AuthCard";
import ShipList from "./components/ships/ShipList";
import AdminDashboard from "./admin/AdminDashboard";

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

  // REGISTER (users only)
  const handleRegister = async () => {
    if (isAdminLogin) return alert("Admins cannot register");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });

    if (error) alert(error.message);
    else setIsLogin(true);
  };

  // LOGIN (user + admin)
  const handleLogin = async () => {
    let loginEmail = identifier;
    let role = null;

    if (!identifier.includes("@")) {
      const { data } = await supabase
        .from("profiles")
        .select("email, role")
        .eq("username", identifier)
        .single();

      if (!data) return alert("User not found");

      loginEmail = data.email;
      role = data.role;
    }

    if (isAdminLogin && role !== "admin") {
      return alert("Admins only");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password
    });

    if (error) alert(error.message);
  };

  const handleGoogleLogin = async () => {
    if (isAdminLogin) return alert("Google login disabled for admin");
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const updateUsername = async () => {
    await supabase
      .from("profiles")
      .update({ username: newUsername })
      .eq("id", user.id);

    setProfile({ ...profile, username: newUsername });
    setShowAccount(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // AUTHENTICATED
  if (user && profile) {
    if (profile.role === "admin") {
      return <AdminDashboard />;
    }

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

  // AUTH PAGE
  return (
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
  );
}
