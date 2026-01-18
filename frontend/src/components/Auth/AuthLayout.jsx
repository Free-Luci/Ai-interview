import ThemeToggle from "../common/ThemeToggle";

const AuthLayout = ({ left, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="relative w-full max-w-6xl bg-base-100 rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {left}
        <div className="flex items-center justify-center p-10 sm:p-14">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
