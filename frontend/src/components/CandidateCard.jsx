import CandidateChat from "./CandidateChat";

export default function CandidateCard({
  candidate,
  index,
  openChatIndex,
  setOpenChatIndex
}) {
  const isTop = index === 0;

  return (
    <div
  key={index}
  style={{
    border: index === 0 ? "2px solid #FFD700" : "1px solid #e0e0e0",
    background: "#ffffff",
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  }}

    >
      {isTop && (
        <div style={{ color: "green", fontWeight: "bold" }}>
          ⭐ Top Recommendation
        </div>
      )}

      <h3>
        #{index + 1} {candidate.name}
      </h3>

      <p><b>Match Score:</b> {candidate.matchScore}</p>
      <p><b>Interest Score:</b> {candidate.interestScore} ({candidate.status})</p>
      <p><b>Final Score:</b> {candidate.finalScore.toFixed(1)}</p>

      <p><i>{candidate.explanation}</i></p>
      <p><em>💡 {candidate.insight}</em></p>

      <button onClick={() => setOpenChatIndex(index)}>
        Chat
      </button>

      {openChatIndex === index && (
        <CandidateChat
          candidate={candidate}
          onClose={() => setOpenChatIndex(null)}
        />
      )}
    </div>
  );
}