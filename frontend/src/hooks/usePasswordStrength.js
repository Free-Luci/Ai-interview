export default function usePasswordStrength(password) {
    if (password.length ==0) 
      return "";
  if (password.length < 4) 
    return { label: "Weak", percent: 33, color: "bg-error" };
  if (password.length < 8) 
    return { label: "Medium", percent: 66, color: "bg-warning" };
  return { label: "Strong", percent: 100, color: "bg-success" };
}
