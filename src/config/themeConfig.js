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
