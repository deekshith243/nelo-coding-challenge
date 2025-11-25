import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setError("");
    onLogin(email, password);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        Login to Task Dashboard
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-slate-600">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-600">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            placeholder="Enter any password (demo)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-2 py-1 rounded">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
