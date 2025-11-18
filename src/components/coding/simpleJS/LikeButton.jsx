import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ImSpinner2 } from 'react-icons/im';

function mockApiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('success') : reject('Failed to like/unlike');
    }, 1000);
  });
}

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await mockApiCall();
      setLiked(!liked);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg w-64 bg-white shadow-lg text-center">
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={loading}
        className={`flex items-center justify-center px-4 py-2 rounded text-white font-semibold transition-colors ${
          liked ? 'bg-red-600' : hovered ? 'bg-gray-600' : 'bg-gray-400'
        }`}
      >
        {loading ? <ImSpinner2 className="w-5 h-5 animate-spin mr-2" /> : liked ? <AiFillHeart className="w-5 h-5 mr-2" /> : <AiOutlineHeart className="w-5 h-5 mr-2" />}
        {liked ? 'Liked' : 'Like'}
      </button>
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
}