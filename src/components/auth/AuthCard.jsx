import React from "react";
import { motion } from "framer-motion";
import GoogleButton from "./GoogleButton";

export default function AuthPage({
  isLogin,
  setIsLogin,
  isAdminLogin,
  setIsAdminLogin,
  setIdentifier,
  setUsername,
  setEmail,
  setPassword,
  onSubmit,
  onGoogle
}) {
  return (
    <div className="min-h-screen bg-[#05060f] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full -top-40 -right-40"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-purple-800/10 blur-[160px] rounded-full -bottom-40 -left-40"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl bg-[#0b0c17]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl grid md:grid-cols-2 overflow-hidden"
      >

        {/* LEFT BRAND */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-black/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-xl">
              🚢
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Rate My Ship<span className="text-indigo-500">.</span>
            </h1>
          </div>

          <p className="text-gray-400 leading-relaxed max-w-sm">
            A professional platform to manage, review, and rate ships with
            precision and ease.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 sm:p-12 flex flex-col justify-center relative">

          {/* Toggle */}
          {!isAdminLogin && (
            <div className="absolute top-6 right-6">
              <div
                onClick={() => setIsLogin(!isLogin)}
                className="relative w-32 h-10 bg-white/5 border border-white/10 rounded-full flex items-center cursor-pointer"
              >
                <motion.div
                  animate={{ x: isLogin ? 2 : 66 }}
                  className="absolute w-14 h-8 bg-indigo-600 rounded-full"
                />
                <div className="relative z-10 w-full flex justify-between px-4 text-[11px] font-semibold uppercase">
                  <span className={isLogin ? "text-white" : "text-gray-400"}>Login</span>
                  <span className={!isLogin ? "text-white" : "text-gray-400"}>Join</span>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8">
              {isAdminLogin
                ? "Admin Access"
                : isLogin
                ? "Welcome back"
                : "Create account"}
            </h2>

            {/* Signup */}
            {!isLogin && !isAdminLogin && (
              <>
                <Input placeholder="Full Name" onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
              </>
            )}

            {/* Login */}
            {(isLogin || isAdminLogin) && (
              <Input
                placeholder="Username or Email"
                onChange={(e) => setIdentifier(e.target.value)}
              />
            )}

            {!isAdminLogin && isLogin && (
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSubmit}
              className="w-full mt-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-bold text-white"
            >
              {isAdminLogin
                ? "Enter Admin Panel"
                : isLogin
                ? "Login"
                : "Create Account"}
            </motion.button>

            {!isAdminLogin && (
              <div className="mt-6">
                <GoogleButton onClick={onGoogle} />
              </div>
            )}
          </div>

          {/* Admin switch */}
          <button
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="absolute bottom-5 right-6 text-sm text-gray-400 hover:text-indigo-400 transition"
          >
            {isAdminLogin ? "Switch to User Login" : "Admin Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full mb-4 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
    />
  );
}
