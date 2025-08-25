"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)


interface LeaderboardRow {
  id: number
  username: string
  score: number
  game_id?: string
}

type LeaderboardSectionProps = {
  gameId?: string;
};

// Static data for other games (10 rows each)
const staticLeaderboards: Record<string, LeaderboardRow[]> = {
  "2": [
    { id: 1, username: "StarCommander", score: 22000 },
    { id: 2, username: "CosmicWarrior", score: 19500 },
    { id: 3, username: "Oblivion", score: 17000 },
    { id: 4, username: "NebulaKnight", score: 16200 },
    { id: 5, username: "AstroAce", score: 14800 },
    { id: 6, username: "NovaPilot", score: 13900 },
    { id: 7, username: "StellarFox", score: 12800 },
    { id: 8, username: "QuantumRider", score: 12000 },
    { id: 9, username: "Meteorite", score: 11000 },
    { id: 10, username: "Orbitron", score: 9800 },
  ],
  "3": [
    { id: 1, username: "MythicHero", score: 30000 },
    { id: 2, username: "DragonSlayer", score: 28500 },
    { id: 3, username: "ArcaneMage", score: 25000 },
    { id: 4, username: "ForestWalker", score: 23000 },
    { id: 5, username: "BladeMaster", score: 21000 },
    { id: 6, username: "ShadowElf", score: 20000 },
    { id: 7, username: "RunePriest", score: 18500 },
    { id: 8, username: "StormCaller", score: 17000 },
    { id: 9, username: "IronGiant", score: 15500 },
    { id: 10, username: "Phoenix", score: 14000 },
  ],
  // Add more static games as needed
};

const LeaderboardSection = ({ gameId }: LeaderboardSectionProps) => {
  const [scores, setScores] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [allGlobalLeaderboards, setAllGlobalLeaderboards] = useState<{ title: string; scores: LeaderboardRow[] }[] | null>(null);

  useEffect(() => {
    async function fetchScores() {
      setLoading(true);
      if (gameId === "1") { // Jumping Ball Runner (per-game page)
        let query = supabase
          .from("leaderboard")
          .select("id, username, score, game_id")
          .eq("game_id", gameId)
          .order("score", { ascending: false })
          .limit(100);
        const { data, error } = await query;
        if (!error && data) {
          // Map to store highest score per user
          const userBest: Record<string, { id: number; username: string; score: number; game_id?: string }> = {};
          data.forEach((row) => {
            if (!userBest[row.username] || row.score > userBest[row.username].score) {
              userBest[row.username] = row;
            }
          });
          // Convert to array and sort descending
          const bestScores = Object.values(userBest).sort((a, b) => b.score - a.score).slice(0, 10);
          setScores(bestScores);
        } else {
          setScores([]);
        }
        setLoading(false);
      } else if (gameId && staticLeaderboards[gameId]) {
        setScores(staticLeaderboards[gameId]);
        setLoading(false);
      } else if (!gameId) {
        // Global leaderboard: show Jumping Ball Runner (real) and others (static)
        let allScores: { title: string; scores: LeaderboardRow[] }[] = [];
        // 1. Jumping Ball Runner (real)
        const { data, error } = await supabase
          .from("leaderboard")
          .select("id, username, score, game_id")
          .eq("game_id", "1")
          .order("score", { ascending: false })
          .limit(100);
        let jbrScores: LeaderboardRow[] = [];
        if (!error && data) {
          const userBest: Record<string, LeaderboardRow> = {};
          data.forEach((row) => {
            if (!userBest[row.username] || row.score > userBest[row.username].score) {
              userBest[row.username] = row;
            }
          });
          jbrScores = Object.values(userBest).sort((a, b) => b.score - a.score).slice(0, 10);
        }
        allScores.push({ title: "Jumping Ball Runner", scores: jbrScores });
        // 2. Static games
        Object.entries(staticLeaderboards).forEach(([gid, scores]) => {
          let title = "";
          if (gid === "2") title = "Galactic Defender";
          if (gid === "3") title = "Fantasy Quest";
          // Add more as needed
          allScores.push({ title, scores });
        });
        setAllGlobalLeaderboards(allScores);
        setLoading(false);
      }
    }
    fetchScores();
  }, [gameId]);

  // If global leaderboard, render with tabs for each game
  const gameTabs = [
    { id: "1", title: "Jumping Ball Runner" },
    { id: "2", title: "Galactic Defender" },
    { id: "3", title: "Fantasy Quest" },
    // Add more as needed
  ];
  const [selectedTab, setSelectedTab] = useState("1");
  useEffect(() => {
    if (!gameId && allGlobalLeaderboards) {
      setSelectedTab("1");
    }
    // eslint-disable-next-line
  }, [gameId, allGlobalLeaderboards]);

  if (!gameId && allGlobalLeaderboards) {
    const selectedLeaderboard = allGlobalLeaderboards.find((g, idx) => gameTabs[idx]?.id === selectedTab);
    return (
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-primary">
        <motion.h2
          className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Global Leaderboards
        </motion.h2>
        <div
          className="mb-8 gap-2 grid grid-cols-2 md:flex md:justify-center md:gap-4 px-1 md:px-0 w-full max-w-2xl mx-auto"
        >
          {/* First two tabs in first row on mobile/tablet, all in a row on desktop */}
          {gameTabs.map((tab, idx) => {
            // For mobile/tablet, make the last tab span two columns and center it
            const isLast = idx === gameTabs.length - 1;
            return (
              <button
                key={tab.id}
                className={`w-full md:w-auto px-3 sm:px-4 md:px-6 py-2 rounded-t-lg font-anton text-base md:text-lg transition-all duration-200 border-b-4 focus:outline-none whitespace-nowrap ${selectedTab === tab.id ? "bg-accent text-white border-accent" : "bg-dark-bg-secondary text-accent border-transparent hover:bg-accent/20"} ${isLast ? 'justify-self-center ml-40 md:mx-0' : ''}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto bg-dark-bg-secondary rounded-xl border-2 border-accent/70 shadow-xl shadow-accent/30 overflow-hidden"
        >
          <h3 className="text-2xl font-anton text-accent text-center py-4">{selectedLeaderboard?.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse min-w-full">
              <thead>
                <tr className="bg-dark-bg-primary text-text-primary">
                  <th className="py-4 px-6 font-anton text-xl uppercase tracking-wider whitespace-nowrap">Rank</th>
                  <th className="py-4 px-6 font-anton text-xl uppercase tracking-wider whitespace-nowrap">Username</th>
                  <th className="py-4 px-6 font-anton text-xl uppercase tracking-wider whitespace-nowrap">Score</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, idx2) => {
                  const row = selectedLeaderboard?.scores[idx2];
                  if (row) {
                    let specialIcon = null;
                    let specialClass = "";
                    let animateProps = {};
                    // Top 3: trophy/crown/medal icons, unique color, scale/shine animation
                    if (idx2 === 0) {
                      specialIcon = (
                        <span title="Top 1" className="mr-2 text-2xl drop-shadow-[0_0_8px_var(--accent)]">🏆</span>
                      );
                      specialClass = "bg-[rgba(34,193,195,0.18)] text-accent font-bold shadow-[0_0_32px_4px_var(--accent)] border-b-4 border-accent hover:bg-accent/40 hover:shadow-2xl hover:opacity-100 hover:scale-[1.025] hover:border-accent transition-all duration-200";
                      animateProps = {
                        initial: { opacity: 0, scale: 0.95, x: -48, filter: 'brightness(0.8)' },
                        animate: { opacity: 1, scale: [1, 1.07, 1], x: 0, filter: ['brightness(0.8)', 'brightness(1.1)', 'brightness(1)'] },
                        transition: { duration: 1.1, delay: idx2 * 0.07, scale: { duration: 0.7, times: [0, 0.5, 1] }, filter: { duration: 1 } }
                      };
                    } else if (idx2 === 1) {
                      specialIcon = (
                        <span title="Top 2" className="mr-2 text-2xl drop-shadow-[0_0_8px_var(--accent-2)]">🥈</span>
                      );
                      specialClass = "bg-[rgba(120,75,160,0.18)] text-[--accent-2] font-semibold shadow-[0_0_24px_2px_var(--accent-2)] border-b-4 border-[--accent-2] hover:bg-accent/40 hover:shadow-2xl hover:opacity-100 hover:scale-[1.025] hover:border-[--accent-2] transition-all duration-200";
                      animateProps = {
                        initial: { opacity: 0, scale: 0.95, x: -48, filter: 'brightness(0.8)' },
                        animate: { opacity: 1, scale: [1, 1.05, 1], x: 0, filter: ['brightness(0.8)', 'brightness(1.08)', 'brightness(1)'] },
                        transition: { duration: 1, delay: idx2 * 0.07, scale: { duration: 0.7, times: [0, 0.5, 1] }, filter: { duration: 1 } }
                      };
                    } else if (idx2 === 2) {
                      specialIcon = (
                        <span title="Top 3" className="mr-2 text-2xl drop-shadow-[0_0_8px_var(--accent-3)]">🥉</span>
                      );
                      specialClass = "bg-[rgba(43,134,197,0.16)] text-[--accent-3] font-semibold shadow-[0_0_20px_2px_var(--accent-3)] border-b-4 border-[--accent-3] hover:bg-accent/40 hover:shadow-2xl hover:opacity-100 hover:scale-[1.025] hover:border-[--accent-3] transition-all duration-200";
                      animateProps = {
                        initial: { opacity: 0, scale: 0.95, x: -48, filter: 'brightness(0.8)' },
                        animate: { opacity: 1, scale: [1, 1.04, 1], x: 0, filter: ['brightness(0.8)', 'brightness(1.06)', 'brightness(1)'] },
                        transition: { duration: 0.95, delay: idx2 * 0.07, scale: { duration: 0.7, times: [0, 0.5, 1] }, filter: { duration: 1 } }
                      };
                    } else {
                      // Others: simple fade/slide animation
                      animateProps = {
                        initial: { opacity: 0, x: -48 },
                        animate: { opacity: 1, x: 0 },
                        transition: { duration: 0.7, delay: idx2 * 0.07 }
                      };
                    }
                    return (
                      <motion.tr
                        key={row.id}
                        className={`transition-all duration-200 relative overflow-hidden hover:bg-accent/10 hover:shadow-lg hover:opacity-80 ${specialClass}`}
                        style={{ transition: 'background 0.2s, box-shadow 0.2s, opacity 0.18s', cursor: 'pointer' }}
                        {...animateProps}
                      >
                        <td className="py-3 px-6 font-inter text-lg flex items-center">{specialIcon}{idx2 + 1}</td>
                        <td className="py-3 px-6 font-inter text-lg">{row.username}</td>
                        <td className="py-3 px-6 font-inter text-lg">{row.score}</td>
                      </motion.tr>
                    );
                  } else {
                    return (
                      <motion.tr
                        key={"empty-" + idx2}
                        className="transition-all duration-200 relative overflow-hidden hover:bg-accent/10"
                        initial={{ opacity: 0, x: -48, boxShadow: "0 0 0 0 var(--accent)" }}
                        animate={{ opacity: 1, x: 0, boxShadow: [
                          "0 0 0 0 var(--accent)",
                          "0 0 16px 2px var(--accent)",
                          "0 0 0 0 var(--accent)"
                        ] }}
                        transition={{ duration: 0.7, delay: idx2 * 0.07, boxShadow: { duration: 0.7, times: [0, 0.5, 1] } }}
                      >
                        <td className="py-3 px-6 font-inter text-lg">{idx2 + 1}</td>
                        <td className="py-3 px-6 font-inter text-lg text-gray-500">-</td>
                        <td className="py-3 px-6 font-inter text-lg text-gray-500">-</td>
                      </motion.tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    );
  }

  // Default: single leaderboard (per game or per page)
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-dark-bg-primary">
      <motion.h2
        className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Leaderboard
      </motion.h2>
      <div className="max-w-3xl mx-auto bg-dark-bg-secondary rounded-xl border-2 border-accent/70 shadow-xl shadow-accent/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse min-w-full">
            <thead>
              <tr className="bg-dark-bg-primary text-text-primary">
                <th className="py-4 px-6 font-anton text-xl uppercase tracking-wider whitespace-nowrap">Rank</th>
                <th className="py-4 px-6 font-anton text-xl uppercase tracking-wider whitespace-nowrap">Username</th>
                <th className="py-4 px-6 font-anton text-xl uppercase tracking-wider whitespace-nowrap">Score</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center">Loading...</td>
                </tr>
              ) : (
                Array.from({ length: 10 }).map((_, idx) => {
                  const row = scores[idx];
                  if (row) {
                    let specialIcon = null;
                    let specialClass = "";
                    let hoverClass = "hover:bg-accent/10";
                    if (idx === 0) {
                      specialIcon = <span title="Top 1" className="mr-2">★</span>;
                      specialClass = "bg-accent/20 text-accent font-bold shadow-[0_0_16px_2px_var(--accent)]";
                    } else if (idx === 1) {
                      specialIcon = <span title="Top 2" className="mr-2">✦</span>;
                      specialClass = "bg-[rgba(120,75,160,0.18)] text-[--accent-2] font-semibold shadow-[0_0_10px_1px_var(--accent-2)]";
                    } else if (idx === 2) {
                      specialIcon = <span title="Top 3" className="mr-2">✧</span>;
                      specialClass = "bg-[rgba(43,134,197,0.16)] text-[--accent-3] font-semibold shadow-[0_0_8px_1px_var(--accent-3)]";
                    }
                    return (
                      <motion.tr
                        key={row.id}
                        className={`transition-all duration-200 relative overflow-hidden hover:bg-accent/10 ${specialClass}`}
                        initial={{ opacity: 0, x: -48, boxShadow: "0 0 0 0 var(--accent)" }}
                        animate={{ opacity: 1, x: 0, boxShadow: [
                          "0 0 0 0 var(--accent)",
                          "0 0 16px 2px var(--accent)",
                          "0 0 0 0 var(--accent)"
                        ] }}
                        transition={{ duration: 0.7, delay: idx * 0.07, boxShadow: { duration: 0.7, times: [0, 0.5, 1] } }}
                      >
                        <td className="py-3 px-6 font-inter text-lg flex items-center">{specialIcon}{idx + 1}</td>
                        <td className="py-3 px-6 font-inter text-lg">{row.username}</td>
                        <td className="py-3 px-6 font-inter text-lg">{row.score}</td>
                      </motion.tr>
                    );
                  } else {
                    return (
                      <motion.tr
                        key={"empty-" + idx}
                        className="transition-all duration-200 relative overflow-hidden hover:bg-accent/10"
                        initial={{ opacity: 0, x: -48, boxShadow: "0 0 0 0 var(--accent)" }}
                        animate={{ opacity: 1, x: 0, boxShadow: [
                          "0 0 0 0 var(--accent)",
                          "0 0 16px 2px var(--accent)",
                          "0 0 0 0 var(--accent)"
                        ] }}
                        transition={{ duration: 0.7, delay: idx * 0.07, boxShadow: { duration: 0.7, times: [0, 0.5, 1] } }}
                      >
                        <td className="py-3 px-6 font-inter text-lg">{idx + 1}</td>
                        <td className="py-3 px-6 font-inter text-lg text-gray-500">-</td>
                        <td className="py-3 px-6 font-inter text-lg text-gray-500">-</td>
                      </motion.tr>
                    );
                  }
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default LeaderboardSection
