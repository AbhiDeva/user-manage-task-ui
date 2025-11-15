import React, { useState, useEffect } from 'react';
//import { RotateCcw, Trophy, Clock, Zap, Undo, Redo, Heart, Star, Music, Camera, Gift, Smile, Sun, Moon, Cloud, Umbrella, Coffee, Pizza, Cake, Apple, Flame, Droplet, Wind, Snowflake, Leaf, Flower2, Bug, Fish, Feather, Rocket, Plane, Car, Bike, Train, Ship, Bell, Book, Briefcase, Database, Flag } from 'lucide-react';
import {
  MdRotateLeft,           // RotateCcw
  MdEmojiEvents,          // Trophy
  MdAccessTime,           // Clock
  MdFlashOn,              // Zap
  MdUndo,                 // Undo
  MdRedo,                 // Redo
  MdFavorite,             // Heart
  MdStar,                 // Star
  MdMusicNote,            // Music
  MdCameraAlt,            // Camera
  MdCardGiftcard,         // Gift
  MdTagFaces,             // Smile
  MdWbSunny,              // Sun
  MdDarkMode,             // Moon
  MdCloud,                // Cloud
  MdUmbrella,             // Umbrella
  MdCoffee,               // Coffee
  MdLocalPizza,           // Pizza
  MdCake,                 // Cake
 // MdApple,                // Apple
  MdLocalFireDepartment,  // Flame
  MdOpacity,              // Droplet
  MdAir,                  // Wind
  MdAcUnit,               // Snowflake
  MdEco,                  // Leaf
  MdLocalFlorist,         // Flower2
  MdBugReport,            // Bug
  MdSetMeal,              // Fish
  MdOutlineFilterVintage, // Feather
  MdRocketLaunch,         // Rocket
  MdFlightTakeoff,        // Plane
  MdDirectionsCar,        // Car
  MdDirectionsBike,       // Bike
  MdTrain,                // Train
  MdDirectionsBoat,       // Ship
  MdNotifications,        // Bell
  MdBook,                 // Book
  MdBusinessCenter,       // Briefcase
  MdStorage,              // Database
  MdFlag                  // Flag
} from "react-icons/md";

export const MemoryGame = ({onWin, playSound}) => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const iconComponents = [
  MdRotateLeft,           // RotateCcw
  MdEmojiEvents,          // Trophy
  MdAccessTime,           // Clock
  MdFlashOn,              // Zap
  MdUndo,                 // Undo
  MdRedo,                 // Redo
  MdFavorite,             // Heart
  MdStar,                 // Star
  MdMusicNote,            // Music
  MdCameraAlt,            // Camera
  MdCardGiftcard,         // Gift
  MdTagFaces,             // Smile
  MdWbSunny,              // Sun
  MdDarkMode,             // Moon
  MdCloud,                // Cloud
  MdUmbrella,             // Umbrella
  MdCoffee,               // Coffee
  MdLocalPizza,           // Pizza
  MdCake,                 // Cake
  MdLocalFireDepartment,  // Flame
  MdOpacity,              // Droplet
  MdAir,                  // Wind
  MdAcUnit,               // Snowflake
  MdEco,                  // Leaf
  MdLocalFlorist,         // Flower2
  MdBugReport,            // Bug
  MdSetMeal,              // Fish
  MdOutlineFilterVintage, // Feather
  MdRocketLaunch,         // Rocket
  MdFlightTakeoff,        // Plane
  MdDirectionsCar,        // Car
  MdDirectionsBike,       // Bike
  MdTrain,                // Train
  MdDirectionsBoat,       // Ship
  MdNotifications,        // Bell
  MdBook,                 // Book
  MdBusinessCenter,       // Briefcase
  MdStorage,              // Database
  MdFlag                  // Flag
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
      setIsRunning(false);
    }
  }, [matched, cards]);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairsNeeded = totalCards / 2;
    
    if (totalCards % 2 !== 0) {
      alert('Grid size must result in even number of cards!');
      return;
    }

    const selectedIcons = iconComponents.slice(0, pairsNeeded);
    const cardPairs = [...selectedIcons, ...selectedIcons];
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameStarted(false);
    setGameWon(false);
    setTime(0);
    setIsRunning(false);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const saveToHistory = (state) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    if (newHistory.length > 3) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    setHistory(newHistory);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevState = history[prevIndex];
      setMatched(prevState.matched);
      setMoves(prevState.moves);
      setFlipped([]);
      setHistoryIndex(prevIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextState = history[nextIndex];
      setMatched(nextState.matched);
      setMoves(nextState.moves);
      setFlipped([]);
      setHistoryIndex(nextIndex);
    }
  };

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    const totalCards = size * size;
    const pairsNeeded = totalCards / 2;
    
    if (totalCards % 2 !== 0) {
      alert('Grid size must result in even number of cards!');
      return;
    }

    const selectedIcons = iconComponents.slice(0, pairsNeeded);
    const cardPairs = [...selectedIcons, ...selectedIcons];
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameStarted(false);
    setGameWon(false);
    setTime(0);
    setIsRunning(false);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const handleCardClick = (index) => {
    if (!gameStarted) {
      setGameStarted(true);
      setIsRunning(true);
    }

    if (flipped.length === 2) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const newMoves = moves + 1;
      setMoves(newMoves);
      const [first, second] = newFlipped;
      
      if (cards[first] === cards[second]) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);
        
        saveToHistory({
          matched: newMatched,
          moves: newMoves
        });
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
        
        saveToHistory({
          matched: matched,
          moves: newMoves
        });
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCardSize = () => {
    if (gridSize <= 4) return 'w-20 h-20 md:w-24 md:h-24';
    if (gridSize <= 6) return 'w-16 h-16 md:w-20 md:h-20';
    if (gridSize <= 8) return 'w-14 h-14 md:w-16 md:h-16';
    if (gridSize <= 10) return 'w-12 h-12 md:w-14 md:h-14';
    if (gridSize <= 12) return 'w-10 h-10 md:w-12 md:h-12';
    return 'w-8 h-8 md:w-10 md:h-10';
  };

  const getIconSize = () => {
    if (gridSize <= 4) return 40;
    if (gridSize <= 6) return 32;
    if (gridSize <= 8) return 28;
    if (gridSize <= 10) return 24;
    if (gridSize <= 12) return 20;
    return 16;
  };

  const getGap = () => {
    if (gridSize <= 6) return '1rem';
    if (gridSize <= 10) return '0.75rem';
    return '0.5rem';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">🧠 Memory Game</h1>
          <p className="text-white text-lg opacity-90">Match all the pairs to win!</p>
        </div>

        {!gameStarted && !gameWon && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Select Grid Size</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[4, 6, 8, 10, 12, 14].map(size => {
                const totalCards = size * size;
                
                return (
                  <button
                    key={size}
                    onClick={() => handleGridSizeChange(size)}
                    className={`p-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                      gridSize === size
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size} × {size}
                    <div className="text-xs font-normal mt-1">
                      {totalCards} cards
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                setGameStarted(false);
                setGameWon(false);
              }}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Game
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mb-6">
          <div className="flex flex-wrap justify-around items-center gap-4">
            <div className="flex items-center space-x-3 bg-blue-100 px-4 md:px-6 py-3 rounded-xl">
              <MdFlashOn className="text-blue-600" size={24} />
              <div>
                <div className="text-xs text-blue-600 font-semibold">MOVES</div>
                <div className="text-xl md:text-2xl font-bold text-blue-800">{moves}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-green-100 px-4 md:px-6 py-3 rounded-xl">
              <MdAccessTime className="text-green-600" size={24} />
              <div>
                <div className="text-xs text-green-600 font-semibold">TIME</div>
                <div className="text-xl md:text-2xl font-bold text-green-800">{formatTime(time)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-purple-100 px-4 md:px-6 py-3 rounded-xl">
              <MdEmojiEvents className="text-purple-600" size={24} />
              <div>
                <div className="text-xs text-purple-600 font-semibold">MATCHED</div>
                <div className="text-xl md:text-2xl font-bold text-purple-800">{matched.length / 2} / {cards.length / 2}</div>
              </div>
            </div>

            <button
              onClick={initializeGame}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <MdRotateLeft size={20} />
              <span>Reset</span>
            </button>

            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 md:px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <MdUndo size={20} />
              <span>Undo</span>
            </button>

            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 md:px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <MdRedo size={20} />
              <span>Redo</span>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-6 text-center">
          <div className="text-blue-700 font-semibold text-sm">
            💡 You can undo/redo up to 3 moves! History: {historyIndex + 1} / {history.length}
          </div>
        </div>

        {gameWon && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl shadow-2xl p-8 mb-6 text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-white text-xl mb-4">You won the game!</p>
            <div className="flex justify-center space-x-8 text-white">
              <div>
                <div className="text-3xl font-bold">{moves}</div>
                <div className="text-sm">Moves</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{formatTime(time)}</div>
                <div className="text-sm">Time</div>
              </div>
            </div>
            <button
              onClick={() => {
                setGameStarted(false);
                setGameWon(false);
                initializeGame();
              }}
              className="mt-6 bg-white text-purple-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        )}

        <div 
          className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-2xl p-4 md:p-8"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gap: getGap(),
            justifyItems: 'center',
            alignItems: 'center'
          }}
        >
          {cards.map((IconComponent, index) => {
            const isFlipped = flipped.includes(index);
            const isMatched = matched.includes(index);
            const showCard = isFlipped || isMatched;

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`${getCardSize()} cursor-pointer transform transition-all duration-300 flex items-center justify-center`}
              >
                <div className="w-full h-full relative">
                  <div
                    className={`absolute inset-0 rounded-xl flex items-center justify-center font-bold transition-all duration-500 ${
                      isMatched
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg'
                        : showCard
                        ? 'bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {showCard ? (
                      <IconComponent 
                        className="text-white drop-shadow-lg" 
                        size={getIconSize()}
                      />
                    ) : (
                      <div className="text-white font-bold text-2xl">?</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!gameStarted && cards.length > 0 && (
          <div className="text-center mt-6 text-white text-lg font-semibold animate-pulse">
            👆 Click any card to start!
          </div>
        )}
      </div>
    </div>
  );
};
