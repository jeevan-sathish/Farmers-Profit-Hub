import React, { useState } from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Auth Toggle */}
        <div className="mb-6 grid grid-cols-2 rounded-xl bg-gray-100 p-1.5">
          <button
            onClick={() => setAuthMode("signup")}
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              authMode === "signup"
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Create Account
          </button>

          <button
            onClick={() => setAuthMode("signin")}
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              authMode === "signin"
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Auth Component */}
        <div key={authMode} className="animate-in fade-in duration-300">
          {authMode === "signup" ? <Signup /> : <Signin />}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          FarmersProfitHub © 2026
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
