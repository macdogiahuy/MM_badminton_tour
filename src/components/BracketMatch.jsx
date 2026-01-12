
const BracketMatch = ({ title, team1, team2, score1, score2, onScoreChange, matchId, isFinal }) => {
  const s1 = parseInt(score1 || 0);
  const s2 = parseInt(score2 || 0);
  // Highlight winner if scores are present and different
  const hasScore = score1 !== '' && score2 !== '' && score1 !== undefined && score2 !== undefined;
  const t1Win = hasScore && s1 > s2;
  const t2Win = hasScore && s2 > s1;

  const handleChange = (field, val) => {
    onScoreChange(matchId, field, val);
  };

  return (
    <div className="flex flex-col gap-1 w-72 relative shrink-0 transition-all hover:scale-105 duration-300">
       {title && (
         <div className="text-[10px] text-slate-400 text-center mb-1 uppercase tracking-widest font-bold bg-slate-900/50 py-1 rounded-full mx-auto px-3 border border-slate-700/50">
            {title}
         </div>
       )}
       
       <div className={`border bg-slate-800/90 backdrop-blur shadow-2xl rounded-xl overflow-hidden relative group
            ${isFinal ? 'border-yellow-500 ring-2 ring-yellow-500/20 scale-110 z-10' : 'border-slate-700/50 hover:border-blue-500/50'}
       `}>
          {isFinal && <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-yellow-600 text-black text-[10px] font-bold px-2 py-0.5 rounded-bl shadow-sm">BO3 (11pts)</div>}
          
          {/* Team 1 */}
          <div className={`flex justify-between items-center border-b border-slate-700/50 p-1 ${t1Win ? 'bg-gradient-to-r from-green-900/40 to-transparent' : ''}`}>
             <div className={`px-3 py-2 text-sm truncate flex-1 font-bold transition-colors ${t1Win ? 'text-green-400' : 'text-slate-300'}`}>
                {team1?.name || (team1 === null ? 'TBD' : '...')}
             </div>
             <input 
                type="number" 
                className={`w-12 h-10 text-center text-sm font-mono border-l border-slate-700/50 focus:outline-none transition-colors rounded ${t1Win ? 'text-green-400 font-bold bg-green-900/20' : 'text-slate-400 bg-slate-900/50 focus:bg-slate-800'}`}
                value={score1 || ''}
                onChange={(e) => handleChange('score1', e.target.value)}
                placeholder="-"
             />
          </div>

          {/* Team 2 */}
          <div className={`flex justify-between items-center p-1 ${t2Win ? 'bg-gradient-to-r from-green-900/40 to-transparent' : ''}`}>
             <div className={`px-3 py-2 text-sm truncate flex-1 font-bold transition-colors ${t2Win ? 'text-green-400' : 'text-slate-300'}`}>
                {team2?.name || (team2 === null ? 'TBD' : '...')}
             </div>
             <input 
                type="number" 
                className={`w-12 h-10 text-center text-sm font-mono border-l border-slate-700/50 focus:outline-none transition-colors rounded ${t2Win ? 'text-green-400 font-bold bg-green-900/20' : 'text-slate-400 bg-slate-900/50 focus:bg-slate-800'}`}
                value={score2 || ''}
                onChange={(e) => handleChange('score2', e.target.value)}
                placeholder="-"
             />
          </div>
       </div>
    </div>
  );
};
export default BracketMatch;
