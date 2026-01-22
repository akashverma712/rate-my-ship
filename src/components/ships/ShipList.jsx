import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import ShipCard from "./ShipCard";

export default function ShipList({ user, profile }) {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    setLoading(true);
    const { data } = await supabase.from("ships").select("*");
    setShips(data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden pb-20">
      
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      <header className="relative z-10 p-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-end gap-4"
        >
          <h2 className="text-4xl font-black text-white tracking-tighter italic">
            SHIP <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">REVIEW</span>
          </h2>
          <span className="text-gray-500 font-mono text-sm mb-1">
            [{ships.length} VESSELS TRACKED]
          </span>
        </motion.div>
        <p className="text-gray-500 mt-2 text-sm max-w-md">
          Real-time safety logs and comfort ratings for the global maritime network.
        </p>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-10">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[1, 2].map((n) => (
              <div key={n} className="h-96 w-full bg-white/5 animate-pulse rounded-[2.5rem] border border-white/5" />
            ))}
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {ships.map((ship) => (
              <motion.div
                key={ship.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <ShipCard
                  ship={ship}
                  user={user}
                  profile={profile}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && ships.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
            <span className="text-5xl mb-4">🛰️</span>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No signals detected in this sector.</p>
            <button 
              onClick={fetchShips}
              className="mt-6 text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4 font-bold uppercase text-xs"
            >
              Restart Scan
            </button>
          </div>
        )}
      </main>

      <div className="fixed bottom-10 right-10 z-50">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 border border-white/20"
        >
          <span className="text-3xl">+</span>
        </motion.button>
      </div>
    </div>
  );
}