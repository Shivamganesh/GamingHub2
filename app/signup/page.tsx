"use client"
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
}

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });
    if (error) setError(error.message);
    else setSuccess("Signup successful! Please check your email and click the confirmation link.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full h-screen flex items-center justify-center bg-dark-bg-primary p-0 m-0">
      <div className="w-full h-full flex flex-col md:flex-row bg-dark-bg-secondary rounded-none shadow-none overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 h-full">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-4xl font-bold mb-8  text-center text-white drop-shadow-md">Sign Up for GamingHub</h2>
            <form onSubmit={handleSignup} className="w-full space-y-6">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-6 py-4 rounded-lg bg-dark-bg-primary text-text-primary border border-dark-bg-primary focus:border-accent outline-none text-lg"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 rounded-lg bg-dark-bg-primary text-text-primary border border-dark-bg-primary focus:border-accent outline-none text-lg"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-6 py-4 rounded-lg bg-dark-bg-primary text-text-primary border border-dark-bg-primary focus:border-accent outline-none text-lg"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div className="text-xs text-text-secondary mb-2">
                {/* Password must be at least 8 characters and include uppercase, lowercase, number, and special character. */}
              </div>
              {error && <div className="text-red-500 text-base text-center font-semibold">{error}</div>}
              {success && (
                <div className="text-green-500 text-base text-center font-semibold">
                  {success}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-full btn-accent font-bold text-xl disabled:opacity-60 mt-2"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <a href="/login" className="text-accent hover:underline text-lg">Already have an account? Login</a>
            </div>
          </div>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex h-full">
          <div className="relative w-full h-full">
            <Image src="/fantasy-rpg-game-detail.png" alt="Gaming" fill priority className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
