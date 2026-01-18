import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="form-control">
      <label className="label flex justify-between">
        <span className="label-text font-medium">
          Password
        </span>
        <button
          type="button"
          className="text-sm text-primary"
          onClick={() => setShow((s) => !s)}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </label>

      <input
        type={show ? "text" : "password"}
        className="input input-bordered input-lg w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordInput;
