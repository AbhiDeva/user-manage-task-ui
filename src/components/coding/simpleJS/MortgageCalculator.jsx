// // // // import React, { useState, useCallback } from 'react';
// // // // //
// // // // import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';

// // // // export default function MortgageCalculatorVisualizer() {
// // // //   const [loanAmount, setLoanAmount] = useState('');
// // // //   const [interestRate, setInterestRate] = useState('');
// // // //   const [loanTerm, setLoanTerm] = useState('');
// // // //   const [error, setError] = useState('');
// // // //   const [results, setResults] = useState({ monthly: 0, total: 0, interest: 0 });

// // // //   const calculate = useCallback(() => {
// // // //     const P = parseFloat(loanAmount);
// // // //     const annualRate = parseFloat(interestRate);
// // // //     const years = parseFloat(loanTerm);

// // // //     if (isNaN(P) || isNaN(annualRate) || isNaN(years)) {
// // // //       setError('Please enter valid numerical values for all fields.');
// // // //       setResults({ monthly: 0, total: 0, interest: 0 });
// // // //       return;
// // // //     }

// // // //     setError('');
// // // //     const i = annualRate / 100 / 12;
// // // //     const n = years * 12;
// // // //     const M = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
// // // //     const totalPayment = M * n;
// // // //     const totalInterest = totalPayment - P;

// // // //     setResults({ monthly: M.toFixed(2), total: totalPayment.toFixed(2), interest: totalInterest.toFixed(2) });
// // // //   }, [loanAmount, interestRate, loanTerm]);

// // // //   const sandpackFiles = {
// // // //     "/App.js": `import React from 'react';\nimport MortgageCalculatorVisualizer from './MortgageCalculatorVisualizer';\nexport default function App() { return <MortgageCalculatorVisualizer />; }`
// // // //   };

// // // //   return (
// // // //     <SandpackProvider template="react" files={sandpackFiles} options={{ showNavigator: true, showConsole: true }}>
// // // //       <SandpackLayout>
// // // //         <div style={{ width: '30%', padding: '1rem', borderRight: '1px solid #ccc' }}>
// // // //           <h2 className="text-xl font-bold mb-2">Mortgage Calculator Inputs</h2>
// // // //           <div className="mb-2">
// // // //             <label>Loan Amount ($)</label>
// // // //             <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full p-1 border rounded" />
// // // //           </div>
// // // //           <div className="mb-2">
// // // //             <label>Annual Interest Rate (%)</label>
// // // //             <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full p-1 border rounded" />
// // // //           </div>
// // // //           <div className="mb-2">
// // // //             <label>Loan Term (years)</label>
// // // //             <input type="text" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full p-1 border rounded" />
// // // //           </div>
// // // //           <button onClick={calculate} className="mt-2 px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700">Calculate</button>
// // // //           {error && <div className="text-red-600 mt-2">{error}</div>}
// // // //         </div>

// // // //         <div style={{ width: '40%', padding: '1rem', borderRight: '1px solid #ccc' }}>
// // // //           <h2 className="text-xl font-bold mb-2">Results</h2>
// // // //           <div>Monthly Payment: <strong>${results.monthly}</strong></div>
// // // //           <div>Total Payment: <strong>${results.total}</strong></div>
// // // //           <div>Total Interest: <strong>${results.interest}</strong></div>
// // // //         </div>

// // // //         <div style={{ width: '30%', padding: '1rem' }}>
// // // //           <SandpackFileExplorer />
// // // //           <SandpackCodeEditor />
// // // //           <SandpackPreview />
// // // //         </div>
// // // //       </SandpackLayout>
// // // //     </SandpackProvider>
// // // //   );
// // // // }

// // // import React, { useState, useCallback } from 'react';
// // // //import { Button } from '@headlessui/react';
// // // import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';
// // // import MonacoEditor from '@monaco-editor/react';

// // // export default function MortgageCalculatorVisualizer() {
// // //   const [loanAmount, setLoanAmount] = useState('');
// // //   const [interestRate, setInterestRate] = useState('');
// // //   const [loanTerm, setLoanTerm] = useState('');
// // //   const [error, setError] = useState('');
// // //   const [results, setResults] = useState({ monthly: 0, total: 0, interest: 0 });

// // //   const calculate = useCallback(() => {
// // //     const P = parseFloat(loanAmount);
// // //     const annualRate = parseFloat(interestRate);
// // //     const years = parseFloat(loanTerm);

// // //     if (isNaN(P) || isNaN(annualRate) || isNaN(years)) {
// // //       setError('Please enter valid numerical values for all fields.');
// // //       setResults({ monthly: 0, total: 0, interest: 0 });
// // //       return;
// // //     }

// // //     setError('');
// // //     const i = annualRate / 100 / 12;
// // //     const n = years * 12;
// // //     const M = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
// // //     const totalPayment = M * n;
// // //     const totalInterest = totalPayment - P;

// // //     setResults({ monthly: M.toFixed(2), total: totalPayment.toFixed(2), interest: totalInterest.toFixed(2) });
// // //   }, [loanAmount, interestRate, loanTerm]);

// // //   return (
// // //     <div className="h-screen w-full flex">
// // //       <div style={{ width: '30%', padding: '1rem', borderRight: '1px solid #ccc' }}>
// // //         <h2 className="text-xl font-bold mb-2">Mortgage Calculator Inputs</h2>
// // //         <div className="mb-2">
// // //           <label>Loan Amount ($)</label>
// // //           <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full p-1 border rounded" />
// // //         </div>
// // //         <div className="mb-2">
// // //           <label>Annual Interest Rate (%)</label>
// // //           <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full p-1 border rounded" />
// // //         </div>
// // //         <div className="mb-2">
// // //           <label>Loan Term (years)</label>
// // //           <input type="text" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full p-1 border rounded" />
// // //         </div>
// // //         <button onClick={calculate} className="mt-2 px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700">Calculate</button>
// // //         {error && <div className="text-red-600 mt-2">{error}</div>}
// // //       </div>

// // //       <div style={{ width: '40%', padding: '1rem', borderRight: '1px solid #ccc' }}>
// // //         <h2 className="text-xl font-bold mb-2">Results</h2>
// // //         <div>Monthly Payment: <strong>${results.monthly}</strong></div>
// // //         <div>Total Payment: <strong>${results.total}</strong></div>
// // //         <div>Total Interest: <strong>${results.interest}</strong></div>
// // //       </div>

// // //       <div style={{ width: '30%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
// // //         <MonacoEditor
// // //           height="200px"
// // //           defaultLanguage="javascript"
// // //           defaultValue={`// You can edit the calculator logic here\nconst example = 'Hello, Monaco!';`}
// // //           options={{ minimap: { enabled: false }, fontSize: 13 }}
// // //         />
// // //         <SandpackFileExplorer />
// // //         <SandpackCodeEditor />
// // //         <SandpackPreview />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useCallback } from 'react';
// // //import { Button } from '@headlessui/react';
// // import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';
// // import dynamic from 'next/dynamic';

// // // Dynamically import MonacoEditor to avoid SSR issues
// // const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// // export default function MortgageCalculatorVisualizer() {
// //   const [loanAmount, setLoanAmount] = useState('');
// //   const [interestRate, setInterestRate] = useState('');
// //   const [loanTerm, setLoanTerm] = useState('');
// //   const [error, setError] = useState('');
// //   const [results, setResults] = useState({ monthly: 0, total: 0, interest: 0 });

// //   const calculate = useCallback(() => {
// //     const P = parseFloat(loanAmount);
// //     const annualRate = parseFloat(interestRate);
// //     const years = parseFloat(loanTerm);

// //     if (isNaN(P) || isNaN(annualRate) || isNaN(years)) {
// //       setError('Please enter valid numerical values for all fields.');
// //       setResults({ monthly: 0, total: 0, interest: 0 });
// //       return;
// //     }

// //     setError('');
// //     const i = annualRate / 100 / 12;
// //     const n = years * 12;
// //     const M = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
// //     const totalPayment = M * n;
// //     const totalInterest = totalPayment - P;

// //     setResults({ monthly: M.toFixed(2), total: totalPayment.toFixed(2), interest: totalInterest.toFixed(2) });
// //   }, [loanAmount, interestRate, loanTerm]);

// //   return (
// //     <div className="h-screen w-full flex">
// //       <div style={{ width: '30%', padding: '1rem', borderRight: '1px solid #ccc' }}>
// //         <h2 className="text-xl font-bold mb-2">Mortgage Calculator Inputs</h2>
// //         <div className="mb-2">
// //           <label>Loan Amount ($)</label>
// //           <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full p-1 border rounded" />
// //         </div>
// //         <div className="mb-2">
// //           <label>Annual Interest Rate (%)</label>
// //           <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full p-1 border rounded" />
// //         </div>
// //         <div className="mb-2">
// //           <label>Loan Term (years)</label>
// //           <input type="text" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full p-1 border rounded" />
// //         </div>
// //         <button onClick={calculate} className="mt-2 px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700">Calculate</button>
// //         {error && <div className="text-red-600 mt-2">{error}</div>}
// //       </div>

// //       <div style={{ width: '40%', padding: '1rem', borderRight: '1px solid #ccc' }}>
// //         <h2 className="text-xl font-bold mb-2">Results</h2>
// //         <div>Monthly Payment: <strong>${results.monthly}</strong></div>
// //         <div>Total Payment: <strong>${results.total}</strong></div>
// //         <div>Total Interest: <strong>${results.interest}</strong></div>
// //       </div>

// //       <div style={{ width: '30%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
// //         <MonacoEditor
// //           height="200px"
// //           defaultLanguage="javascript"
// //           defaultValue={`// You can edit the calculator logic here\nconst example = 'Hello, Monaco!';`}
// //           options={{ minimap: { enabled: false }, fontSize: 13 }}
// //         />
// //         <SandpackFileExplorer />
// //         <SandpackCodeEditor />
// //         <SandpackPreview />
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState, useCallback } from 'react';
// //import { Button } from '@headlessui/react';
// import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';
// import MonacoEditor from '@monaco-editor/react'; // Direct import instead of next/dynamic

// export default function MortgageCalculatorVisualizer() {
//   const [loanAmount, setLoanAmount] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [loanTerm, setLoanTerm] = useState('');
//   const [error, setError] = useState('');
//   const [results, setResults] = useState({ monthly: 0, total: 0, interest: 0 });

//   const calculate = useCallback(() => {
//     const P = parseFloat(loanAmount);
//     const annualRate = parseFloat(interestRate);
//     const years = parseFloat(loanTerm);

//     if (isNaN(P) || isNaN(annualRate) || isNaN(years)) {
//       setError('Please enter valid numerical values for all fields.');
//       setResults({ monthly: 0, total: 0, interest: 0 });
//       return;
//     }

//     setError('');
//     const i = annualRate / 100 / 12;
//     const n = years * 12;
//     const M = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
//     const totalPayment = M * n;
//     const totalInterest = totalPayment - P;

//     setResults({ monthly: M.toFixed(2), total: totalPayment.toFixed(2), interest: totalInterest.toFixed(2) });
//   }, [loanAmount, interestRate, loanTerm]);

//   return (
//     <div className="h-screen w-full flex">
//       <div style={{ width: '30%', padding: '1rem', borderRight: '1px solid #ccc' }}>
//         <h2 className="text-xl font-bold mb-2">Mortgage Calculator Inputs</h2>
//         <div className="mb-2">
//           <label>Loan Amount ($)</label>
//           <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full p-1 border rounded" />
//         </div>
//         <div className="mb-2">
//           <label>Annual Interest Rate (%)</label>
//           <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full p-1 border rounded" />
//         </div>
//         <div className="mb-2">
//           <label>Loan Term (years)</label>
//           <input type="text" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full p-1 border rounded" />
//         </div>
//         <button onClick={calculate} className="mt-2 px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700">Calculate</button>
//         {error && <div className="text-red-600 mt-2">{error}</div>}
//       </div>

//       <div style={{ width: '40%', padding: '1rem', borderRight: '1px solid #ccc' }}>
//         <h2 className="text-xl font-bold mb-2">Results</h2>
//         <div>Monthly Payment: <strong>${results.monthly}</strong></div>
//         <div>Total Payment: <strong>${results.total}</strong></div>
//         <div>Total Interest: <strong>${results.interest}</strong></div>
//       </div>

//       <div style={{ width: '30%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//         <MonacoEditor
//           height="200px"
//           defaultLanguage="javascript"
//           defaultValue={`// You can edit the calculator logic here\nconst example = 'Hello, Monaco!';`}
//           options={{ minimap: { enabled: false }, fontSize: 13 }}
//         />
//         <SandpackFileExplorer />
//         <SandpackCodeEditor />
//         <SandpackPreview />
//       </div>
//     </div>
//   );
// }
