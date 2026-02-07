import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddShipForm() {
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddShip = async () => {
    if (!name || !route || !description) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("ships").insert([
      {
        name,
        route,
        description
      }
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
    <div className="max-w-xl space-y-4">
      <input
        className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        placeholder="Ship Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        placeholder="Route (e.g. India → Europe)"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
      />

      <textarea
        className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        placeholder="Ship Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleAddShip}
        disabled={loading}
        className="bg-indigo-600 px-6 py-3 rounded font-bold hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Ship"}
      </button>
    </div>
  );
}
