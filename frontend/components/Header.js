

import Link from "next/link";
import { useRouter } from "next/router";
import { getToken, removeToken } from "../lib/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setToken(getToken());
  }, []);

  function logout() {
    removeToken();
    setToken(null);
    setIsMenuOpen(false);
    router.push("/");
  }

  const isActive = (path) => router.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="text-white text-xl font-bold hover:text-blue-100 transition-colors duration-200"
            >
              YourApp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive("/") 
                  ? "bg-white bg-opacity-20 text-white" 
                  : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              Home
            </Link>
            
            <Link
              href="/users"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive("/users") 
                  ? "bg-white bg-opacity-20 text-white" 
                  : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              Users
            </Link>

            {token ? (
              <button
                onClick={logout}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/") 
                    ? "bg-white bg-opacity-20 text-white" 
                    : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700 bg-opacity-50 rounded-lg m-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive("/") 
                    ? "bg-white bg-opacity-20 text-white" 
                    : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Home
              </Link>
              
              <Link
                href="/users"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive("/users") 
                    ? "bg-white bg-opacity-20 text-white" 
                    : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Users
              </Link>

              {token ? (
                <button
                  onClick={logout}
                  className="w-full text-left bg-white text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 shadow-md"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive("/") 
                      ? "bg-white bg-opacity-20 text-white" 
                      : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


/*
import Link from "next/link";
import { useRouter } from "next/router";
import { getToken, removeToken } from "../lib/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  function logout() {
    removeToken();
    setToken(null);
    router.push("/");
  }

  return (
    <header style={{ padding: 10, borderBottom: "1px solid #ddd", marginBottom: 20 }}>
      <Link href="/">Home</Link>{" | "}
      <Link href="/users">Users</Link>{" | "}
      {token ? (
        <button onClick={logout} style={{ marginLeft: 10 }}>Logout</button>
      ) : (
        <Link href="/">Login</Link>
      )}
    </header>
  );
}
*/