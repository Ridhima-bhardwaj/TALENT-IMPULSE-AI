import { useState, useEffect } from "react";
import { generateChatReply } from "../services/ai";

export default function CandidateChat({ candidate, onClose }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function simulateConversation() {
      const recruiterMsg = "Are you open to this role?";

      setMessages([{ sender: "recruiter", text: recruiterMsg }]);

      const reply = await generateChatReply(
        candidate.name,
        recruiterMsg,
        candidate.interestScore
      );

      setMessages([
        { sender: "recruiter", text: recruiterMsg },
        { sender: "candidate", text: reply },
      ]);
    }

    simulateConversation();
  }, [candidate]);

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

      <button onClick={onClose} style={{ marginTop: "10px" }}>
        Close
      </button>
    </div>
  );
}