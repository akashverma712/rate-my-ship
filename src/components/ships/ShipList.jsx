import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import ShipCard from "./ShipCard";

export default function ShipList({ user, profile }) {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 search + sort
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    setLoading(true);
    const { data } = await supabase.from("ships").select("*");
    setShips(data || []);
    setLoading(false);
  };

  // 🧠 filter + sort
  const filteredShips = useMemo(() => {
    let result = [...ships];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((ship) =>
        Object.values(ship).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(q)
        )
      );
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "name-asc":
        result.sort((a, b) => a.name?.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name?.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [ships, search, sortBy]);

  return (
    <div className="min-h-screen bg-[#05060f] relative overflow-hidden pb-24">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/5 blur-[120px] rounded-full" />

      {/* HEADER */}
      <header className="relative z-10 p-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-white tracking-tighter">
          SHIP <span className="text-indigo-500 underline underline-offset-8">REVIEW</span>
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          [{filteredShips.length} SHIPS TO REVIEW]
        </p>

        {/* SEARCH + SORT */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 max-w-3xl">
          <input
            type="text"
            placeholder="Search ship"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              p-3 rounded-xl
              bg-[#0b0d1a]
              border border-white/10
              text-white
              outline-none
              appearance-none
              cursor-pointer
            "
          >
            <option value="newest" className="bg-[#0b0d1a]">
              Newest first
            </option>
            <option value="oldest" className="bg-[#0b0d1a]">
              Oldest first
            </option>
            <option value="name-asc" className="bg-[#0b0d1a]">
              Name (A → Z)
            </option>
            <option value="name-desc" className="bg-[#0b0d1a]">
              Name (Z → A)
            </option>
          </select>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-10">

        {/* 👉 SUGGEST SHIP CARD */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            mb-14
            p-10
            rounded-[2.5rem]
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            flex flex-col md:flex-row
            items-center justify-between
            gap-6
          "
        >
          <div>
            <h3 className="text-2xl font-black text-white">
              🚢 Suggest a Ship
            </h3>
            <p className="text-gray-400 mt-2 max-w-md">
              Can’t find your ship? Submit a suggestion and we’ll review it before adding.
            </p>
          </div>

          <button
            onClick={() =>
              window.open(
                "https://akash-jeager32.app.n8n.cloud/form/7c1747c4-fe85-45b1-8b5f-0bc1b6c4cd39",
                "_blank"
              )
            }
            className="
              bg-indigo-600
              hover:bg-indigo-700
              px-8 py-4
              rounded-2xl
              text-white
              font-black
              shadow-lg
            "
          >
            Open Suggestion Form
          </button>
        </motion.div>

        {/* SHIP LIST */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-96 bg-white/5 animate-pulse rounded-[2.5rem]"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {filteredShips.map((ship) => (
              <ShipCard
                key={ship.id}
                ship={ship}
                user={user}
                profile={profile}
              />
            ))}
          </motion.div>
        )}

        {!loading && filteredShips.length === 0 && (
          <div className="text-center py-32 text-gray-400">
            No ships match your search 🚫
          </div>
        )}
      </main>
    </div>
  );
}
