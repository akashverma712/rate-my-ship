import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminShipList() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("ships")
      .select("*"); // 🚨 removed created_at ordering

    if (error) {
      console.error("Fetch ships error:", error);
      setErrorMsg(error.message);
    } else {
      setShips(data || []);
    }

    setLoading(false);
  };

  const deleteShip = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ship?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("ships")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete ship error:", error);
      alert("Failed to delete ship: " + error.message);
    } else {
      setShips((prev) => prev.filter((ship) => ship.id !== id));
    }
  };

  if (loading) {
    return <p className="text-gray-400 mt-6">Loading ships...</p>;
  }

  if (errorMsg) {
    return (
      <p className="text-red-400 mt-6">
        Error loading ships: {errorMsg}
      </p>
    );
  }

  if (ships.length === 0) {
    return <p className="text-gray-400 mt-6">No ships added yet.</p>;
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
              <h3 className="font-semibold text-white">
                {ship.name}
              </h3>
              <p className="text-sm text-gray-400">
                Route: {ship.route || "N/A"}
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
