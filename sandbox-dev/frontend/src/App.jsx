import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export default function App() {
  const [message, setMessage] = useState("Loading...");
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  async function load() {
    const [messageRes, notesRes] = await Promise.all([
      fetch(`${API_BASE}/message`),
      fetch(`${API_BASE}/notes`)
    ]);

    const messageData = await messageRes.json();
    const notesData = await notesRes.json();
    setMessage(messageData.message || "No message");
    setNotes(notesData);
  }

  async function submit(event) {
    event.preventDefault();
    if (!content.trim()) return;

    await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    setContent("");
    await load();
  }

  useEffect(() => {
    load().catch(() => {
      setMessage("Cannot reach backend");
      setNotes([]);
    });
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: 760, margin: "0 auto" }}>
      <h1>sandbox-dev</h1>
      <p><strong>Backend message:</strong> {message}</p>

      <form onSubmit={submit} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a note"
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>

      <p>Mode API base: <code>{API_BASE}</code></p>
    </main>
  );
}
