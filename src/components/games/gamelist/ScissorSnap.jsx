import React, { useState } from "react";
import { DEFAULT_SOUNDS } from "../../../utils/sounds";

// export const ScissorSnap = ({ onWin, playSound })  =>{
//   const [left, setLeft] = useState(null);
//   const [right, setRight] = useState(null);
//   const [result, setResult] = useState(null);
//   const options = ["Rock", "Paper", "Scissors"];

//   function resolve(l, r) {
//     if (l === r) return "Draw";
//     if ((l === "Rock" && r === "Scissors") || 
//         (l === "Paper" && r === "Rock") || 
//         (l === "Scissors" && r === "Paper")) 
//     return "Left Wins";
//     return "Right Wins";
//   }

//   function playRound() {
//     if (!left || !right) return;
//     const res = resolve(left, right); 
//     setResult(res); 
//     playSound && playSound(DEFAULT_SOUNDS?.click);
//     if (res === "Left Wins") onWin && onWin();
//   }

//   // simple touch/swipe handlers for mobile (two areas)
//   function touchChoice(e, side) {
//     const x = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
//     // pick option by vertical thirds
//     const idx = Math.floor(x * 3);
//     const choice = options[Math.min(2, Math.max(0, idx))];
//     if (side === "L") setLeft(choice); else setRight(choice);
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
//       <h3 className="text-xl font-semibold mb-2">Scissor-Snap (Two Hands)</h3>
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div onClick={(e)=>touchChoice(e,'L')} className="p-4 bg-gray-50 rounded text-center">Left: <div className="text-2xl mt-2">{left || '❔'}</div></div>
//         <div onClick={(e)=>touchChoice(e,'R')} className="p-4 bg-gray-50 rounded text-center">Right: <div className="text-2xl mt-2">{right || '❔'}</div></div>
//       </div>
//       <div className="flex gap-2 mb-4">
//         <button onClick={playRound} className="flex-1 py-2 bg-indigo-600 text-white rounded">Snap</button>
//         <button onClick={()=>{ setLeft(null); setRight(null); setResult(null); }} className="py-2 px-3 bg-gray-100 rounded">Reset</button>
//       </div>
//       {result && <div className="text-center font-bold">Result: {result}</div>}
//     </div>
//   );
// }

export const ScissorSnap = ({ onWin, playSound }) => {
  const [left,setLeft]=useState(null);
  const [right,setRight]=useState(null);
  const [result,setResult]=useState(null);
  const options=["Rock","Paper","Scissors"];

  function resolve(l,r){ if(l===r) return "Draw"; if((l==="Rock"&&r==="Scissors")||(l==="Paper"&&r==="Rock")||(l==="Scissors"&&r==="Paper")) return "Left Wins"; return "Right Wins"; }
  function playRound(){ if(!left||!right) return; const res=resolve(left,right); setResult(res); playSound&&playSound(SOUNDS.click); if(res==="Left Wins") onWin&&onWin(); }
  function touchChoice(e,side){ const x=e.nativeEvent.offsetX/e.currentTarget.offsetWidth; const idx=Math.floor(x*3); const choice=options[Math.min(2,Math.max(0,idx))]; side==='L'?setLeft(choice):setRight(choice); }

  const handIcons = { Rock:'✊', Paper:'✋', Scissors:'✌️' };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow text-center">
      <h3 className="text-xl font-semibold mb-2">Scissor-Snap (Two Hands)</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div onClick={e=>touchChoice(e,'L')} className="p-4 bg-gray-50 rounded flex flex-col items-center justify-center">
          <div className="text-2xl">{left?handIcons[left]:'❔'}</div>
          <div className="mt-2">Left: {left||'?'}</div>
        </div>
        <div onClick={e=>touchChoice(e,'R')} className="p-4 bg-gray-50 rounded flex flex-col items-center justify-center">
          <div className="text-2xl">{right?handIcons[right]:'❔'}</div>
          <div className="mt-2">Right: {right||'?'}</div>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={playRound} className="flex-1 py-2 bg-indigo-600 text-white rounded">Snap</button>
        <button onClick={()=>{setLeft(null);setRight(null);setResult(null);}} className="py-2 px-3 bg-gray-100 rounded">Reset</button>
      </div>
      {result && <div className="text-center font-bold">Result: {result}</div>}
    </div>
  );
}