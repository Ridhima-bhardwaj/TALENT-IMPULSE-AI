import { useState } from "react";
import { generateChatReply } from "../services/ai";

export default function CandidateChat({ candidate, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "recruiter",
      text: "Are you open to this role?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updated = [...messages, { sender: "recruiter", text: input }];
    setMessages(updated);
    setInput("");

    const reply = await generateChatReply(
      candidate.name,
      input,
      candidate.interestScore
    );

    setMessages((prev) => [
      ...prev,
      { sender: "candidate", text: reply },
    ]);
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e2f",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "15px",
      }}
    >
      <h3>Chat with {candidate.name}</h3>

      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <p
            key={i}
            style={{
              color:
                msg.sender === "recruiter" ? "#4CAF50" : "#FFD700",
            }}
          >
            <strong>
              {msg.sender === "recruiter"
                ? "Recruiter"
                : candidate.name}
              :
            </strong>{" "}
            {msg.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
        style={{
          width: "70%",
          padding: "8px",
          marginTop: "10px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <button onClick={sendMessage} style={{ marginLeft: "10px" }}>
        Send
      </button>

      <button onClick={onClose} style={{ marginLeft: "10px" }}>
        Close
      </button>
    </div>
  );
}