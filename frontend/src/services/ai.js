const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const BASE_URL = "https://api.groq.com/openai/v1/chat/completions";

async function ask(messages) {
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
      max_tokens: 40,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "API Error");
  }

  return data.choices[0].message.content.trim();
}

export async function generateInsight(name, match, interest) {
  return await ask([
    {
      role: "user",
      content: `Candidate ${name} match ${match}, interest ${interest}. Give short insight (max 8 words).`,
    },
  ]);
}

export async function generateFeedback(name, skills) {
  return await ask([
    {
      role: "user",
      content: `Candidate ${name}, skills: ${skills}. Give short improvement (max 8 words).`,
    },
  ]);
}