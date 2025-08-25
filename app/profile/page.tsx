"use client"

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../../hooks/useUser";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Image from "next/image";

// Use shared supabase client from lib/supabaseClient

interface GameScore {
  game_id: string;
  game_title: string;
  score: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, username, loading } = useUser();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Static list of games (add your game ids and titles here)
  // Use the same game_id values as in your leaderboard table
  const staticGames = [
    { id: '1', title: 'Jumping Ball Runner' },
    { id: '2', title: 'Space Shooter' },
    { id: '3', title: 'Zombie Survival' },
    { id: '4', title: 'Fantasy RPG' },
    // Add more games as needed, matching the game_id in leaderboard
  ];
  const [scores, setScores] = useState<GameScore[]>([]);
  const [scoreLoading, setScoreLoading] = useState(true);
  const [scoreError, setScoreError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    // Always add a cache buster to avatarUrl to force refresh if user metadata changes
    const url = user.user_metadata?.avatar_url;
    if (url) {
      const hasQuery = url.includes('?');
      setAvatarUrl(hasQuery ? `${url}&r=${Math.random()}` : `${url}?r=${Math.random()}`);
    } else {
      setAvatarUrl("/placeholder-user.jpg");
    }
    const fetchScores = async () => {
      setScoreLoading(true);
      setScoreError(null);
      let userScores: GameScore[] = [];
      for (const game of staticGames) {
        const { data: scoreRows, error: scoreErrorObj } = await supabase
          .from("leaderboard")
          .select("score")
          .eq("game_id", game.id)
          .eq("username", username)
          .order("score", { ascending: false })
          .limit(1);
        if (scoreErrorObj) {
          setScoreError(`Error fetching score for game ${game.title}: ${scoreErrorObj.message}`);
          setScoreLoading(false);
          return;
        }
        userScores.push({
          game_id: game.id,
          game_title: game.title,
          score: scoreRows && scoreRows.length > 0 ? scoreRows[0].score : 0,
        });
      }
      setScores(userScores);
      setScoreLoading(false);
    };
    fetchScores();
  }, [user, username]);

  // Avatar upload handler
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${user.id}.${fileExt}`;
    // Upload to Supabase Storage (bucket: avatars)
    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
    if (uploadError) {
      alert('Avatar upload failed!');
      setUploading(false);
      return;
    }
    // Get public URL and add cache buster
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    if (!data?.publicUrl) {
      alert('Could not get avatar URL!');
      setUploading(false);
      return;
    }
    const cacheBustedUrl = `${data.publicUrl}?t=${Date.now()}`;
    // Update user_metadata with cache-busted URL
    const { error: updateError } = await supabase.auth.updateUser({ data: { avatar_url: cacheBustedUrl } });
    if (updateError) {
      alert('Failed to update profile with new avatar!');
      setUploading(false);
      return;
    }
    // Only now update the UI
    setAvatarUrl(cacheBustedUrl);
    setUploading(false);
  };

  if (loading || !user) {
    return <div className="flex justify-center items-center h-96 text-xl">Loading profile...</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
  className="w-full min-h-screen sm:max-w-xl sm:mx-auto mt-0 sm:mt-16 rounded-none sm:rounded-2xl shadow-2xl border-0 sm:border-2 border-accent/60 p-4 sm:p-8 flex flex-col justify-center items-center bg-white dark:bg-dark-bg-secondary animate-fadeIn"
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-4 top-4 md:left-8 md:top-8"
      >
        <Link href="/" title="Back to Home" aria-label="Back to Home">
          <motion.button
            whileHover={{ scale: 1.18, rotate: -18, boxShadow: '0 6px 32px 0 rgba(80,80,255,0.18)', filter: 'brightness(1.12) blur(0.5px)' }}
            whileTap={{ scale: 0.92, rotate: 0, filter: 'brightness(0.96)' }}
            transition={{ type: 'spring', stiffness: 340, damping: 18 }}
            className="flex items-center justify-center p-2 rounded-full bg-accent text-white shadow focus:outline-none backdrop-blur-md"
            style={{ outline: 'none', border: 'none', cursor: 'pointer' }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              initial={false}
              animate={{ rotate: 0 }}
              whileHover={{ rotate: -12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </motion.svg>
          </motion.button>
        </Link>
      </motion.div>
      {/* Main Profile Content Reveal Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-col items-center mb-8 w-full"
      >
        <div className="w-32 h-32 rounded-full border-4 border-accent shadow-2xl mb-4 relative group bg-light-bg-primary dark:bg-dark-bg-primary flex items-center justify-center transition-all duration-200">
          <Image src={avatarUrl} alt="User Avatar" width={128} height={128} className="object-cover w-full h-full rounded-full" />
          <motion.button
            className="absolute bottom-2 right-2 bg-accent text-white rounded-full p-2 shadow-lg border-2 border-white dark:border-dark-bg-primary opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
            title="Edit Avatar"
            disabled={uploading}
            whileHover={{ scale: 1.1 }}
            animate={uploading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: uploading ? Infinity : 0, duration: 0.7, ease: 'linear' }}
          >
            {uploading ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.182.545.545-4.182L16.862 3.487z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.182.545.545-4.182L16.862 3.487z" />
              </svg>
            )}
          </motion.button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
            disabled={uploading}
          />
        </div>
  <h2 className="text-3xl font-bold text-accent mb-1 text-center drop-shadow-sm dark:drop-shadow-lg">{username}</h2>
  <p className="text-base sm:text-lg text-center mb-2 text-neutral-800 dark:text-neutral-200 px-4 py-1 rounded-xl shadow-sm">{user.email}</p>
        <motion.button
          whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 px-7 py-2 rounded-xl border border-accent text-accent dark:text-accent font-semibold bg-transparent shadow-none text-base inline-flex items-center gap-2 transition-all duration-150"
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            try {
              await supabase.auth.signOut();
              router.push("/");
            } catch (err) {
              alert('Sign out failed!');
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m9 0l-3-3m3 3l-3 3" />
          </svg>
          Sign Out
        </motion.button>
  </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        className="w-full"
      >
  <h3 className="text-2xl font-semibold text-accent mb-4 text-center drop-shadow-sm dark:drop-shadow-lg">Best Scores</h3>
        {scoreLoading ? (
          <div className="text-center py-8 text-lg text-accent-2 dark:text-accent-2/80">Loading scores...</div>
        ) : scoreError ? (
          <div className="text-center py-8 text-lg text-red-500 dark:text-red-400">{scoreError}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="overflow-x-auto rounded-xl border border-accent/40 shadow bg-white/90 dark:bg-dark-bg-primary"
          >
            <table className="w-full text-left table-auto border-collapse min-w-full">
              <thead>
                <tr className="bg-accent radient-to-r from-accent to-accent-2 text-white rounded-t-xl shadow">
                  <th className="py-3 px-5 font-anton text-base uppercase tracking-wider rounded-tl-xl">Game</th>
                  <th className="py-3 px-5 font-anton text-base uppercase tracking-wider rounded-tr-xl">Best Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr
                    key={score.game_id}
                    className="transition-all duration-200 border-b border-accent/10 last:border-b-0 hover:bg-accent/10 hover:border-l-4 hover:border-accent/80 group"
                  >
                    <td className="py-3 px-5 font-medium text-neutral-900 dark:text-neutral-100 text-base group-hover:pl-7 transition-all duration-200">{score.game_title}</td>
                    <td className="py-3 px-5 font-bold text-accent text-lg group-hover:text-accent-2 transition-all duration-200">{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
  </motion.div>
  </motion.section>
  );
}
