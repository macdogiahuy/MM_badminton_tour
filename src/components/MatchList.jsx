
const MatchList = ({ matches, teams, results, onScoreUpdate }) => {
  const getTeamName = (id) => teams.find(t => t.id === id)?.name || 'Unknown';

  const handleChange = (matchId, field, val) => {
    onScoreUpdate(matchId, field, val);
  };

  return (
    <div className="glass-panel p-6 shadow-xl h-full">
      <h3 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
        <span className="text-2xl">🏸</span>
        <span className="uppercase tracking-wide text-sm md:text-xl">Lịch đấu & Kết quả</span>
      </h3>
      <div className="flex flex-col gap-4">
        {matches.map((match, index) => {
          const res = results[match.id] || { score1: '', score2: '' };
          const s1 = parseInt(res.score1);
          const s2 = parseInt(res.score2);
          const finished = res.complete;
          
          return (
            <div key={match.id} className="bg-slate-800/40 p-4 rounded-xl flex flex-col gap-3 border border-slate-700/50 hover:border-blue-500/30 transition-all group">
              <div className="flex justify-between items-center">
                   <div className="text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">Trận {index + 1}</div>
                   {finished && <div className="text-[10px] bg-green-500/20 text-green-400 px-2 rounded-full font-bold border border-green-500/20">Xong</div>}
              </div>
              
              <div className="flex items-center justify-between gap-2 md:gap-4">
                 {/* Team 1 */}
                 <div className={`flex-1 text-right font-semibold text-sm md:text-base transition-colors ${finished && s1 > s2 ? 'text-green-400' : 'text-slate-300'}`}>
                    {getTeamName(match.team1Id)}
                 </div>
                 
                 {/* Scores */}
                 <div className="flex items-center gap-2 shrink-0 bg-slate-900/50 p-1.5 rounded-lg border border-slate-700/50 shadow-inner">
                    <input 
                      type="number" 
                      className="w-12 h-10 text-center bg-slate-800 border-none rounded text-white font-mono text-lg focus:ring-2 focus:ring-blue-500 transition-all p-0"
                      value={res.score1}
                      onChange={(e) => handleChange(match.id, 'score1', e.target.value)}
                      placeholder="0"
                    />
                    <span className="text-slate-500 font-bold">-</span>
                    <input 
                      type="number" 
                      className="w-12 h-10 text-center bg-slate-800 border-none rounded text-white font-mono text-lg focus:ring-2 focus:ring-blue-500 transition-all p-0"
                      value={res.score2}
                      onChange={(e) => handleChange(match.id, 'score2', e.target.value)}
                      placeholder="0"
                    />
                 </div>

                 {/* Team 2 */}
                 <div className={`flex-1 text-left font-semibold text-sm md:text-base transition-colors ${finished && s2 > s1 ? 'text-green-400' : 'text-slate-300'}`}>
                    {getTeamName(match.team2Id)}
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchList;
