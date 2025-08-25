import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  user: string;
  rating: number;
  text: string;
}

interface ReviewFormProps {
  onSubmit: (review: { rating: number; text: string }) => void;
  user?: string;
}

export function ReviewForm({ onSubmit, user }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [hover, setHover] = useState(0);

  return (
    <form
      className="mb-8 bg-dark-bg-secondary p-4 rounded-xl border border-dark-bg-primary shadow"
      onSubmit={e => {
        e.preventDefault();
        if (rating && text.trim()) {
          onSubmit({ rating, text });
          setRating(0);
          setText("");
        }
      }}
    >
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Star className={`w-6 h-6 ${star <= (hover || rating) ? "text-accent fill-accent" : "text-text-secondary"}`} />
          </button>
        ))}
        <span className="ml-2 text-sm text-text-secondary">{rating ? `${rating} / 5` : "Rate this game"}</span>
      </div>
      <textarea
        className="w-full p-2 rounded bg-dark-bg-primary text-text-primary mb-2"
        rows={3}
        placeholder="Write your review..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <button type="submit" className="btn-accent px-4 py-2 rounded">Submit Review</button>
      {user && (
        <div className="text-xs text-text-secondary mt-1">Reviewing as: <span className="font-bold">{user}</span></div>
      )}
    </form>
  );
}
