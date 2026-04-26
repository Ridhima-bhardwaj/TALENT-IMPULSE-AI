import { useState, useEffect } from "react";
import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { scoreCandidate, simulateResponse } from "./utils/scoring";
import CandidateChat from "./components/CandidateChat";
import { generateInsight, generateFeedback } from "./services/ai";

export default function App() {
  const [jobDesc, setJobDesc] = useState("");
  const [openChatIndex, setOpenChatIndex] = useState(null);
  const [results, setResults] = useState(null);
  const [candidatesData, setCandidatesData] = useState([]);
  const [showTopOnly, setShowTopOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      const snapshot = await getDocs(collection(db, "candidates"));
      const data = snapshot.docs.map((doc) => doc.data());
      setCandidatesData(data);
    };
    fetchCandidates();
  }, []);

  const handleAnalyze = async () => {
    if (!jobDesc) {
      alert("Please enter job description");
      return;
    }

    setLoading(true);

    const ranked = [];

    for (const candidate of candidatesData) {
      const { score, explanation, strengths, missing } =
        scoreCandidate(candidate, jobDesc);

      const { status, interestScore } = simulateResponse(score);

      let insight = "";
      let feedback = "";

      try {
        insight = await generateInsight(
          candidate.name,
          score,
          interestScore
        );

        feedback = await generateFeedback(
          candidate.name,
          candidate.skills
        );
      } catch {
        insight = "Unavailable";
        feedback = "Unavailable";
      }

      ranked.push({
        ...candidate,
        matchScore: score,
        explanation,
        status,
        interestScore,
        finalScore: score * 0.7 + interestScore * 0.3,
        strengths,
        missing,
        insight,
        feedback,
      });

      await new Promise((res) => setTimeout(res, 250));
    }

    ranked.sort((a, b) => b.finalScore - a.finalScore);

    setResults(ranked);
    setLoading(false);
  };

  const displayCandidates =
    showTopOnly && results ? results.slice(0, 3) : results;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", color: "white", background: "#0f1117", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "40px" }}>TalentPulse AI</h1>
        <p style={{ color: "#aaa" }}>
          AI-powered talent scouting and engagement system
        </p>
      </div>

      {/* INPUT */}
      <div style={{ textAlign: "center" }}>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description..."
          rows={6}
          style={{
            width: "100%",
            maxWidth: "550px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #333",
            background: "#1e1e2f",
            color: "white"
          }}
        />
      </div>

      <br />

      {/* BUTTON */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleAnalyze}
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Analyze Candidates"}
        </button>
      </div>

      {loading && (
        <p style={{ textAlign: "center", marginTop: "10px", color: "#aaa" }}>
          Analyzing candidates...
        </p>
      )}

      <br />

      {/* FILTER */}
      {results && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button onClick={() => setShowTopOnly(false)}>Show All</button>
          <button onClick={() => setShowTopOnly(true)} style={{ marginLeft: "10px" }}>
            Show Top 3
          </button>
        </div>
      )}

      {/* RESULTS */}
      {displayCandidates && (
        <div>
          <h2 style={{ textAlign: "center" }}>Ranked Candidates</h2>

          {displayCandidates.map((c, index) => (
            <div
              key={index}
              style={{
                border: index === 0 ? "2px solid gold" : "1px solid #333",
                background: "#1e1e2f",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "12px",
              }}
            >
              {index === 0 && (
                <div style={{ color: "gold", fontWeight: "bold" }}>
                  ⭐ Top Recommendation
                </div>
              )}

              <h3>
                #{index + 1} {c.name}
              </h3>

              {/* SCORES */}
              <div style={{ display: "flex", gap: "20px" }}>
                <span>Match: <b>{c.matchScore}</b></span>
                <span>Interest: <b>{c.interestScore}</b></span>
                <span>Final: <b>{c.finalScore.toFixed(1)}</b></span>
              </div>

              {/* STATUS */}
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      c.status === "interested"
                        ? "lightgreen"
                        : c.status === "neutral"
                        ? "orange"
                        : "red",
                  }}
                >
                  {c.status}
                </span>
              </p>

              <p><b>Strengths:</b> {c.strengths}</p>
              <p><b>Missing:</b> {c.missing}</p>

              <p>{c.explanation}</p>

              <p><b>Insight:</b> {c.insight}</p>
              <p style={{ color: "#aaa" }}>
                <b>Suggestion:</b> {c.feedback}
              </p>

              <button onClick={() => setOpenChatIndex(index)}>
                Chat
              </button>

              {openChatIndex === index && (
                <CandidateChat
                  candidate={c}
                  onClose={() => setOpenChatIndex(null)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}