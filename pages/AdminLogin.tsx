import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!adminPassword) {
      setError("Admin password not configured");
      return;
    }

    if (password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      window.location.hash = "#/admin";
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Admin Password"
          className="w-full border px-4 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-amber-500 py-2 font-bold rounded hover:bg-amber-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
