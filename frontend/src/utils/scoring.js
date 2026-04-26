

export function scoreCandidate(candidate, jobDesc) {
  const jobDescLower = (jobDesc || "").toLowerCase();

  //  SAFE skills
  const skills = Array.isArray(candidate.skills) ? candidate.skills : [];

  // MATCH SKILLS
  const matchedSkills = skills.filter((skill) =>
    jobDescLower.includes(skill.toLowerCase())
  );

  const missingSkills = skills.filter(
    (skill) => !jobDescLower.includes(skill.toLowerCase())
  );

  //  SKILL SCORE
  const skillScore = skills.length
    ? Math.round((matchedSkills.length / skills.length) * 100)
    : 0;


  const expMatch = jobDescLower.match(/(\d+)\s*year/);
  const requiredExp = expMatch ? parseInt(expMatch[1]) : 0;

  //  CANDIDATE EXPERIENCE
  const candidateExp = candidate.experience || 0;

  //  EXPERIENCE SCORE
  let expScore;

  if (requiredExp === 0) {
    expScore = 100;
  } else if (candidateExp >= requiredExp) {
    expScore = 100;
  } else {
    expScore = Math.round((candidateExp / requiredExp) * 100);
  }

  const score = Math.round(skillScore * 0.7 + expScore * 0.3);

  //  Explainability
  const strengths = matchedSkills.length
    ? `Strong in ${matchedSkills.join(", ")}`
    : "No strong skill match";

  const missing = missingSkills.length
    ? `Missing ${missingSkills.join(", ")}`
    : "All required skills present";

  //  Risk logic
  let risk = "Low";
  if (score < 40) risk = "High";
  else if (score < 70) risk = "Medium";

  const expText = requiredExp
    ? ` | Experience: ${candidateExp}/${requiredExp} years`
    : "";

  const explanation = matchedSkills.length
    ? `Matched ${matchedSkills.length} skill(s): ${matchedSkills.join(", ")}${expText}`
    : `No skills matched${expText}`;

  return {
    score,
    explanation,
    strengths,
    missing,
    risk,
  };
}



export function simulateResponse(score) {
  let status, interestScore;

  if (score >= 70) {
    status = "interested";
    interestScore = Math.floor(Math.random() * 20) + 80;
  } else if (score >= 40) {
    status = "neutral";
    interestScore = Math.floor(Math.random() * 20) + 50;
  } else {
    status = "not interested";
    interestScore = Math.floor(Math.random() * 30) + 10;
  }

  return { status, interestScore };
}