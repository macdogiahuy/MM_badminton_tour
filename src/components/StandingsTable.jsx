
import { useMemo } from 'react';
import { calculateStandings } from '../utils';

const StandingsTable = ({ branch, results }) => {
  const standings = useMemo(() => calculateStandings(branch, results), [branch, results]);

  return (
    <div className="glass-panel p-6 h-full">
       <h3 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
         <span className="text-2xl">🏆</span> 
         <span className="uppercase tracking-wide text-sm md:text-xl">Bảng xếp hạng</span>
       </h3>
       <div className="overflow-x-auto rounded-lg border border-slate-700/50">
         <table className="w-full text-sm text-left">
           <thead>
             <tr className="bg-slate-800/80 text-slate-300 uppercase text-xs font-bold tracking-wider">
               <th className="py-4 px-4 pl-6 w-16">#</th>
               <th className="py-4 px-4">Đội</th>
               <th className="py-4 px-4 text-center w-20">Trận</th>
               <th className="py-4 px-4 text-center w-20">Thắng</th>
               <th className="py-4 px-4 text-center w-24">Hiệu số</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-700/50">
             {standings.map((team, idx) => {
               const isQualifying = idx < 1; // Check rule: Top 1 advance
               return (
                 <tr key={team.id} className={`transition-colors ${isQualifying ? 'bg-blue-500/5 hover:bg-blue-500/10' : 'hover:bg-slate-800/50'}`}>
                   <td className="py-4 px-4 pl-6">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg
                       ${idx === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-black ring-2 ring-yellow-500/30' : 
                         idx === 1 ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-black ring-2 ring-slate-400/30' : 
                         'bg-slate-800 text-slate-400 border border-slate-700'}
                     `}>
                       {idx + 1}
                     </div>
                   </td>
                   <td className="py-4 px-4">
                     <div className="font-bold text-slate-200 text-base">{team.name}</div>
                     {isQualifying && (
                        <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-green-400 uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            Đi tiếp
                        </div>
                     )}
                   </td>
                   <td className="py-4 px-4 text-center text-slate-400 font-medium">{team.matchesPlayed}</td>
                   <td className="py-4 px-4 text-center font-bold text-blue-400 text-lg">{team.wins}</td>
                   <td className={`py-4 px-4 text-center font-mono font-bold ${team.pointsWon - team.pointsLost > 0 ? 'text-green-400' : team.pointsWon - team.pointsLost < 0 ? 'text-red-400' : 'text-slate-500'}`}>
                     {team.pointsWon - team.pointsLost > 0 ? '+' : ''}{team.pointsWon - team.pointsLost}
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>
       </div>
    </div>
  )
}
export default StandingsTable;
