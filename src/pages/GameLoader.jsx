// Loader that maps id to actual game component (keeps file small) -- add more implementations below
import React from "react";
import { TicTacToe } from "../components/games/gamelist/TicTacToe";
import { ScissorSnap } from "../components/games/gamelist/ScissorSnap";
import { MemoryFlip } from "../components/games/gamelist/MemoryFlip";
import { MemoryGame } from "../components/games/gamelist/MemoryGame";


export const GameLoader = ({ id, onWin, playSound, theme }) => {
  switch (id) {
    case "tic-tac":
      return <TicTacToe onWin={onWin} playSound={playSound} theme={theme} />;
    case "scissor":
      return <ScissorSnap onWin={onWin} playSound={playSound} theme={theme} />;
    case "memory":
      return <MemoryFlip onWin={onWin} playSound={playSound} theme={theme} />;
    case "memorygame":
      return <MemoryGame onWin={onWin} playSound={playSound} theme={theme} />;
    // placeholders for future full games
    default:
      return (
        <div className="p-8 bg-white rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2">{id} (coming soon)</h2>
          <p className="text-slate-500">Full implementation will be added.</p>
        </div>
      );
  }
}