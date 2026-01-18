import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { toggleTheme } from "../../store/themeSlice";

const Header = () => {
  const isAuth = useSelector((s) => s.auth.isAuthenticated);
   const theme = useSelector((s) => s.theme.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSection = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
    setOpen(false);
  };
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    toast("Theme updated 🌗");
  };
  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b">
      <div className="flex items-center px-6 py-4 max-w-7xl mx-auto">

        {/* LEFTMOST THREE DOTS */}
<div
  ref={menuRef}
  className="absolute left-2 top-1/2 -translate-y-1/2 z-50">
          <button
            onClick={() => setOpen(!open)}
  className="w-16 h-16 flex items-center justify-center
           text-5xl font-black rounded-full
           hover:bg-base-200 active:scale-95
           transition-all duration-200"

            aria-label="Menu"
          >
            ⋮
          </button>

          {open && (
            <div className="absolute left-0 mt-3 w-72 bg-base-100 shadow-2xl rounded-2xl p-4 text-xl">
              <button
                onClick={() => goToSection("about")}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-base-200"
              >
                About Platform
              </button>

              <button
                onClick={() => goToSection("help")}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-base-200"
              >
                How It Works
              </button>

              <button
                onClick={() => goToSection("contact")}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-base-200"
              >
                Contact
              </button>

              {isAuth && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg
                            text-error hover:bg-error/10"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>

        {/* BRAND */}
        <Link
          to="/"
          className="text-xl md:text-5xl font-extrabold tracking-tight hover:text-primary transition"
        >
          AI Interview Coach
        </Link>
 <div className="ml-auto flex items-center gap-4">
           {/* RIGHT ACTIONS */}
                  {/* THEME TOGGLE */}
          <button
            onClick={handleThemeToggle}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
            >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
            {/* RIGHT SIDE AUTH (OPTIONAL) */}
        {!isAuth && (
          <div className="ml-auto hidden md:flex gap-4">
            <Link to="/login" className="btn btn-outline btn-md">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-md">
              Get Started
            </Link>
          </div>
        )}
      </div>
      </div>
    </header>
  );
};

export default Header;
