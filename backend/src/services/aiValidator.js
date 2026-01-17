export const validateAIResponse = (data) => {
  if (
    typeof data.score !== "number" ||
    !Array.isArray(data.strengths) ||
    !Array.isArray(data.improvements) ||
    typeof data.improvedAnswer !== "string" ||
    typeof data.followUpQuestion !== "string"
  ) {
    return false;
  }
  return true;
};
