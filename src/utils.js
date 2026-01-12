
export const calculateStandings = (branch, results) => {
  const stats = branch.teams.map(team => ({
    id: team.id,
    name: team.name,
    wins: 0,
    pointsWon: 0,
    pointsLost: 0,
    matchesPlayed: 0,
    headToHead: {} // map opponentId -> result (1 if won, -1 if lost)
  }));

  // Process matches
  branch.matches.forEach(match => {
    const res = results[match.id];
    if (res && res.complete) {
      const team1 = stats.find(t => t.id === match.team1Id);
      const team2 = stats.find(t => t.id === match.team2Id);
      
      const s1 = parseInt(res.score1) || 0;
      const s2 = parseInt(res.score2) || 0;

      if (team1) {
        team1.matchesPlayed += 1;
        team1.pointsWon += s1;
        team1.pointsLost += s2;
        if (s1 > s2) {
          team1.wins += 1;
          team1.headToHead[match.team2Id] = 1;
        } else {
          team1.headToHead[match.team2Id] = -1;
        }
      }
      
      if (team2) {
        team2.matchesPlayed += 1;
        team2.pointsWon += s2;
        team2.pointsLost += s1;
        if (s2 > s1) {
            team2.wins += 1;
            team2.headToHead[match.team1Id] = 1;
        } else {
            team2.headToHead[match.team1Id] = -1;
        }
      }
    }
  });

  // Sort
  return stats.sort((a, b) => {
    // 1. Wins
    if (b.wins !== a.wins) return b.wins - a.wins;
    
    // 2. Point Diff
    const diffA = a.pointsWon - a.pointsLost;
    const diffB = b.pointsWon - b.pointsLost;
    if (diffB !== diffA) return diffB - diffA;

    // 3. Head to Head
    // If a beat b
    if (a.headToHead[b.id] === 1) return -1;
    if (a.headToHead[b.id] === -1) return 1;

    // 4. Points Won (optional standard tie break)
    return b.pointsWon - a.pointsWon;
  });
};
