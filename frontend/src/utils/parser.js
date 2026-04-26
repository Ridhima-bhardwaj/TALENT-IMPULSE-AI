export function parseJobDescription(jobDesc) {
  if (!jobDesc.trim()) return { skills: [] };

  // Normalize text
  const text = jobDesc.toLowerCase();

  // Extract words (basic NLP-lite)
  const words = text
    .replace(/[^a-zA-Z0-9+#. ]/g, " ")
    .split(/\s+/);

  // Remove common stopwords
  const stopwords = new Set([
    "and", "or", "the", "with", "for", "in", "a", "an",
    "of", "to", "is", "are", "you", "we", "looking", "developer"
  ]);

  const filtered = words.filter(
    (w) => w.length > 2 && !stopwords.has(w)
  );

  // Unique + limit
  const skills = [...new Set(filtered)].slice(0, 10);

  return { skills };
}