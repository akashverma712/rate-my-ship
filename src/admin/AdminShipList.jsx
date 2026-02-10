import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminShipList() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedShip, setSelectedShip] = useState(null);
  const [form, setForm] = useState({
    name: "",
    route: "",
    description: ""
  });

  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("ships")
      .select("*");

    if (error) {
      console.error(error);
      setErrorMsg(error.message);
    } else {
      setShips(data || []);
    }

    setLoading(false);
  };

  /* ---------------- DELETE ---------------- */
  const deleteShip = async (id) => {
    const ok = window.confirm("Delete this ship permanently?");
    if (!ok) return;

    const { error } = await supabase
      .from("ships")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      setShips((prev) => prev.filter((s) => s.id !== id));
    }
  };

  /* ---------------- EDIT ---------------- */
  const openEdit = (ship) => {
    setSelectedShip(ship);
    setForm({
      name: ship.name || "",
      route: ship.route || "",
      description: ship.description || ""
    });
  };

  const updateShip = async () => {
    const { error } = await supabase
      .from("ships")
      .update({
        name: form.name,
        route: form.route,
        description: form.description
      })
      .eq("id", selectedShip.id);

    if (error) {
      alert(error.message);
    } else {
      setShips((prev) =>
        prev.map((s) =>
          s.id === selectedShip.id ? { ...s, ...form } : s
        )
      );
      setSelectedShip(null);
    }
  };

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return <p className="text-gray-400 mt-6">Loading ships…</p>;
  }

  if (errorMsg) {
    return <p className="text-red-400 mt-6">{errorMsg}</p>;
  }

  if (ships.length === 0) {
    return <p className="text-gray-400 mt-6">No ships found.</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">
        Manage Ships
      </h2>

      <div className="grid gap-4">
        {ships.map((ship) => (
          <div
            key={ship.id}
            className="flex items-center justify-between p-5 rounded-2xl bg-[#0f111a] border border-white/10 hover:border-indigo-500/40 transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">
                {ship.name}
              </h3>
              <p className="text-sm text-gray-400">
                Route: {ship.route || "N/A"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => openEdit(ship)}
                className="px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20"
              >
                Edit
              </button>

              <button
                onClick={() => deleteShip(ship.id)}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {selectedShip && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-[#0f111a] border border-white/10 rounded-3xl p-8 text-white relative">

            <button
              onClick={() => setSelectedShip(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6">
              Edit Ship
            </h3>

            <div className="space-y-5">
              <Input
                label="Ship Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                label="Route"
                value={form.route}
                onChange={(e) =>
                  setForm({ ...form, route: e.target.value })
                }
              />

              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={4}
                  className="mt-2 w-full rounded-xl bg-[#1a1d2e] border border-white/10 px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/40 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setSelectedShip(null)}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={updateShip}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- SMALL INPUT COMPONENT ---------- */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <input
        {...props}
        className="mt-2 w-full rounded-xl bg-[#1a1d2e] border border-white/10 px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/40 outline-none"
      />
    </div>
  );
}
