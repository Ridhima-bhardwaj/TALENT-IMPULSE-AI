import { useState } from "react";
import { generateChatReply } from "../services/ai";

export default function CandidateChat({ candidate, onClose }) {
  const [messages, setMessages] = useState([
    { from: "recruiter", text: "Are you open to this role?" }
  ]);
  const [replied, setReplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendResponse = async () => {
    setLoading(true);

    let reply = "";

    try {
      reply = await generateChatReply(candidate.name, candidate.status);
    } catch {
      reply = "Sorry, couldn't respond right now.";
    }

    setMessages((prev) => [
      ...prev,
      { from: candidate.name, text: reply }
    ]);

    setLoading(false);
    setReplied(true);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        marginTop: 10,
        borderRadius: "8px",
        background: "#fafafa"
      }}
    >
      <strong>Chat with {candidate.name}</strong>

      <div style={{ margin: "10px 0" }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "recruiter" ? "right" : "left",
              marginBottom: "6px"
            }}
          >
            <small>
              <b>{m.from}:</b> {m.text}
            </small>
          </div>
        ))}

        {loading && (
          <div>
            <small><i>{candidate.name} is typing...</i></small>
          </div>
        )}
      </div>

      {!replied && (
        <button onClick={sendResponse}>
          Simulate Response
        </button>
      )}

      <button onClick={onClose} style={{ marginLeft: 8 }}>
        Close
      </button>
    </div>
  );
}