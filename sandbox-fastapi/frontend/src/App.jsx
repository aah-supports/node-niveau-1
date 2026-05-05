import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export default function App() {
  const [message, setMessage] = useState("Loading...");
  const [dbStatus, setDbStatus] = useState("Checking...");

  useEffect(() => {
    fetch(`${API_BASE}/message`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message || "No message"))
      .catch(() => setMessage("Cannot reach backend"));

    fetch(`${API_BASE}/db-check`)
      .then((res) => res.json())
      .then((data) => setDbStatus(data.database || "unknown"))
      .catch(() => setDbStatus("unreachable"));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: 760, margin: "0 auto" }}>
      <h1>sandbox-fastapi</h1>
      <p><strong>Backend message:</strong> {message}</p>
      <p><strong>Postgres status:</strong> {dbStatus}</p>
      <p>Mode API base: <code>{API_BASE}</code></p>
    </main>
  );
}
