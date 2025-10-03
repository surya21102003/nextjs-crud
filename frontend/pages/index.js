import { useState } from "react";
import api from "../lib/api";
import { setToken } from "../lib/auth";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function Home() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === "register") {
        await api.post("/auth/register", { email, password });
        alert("Registered successfully, now login!");
        setMode("login");
        return;
      }

      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.access_token);
      router.push("/users");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/*<Header />*/}
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-600">
                {mode === "login" 
                  ? "Sign in to your account to continue" 
                  : "Sign up to get started"
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </div>
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </button>
            </form>

            {/* Switch mode button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              >
                {mode === "login" 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {/* Additional info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




/*

import { useState } from "react";
import api from "../lib/api";
import { setToken } from "../lib/auth";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function Home() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === "register") {
        await api.post("/auth/register", { email, password });
        alert("Registered successfully, now login!");
        setMode("login");
        return;
      }

      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.access_token);
      router.push("/users");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div>
      <Header />
      <h1>{mode === "login" ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </div>
  );

}
*/