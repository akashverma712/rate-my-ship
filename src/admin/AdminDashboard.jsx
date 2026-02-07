import React from "react";
import { useAuth } from "../hooks/useAuth";
import AddShipForm from "./AddShipForm";

export default function AdminDashboard() {
  const { profile } = useAuth();

  if (!profile) return null;

  // 🚫 non-admin blocked
  if (profile.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <h1 className="text-xl text-red-400">Access Denied</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-indigo-400">
        Admin Panel – Add Ships
      </h1>

      <AddShipForm />
    </div>
  );
}
