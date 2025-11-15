
import React, { useState } from "react";
export const  MemoryFlip = ({ onWin }) => {
  const items = ["🍎","🍎","🍌","🍌","🍇","🍇","🍒","🍒"].sort(()=>Math.random()-0.5);
  const [cards, setCards] = useState(items.map(v=>({v,fl:false,done:false})));
  const [open, setOpen] = useState([]);
  const [score,setScore] = useState(0);
  function flip(i){ 
    if(cards[i].fl||cards[i].done||open.length===2) 
        return; 
    
    const nc=[...cards]; 
    nc[i].fl=true;
    setCards(nc); 
    const no=[...open,i]; 
    setOpen(no); 
    
    if(no.length===2){ 
        const [a,b]=no;
         if(nc[a].v===nc[b].v){
             setTimeout(()=>{
                 nc[a].done=nc[b].done=true; 
                 setCards([...nc]); 
                 setScore(s=>s+1);
                  setOpen([]); 
                  if(score+1===4) 
                    onWin && onWin();
                 },400);
                }
         else{ 
            setTimeout(()=>{
                 nc[a].fl=nc[b].fl=false;
                  setCards([...nc]); 
                  setOpen([]);
                 },600);
                } 
            } 
        }
    return (<div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-2">Memory Flip</h3>
        <div className="grid grid-cols-4 gap-3">
            {cards.map((c, i) => (
                <button key={i} onClick={() => flip(i)}
                    className="w-16 h-16 bg-gray-200 rounded-xl">
                    {c.fl || c.done ? c.v : '❓'}
                </button>))
            }
        </div>
    </div>);
}