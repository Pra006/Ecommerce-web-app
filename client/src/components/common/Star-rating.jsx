import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating, handleRatingChange }) => {
  console.log(rating);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          type="button"
          onClick={ handleRatingChange?() => handleRatingChange(star) : null}
          className={`p-2 rounded-full transition-all ${
            star <= rating
              ? "!text-yellow-500 hover:!text-yellow-500"
              : "text-muted-foreground hover:!text-yellow-500"
          }`}
          variant="outline"
          size="icon"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <StarIcon className={star <= rating ? "fill-yellow-500" : ""} />
        </Button>
      ))}
    </div>
  );
};

export default StarRating;
