import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { toggleTheme } from "../../store/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <button
      className="btn btn-sm btn-circle btn-ghost"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
