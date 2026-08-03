// themeConfig.js
// แยกข้อมูลธีมออกจาก logic หลัก ใช้ emoji code อ้างอิงจาก clipartLibrary.js
// (Noto Emoji — SIL Open Font License, ใช้เชิงพาณิชย์ได้ฟรี ไม่ต้อง credit)
// แนะนำวางไฟล์นี้ที่ src/config/themeConfig.js

export const themes = [
  {
    id: "back-to-school-2026",
    displayName: "Back to School Math",
    season: "back-to-school",
    targetMonth: 8, // 1-12 เดือนเป้าหมายของธีม ไม่ใช่เดือนเผยแพร่
    seoKeywords: ["back to school math worksheets", "first grade review"],
    themeColor: "#2E5EAA",   // เชื่อมกับ CoverGeneratorModal.jsx -> themeColor
    accentColor: "#E94F37",  // เชื่อมกับ CoverGeneratorModal.jsx -> accentColor
    counters: [
      { code: "1f34e", label: "Apple" }, // มีอยู่แล้วใน clipartLibrary.js
    ],
    characters: [{ name: "Nina", role: "student" }],
  },
  {
    id: "halloween-2026",
    displayName: "Halloween Pumpkin Math",
    season: "fall",
    targetMonth: 10,
    seoKeywords: ["halloween math worksheets", "pumpkin counting"],
    themeColor: "#FF7518",
    accentColor: "#4B0082",
    counters: [
      { code: "1f47b", label: "Ghost" }, // มีอยู่แล้วใน clipartLibrary.js
      { code: "1f383", label: "Jack-o-lantern" }, // ยังไม่มีใน dist/emoji/bw ต้องเพิ่มจาก Noto Emoji repo ต้นทาง
    ],
    characters: [{ name: "Sam", role: "trick-or-treater" }],
    decodableWords: [{ phonicsSkill: "short a", words: ["bat", "cat", "hat"] }],
  },
  {
    id: "hundredth-day-2027",
    displayName: "100th Day of School",
    season: "hundredth-day",
    targetMonth: 2,
    seoKeywords: ["100th day of school math", "100th day counting worksheets"],
    themeColor: "#D7263D",
    accentColor: "#F4D35E",
    counters: [
      { code: "2b50", label: "Star" }, // มีอยู่แล้วใน clipartLibrary.js
    ],
    characters: [{ name: "Leo", role: "student" }],
  },
  {
    id: "thanksgiving-2026",
    displayName: "Thanksgiving Turkey Math",
    season: "fall",
    targetMonth: 11,
    seoKeywords: ["thanksgiving math worksheets", "turkey addition"],
    themeColor: "#8B4513",
    accentColor: "#D2691E",
    counters: [
      { code: "1f983", label: "Turkey" },
      { code: "1f967", label: "Pie" },
      { code: "1f342", label: "Fallen Leaf" },
    ],
    characters: [{ name: "Emma", role: "student" }],
  },
  {
    id: "winter-2027",
    displayName: "Winter Snowman Math",
    season: "winter-holiday",
    targetMonth: 1,
    seoKeywords: ["winter math worksheets", "snowman counting"],
    themeColor: "#4A90D9",
    accentColor: "#FFFFFF",
    counters: [
      { code: "2603", label: "Snowman" },
      { code: "2744", label: "Snowflake" },
    ],
    characters: [{ name: "Jack", role: "student" }],
  },
  {
    id: "christmas-2026",
    displayName: "Christmas Math",
    season: "winter-holiday",
    targetMonth: 12,
    seoKeywords: ["christmas math worksheets", "santa counting"],
    themeColor: "#C41E3A",
    accentColor: "#165B33",
    counters: [
      { code: "1f384", label: "Christmas Tree" },
      { code: "1f385", label: "Santa" },
    ],
    characters: [{ name: "Holly", role: "student" }],
  },
  {
    id: "valentine-2027",
    displayName: "Valentine's Day Math",
    season: "valentine",
    targetMonth: 2,
    seoKeywords: ["valentine math worksheets", "heart addition"],
    themeColor: "#E91E63",
    accentColor: "#FFC0CB",
    counters: [
      { code: "1f495", label: "Two Hearts" },
      { code: "1f339", label: "Rose" },
    ],
    characters: [{ name: "Mia", role: "student" }],
  },
  {
    id: "st-patricks-2027",
    displayName: "St. Patrick's Day Math",
    season: "spring",
    targetMonth: 3,
    seoKeywords: ["st patrick's day math worksheets", "shamrock counting"],
    themeColor: "#009E60",
    accentColor: "#FFD700",
    counters: [{ code: "2618", label: "Shamrock" }],
    characters: [{ name: "Liam", role: "student" }],
  },
  {
    id: "easter-2027",
    displayName: "Easter Egg Math",
    season: "spring",
    targetMonth: 4,
    seoKeywords: ["easter math worksheets", "egg counting"],
    themeColor: "#FFB6C1",
    accentColor: "#87CEEB",
    counters: [
      { code: "1f95a", label: "Egg" },
      { code: "1f425", label: "Baby Chick" },
      { code: "1f337", label: "Tulip" },
    ],
    characters: [{ name: "Ava", role: "student" }],
  },
  {
    id: "summer-2027",
    displayName: "Summer Space Math",
    season: "summer",
    targetMonth: 6,
    seoKeywords: ["summer math packet", "space themed addition"],
    themeColor: "#00BCD4",
    accentColor: "#FFEB3B",
    counters: [
      { code: "1f680", label: "Rocket" },
      { code: "2600", label: "Sun" },
    ],
    characters: [{ name: "Noah", role: "astronaut" }],
  },
  {
    id: "sports-evergreen",
    displayName: "Sports Math",
    season: "evergreen",
    targetMonth: 5,
    seoKeywords: ["sports math worksheets", "soccer baseball counting"],
    themeColor: "#2E7D32",
    accentColor: "#FF9800",
    counters: [
      { code: "26bd", label: "Soccer Ball" },
      { code: "26be", label: "Baseball" },
      { code: "1f3c8", label: "Football" },
      { code: "1f3c5", label: "Medal" },
    ],
    characters: [{ name: "Alex", role: "athlete" }],
  },
  {
    id: "vehicles-evergreen",
    displayName: "Vehicles & Transportation Math",
    season: "evergreen",
    targetMonth: 7,
    seoKeywords: ["vehicle math worksheets", "car train counting"],
    themeColor: "#1976D2",
    accentColor: "#F44336",
    counters: [
      { code: "1f697", label: "Car" },
      { code: "2708", label: "Airplane" },
      { code: "1f686", label: "Train" },
      { code: "1f6b2", label: "Bicycle" },
    ],
    characters: [{ name: "Leo", role: "driver" }],
  },
  {
    id: "weather-evergreen",
    displayName: "Weather & Seasons Math",
    season: "evergreen",
    targetMonth: 9,
    seoKeywords: ["weather math worksheets", "rain cloud counting"],
    themeColor: "#0288D1",
    accentColor: "#FFEB3B",
    counters: [
      { code: "2601", label: "Cloud" },
      { code: "1f327", label: "Rain Cloud" },
      { code: "2602", label: "Umbrella" },
      { code: "1f32a", label: "Tornado" },
    ],
    characters: [{ name: "Maya", role: "meteorologist" }],
  },
  {
    id: "careers-evergreen",
    displayName: "Community Helpers & Careers Math",
    season: "evergreen",
    targetMonth: 5,
    seoKeywords: ["community helpers math", "careers counting worksheets"],
    themeColor: "#7B1FA2",
    accentColor: "#FFC107",
    counters: [
      { code: "1fa7a", label: "Stethoscope" },
      { code: "1f692", label: "Fire Engine" },
      { code: "1f693", label: "Police Car" },
      { code: "1f393", label: "Graduation Cap" },
    ],
    characters: [{ name: "Dr. Sam", role: "community helper" }],
  },
];

export function getThemeById(themeId) {
  return themes.find((t) => t.id === themeId);
}

export function getThemesByTargetMonth(month) {
  return themes.filter((t) => t.targetMonth === month);
}

// คำนวณเดือนที่ควรเผยแพร่ (listing) จาก targetMonth ลบ lead time
// leadMonths ค่าเริ่มต้น 1 เดือน / ธีมแข่งขันสูงเช่น Christmas แนะนำ 2
export function getSuggestedListingMonth(theme, leadMonths = 1) {
  return ((theme.targetMonth - 1 - leadMonths + 12) % 12) + 1;
}
