
// Helper to generate matches for 4 teams (Round Robin) - 6 matches
const createMatches4 = (teams) => [
  { id: 'm1', team1Id: teams[0].id, team2Id: teams[1].id, team1Name: teams[0].name, team2Name: teams[1].name },
  { id: 'm2', team1Id: teams[2].id, team2Id: teams[3].id, team1Name: teams[2].name, team2Name: teams[3].name },
  { id: 'm3', team1Id: teams[0].id, team2Id: teams[2].id, team1Name: teams[0].name, team2Name: teams[2].name },
  { id: 'm4', team1Id: teams[1].id, team2Id: teams[3].id, team1Name: teams[1].name, team2Name: teams[3].name },
  { id: 'm5', team1Id: teams[0].id, team2Id: teams[3].id, team1Name: teams[0].name, team2Name: teams[3].name },
  { id: 'm6', team1Id: teams[1].id, team2Id: teams[2].id, team1Name: teams[1].name, team2Name: teams[2].name },
];

// Helper to generate matches for 3 teams (Round Robin) - 3 matches
// 1 vs 2, 1 vs 3, 2 vs 3
const createMatches3 = (teams) => [
  { id: 'm1', team1Id: teams[0].id, team2Id: teams[1].id, team1Name: teams[0].name, team2Name: teams[1].name },
  { id: 'm2', team1Id: teams[0].id, team2Id: teams[2].id, team1Name: teams[0].name, team2Name: teams[2].name },
  { id: 'm3', team1Id: teams[1].id, team2Id: teams[2].id, team1Name: teams[1].name, team2Name: teams[2].name },
];

export const advancedGroups = [
  {
    id: 'A1',
    name: "Nhánh 1",
    teams: [
      { id: 'A1_1', name: "Nguyễn Thơ – Đức Huy" },
      { id: 'A1_2', name: "Chuẩn – Hưng" },
      { id: 'A1_3', name: "Trung Anh – Nguyên" },
      { id: 'A1_4', name: "Sơn Lộc – Thanh Na" },
    ],
    matches: [
        { id: 'A1_m1', team1Id: 'A1_1', team2Id: 'A1_2' },
        { id: 'A1_m2', team1Id: 'A1_3', team2Id: 'A1_4' },
        { id: 'A1_m3', team1Id: 'A1_1', team2Id: 'A1_3' },
        { id: 'A1_m4', team1Id: 'A1_2', team2Id: 'A1_4' },
        { id: 'A1_m5', team1Id: 'A1_1', team2Id: 'A1_4' },
        { id: 'A1_m6', team1Id: 'A1_2', team2Id: 'A1_3' },
    ]
  },
  {
    id: 'A2',
    name: "Nhánh 2",
    teams: [
      { id: 'A2_1', name: "C Thảo – Chiến" },
      { id: 'A2_2', name: "Văn Lộc – Huyền Trân" },
      { id: 'A2_3', name: "Việt Hoàng – Quốc Cường" },
      { id: 'A2_4', name: "Phan Anh – Quang" },
    ],
    matches: [
        { id: 'A2_m1', team1Id: 'A2_1', team2Id: 'A2_2' },
        { id: 'A2_m2', team1Id: 'A2_3', team2Id: 'A2_4' },
        { id: 'A2_m3', team1Id: 'A2_1', team2Id: 'A2_3' },
        { id: 'A2_m4', team1Id: 'A2_2', team2Id: 'A2_4' },
        { id: 'A2_m5', team1Id: 'A2_1', team2Id: 'A2_4' },
        { id: 'A2_m6', team1Id: 'A2_2', team2Id: 'A2_3' },
    ]
  },
  {
    id: 'A3',
    name: "Nhánh 3",
    teams: [
      { id: 'A3_1', name: "Hải Nam – Nhật" },
      { id: 'A3_2', name: "A Bi – A Ken" },
      { id: 'A3_3', name: "Khang – Bình" },
      { id: 'A3_4', name: "Nhật Nam – Phước Trang" },
    ],
    matches: [
        { id: 'A3_m1', team1Id: 'A3_1', team2Id: 'A3_2' },
        { id: 'A3_m2', team1Id: 'A3_3', team2Id: 'A3_4' },
        { id: 'A3_m3', team1Id: 'A3_1', team2Id: 'A3_3' },
        { id: 'A3_m4', team1Id: 'A3_2', team2Id: 'A3_4' },
        { id: 'A3_m5', team1Id: 'A3_1', team2Id: 'A3_4' },
        { id: 'A3_m6', team1Id: 'A3_2', team2Id: 'A3_3' },
    ]
  },
  {
    id: 'A4',
    name: "Nhánh 4",
    teams: [
      { id: 'A4_1', name: "Tài – Ken" },
      { id: 'A4_2', name: "Sơn – Nhân" },
      { id: 'A4_3', name: "Bảo Huy – Tường" },
      { id: 'A4_4', name: "Vinh – Thu" },
    ],
    matches: [
        { id: 'A4_m1', team1Id: 'A4_1', team2Id: 'A4_2' },
        { id: 'A4_m2', team1Id: 'A4_3', team2Id: 'A4_4' },
        { id: 'A4_m3', team1Id: 'A4_1', team2Id: 'A4_3' },
        { id: 'A4_m4', team1Id: 'A4_2', team2Id: 'A4_4' },
        { id: 'A4_m5', team1Id: 'A4_1', team2Id: 'A4_4' },
        { id: 'A4_m6', team1Id: 'A4_2', team2Id: 'A4_3' },
    ]
  }
];

export const basicGroups = [
  {
    id: 'B1',
    name: "Nhánh 1",
    teams: [
      { id: 'B1_1', name: "C Thảo – Nam" },
      { id: 'B1_2', name: "A Dương – C Thuỳ" },
      { id: 'B1_3', name: "Thuỷ – Trâm (+3)" }, // Note: others handicap 3 when vs this
    ],
    matches: [
        { id: 'B1_m1', team1Id: 'B1_1', team2Id: 'B1_2' },
        { id: 'B1_m2', team1Id: 'B1_1', team2Id: 'B1_3' },
        { id: 'B1_m3', team1Id: 'B1_2', team2Id: 'B1_3' },
    ]
  },
  {
    id: 'B2',
    name: "Nhánh 2",
    teams: [
      { id: 'B2_1', name: "C Út – A Vũ" },
      { id: 'B2_2', name: "Nhi – X. Thảo (+3)" }, // Note: others handicap 3 when vs this
      { id: 'B2_3', name: "Uyên – Hoà" },
    ],
    matches: [
        { id: 'B2_m1', team1Id: 'B2_1', team2Id: 'B2_3' },
        { id: 'B2_m2', team1Id: 'B2_1', team2Id: 'B2_2' },
        { id: 'B2_m3', team1Id: 'B2_3', team2Id: 'B2_2' },
    ]
  }
];
