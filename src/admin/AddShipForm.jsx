import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddShipForm() {
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddShip = async () => {
    if (!name || !route || !description) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("ships").insert([
      { name, route, description }
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Ship added successfully 🚢");
      setName("");
      setRoute("");
      setDescription("");
    }
  };

  return (
    <div className="max-w-2xl bg-[#0f111a] border border-white/10 rounded-3xl p-8 shadow-xl mb-12">
      <h2 className="text-xl font-bold text-white mb-1">
        Add New Ship
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Enter ship details to make it available for reviews
      </p>

      <div className="space-y-6">
        {/* Ship Name */}
        <Field
          label="Ship Name"
          placeholder="e.g. MV Ocean Queen"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Route */}
        <Field
          label="Route"
          placeholder="e.g. India → Europe"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />

        {/* Description */}
        <div>
          <label className="text-xs uppercase tracking-wider text-gray-400">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Short description about the ship"
            className="mt-2 w-full rounded-2xl bg-[#1a1d2e] border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            onClick={handleAddShip}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Ship…" : "Add Ship"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- REUSABLE INPUT ---------- */
function Field({ label, ...props }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl bg-[#1a1d2e] border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>
  );
}
