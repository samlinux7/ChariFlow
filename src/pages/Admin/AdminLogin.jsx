import React, { useState } from "react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (!response.status === 200) {
        throw new Error(data.message || "Invalid username or password");
      }
      alert("Login successful!");
      // Redirect or set admin session here
    } catch (err) {
      setError(err.message || "Invalid username or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded p-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full border rounded p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 font-medium">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded w-full hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          type="button"
          className="mt-6 w-full py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
          onClick={() => (window.location.href = "/Login")}
        >
          Back to User Sign In
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
