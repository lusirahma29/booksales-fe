import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../_services/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
    if (token) {
      await logout({ token });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
    }
    navigate("/login");
  };

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 dark:bg-gray-800 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-bold text-gray-800 dark:text-white">
              Flowbite
            </span>
          </Link>

          {/* Right side (login/logout buttons) */}
          <div className="flex items-center lg:order-2">
            {token && userInfo ? (
              <>
                <span className="text-gray-800 dark:text-white font-medium text-sm px-3">
                  {userInfo.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 dark:text-white hover:text-indigo-600 transition-colors duration-200 font-medium text-sm px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:text-indigo-600 transition-colors duration-200 font-medium text-sm px-3 py-2"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 dark:text-white hover:text-indigo-600 transition-colors duration-200 font-medium text-sm px-3 py-2"
                >
                  Bergabung
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <svg
                className={`${menuOpen ? "hidden" : "block"} w-6 h-6`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className={`${menuOpen ? "block" : "hidden"} w-6 h-6`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6l8 8M6 14L14 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div
            className={`${menuOpen ? "block" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0 text-gray-700 dark:text-white">
              {[
                { name: "Home", path: "/" },
                { name: "Buku Terlaris", path: "/books" },
                { name: "Blog", path: "/blog" },
                { name: "Layanan", path: "/layanan" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block py-2 px-3 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
