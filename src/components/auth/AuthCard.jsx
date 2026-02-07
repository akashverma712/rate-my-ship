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
    <div className="min-h-screen w-full bg-[#05060f] flex items-center justify-center p-6 relative overflow-hidden">

      {/* background blobs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full max-w-5xl min-h-[640px] bg-[#0a0b14]/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] z-10"
      >

        {/* LEFT */}
        <div className="hidden md:flex w-5/12 p-12 flex-col justify-between border-r border-white/5">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
              🚢
            </div>
            <h1 className="text-2xl font-black text-white">
              Rate My Ship<span className="text-indigo-500">.</span>
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-7/12 bg-black/20 p-12 flex flex-col justify-center relative">

          {/* login / join toggle (hidden in admin mode) */}
          {!isAdminLogin && (
            <div className="absolute top-10 right-12 z-20">
              <div
                onClick={() => setIsLogin(!isLogin)}
                className="group w-36 h-11 bg-white/5 rounded-full flex items-center p-1.5 cursor-pointer border border-white/10"
              >
                <motion.div
                  animate={{ x: isLogin ? 0 : 92 }}
                  className="absolute w-11 h-8 bg-indigo-600 rounded-full"
                />
                <div className="z-10 w-full flex justify-between px-4 text-[10px] font-black uppercase">
                  <span className={isLogin ? "text-white" : "text-gray-500"}>Login</span>
                  <span className={!isLogin ? "text-white" : "text-gray-500"}>Join</span>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-4xl font-bold text-white mb-10">
              {isAdminLogin ? "Admin Access" : isLogin ? "Welcome back" : "Get started"}
            </h2>

            {/* USER SIGNUP */}
            {!isLogin && !isAdminLogin && (
              <>
                <Input placeholder="Full Name" onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
              </>
            )}

            {/* USER LOGIN OR ADMIN LOGIN */}
            {(isLogin || isAdminLogin) && (
              <Input
                placeholder="Username or Email"
                onChange={(e) => setIdentifier(e.target.value)}
              />
            )}

            {/* PASSWORD — ONLY FOR USER LOGIN */}
            {!isAdminLogin && isLogin && (
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}

            <motion.button
              onClick={onSubmit}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl mt-6 font-black"
            >
              {isAdminLogin
                ? "Enter Admin Panel"
                : isLogin
                ? "Initialize Session"
                : "Create Account"}
            </motion.button>

            {/* GOOGLE LOGIN — USER ONLY */}
            {!isAdminLogin && <GoogleButton onClick={onGoogle} />}
          </div>

          {/* ADMIN TOGGLE */}
          <div
            className="absolute bottom-6 right-10 text-[10px] text-gray-600 cursor-pointer"
            onClick={() => setIsAdminLogin(!isAdminLogin)}
          >
            {isAdminLogin ? "Switch to User" : "Admin Login"}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

function Input(props) {
  return (
    <motion.input
      {...props}
      className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white mb-4"
    />
  );
}
