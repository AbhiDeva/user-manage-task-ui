import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DEFAULT_SOUNDS } from "../../../utils/sounds";

export const TicTacToe = ({ onWin, playSound, theme }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [message, setMessage] = useState("X starts");
  useEffect(() => { setMessage(`Turn: ${turn}`); }, [turn]);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  function checkWinner(b) {
    for (const [a,b1,c] of winPatterns) if (b[a] && b[a] === b[b1] && b[b1] === b[c]) return b[a];
    return null;
  }

  function play(i) {
    if (board[i] || checkWinner(board)) return;
    const nb = [...board]; nb[i] = turn; setBoard(nb); playSound && playSound(DEFAULT_SOUNDS?.click);
    const w = checkWinner(nb);
    if (w) { setMessage(`${w} wins!`); onWin && onWin(); playSound && playSound(DEFAULT_SOUNDS?.win); return; }
    setTurn(turn === "X" ? "O" : "X");
  }

  function reset() { setBoard(Array(9).fill(null)); setTurn("X"); setMessage("X starts"); }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-2">Tic-Tac-Toe</h3>
      <div className="text-sm text-slate-500 mb-3">{message}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((c,i)=> (
          <motion.button key={i} onClick={()=>play(i)} whileTap={{ scale:0.9 }} className="w-20 h-20 bg-gray-100 rounded-xl text-2xl font-bold">{c}</motion.button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={reset} className="flex-1 py-2 rounded bg-indigo-600 text-white">Reset</button>
        <button onClick={()=>{ setBoard(Array(9).fill(null)); playSound && playSound(DEFAULT_SOUNDS?.click); }} className="py-2 px-3 rounded bg-gray-100">Clear</button>
      </div>
    </div>
  );
}