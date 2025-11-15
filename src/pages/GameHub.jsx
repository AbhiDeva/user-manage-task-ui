import { GameDashboard } from "./GameDashboard";
import { GameLoader } from "./GameLoader";
import React, { useEffect, useState } from "react";
import { MdArrowBack, MdPalette, MdVolumeUp } from "react-icons/md";
// Game Hub with themes, sounds, high-score persistence, mobile-friendly controls
const THEME_KEY = "gamehub_theme";
const SCORES_KEY = "gamehub_scores";
import { DEFAULT_SOUNDS } from "../utils/sounds";

export default function GameHub() {
  const [active, setActive] = useState(null);
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) || "light" : "light"));
  const [muted, setMuted] = useState(false);
  const [scores, setScores] = useState(() => {
    try {
      if (typeof window === 'undefined') return {};
      return JSON.parse(localStorage.getItem(SCORES_KEY) || "{}");
    } catch (e) { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  }, [scores]);

  function play(src) {
    if (muted) return;
    try {
      const a = new Audio(src);
      a.volume = 0.5;
      a.play().catch(() => {});
    } catch (e) {}
  }

  function updateScore(gameId, delta = 1) {
    setScores((s) => ({ ...s, [gameId]: Math.max(0, (s[gameId] || 0) + delta) }));
  }

  const themeClasses = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-slate-900";

  return (
    <div className={`${themeClasses} min-h-screen p-6 transition-colors`}> 
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Game Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              title="Toggle theme"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className="px-3 py-1 border rounded"
            >
              <MdPalette className="inline" /> Theme
            </button>
            <button
              title="Toggle sound"
              onClick={() => setMuted((m) => !m)}
              className="px-3 py-1 border rounded"
            >
              <MdVolumeUp className="inline" /> {muted ? "Muted" : "Sound"}
            </button>
            <div className="text-sm px-3 py-1 border rounded">High-scores: {Object.keys(scores).length}</div>
          </div>
        </header>

        {!active && (
          <GameDashboard
            openGame={(id) => setActive(id)}
            playSound={() => play(DEFAULT_SOUNDS.click)}
            scores={scores}
            theme={theme}
          />
        )}

        {active && (
          <div className="relative">
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 px-3 py-2 rounded bg-white shadow"
            >
              <MdArrowBack /> Back
            </button>

            <GameLoader
              id={active}
              onWin={() => { updateScore(active, 1); play(DEFAULT_SOUNDS.win); }}
              playSound={play}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
}