
const BracketMatch = ({ title, team1, team2, score1, score2, onScoreChange, matchId, isFinal, score1_1, score2_1, score1_2, score2_2, score1_3, score2_3 }) => {
  const p = (v) => parseInt(v) || 0;

  // Single Set Logic
  const s1 = p(score1);
  const s2 = p(score2);
  const singleSetWin1 = score1 !== '' && score1 !== undefined && s1 > s2;
  const singleSetWin2 = score2 !== '' && score2 !== undefined && s2 > s1;

  // BO3 Logic
  // Check wins per set
  let wins1 = 0;
  let wins2 = 0;
  const sets = [
      { s1: score1_1, s2: score2_1 },
      { s1: score1_2, s2: score2_2 },
      { s1: score1_3, s2: score2_3 },
  ];
  
  sets.forEach(set => {
      const v1 = parseInt(set.s1);
      const v2 = parseInt(set.s2);
      if (!isNaN(v1) && !isNaN(v2)) {
          if (v1 > v2) wins1++;
          if (v2 > v1) wins2++;
      }
  });

  const bo3Win1 = isFinal && wins1 >= 2;
  const bo3Win2 = isFinal && wins2 >= 2;
  
  const t1Win = isFinal ? bo3Win1 : singleSetWin1;
  const t2Win = isFinal ? bo3Win2 : singleSetWin2;

  const handleChange = (field, val) => {
    onScoreChange(matchId, field, val);
  };

  return (
    <div className={`flex flex-col gap-1 relative shrink-0 transition-all duration-300 ${isFinal ? 'w-96 scale-105 z-20' : 'w-72 hover:scale-105'}`}>
       {title && (
         <div className="text-[10px] text-slate-400 text-center mb-1 uppercase tracking-widest font-bold bg-slate-900/50 py-1 rounded-full mx-auto px-3 border border-slate-700/50">
            {title}
         </div>
       )}
       
       <div className={`border bg-slate-800/90 backdrop-blur shadow-2xl rounded-xl overflow-hidden relative group
            ${isFinal ? 'border-yellow-500 ring-4 ring-yellow-500/20' : 'border-slate-700/50 hover:border-blue-500/50'}
       `}>
          {isFinal && <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-yellow-600 text-black text-[10px] font-bold px-2 py-0.5 rounded-bl shadow-sm">BO3 (11pts)</div>}
          
          {/* Header for BO3 */}
          {isFinal && (
             <div className="flex text-[9px] text-slate-500 font-bold uppercase tracking-wider text-center border-b border-slate-700/30">
                <div className="flex-1"></div>
                <div className="w-10 py-1">Set 1</div>
                <div className="w-10 py-1">Set 2</div>
                <div className="w-10 py-1">Set 3</div>
             </div>
          )}

          {/* Team 1 */}
          <div className={`flex justify-between items-center border-b border-slate-700/50 p-1 ${t1Win ? 'bg-gradient-to-r from-green-900/40 to-transparent' : ''}`}>
             <div className={`px-3 py-2 text-sm truncate flex-1 font-bold transition-colors ${t1Win ? 'text-green-400' : 'text-slate-300'}`}>
                {team1?.name || (team1 === null ? 'TBD' : '...')}
             </div>
             
             {isFinal ? (
                 <div className="flex">
                    {[1, 2, 3].map(i => (
                        <input 
                           key={i}
                           type="number" 
                           className={`w-10 h-10 text-center text-sm font-mono border-l border-slate-700/50 focus:outline-none transition-colors 
                               ${(parseInt(sets[i-1].s1) > parseInt(sets[i-1].s2)) ? 'text-green-400 font-bold bg-green-900/20' : 'text-slate-400 bg-slate-900/50 focus:bg-slate-800'}
                           `}
                           value={sets[i-1].s1 || ''}
                           onChange={(e) => handleChange(`score1_${i}`, e.target.value)}
                           placeholder="-"
                        />
                    ))}
                 </div>
             ) : (
                 <input 
                    type="number" 
                    className={`w-12 h-10 text-center text-sm font-mono border-l border-slate-700/50 focus:outline-none transition-colors rounded ${t1Win ? 'text-green-400 font-bold bg-green-900/20' : 'text-slate-400 bg-slate-900/50 focus:bg-slate-800'}`}
                    value={score1 || ''}
                    onChange={(e) => handleChange('score1', e.target.value)}
                    placeholder="-"
                 />
             )}
          </div>

          {/* Team 2 */}
          <div className={`flex justify-between items-center p-1 ${t2Win ? 'bg-gradient-to-r from-green-900/40 to-transparent' : ''}`}>
             <div className={`px-3 py-2 text-sm truncate flex-1 font-bold transition-colors ${t2Win ? 'text-green-400' : 'text-slate-300'}`}>
                {team2?.name || (team2 === null ? 'TBD' : '...')}
             </div>
             
             {isFinal ? (
                 <div className="flex">
                    {[1, 2, 3].map(i => (
                        <input 
                           key={i}
                           type="number" 
                           className={`w-10 h-10 text-center text-sm font-mono border-l border-slate-700/50 focus:outline-none transition-colors 
                               ${(parseInt(sets[i-1].s2) > parseInt(sets[i-1].s1)) ? 'text-green-400 font-bold bg-green-900/20' : 'text-slate-400 bg-slate-900/50 focus:bg-slate-800'}
                           `}
                           value={sets[i-1].s2 || ''}
                           onChange={(e) => handleChange(`score2_${i}`, e.target.value)}
                           placeholder="-"
                        />
                    ))}
                 </div>
             ) : (
                 <input 
                    type="number" 
                    className={`w-12 h-10 text-center text-sm font-mono border-l border-slate-700/50 focus:outline-none transition-colors rounded ${t2Win ? 'text-green-400 font-bold bg-green-900/20' : 'text-slate-400 bg-slate-900/50 focus:bg-slate-800'}`}
                    value={score2 || ''}
                    onChange={(e) => handleChange('score2', e.target.value)}
                    placeholder="-"
                 />
             )}
          </div>
       </div>
    </div>
  );
};
export default BracketMatch;
