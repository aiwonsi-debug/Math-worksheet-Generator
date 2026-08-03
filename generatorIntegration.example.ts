// generatorIntegration.example.ts
// ตัวอย่าง pattern การเชื่อม themeConfig.ts เข้ากับ generator เดิม
// ปรับ type Problem และฟังก์ชัน renderPdf ให้ตรงกับโค้ดจริงในโปรเจกต์

import { getThemeById, type ThemeConfig } from "./themeConfig";

type Problem = Record<string, unknown>; // แทนที่ด้วย type โจทย์เดิมของโปรเจกต์
declare function renderPdf(problemSet: Problem[], options: Record<string, unknown>): void;

// ------------------------------------------------------------
// ก่อนเชื่อมธีม (ตัวอย่างโค้ดเดิมที่ hardcode ค่าคงที่)
// ------------------------------------------------------------
// function generateWorksheet(problemSet: Problem[]) {
//   const primaryColor = "#2E5EAA";
//   const counterIcon = "/assets/counters/apple.svg";
//   return renderPdf(problemSet, { primaryColor, counterIcon });
// }

// ------------------------------------------------------------
// หลังเชื่อมธีม
// ------------------------------------------------------------
interface GenerateOptions {
  problemSet: Problem[];
  themeId: string; // เช่น "halloween-2026"
}

export function generateWorksheet({ problemSet, themeId }: GenerateOptions): void {
  const theme: ThemeConfig | undefined = getThemeById(themeId);

  if (!theme) {
    throw new Error(`ไม่พบธีม: ${themeId}`);
  }

  renderPdf(problemSet, {
    primaryColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
    headingFont: theme.fonts.heading,
    bodyFont: theme.fonts.body,
    counterIcon: theme.counters[0]?.svgPath,
    characterName: theme.characters[0]?.name,
  });
}

// เรียกใช้จาก UI หรือ script batch
// generateWorksheet({ problemSet: myProblems, themeId: "halloween-2026" });
