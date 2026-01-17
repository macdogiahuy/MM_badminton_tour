
import { useMemo } from 'react';
import { calculateStandings } from '../utils';
import BracketMatch from './BracketMatch';

const KnockoutBracket = ({ category, groups, results, updateResults }) => {
  // 1. Calculate Group Standings to get Qualifiers
  const qualifiers = useMemo(() => {
    const q = {}; // { groupIndex: [1stTeam, 2ndTeam] }
    groups.forEach((group, idx) => {
        const standings = calculateStandings(group, results);
        q[idx] = [standings[0], standings[1]]; // Top 2
    });
    return q;
  }, [groups, results]);

  // Helper to get winner/loser of a match
  const getMatchResult = (matchId) => {
    const res = results[matchId];
    if (!res || !res.complete) return { winner: null, loser: null };
    
    // We need to know who played in this match to return the actual team object
    // But since the match inputs are scores, we need to trace back the participants.
    // However, BracketMatch and the parent logic needs to pass the teams down.
    // A better approach: The hook/function calculating the bracket tree returns the participants.
    return { 
        ...res,
        complete: true
    };
  };

  // We need to reconstruct the bracket tree to determine participants dynamically
  // Advanced: 4 Groups (Indices 0, 1, 2, 3 correspond to N1, N2, N3, N4)
  // Basic: 2 Groups (Indices 0, 1 correspond to N1, N2)

  let bracketData = {};

  if (category === 'advanced') {
    // Advanced: 4 Groups -> 4 winners + 4 runners-up -> 8 teams.
    // Quarter-Finals -> Semi-Finals -> Final.
    
    // QF1: 1st N1 vs 2nd N2
    // QF2: 1st N3 vs 2nd N4
    // QF3: 1st N2 vs 2nd N1
    // QF4: 1st N4 vs 2nd N3
    
    // Qualifiers map: 0->N1, 1->N2, 2->N3, 3->N4.
    // [0] is 1st, [1] is 2nd.

    const qf1 = { id: 'adv_qf1', t1: qualifiers[0]?.[0], t2: qualifiers[1]?.[1], title: 'Tứ Kết 1 (Nhất N1 vs Nhì N2)' };
    const qf2 = { id: 'adv_qf2', t1: qualifiers[2]?.[0], t2: qualifiers[3]?.[1], title: 'Tứ Kết 2 (Nhất N3 vs Nhì N4)' };
    const qf3 = { id: 'adv_qf3', t1: qualifiers[1]?.[0], t2: qualifiers[0]?.[1], title: 'Tứ Kết 3 (Nhất N2 vs Nhì N1)' };
    const qf4 = { id: 'adv_qf4', t1: qualifiers[3]?.[0], t2: qualifiers[2]?.[1], title: 'Tứ Kết 4 (Nhất N4 vs Nhì N3)' };

    // Get Winners for SF
    // Helper function needs to be hoisted or defined conveniently. 
    // We will define a local helper inside the scope or use the one defined below (but careful with scope).
    // Let's rely on a reliable helper defined HERE to avoid hoisting issues inside the if/else block.

    const getWinnerLocal = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res || !res.complete) return null;
        // Standard 1-set Logic for QF/SF
        return parseInt(res.score1) > parseInt(res.score2) ? t1 : t2;
    };
    
    const getLoserLocal = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res || !res.complete) return null;
        return parseInt(res.score1) > parseInt(res.score2) ? t2 : t1;
    };

    const sf1_t1 = getWinnerLocal(qf1, qf1.t1, qf1.t2);
    const sf1_t2 = getWinnerLocal(qf2, qf2.t1, qf2.t2);
    
    const sf2_t1 = getWinnerLocal(qf3, qf3.t1, qf3.t2);
    const sf2_t2 = getWinnerLocal(qf4, qf4.t1, qf4.t2);

    const sf1 = { id: 'adv_sf1', t1: sf1_t1, t2: sf1_t2, title: 'Bán Kết 1' };
    const sf2 = { id: 'adv_sf2', t1: sf2_t1, t2: sf2_t2, title: 'Bán Kết 2' };

    // Final & 3rd Place
    // The main helper later (getWinnerFn) handles BO3 for finals, but we need to resolve participants here.
    // We can assume standard result to get participants for next round, or replicate the BO3 check if needed.
    // Usually participants are decided by "Who won", regardless of BO3 mechanics, simply by the result.
    // But let's reuse a robust winner checker. 
    // Since getWinnerFn is defined below, we can't call it here easily due to `const` temporal dead zone if we are not careful.
    // Simplest is to copy logic or make getWinnerFn a pure function outside.
    // For now, let's keep it simple: SF are usually 1 set? If SF is BO3, we need that logic.
    // Assuming SF is standard.

    const final_t1 = getWinnerLocal(sf1, sf1.t1, sf1.t2);
    const final_t2 = getWinnerLocal(sf2, sf2.t1, sf2.t2);
    
    const third_t1 = getLoserLocal(sf1, sf1.t1, sf1.t2);
    const third_t2 = getLoserLocal(sf2, sf2.t1, sf2.t2);
    
    const final = { id: 'adv_final', t1: final_t1, t2: final_t2, title: 'Chung Kết' };
    const thirdPlace = { id: 'adv_3rd', t1: third_t1, t2: third_t2, title: 'Tranh Hạng 3' };
    
    bracketData = { rounds: [[qf1, qf2, qf3, qf4], [sf1, sf2], [final, thirdPlace]] };

  } else {
    // Basic: 2 Groups -> 2 winners + 2 runners-up -> 4 teams.
    // Semi-Finals -> Final.
    
    // SF1: 1st N1 vs 2nd N2
    // SF2: 1st N2 vs 2nd N1
    
    const sf1 = { id: 'bas_sf1', t1: qualifiers[0]?.[0], t2: qualifiers[1]?.[1], title: 'Bán Kết 1 (Nhất N1 vs Nhì N2)' };
    const sf2 = { id: 'bas_sf2', t1: qualifiers[1]?.[0], t2: qualifiers[0]?.[1], title: 'Bán Kết 2 (Nhất N2 vs Nhì N1)' };

    const getWinnerLocal = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res || !res.complete) return null;
        return parseInt(res.score1) > parseInt(res.score2) ? t1 : t2;
    };
    
    const getLoserLocal = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res || !res.complete) return null;
        return parseInt(res.score1) > parseInt(res.score2) ? t2 : t1;
    };

    const final_t1 = getWinnerLocal(sf1, sf1.t1, sf1.t2);
    const final_t2 = getWinnerLocal(sf2, sf2.t1, sf2.t2);
    
    const third_t1 = getLoserLocal(sf1, sf1.t1, sf1.t2);
    const third_t2 = getLoserLocal(sf2, sf2.t1, sf2.t2);
    
    const final = { id: 'bas_final', t1: final_t1, t2: final_t2, title: 'Chung Kết' };
    const thirdPlace = { id: 'bas_3rd', t1: third_t1, t2: third_t2, title: 'Tranh Hạng 3' };
    
    bracketData = { rounds: [[sf1, sf2], [final, thirdPlace]] };
  }

  // Define getWinner/getLoser helper in outer scope or reuse it
  const getWinnerFn = (match, t1, t2) => {
      const res = getMatchResult(match.id);
      if (!res || !res.complete) return null;
      
      if (match.title.includes('Chung Kết')) {
           let wins1 = 0;
           let wins2 = 0;
           const sets = [1, 2, 3];
           sets.forEach(i => {
               const s1 = parseInt(res[`score1_${i}`]);
               const s2 = parseInt(res[`score2_${i}`]);
               if (!isNaN(s1) && !isNaN(s2)) {
                   if (s1 > s2) wins1++;
                   if (s2 > s1) wins2++;
               }
           });
           if (wins1 >= 2) return t1;
           if (wins2 >= 2) return t2;
           return null; 
      }
      return parseInt(res.score1) > parseInt(res.score2) ? t1 : t2;
  };

  const champion = (() => {
      const finalMatch = bracketData.rounds[bracketData.rounds.length - 1][0];
      return getWinnerFn(finalMatch, finalMatch.t1, finalMatch.t2);
  })();

  return (
    <div className="w-full overflow-x-auto pb-8">
       <div className="min-w-[800px] flex flex-col gap-12">
            {champion && (
                <div className="flex flex-col items-center justify-center animate-bounce-in">
                    <div className="text-6xl mb-2">🏆</div>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
                        {champion.name}
                    </div>
                    <div className="text-yellow-500 font-bold uppercase tracking-widest mt-1">Vô Địch</div>
                </div>
            )}

           <div className="flex justify-center items-start gap-8 md:gap-16">
                {bracketData.rounds.map((round, roundIdx) => (
                    <div key={roundIdx} className="flex flex-col justify-around gap-8 md:gap-16 pt-8">
                        {round.map((match, matchIdx) => {
                            // Check for 3rd place match distinction
                            const isThirdPlace = match.title.includes('Hạng 3');
                            const isFinal = match.title.includes('Chung Kết');
                            
                            return (
                                <div key={match.id} className={`flex flex-col items-center ${isThirdPlace ? 'mt-8 opacity-90 scale-90' : ''}`}>
                    <BracketMatch 
                        matchId={match.id}
                        title={match.title}
                        team1={match.t1}
                        team2={match.t2}
                        {...(results[match.id] || {})} 
                        onScoreChange={updateResults}
                        isFinal={isFinal}
                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
           </div>
       </div>
    </div>
  );
};

export default KnockoutBracket;
