const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const BASE_URL = "https://api.groq.com/openai/v1/chat/completions";

async function ask(messages, max_tokens = 50) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.5,
        max_tokens,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "API Error");
    }

    return data.choices?.[0]?.message?.content?.trim() || "No response";
  } catch {
    return "AI unavailable";
  }
}

// Insight
export async function generateInsight(name, match, interest) {
  return await ask(
    [
      {
        role: "user",
        content: `Candidate ${name} match ${match}, interest ${interest}. Give short recruiter insight (max 10 words).`,
      },
    ],
    40
  );
}

// Suggestion
export async function generateFeedback(name, skills) {
  return await ask(
    [
      {
        role: "user",
        content: `Candidate ${name}, skills: ${skills}. Suggest one improvement (max 10 words).`,
      },
    ],
    40
  );
}


export async function generateChatReply(name, message, interest) {
  try {
    let tone = "";

    if (interest > 70) {
      tone = "very interested and positive";
    } else if (interest > 40) {
      tone = "neutral and slightly interested";
    } else {
      tone = "not interested and slightly dismissive";
    }

    return await ask(
      [
        {
          role: "user",
          content: `You are a job candidate named ${name}.
Your attitude is ${tone}.

Reply to recruiter message: "${message}"
Keep it short and realistic.`,
        },
      ],
      60
    );
  } catch {
    return interest > 70
      ? "Yes, I’m interested. Can you share more details?"
      : interest > 40
      ? "I’m considering it, can you share more info?"
      : "I’m not interested at the moment.";
  }
}