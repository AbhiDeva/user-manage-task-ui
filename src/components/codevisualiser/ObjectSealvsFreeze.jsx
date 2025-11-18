import React, { useState } from "react";
import {
    FaPlay,
    FaBolt,
    FaLock,
    FaUnlock,
    FaTrashAlt,
    FaPlusCircle,
    FaSyncAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ObjectVisualizer() {
    // Frozen Object (fully immutable)
    const [frozenObj] = useState(() => Object.freeze({ title: "Book", price: 299, category: "Fiction" }));
    const [frozenLogs, setFrozenLogs] = useState([]);

    // Sealed Object (cannot add/remove, but can update)
    const [sealedObj, setSealedObj] = useState(() => Object.seal({ brand: "Nike", size: "L" }));
    const [sealLogs, setSealLogs] = useState([]);

    // Handlers ------------------------------------------------------
    const updateFrozen = () => {
        try {
            frozenObj.price = 500;
            setFrozenLogs(l => [...l, { id: Date.now(), text: "Blocked: Cannot update Frozen Object", color: "red" }]);
        } catch {
            setFrozenLogs(l => [...l, { id: Date.now(), text: "Exception: Frozen object cannot be modified", color: "red" }]);
        }
    };

    const updateSealed = () => {
        sealedObj.size = "XL";
        setSealedObj({ ...sealedObj });
        setSealLogs(l => [...l, { id: Date.now(), text: "Updated: size → XL", color: "blue" }]);
    };

    const addToSealed = () => {
        try {
            sealedObj.color = "red";
            setSealLogs(l => [...l, { id: Date.now(), text: "Blocked: Cannot add new key to Sealed Object", color: "orange" }]);
        } catch {
            setSealLogs(l => [...l, { id: Date.now(), text: "Error: Sealed object cannot extend", color: "orange" }]);
        }
    };

    const resetAll = () => {
        window.location.reload();
    };

    // Log Item ------------------------------------------------------
    const LogItem = ({ item }) => (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`text-xs p-2 rounded border border-white/10 bg-white/5`} style={{ color: item.color }}>
            {item.text}
        </motion.div>
    );

    // UI ------------------------------------------------------------
    return (
        <div className="w-full min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black text-white flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Object.freeze & Object.seal — Visualizer</h1>
                {/* // <button onClick={resetAll} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 flex items-center gap-2"><FaRefreshCw /> Reset</button>
       */}
                <button onClick={resetAll} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 flex items-center gap-2"><FaSyncAlt /> Reset</button>

            </div>

            {/* Panels Row */}
            <div className="grid grid-cols-2 gap-5">
                {/* Freeze Panel ------------------------------------------------ */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col gap-4">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-blue-300"><FaLock /> Frozen Object</h2>
                    <div className="text-xs whitespace-pre bg-black/40 p-3 rounded border border-white/10">{JSON.stringify(frozenObj, null, 2)}</div>

                    <button onClick={updateFrozen} className="px-3 py-2 rounded bg-blue-600/40 hover:bg-blue-600/60 flex items-center gap-2 text-sm"><FaBolt /> Try Update</button>

                    <div className="flex flex-col gap-2 mt-3">
                        <div className="text-xs font-semibold">Logs</div>
                        <div className="space-y-2 max-h-40 overflow-auto">
                            <AnimatePresence>
                                {frozenLogs.map(i => <LogItem key={i.id} item={i} />)}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Seal Panel -------------------------------------------------- */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col gap-4">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-yellow-300"><FaUnlock /> Sealed Object</h2>
                    <div className="text-xs whitespace-pre bg-black/40 p-3 rounded border border-white/10">{JSON.stringify(sealedObj, null, 2)}</div>

                    <button onClick={updateSealed} className="px-3 py-2 rounded bg-yellow-600/40 hover:bg-yellow-600/60 flex items-center gap-2 text-sm"><FaBolt /> Update Key</button>

                    <button onClick={addToSealed} className="px-3 py-2 rounded bg-yellow-500/30 hover:bg-yellow-500/50 flex items-center gap-2 text-sm"><FaPlusCircle /> Try Add New Key</button>

                    <div className="flex flex-col gap-2 mt-3">
                        <div className="text-xs font-semibold">Logs</div>
                        <div className="space-y-2 max-h-40 overflow-auto">
                            <AnimatePresence>
                                {sealLogs.map(i => <LogItem key={i.id} item={i} />)}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <ComparisonSection />
        </div>
    );
}


// function ComparisonSection() {
//   return (
//     <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-xl text-white flex flex-col gap-6">
//       <h2 className="text-xl font-bold">Comparison: Original vs Frozen vs Sealed</h2>
//       <div className="flex gap-4 text-sm">
//         <div className="px-3 py-2 bg-blue-500/20 rounded-lg border border-blue-500/40">Original</div>
//         <div className="px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/40">Frozen</div>
//         <div className="px-3 py-2 bg-yellow-500/20 rounded-lg border border-yellow-500/40">Sealed</div>
//       </div>
//       <div className="overflow-auto">
//         <table className="w-full text-left text-sm border-collapse">
//           <thead>
//             <tr className="bg-white/10">
//               <th className="p-3">Feature</th>
//               <th className="p-3 text-blue-300">Original Object</th>
//               <th className="p-3 text-green-300">Frozen</th>
//               <th className="p-3 text-yellow-300">Sealed</th>
//             </tr>
//           </thead>
//           <tbody className="bg-black/20">
//             <tr>
//               <td className="p-3">Can Update Keys</td>
//               <td className="p-3">Yes</td>
//               <td className="p-3">No</td>
//               <td className="p-3">Yes</td>
//             </tr>
//             <tr>
//               <td className="p-3">Can Add Keys</td>
//               <td className="p-3">Yes</td>
//               <td className="p-3">No</td>
//               <td className="p-3">No</td>
//             </tr>
//             <tr>
//               <td className="p-3">Can Delete Keys</td>
//               <td className="p-3">Yes</td>
//               <td className="p-3">No</td>
//               <td className="p-3">No</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


function ComparisonSection() {
    return (
        <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-xl text-white flex flex-col gap-6">
            <h2 className="text-xl font-bold">Comparison: Original vs Frozen vs Sealed</h2>
            <div className="flex gap-4 text-sm">
                <div className="px-3 py-2 bg-blue-500/20 rounded-lg border border-blue-500/40">Original</div>
                <div className="px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/40">Frozen</div>
                <div className="px-3 py-2 bg-yellow-500/20 rounded-lg border border-yellow-500/40">Sealed</div>
            </div>
            <div className="overflow-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-white/10">
                            <th className="p-3">Feature</th>
                            <th className="p-3 text-blue-300">Original Object</th>
                            <th className="p-3 text-green-300">Frozen</th>
                            <th className="p-3 text-yellow-300">Sealed</th>
                        </tr>
                    </thead>
                    <tbody className="bg-black/20">
                        <tr>
                            <td className="p-3">Can Update Keys</td>
                            <td className="p-3">Yes</td>
                            <td className="p-3">No</td>
                            <td className="p-3">Yes</td>
                        </tr>
                        <tr>
                            <td className="p-3">Can Add Keys</td>
                            <td className="p-3">Yes</td>
                            <td className="p-3">No</td>
                            <td className="p-3">No</td>
                        </tr>
                        <tr>
                            <td className="p-3">Can Delete Keys</td>
                            <td className="p-3">Yes</td>
                            <td className="p-3">No</td>
                            <td className="p-3">No</td>
                        </tr>
                    </tbody>
                </table>

                {/* Tabs Section */}
                <div className="mt-8">


                    {/* Diff View Box */}
                    <div className="bg-black/30 p-4 rounded border border-white/10 text-xs whitespace-pre-wrap">
                        <pre>{`// Original
const obj = { name: "Laptop", price: 50000 };

// Frozen
const frozen = Object.freeze({ name: "Laptop", price: 50000 });

// Sealed
const sealed = Object.seal({ name: "Laptop", price: 50000 });`}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
}




