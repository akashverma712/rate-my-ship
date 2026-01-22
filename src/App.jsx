import React, { useState } from "react";
import { supabase } from "./lib/supabase";
import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/layout/Navbar";
import AccountModal from "./components/account/AccountModal";
import AuthCard from "./components/auth/AuthCard";
import ShipList from "./components/ships/ShipList";

export default function App() {
  const { user, profile, setProfile } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAccount, setShowAccount] = useState(false);

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created. Please login.");
      setIsLogin(true);
    }
  };

  const handleLogin = async () => {
    let loginEmail = identifier;

    if (!identifier.includes("@")) {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("username", identifier)
        .single();

      if (error || !data) {
        alert("Username not found");
        return;
      }

      loginEmail = data.email;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password
    });

    if (error) alert(error.message);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
  };

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

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (user && profile) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar
          username={profile.username}
          onAvatarClick={() => {
            setNewUsername(profile.username);
            setShowAccount(true);
          }}
        />

        <div className="px-10 py-6 text-2xl font-semibold">
          Welcome,{" "}
          <span className="text-indigo-400">{profile.username}</span> 
        </div>

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <AuthCard
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setIdentifier={setIdentifier}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={isLogin ? handleLogin : handleRegister}
        onGoogle={handleGoogleLogin}
      />
    </div>
  );
}
