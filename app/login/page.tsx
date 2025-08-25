"use client"
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full h-screen flex items-center justify-center bg-dark-bg-primary p-0 m-0">
      <div className="w-full h-full flex flex-col md:flex-row bg-dark-bg-secondary rounded-none shadow-none overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 h-full">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-4xl font-bold text-text-primary mb-8 tracking-tight text-center">Login to GamingHub</h2>
            <form onSubmit={handleLogin} className="w-full space-y-6">
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
              {error && <div className="text-red-500 text-base text-center font-semibold">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 rounded-full btn-accent font-bold text-xl disabled:opacity-60 mt-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <a href="/signup" className="text-accent hover:underline text-lg">Don't have an account? Sign Up</a>
            </div>
          </div>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex h-full">
          <div className="relative w-full h-full">
            <Image src="/fantasy-rpg-game.png" alt="Gaming" fill priority className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
