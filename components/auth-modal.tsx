import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else setSuccess("Logged in successfully!");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setSuccess("Signup successful! Check your email to confirm.");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-dark-bg-secondary rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-accent text-2xl">&times;</button>
        <h2 className="text-2xl font-bold text-text-primary mb-4 text-center">
          {isLogin ? "Login to GamingHub" : "Sign Up for GamingHub"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-dark-bg-primary text-text-primary border border-dark-bg-primary focus:border-accent outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-dark-bg-primary text-text-primary border border-dark-bg-primary focus:border-accent outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-500 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded-full btn-accent font-semibold text-lg disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-accent hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
