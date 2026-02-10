import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";

export default function ReviewForm({ shipId, user, profile }) {
  const [comfort, setComfort] = useState(5);
  const [safety, setSafety] = useState(5);
  const [clean, setClean] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    setLoading(true);
    let imageUrl = null;

    try {
      if (image) {
        const filePath = `${user.id}/${Date.now()}-${image.name}`;
        await supabase.storage.from("ship-images").upload(filePath, image);
        const { data } = supabase.storage.from("ship-images").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }

      await supabase.from("ship_reviews").insert({
        ship_id: shipId,
        user_id: user.id,
        username: profile.username,
        rating_comfort: comfort,
        rating_safety: safety,
        rating_cleanliness: clean,
        feedback,
        image_url: imageUrl
      });

      alert("Review submitted successfully! 🚢");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f111a] border border-white/5 rounded-[2rem] p-8 shadow-2xl space-y-8 max-w-2xl mx-auto"
    >
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-bold text-white">Share Your Experience</h2>
        <p className="text-gray-500 text-sm">Your feedback helps other know more about the ship.</p>
      </div>

      <div className="grid gap-6">
        <Rating label="Comfort" value={comfort} setValue={setComfort} />
        <Rating label="Safety" value={safety} setValue={setSafety} />
        <Rating label="Cleanliness" value={clean} setValue={setClean} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Ship Feedback</label>
        <textarea
          rows="4"
          className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none shadow-inner"
          placeholder="Describe your journey, the crew, or any issues you faced..."
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Attach Image</label>
        <div className="relative group">
          <input 
            type="file" 
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={(e) => setImage(e.target.files[0])} 
          />
          <div className="border-2 border-dashed border-white/10 group-hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col items-center justify-center transition-all bg-white/[0.01] group-hover:bg-indigo-500/5">
            <span className="text-2xl mb-2">{image ? "✅" : "📸"}</span>
            <p className="text-sm text-gray-400">
              {image ? image.name  : "Click or drag photos to upload"}
            </p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        onClick={submitReview}
        className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all shadow-xl
          ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'}`}
      >
        {loading ? "Transmitting..." : "Post Review 🚢"}
      </motion.button>
    </motion.div>
  );
}

function Rating({ label, value, setValue }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-xs font-bold px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
          {value}/10
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        step="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
      />
    </div>
  );
}