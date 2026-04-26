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
        temperature: 0.3, // tighter responses
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
    let instruction = "";

    if (interest > 70) {
      instruction = "You are VERY INTERESTED in this job. Show enthusiasm.";
    } else if (interest > 40) {
      instruction = "You are UNSURE about this job. Ask for more details.";
    } else {
      instruction =
        "You are NOT INTERESTED in this job. Politely decline clearly. Do NOT say yes.";
    }

    return await ask(
      [
        {
          role: "user",
          content: `You are a job candidate named ${name}.

STRICT RULES:
- Follow the interest instruction strictly
- Do NOT contradict it
- Keep reply under 12 words
- Only one sentence

${instruction}

Recruiter message: "${message}"

Reply now.`,
        },
      ],
      40
    );
  } catch {
    
    if (interest > 70) {
      return "Yes, I’m very interested in this role.";
    } else if (interest > 40) {
      return "I’d like more details before deciding.";
    } else {
      return "I’m not interested at the moment.";
    }
  }
}