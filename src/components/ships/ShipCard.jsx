import React from "react";
import { motion } from "framer-motion";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function ShipCard({ ship, user, profile }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-[#0a0b14]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:border-indigo-500/30 group"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-700"></div>

      <div className="relative p-8 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛳️</span>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                {ship.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">
                Active Route: {ship.route}
              </p>
            </div>
          </div>

          <div className="bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Vessel ID</p>
            <p className="text-white font-mono text-sm">#{ship.id.toString().slice(0, 8)}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-1 bg-indigo-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">New Transmission</h3>
          </div>
          <ReviewForm shipId={ship.id} user={user} profile={profile} />
        </section>

        <section className="relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-1 bg-purple-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Historical Logs</h3>
          </div>
          <ReviewList shipId={ship.id} />
        </section>
      </div>

      <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-30"></div>
    </motion.div>
  );
}