import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

const Nav: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-green-700"
        >
          FarmersProfitHub
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-green-700"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-gray-600 transition hover:text-green-700"
          >
            About
          </Link>

          <Link
            to="/auth"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Auth
          </Link>

          {user && (
            <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-32 truncate text-sm font-semibold text-gray-800">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
