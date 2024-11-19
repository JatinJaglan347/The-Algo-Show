import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const [rating, setRating] = useState(0); // State for star rating
  const [hover, setHover] = useState(0); // State for hover effect
  const [review, setReview] = useState(""); // State for review text
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [submitted, setSubmitted] = useState(false); // Submission feedback

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset submission message after 3 seconds
    // Optionally clear form fields after submission
    setName("");
    setEmail("");
    setReview("");
    setRating(0);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-6">
      <div className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-300 mb-6 text-center">
          Share Your Feedback
        </h1>
        <p className="text-gray-300 text-center mb-6">
          We value your feedback! Please leave a rating and let us know how we can improve.
        </p>

        {/* Rating Section */}
        <div className="flex justify-center items-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-3xl focus:outline-none"
            >
              <FaStar
                className={`${
                  (hover || rating) >= star ? "text-yellow-400" : "text-gray-600"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-gray-300 text-center mb-6">
          {rating > 0 ? `You rated this ${rating} star${rating > 1 ? "s" : ""}` : "No rating yet"}
        </p>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-md bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Suggestion/Review Textarea */}
          <div>
            <label htmlFor="review" className="block text-gray-300 mb-2">
              Your Review or Suggestions
            </label>
            <textarea
              id="review"
              rows="5"
              className="w-full p-3 rounded-md bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Write your feedback here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-zinc-700 text-gray-300 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Submit Review
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <p className="text-green-400 text-center mt-4">
            Thank you for your feedback!
          </p>
        )}
      </div>
    </div>
  );
};

export default Review;
