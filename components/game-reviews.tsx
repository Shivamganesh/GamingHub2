"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ReviewForm } from "./review-form";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";


type GameRatingProps = {
  gameId: string;
  initialRating: number;
};

export function GameRating({ gameId, initialRating }: GameRatingProps) {
  const [reviews, setReviews] = useState<{ rating: number }[]>([]);
  useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('game_id', gameId);
      if (!error && data) setReviews(data);
    }
    fetchReviews();
  }, [gameId]);
  const avgRating =
    reviews.length > 0
      ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
      : initialRating;
  return (
    <div className="flex flex-col items-start mb-6">
      <div className="flex items-center mb-1">
        <span className="font-bold text-text-primary mr-2 text-lg">Average Rating:</span>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-6 h-6",
              i < avgRating ? "text-accent fill-accent" : "text-text-secondary"
            )}
          />
        ))}
        <span className="ml-3 text-base text-text-secondary font-semibold">{avgRating} / 5</span>
      </div>
      <span className="text-sm text-text-secondary">{reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
    </div>
  );
}

type GameReviewSectionProps = {
  gameId: string;
};

export function GameReviewSection({ gameId }: GameReviewSectionProps) {
  const [reviews, setReviews] = useState<{
    user: string;
    rating: number;
    text: string;
    created_at?: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setCurrentUser(data.user.user_metadata?.username || data.user.email || "Anonymous");
      } else {
        setCurrentUser("");
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('game_id', gameId)
        .order('created_at', { ascending: false });
      if (!error && data) setReviews(data);
      setLoading(false);
    }
    fetchReviews();
  }, [gameId]);

  async function handleAddReview(review: { rating: number; text: string }) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ ...review, user: currentUser || "Anonymous", game_id: gameId }])
      .select();
    if (!error && data && data[0]) setReviews(revs => [data[0], ...revs]);
  }

  return (
    <div className="bg-dark-bg-secondary/80 p-6 rounded-2xl border border-dark-bg-primary shadow-xl mb-12">
      <h2 className="text-3xl font-anton text-text-primary mb-2">Write a Review</h2>
      <p className="text-text-secondary mb-4">Share your experience with this game. Your review helps others decide if they want to play!</p>
      <div className="mb-6">
        <ReviewForm onSubmit={handleAddReview} user={currentUser} />
      </div>
      <hr className="my-6 border-dark-bg-primary/40" />
      <h3 className="text-2xl font-anton text-text-primary mb-4">User Reviews</h3>
      {loading ? (
        <div className="text-text-secondary">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <ul className="space-y-6">
          {reviews.map((r, idx) => (
            <li key={idx} className="flex items-start gap-3 border-b border-dark-bg-secondary pb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dark-bg-primary flex items-center justify-center text-accent font-bold text-lg">
                {r.user?.[0]?.toUpperCase() || <User className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4 mr-1",
                        i < r.rating ? "text-accent fill-accent" : "text-text-secondary"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm text-text-secondary font-semibold">by {r.user}</span>
                </div>
                <p className="text-text-primary font-inter">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-text-secondary">No reviews yet. Be the first to review!</div>
      )}
    </div>
  );
}

