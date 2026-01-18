// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../store/authSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const LeftMenu = () => {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isAuth = useSelector((s) => s.auth.isAuthenticated);

//   // 👉 close on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const goToSection = (id) => {
//     setOpen(false);
//     document.getElementById(id)?.scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     });
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     toast.success("Logged out successfully");
//     navigate("/login");
//     setOpen(false);
//   };

//   return (
//     <div
//       ref={menuRef}
//       className="fixed left-4 top-1/2 -translate-y-1/2 z-50"
//     >
//       {/* THREE DOT BUTTON */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-14 h-14 rounded-full bg-base-100 shadow-xl 
//                    flex items-center justify-center text-3xl font-bold
//                    hover:bg-base-200 transition"
//         aria-label="Open menu"
//       >
//         ⋮
//       </button>

//       {/* EXPANDED MENU */}
//       {open && (
//         <div
//           className="mt-4 w-64 bg-base-100 shadow-2xl rounded-2xl
//                      p-4 space-y-2 text-xl"
//         >
//           <button
//             onClick={() => goToSection("about")}
//             className="w-full text-left px-4 py-3 rounded-lg hover:bg-base-200"
//           >
//             About Platform
//           </button>

//           <button
//             onClick={() => goToSection("help")}
//             className="w-full text-left px-4 py-3 rounded-lg hover:bg-base-200"
//           >
//             How It Works
//           </button>

//           <button
//             onClick={() => goToSection("contact")}
//             className="w-full text-left px-4 py-3 rounded-lg hover:bg-base-200"
//           >
//             Contact
//           </button>

//           {isAuth && (
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-3 rounded-lg
//                          text-error hover:bg-error/10"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeftMenu;
