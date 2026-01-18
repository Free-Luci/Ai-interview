const PasswordStrength = ({ percent, label, color }) => {
  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-base-300 rounded">
        <div
          className={`h-1 rounded ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs mt-1 text-base-content/60">
        Strength: {label}
      </p>
    </div>
  );
};

export default PasswordStrength;
