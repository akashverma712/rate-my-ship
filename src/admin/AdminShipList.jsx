import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminShipList() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    const { data, error } = await supabase
      .from("ships")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setShips(data);
    setLoading(false);
  };

  const deleteShip = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this ship?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("ships")
      .delete()
      .eq("id", id);

    if (!error) {
      setShips((prev) => prev.filter((ship) => ship.id !== id));
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading ships...</p>;
  }

  if (ships.length === 0) {
    return <p className="text-gray-400">No ships added yet.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">
        All Ships
      </h2>

      <div className="space-y-4">
        {ships.map((ship) => (
          <div
            key={ship.id}
            className="flex items-center justify-between p-4 rounded-xl bg-[#111322] border border-white/10"
          >
            <div>
              <h3 className="font-semibold text-white">{ship.name}</h3>
              <p className="text-sm text-gray-400">
                {ship.type || "No type"} • {ship.company || "Unknown"}
              </p>
            </div>

            <button
              onClick={() => deleteShip(ship.id)}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
