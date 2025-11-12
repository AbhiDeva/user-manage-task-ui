import React, { useState } from "react";
import { motion } from "framer-motion";
import StackCodeVisualizer from "./StackCodeVisualizer";
import CommentSection from "./CommentSection";
import { SiReact, SiAngular, SiJavascript, SiTypescript } from "react-icons/si";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const techIcons = {
  react: <SiReact className="text-sky-400" />,
  angular: <SiAngular className="text-red-500" />,
  javascript: <SiJavascript className="text-yellow-400" />,
  typescript: <SiTypescript className="text-blue-400" />,
};

export default function CardItem({ card, onSelect, isSelected }) {
  const [likes, setLikes] = useState(card.likes);
  const [dislikes, setDislikes] = useState(0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className={`min-w-[250px] cursor-pointer p-4 rounded-2xl border shadow-lg transition 
        ${isSelected ? "bg-gray-700 border-blue-400 scale-105" : "bg-gray-800 border-gray-700 hover:scale-105 hover:border-blue-400"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold truncate">{card.title}</h3>
        <div className="text-2xl">{techIcons[card.type]}</div>
      </div>

      {/* Likes / Dislikes */}
      <div className="flex justify-between items-center text-gray-400 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLikes(likes + 1);
          }}
          className="flex items-center gap-1 hover:text-green-400"
        >
          <AiOutlineLike class="text-green-400" /> {likes}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDislikes(dislikes + 1);
          }}
          className="flex items-center gap-1 hover:text-red-400"
        >
          <AiOutlineDislike  class="text-red-400"/> {dislikes}
        </button>
      </div>

      {/* Comments */}
      <CommentSection />
    </motion.div>
  );
}