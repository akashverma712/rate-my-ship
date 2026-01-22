import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleButton from "./GoogleButton";

export default function AuthPage({
  isLogin,
  setIsLogin,
  setIdentifier,
  setUsername,
  setEmail,
  setPassword,
  onSubmit,
  onGoogle
}) {
  return (
    <div className="min-h-screen w-full bg-[#05060f] flex items-center justify-center p-6 relative overflow-hidden">
      
     
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 100, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90(#fff 1px, transparent 1px)`,引擎: '100px 100px' }}
      ></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full max-w-5xl min-h-[640px] bg-[#0a0b14]/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] z-10"
      >
        
        <div className="hidden md:flex w-5/12 bg-gradient-to-br from-[#1e1b4b]/40 via-transparent to-transparent p-12 flex-col justify-between relative border-r border-white/5">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40"
              >
                <span className="text-2xl">🚢</span>
              </motion.div>
              <h1 className="text-2xl font-black tracking-tighter text-white">Rate My Ship<span className="text-indigo-500">.</span></h1>
            </div>

            <div className="space-y-12">
              <FeatureItem icon="⭐" title="Rate the Ships" desc="Real-world feedback from global travelers." delay={0.1} />
              <FeatureItem icon="🔍" title="Deep Insights" desc="Know every vessel history & safety status." delay={0.2} />
              <FeatureItem icon="🛡️" title="Safety First" desc="Transparent reporting for better standards." delay={0.3} />
            </div>
          </div>

          <div className="relative z-10">
            <div className="h-[1px] w-12 bg-indigo-500 mb-4"></div>
           
          </div>
        </div>

        <div className="w-full md:w-7/12 bg-black/20 p-12 flex flex-col justify-center relative">
          
          <div className="absolute top-10 right-12 z-20">
            <div 
              onClick={() => setIsLogin(!isLogin)}
              className="group w-36 h-11 bg-white/5 rounded-full flex items-center p-1.5 cursor-pointer border border-white/10 hover:border-white/20 transition-all shadow-inner"
            >
              <motion.div 
                animate={{ x: isLogin ? 0 : 92 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-11 h-8 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
              />
              <div className="z-10 w-full flex justify-between px-4 text-[10px] font-black uppercase tracking-widest transition-colors">
                <span className={isLogin ? 'text-white' : 'text-gray-500'}>Login</span>
                <span className={!isLogin ? 'text-white' : 'text-gray-500'}>Join</span>
              </div>
            </div>
          </div>

          <div className="max-w-sm mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-header" : "join-header"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                  {isLogin ? "Welcome back" : "Get started"}
                </h2>
                <p className="text-gray-500 mb-10 text-sm font-medium">
                  {isLogin ? "Access your rating platform." : "Join the best ship rating platform."}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <Input placeholder="Full Name" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                  </motion.div>
                )}
              </AnimatePresence>

              {isLogin && (
                <Input placeholder="Username or Email" onChange={(e) => setIdentifier(e.target.value)} />
              )}

              <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

              <motion.button
                whileHover={{ scale: 1.01, backgroundColor: "#4f46e5" }}
                whileTap={{ scale: 0.98 }}
                onClick={onSubmit}
                className="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-widest py-5 rounded-2xl mt-6 shadow-2xl shadow-indigo-600/20 transition-all"
              >
                {isLogin ? "Initialize Session" : "Create Fleet Account"}
              </motion.button>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em] font-bold"><span className="bg-transparent px-4 text-gray-600">Secure Protocol</span></div>
              </div>

              <GoogleButton onClick={onGoogle} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Input({ ...props }) {
  return (
    <motion.input
      whileFocus={{ scale: 1.01, borderColor: "rgba(99, 102, 241, 0.4)" }}
      {...props}
      className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder-gray-600 focus:outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
    />
  );
}

function FeatureItem({ icon, title, desc, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="flex gap-5 group cursor-default"
    >
      <div className="w-14 h-14 rounded-[1.25rem] bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/10 group-hover:border-indigo-500/40 transition-all duration-500 shadow-xl">
        <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg group-hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-[180px]">{desc}</p>
      </div>
    </motion.div>
  );
}