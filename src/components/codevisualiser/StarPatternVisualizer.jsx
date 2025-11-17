import React, { useState, useEffect } from 'react';
import { MdPlayArrow, MdPause, MdRotateLeft, MdChevronRight, MdChevronLeft } from 'react-icons/md';

const StarPatternVisualizer = () => {
  const patterns = [
    {
      name: "Right Triangle",
      description: "Builds rows incrementally from 1 to n stars",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    print('*');
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= i; j++) {
            row += '*';
          }
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: Print ${i} star(s) (i=${i}, j loops from 1 to ${i})`
          });
        }
        return steps;
      }
    },
    {
      name: "Left Triangle",
      description: "Right-aligned triangle with spaces then stars",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n-i; j++) {
    print(' ');
  }
  for (let j = 1; j <= i; j++) {
    print('*');
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n - i; j++) {
            row += ' ';
          }
          for (let j = 1; j <= i; j++) {
            row += '*';
          }
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: ${n - i} space(s) + ${i} star(s)`
          });
        }
        return steps;
      }
    },
    {
      name: "Inverted Triangle",
      description: "Decreases stars from n to 1",
      code: `for (let i = n; i >= 1; i--) {
  for (let j = 1; j <= i; j++) {
    print('*');
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = n; i >= 1; i--) {
          let row = '';
          for (let j = 1; j <= i; j++) {
            row += '*';
          }
          steps.push({
            row: n - i + 1,
            pattern: row,
            explanation: `Row ${n - i + 1}: Print ${i} star(s) (i=${i}, j loops from 1 to ${i})`
          });
        }
        return steps;
      }
    },
    {
      name: "Pyramid",
      description: "Centered triangle with spaces and stars",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n-i; j++) {
    print(' ');
  }
  for (let j = 1; j <= 2*i-1; j++) {
    print('*');
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n - i; j++) {
            row += ' ';
          }
          for (let j = 1; j <= 2 * i - 1; j++) {
            row += '*';
          }
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: ${n - i} space(s) + ${2 * i - 1} star(s) (spaces: n-i=${n}-${i}, stars: 2*i-1=${2 * i - 1})`
          });
        }
        return steps;
      }
    },
    {
      name: "Diamond",
      description: "Pyramid + inverted pyramid combined",
      code: `// Upper pyramid
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= 2*i-1; j++) print('*');
  print('\\n');
}
// Lower pyramid
for (let i = n-1; i >= 1; i--) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= 2*i-1; j++) print('*');
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        // Upper
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n - i; j++) row += ' ';
          for (let j = 1; j <= 2 * i - 1; j++) row += '*';
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i} (Upper): ${n - i} space(s) + ${2 * i - 1} star(s)`
          });
        }
        // Lower
        for (let i = n - 1; i >= 1; i--) {
          let row = '';
          for (let j = 1; j <= n - i; j++) row += ' ';
          for (let j = 1; j <= 2 * i - 1; j++) row += '*';
          steps.push({
            row: 2 * n - i,
            pattern: row,
            explanation: `Row ${2 * n - i} (Lower): ${n - i} space(s) + ${2 * i - 1} star(s)`
          });
        }
        return steps;
      }
    },
    {
      name: "Hollow Square",
      description: "Square with stars only on borders",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === 1 || i === n || 
        j === 1 || j === n) {
      print('*');
    } else {
      print(' ');
    }
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n; j++) {
            if (i === 1 || i === n || j === 1 || j === n) {
              row += '*';
            } else {
              row += ' ';
            }
          }
          const type = i === 1 ? 'top border' : i === n ? 'bottom border' : 'middle row (borders only)';
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: ${type}`
          });
        }
        return steps;
      }
    },
    {
      name: "Hourglass",
      description: "Inverted pyramid + pyramid",
      code: `// Upper inverted
for (let i = n; i >= 1; i--) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= 2*i-1; j++) print('*');
  print('\\n');
}
// Lower pyramid
for (let i = 2; i <= n; i++) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= 2*i-1; j++) print('*');
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        // Upper
        for (let i = n; i >= 1; i--) {
          let row = '';
          for (let j = 1; j <= n - i; j++) row += ' ';
          for (let j = 1; j <= 2 * i - 1; j++) row += '*';
          steps.push({
            row: n - i + 1,
            pattern: row,
            explanation: `Row ${n - i + 1} (Upper): ${n - i} space(s) + ${2 * i - 1} star(s)`
          });
        }
        // Lower
        for (let i = 2; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n - i; j++) row += ' ';
          for (let j = 1; j <= 2 * i - 1; j++) row += '*';
          steps.push({
            row: n + i - 1,
            pattern: row,
            explanation: `Row ${n + i - 1} (Lower): ${n - i} space(s) + ${2 * i - 1} star(s)`
          });
        }
        return steps;
      }
    },
    {
      name: "Hollow Pyramid",
      description: "Pyramid with only border stars",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= 2*i-1; j++) {
    if (j === 1 || j === 2*i-1 || i === n) {
      print('*');
    } else {
      print(' ');
    }
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n - i; j++) {
            row += ' ';
          }
          for (let j = 1; j <= 2 * i - 1; j++) {
            if (j === 1 || j === 2 * i - 1 || i === n) {
              row += '*';
            } else {
              row += ' ';
            }
          }
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: ${n - i} space(s) + stars at edges ${i === n ? '(bottom filled)' : '(hollow)'}`
          });
        }
        return steps;
      }
    },
    {
      name: "Pascal's Triangle",
      description: "Numbers in triangular pattern showing combinations",
      code: `for (let i = 0; i < n; i++) {
  let num = 1;
  for (let j = 0; j <= n-i; j++) print(' ');
  for (let j = 0; j <= i; j++) {
    print(num + ' ');
    num = num * (i - j) / (j + 1);
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 0; i < n; i++) {
          let row = '';
          let num = 1;
          for (let j = 0; j <= n - i; j++) {
            row += ' ';
          }
          for (let j = 0; j <= i; j++) {
            row += num + ' ';
            num = Math.floor(num * (i - j) / (j + 1));
          }
          steps.push({
            row: i + 1,
            pattern: row,
            explanation: `Row ${i + 1}: Pascal's triangle row ${i} (each number is sum of two above)`
          });
        }
        return steps;
      }
    },
    {
      name: "Butterfly",
      description: "Two triangles forming butterfly wings",
      code: `// Upper part
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) print('*');
  for (let j = 1; j <= 2*(n-i); j++) print(' ');
  for (let j = 1; j <= i; j++) print('*');
  print('\\n');
}
// Lower part
for (let i = n; i >= 1; i--) {
  for (let j = 1; j <= i; j++) print('*');
  for (let j = 1; j <= 2*(n-i); j++) print(' ');
  for (let j = 1; j <= i; j++) print('*');
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        // Upper
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= i; j++) row += '*';
          for (let j = 1; j <= 2 * (n - i); j++) row += ' ';
          for (let j = 1; j <= i; j++) row += '*';
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i} (Upper): ${i} stars + ${2 * (n - i)} spaces + ${i} stars`
          });
        }
        // Lower
        for (let i = n; i >= 1; i--) {
          let row = '';
          for (let j = 1; j <= i; j++) row += '*';
          for (let j = 1; j <= 2 * (n - i); j++) row += ' ';
          for (let j = 1; j <= i; j++) row += '*';
          steps.push({
            row: 2 * n - i + 1,
            pattern: row,
            explanation: `Row ${2 * n - i + 1} (Lower): ${i} stars + ${2 * (n - i)} spaces + ${i} stars`
          });
        }
        return steps;
      }
    },
    {
      name: "Number Pyramid",
      description: "Pyramid with incrementing numbers",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= i; j++) print(j);
  for (let j = i-1; j >= 1; j--) print(j);
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n - i; j++) row += ' ';
          for (let j = 1; j <= i; j++) row += j;
          for (let j = i - 1; j >= 1; j--) row += j;
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: Numbers 1 to ${i} then ${i - 1} to 1 (palindrome)`
          });
        }
        return steps;
      }
    },
    {
      name: "Zigzag Pattern",
      description: "Stars in a wave/zigzag pattern",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if ((i + j) % 4 === 0 || 
        (i === 2 && j % 4 === 0)) {
      print('*');
    } else {
      print(' ');
    }
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n; j++) {
            if ((i + j) % 4 === 0 || (i === 2 && j % 4 === 0)) {
              row += '*';
            } else {
              row += ' ';
            }
          }
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: Stars where (i+j) divisible by 4 creates wave effect`
          });
        }
        return steps;
      }
    },
    {
      name: "Cross/X Pattern",
      description: "Diagonal cross pattern",
      code: `for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === j || i + j === n + 1) {
      print('*');
    } else {
      print(' ');
    }
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n; j++) {
            if (i === j || i + j === n + 1) {
              row += '*';
            } else {
              row += ' ';
            }
          }
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i}: Stars on main diagonal (i=j) and anti-diagonal (i+j=${n + 1})`
          });
        }
        return steps;
      }
    },
    {
      name: "Hollow Diamond",
      description: "Diamond with only border stars",
      code: `// Upper pyramid
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= 2*i-1; j++) {
    if (j === 1 || j === 2*i-1) print('*');
    else print(' ');
  }
  print('\\n');
}
// Lower pyramid
for (let i = n-1; i >= 1; i--) {
  for (let j = 1; j <= n-i; j++) print(' ');
  for (let j = 1; j <= 2*i-1; j++) {
    if (j === 1 || j === 2*i-1) print('*');
    else print(' ');
  }
  print('\\n');
}`,
      generate: (n) => {
        const steps = [];
        // Upper
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n - i; j++) row += ' ';
          for (let j = 1; j <= 2 * i - 1; j++) {
            if (j === 1 || j === 2 * i - 1) row += '*';
            else row += ' ';
          }
          steps.push({
            row: i,
            pattern: row,
            explanation: `Row ${i} (Upper): Stars only at edges (hollow)`
          });
        }
        // Lower
        for (let i = n - 1; i >= 1; i--) {
          let row = '';
          for (let j = 1; j <= n - i; j++) row += ' ';
          for (let j = 1; j <= 2 * i - 1; j++) {
            if (j === 1 || j === 2 * i - 1) row += '*';
            else row += ' ';
          }
          steps.push({
            row: 2 * n - i,
            pattern: row,
            explanation: `Row ${2 * n - i} (Lower): Stars only at edges (hollow)`
          });
        }
        return steps;
      }
    }
  ];

  const [selectedPattern, setSelectedPattern] = useState(0);
  const [size, setSize] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const pattern = patterns[selectedPattern];
    const generatedSteps = pattern.generate(size);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedPattern, size]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const handlePlayPause = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
           Star Pattern Visualizer
        </h1>
        <p className="text-purple-200 text-center mb-8">
          Learn how star patterns work step-by-step
        </p>

        {/* Pattern Selection */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
          <label className="text-white font-semibold block mb-3">Select Pattern:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {patterns.map((pattern, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPattern(idx)}
                className={`p-3 rounded-lg font-medium transition-all text-sm ${
                  selectedPattern === idx
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {pattern.name}
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-black/30 rounded-lg">
            <p className="text-purple-200 text-sm">{patterns[selectedPattern].description}</p>
          </div>
        </div>

        {/* Size Control */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
          <label className="text-white font-semibold block mb-3">
            Pattern Size: <span className="text-purple-300">{size}</span>
          </label>
          <input
            type="range"
            min="3"
            max="8"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Visualization Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Step-by-Step Display</h2>
            
            {/* Controls */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdChevronLeft size={24} />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 px-4"
              >
                {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
              </button>
              <button
                onClick={handleReset}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <MdRotateLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdChevronRight size={24} />
              </button>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-purple-200 mb-2">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Pattern Display */}
            <div className="bg-black/40 rounded-lg p-6 font-mono text-2xl text-yellow-300 min-h-[300px] flex flex-col justify-center">
              {steps.slice(0, currentStep + 1).map((step, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre transition-all duration-300 ${
                    idx === currentStep ? 'text-yellow-300 font-bold' : 'text-yellow-500/60'
                  }`}
                >
                  {step.pattern}
                </div>
              ))}
            </div>

            {/* Current Step Explanation */}
            {steps[currentStep] && (
              <div className="mt-4 p-4 bg-purple-500/20 border border-purple-400/30 rounded-lg">
                <p className="text-purple-100 text-sm font-medium">
                  {steps[currentStep].explanation}
                </p>
              </div>
            )}
          </div>

          {/* Code Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Code Logic</h2>
            
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
              <pre className="whitespace-pre">{patterns[selectedPattern].code}</pre>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <h3 className="font-bold text-blue-200 mb-2"> Key Concepts:</h3>
                <ul className="text-blue-100 text-sm space-y-1 list-disc list-inside">
                  <li>Outer loop: Controls rows (i)</li>
                  <li>Inner loop(s): Controls columns (j)</li>
                  <li>Conditions: Determine star placement</li>
                </ul>
              </div>

              <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                <h3 className="font-bold text-green-200 mb-2"> Pattern Formula:</h3>
                <p className="text-green-100 text-sm">
                  {selectedPattern === 0 && "Stars in row i = i"}
                  {selectedPattern === 1 && "Spaces = n - i, Stars = i"}
                  {selectedPattern === 2 && "Stars in row i = n - i + 1"}
                  {selectedPattern === 3 && "Spaces = n - i, Stars = 2*i - 1"}
                  {selectedPattern === 4 && "Upper + Lower pyramid combined"}
                  {selectedPattern === 5 && "Stars only when i or j is 1 or n"}
                  {selectedPattern === 6 && "Inverted pyramid + pyramid"}
                  {selectedPattern === 7 && "Hollow: stars only at j=1, j=end, or i=n"}
                  {selectedPattern === 8 && "Pascal: num = num * (i-j) / (j+1)"}
                  {selectedPattern === 9 && "Left + Right triangles with center gap"}
                  {selectedPattern === 10 && "Numbers: 1 to i, then i-1 to 1"}
                  {selectedPattern === 11 && "Stars when (i+j) % 4 === 0"}
                  {selectedPattern === 12 && "Stars when i=j or i+j=n+1"}
                  {selectedPattern === 13 && "Hollow diamond: stars at edges only"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarPatternVisualizer;