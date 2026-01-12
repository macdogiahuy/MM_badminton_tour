
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
        score1: res.score1, 
        score2: res.score2,
        complete: true
    };
  };

  // We need to reconstruct the bracket tree to determine participants dynamically
  // Advanced: 4 Groups (Indices 0, 1, 2, 3 correspond to N1, N2, N3, N4)
  // Basic: 2 Groups (Indices 0, 1 correspond to N1, N2)

  let bracketData = {};

  if (category === 'advanced') {
    // Round 1: Quarter Finals
    // QF1: N1_1 vs N2_2
    // QF2: N2_1 vs N1_2
    // QF3: N3_1 vs N4_2
    // QF4: N4_1 vs N3_2
    
    const qf1 = { id: 'adv_qf1', t1: qualifiers[0]?.[0], t2: qualifiers[1]?.[1], title: 'QF1: Nhất N1 vs Nhì N2' };
    const qf2 = { id: 'adv_qf2', t1: qualifiers[1]?.[0], t2: qualifiers[0]?.[1], title: 'QF2: Nhất N2 vs Nhì N1' };
    const qf3 = { id: 'adv_qf3', t1: qualifiers[2]?.[0], t2: qualifiers[3]?.[1], title: 'QF3: Nhất N3 vs Nhì N4' };
    const qf4 = { id: 'adv_qf4', t1: qualifiers[3]?.[0], t2: qualifiers[2]?.[1], title: 'QF4: Nhất N4 vs Nhì N3' };

    // Determine SF participants
    const getWinner = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res.complete) return null;
        return parseInt(res.score1) > parseInt(res.score2) ? t1 : t2;
    };
    
    const getLoser = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res.complete) return null;
        return parseInt(res.score1) > parseInt(res.score2) ? t2 : t1;
    };

    const sf1_t1 = getWinner(qf1, qf1.t1, qf1.t2);
    const sf1_t2 = getWinner(qf2, qf2.t1, qf2.t2);
    
    const sf2_t1 = getWinner(qf3, qf3.t1, qf3.t2);
    const sf2_t2 = getWinner(qf4, qf4.t1, qf4.t2);

    const sf1 = { id: 'adv_sf1', t1: sf1_t1, t2: sf1_t2, title: 'Bán Kết 1' };
    const sf2 = { id: 'adv_sf2', t1: sf2_t1, t2: sf2_t2, title: 'Bán Kết 2' };

    // Final & 3rd Place
    const final_t1 = getWinner(sf1, sf1.t1, sf1.t2);
    const final_t2 = getWinner(sf2, sf2.t1, sf2.t2);
    
    const third_t1 = getLoser(sf1, sf1.t1, sf1.t2);
    const third_t2 = getLoser(sf2, sf2.t1, sf2.t2);
    
    const final = { id: 'adv_final', t1: final_t1, t2: final_t2, title: 'Chung Kết' };
    const thirdPlace = { id: 'adv_3rd', t1: third_t1, t2: third_t2, title: 'Tranh Hạng 3' };
    
    bracketData = { rounds: [[qf1, qf2, qf3, qf4], [sf1, sf2], [final, thirdPlace]] };

  } else {
    // Basic: 2 Groups
    // SF1: N1_1 vs N2_2
    // SF2: N2_1 vs N1_2
    
    const sf1 = { id: 'bas_sf1', t1: qualifiers[0]?.[0], t2: qualifiers[1]?.[1], title: 'Bán Kết 1' };
    const sf2 = { id: 'bas_sf2', t1: qualifiers[1]?.[0], t2: qualifiers[0]?.[1], title: 'Bán Kết 2' };

    const getWinner = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res.complete) return null;
        return parseInt(res.score1) > parseInt(res.score2) ? t1 : t2;
    };
    
    const getLoser = (match, t1, t2) => {
        const res = getMatchResult(match.id);
        if (!res.complete) return null;
        return parseInt(res.score1) > parseInt(res.score2) ? t2 : t1;
    };

    const final_t1 = getWinner(sf1, sf1.t1, sf1.t2);
    const final_t2 = getWinner(sf2, sf2.t1, sf2.t2);
    
    const third_t1 = getLoser(sf1, sf1.t1, sf1.t2);
    const third_t2 = getLoser(sf2, sf2.t1, sf2.t2);
    
    const final = { id: 'bas_final', t1: final_t1, t2: final_t2, title: 'Chung Kết' };
    const thirdPlace = { id: 'bas_3rd', t1: third_t1, t2: third_t2, title: 'Tranh Hạng 3' };
    
    bracketData = { rounds: [[sf1, sf2], [final, thirdPlace]] };
  }

  const champion = (() => {
      const finalMatch = bracketData.rounds[bracketData.rounds.length - 1][0];
      const res = getMatchResult(finalMatch.id);
      if(res.complete) {
          return parseInt(res.score1) > parseInt(res.score2) ? finalMatch.t1 : finalMatch.t2;
      }
      return null;
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
                                        score1={results[match.id]?.score1}
                                        score2={results[match.id]?.score2}
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
