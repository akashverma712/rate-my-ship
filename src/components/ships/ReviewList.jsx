import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

export default function ReviewList({ shipId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shipId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("ship_reviews")
        .select("*")
        .eq("ship_id", shipId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error.message);
        setReviews([]);
      } else {
        setReviews(data || []);
      }

      setLoading(false);
    };

    fetchReviews();
  }, [shipId]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Scanning maritime records...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="mt-10 space-y-6"
    >
      <h3 className="text-xl font-bold text-white px-2 mb-4 flex items-center gap-2">
        🚢 Recent Experiences
        <span className="text-sm font-normal text-gray-500">
          ({reviews.length})
        </span>
      </h3>

      {reviews.length === 0 ? (
        <div className="bg-[#0f111a] border border-dashed border-white/10 rounded-3xl p-12 text-center">
          <p className="text-gray-500">
           No  review found for the above ship. 
          </p>
        </div>
      ) : (
        reviews.map((r) => {
          const username = r.username || "Anonymous";
          const avatarLetter = username.charAt(0).toUpperCase();

          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-[#0f111a]/60 backdrop-blur-md border border-white/5 hover:border-indigo-500/30 p-6 rounded-[2rem] transition-all duration-300 shadow-xl"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white shadow-lg">
                    {avatarLetter}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">
                      @{username}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                      Verified Traveler
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-gray-600 font-medium">
                  {r.created_at
                    ? new Date(r.created_at).toLocaleDateString()
                    : "Unknown date"}
                </div>
              </div>

              {/* FEEDBACK */}
              <p className="text-gray-300 leading-relaxed text-sm mb-6 italic">
                "{r.feedback || "No feedback provided."}"
              </p>

              {/* RATINGS */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge label="Comfort" value={r.rating_comfort ?? 0} color="bg-blue-500" />
                <Badge label="Safety" value={r.rating_safety ?? 0} color="bg-green-500" />
                <Badge
                  label="Cleanliness"
                  value={r.rating_cleanliness ?? 0}
                  color="bg-purple-500"
                />
              </div>

              {/* IMAGE */}
              {r.image_url && (
                <div className="relative overflow-hidden rounded-2xl border border-white/10 max-w-md">
                  <img
                    src={r.image_url}
                    alt="Vessel snapshot"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                      Vessel Snapshot
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })
      )}
    </motion.div>
  );
}

function Badge({ label, value, color }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
      <span className="text-[10px] font-bold text-gray-500 uppercase">
        {label}
      </span>
      <div className={`w-1 h-1 rounded-full ${color}`} />
      <span className="text-xs font-black text-white">{value}</span>
    </div>
  );
}
