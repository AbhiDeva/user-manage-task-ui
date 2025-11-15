import React from "react";
import { motion } from "framer-motion";
import { MdSportsEsports, MdStars, MdReplay } from "react-icons/md";
import { DEFAULT_SOUNDS } from "../utils/sounds";

export const GameDashboard = ({ openGame, playSound, scores, theme }) => {
  const games = [
    { id: "tic-tac", title: "Tic-Tac-Toe", desc: "Classic 3×3", icon: <MdSportsEsports size={44} /> },
    { id: "scissor", title: "Scissor-Snap", desc: "Two-hand RPS", icon: <MdStars size={44} /> },
    { id: "memory", title: "Memory Flip", desc: "Match the pairs", icon: <MdReplay size={44} /> },
    { id: "memorygame", title: "Memory Game", desc: "Advanced pairs", icon: <MdReplay size={44} /> },
    { id: "snake", title: "Snake", desc: "Grow & survive", icon: <MdSportsEsports size={44} /> },
    { id: "flappy", title: "Flappy", desc: "Tap to fly", icon: <MdSportsEsports size={44} /> },
    { id: "2048", title: "2048", desc: "Combine tiles", icon: <MdStars size={44} /> },
    { id: "chess", title: "Chess", desc: "Strategy game", icon: <MdStars size={44} /> },
    { id: "carrom", title: "Carrom", desc: "Strike & pocket", icon: <MdStars size={44} /> },
    { id: "ludo", title: "Ludo", desc: "Board classic", icon: <MdStars size={44} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {games.map((g) => (
        <motion.div
          key={g.id}
          onClick={() => {
            playSound();
            alert(g.id);
            openGame(g.id);
          }}
          whileHover={{ scale: 1.03 }}
          className="p-5 bg-white rounded-2xl shadow cursor-pointer border hover:shadow-lg"
        >
          <div className="flex items-center justify-center mb-4 text-indigo-600">{g.icon}</div>
          <h3 className="text-lg font-semibold">{g.title}</h3>
          <p className="text-sm text-slate-500 mb-3">{g.desc}</p>
          <div className="flex items-center justify-between">
            <button className="px-3 py-1 bg-indigo-50 rounded text-indigo-700 text-sm">Play</button>
            <div className="text-xs text-slate-400">High: {scores[g.id] || 0}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}