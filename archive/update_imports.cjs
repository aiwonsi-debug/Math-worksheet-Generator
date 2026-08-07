const names = {
  Download: 'IconDownload',
  ImageIcon: 'IconPhoto',
  RotateCcw: 'IconRotate',
  Grid3X3: 'IconGrid3x3',
  Calculator: 'IconCalculator',
  Type: 'IconTypography',
  ImagePlus: 'IconPhotoPlus',
  Bold: 'IconBold',
  Italic: 'IconItalic',
  Underline: 'IconUnderline',
  AlignLeft: 'IconAlignLeft',
  AlignCenter: 'IconAlignCenter',
  AlignRight: 'IconAlignRight',
  Trash2: 'IconTrash',
  Copy: 'IconCopy',
  Plus: 'IconPlus',
  Minus: 'IconMinus',
  ChevronLeft: 'IconChevronLeft',
  ChevronRight: 'IconChevronRight',
  FilePlus: 'IconFilePlus',
  AlignStartVertical: 'IconLayoutAlignLeft',
  AlignCenterVertical: 'IconLayoutAlignCenter',
  AlignEndVertical: 'IconLayoutAlignRight',
  AlignStartHorizontal: 'IconLayoutAlignTop',
  AlignCenterHorizontal: 'IconLayoutAlignMiddle',
  AlignEndHorizontal: 'IconLayoutAlignBottom',
  AlignHorizontalSpaceBetween: 'IconLayoutDistributeHorizontal',
  AlignVerticalSpaceBetween: 'IconLayoutDistributeVertical',
  Undo: 'IconArrowBackUp',
  Redo: 'IconArrowForwardUp',
  Sticker: 'IconSticker',
  Search: 'IconSearch',
  ZoomIn: 'IconZoomIn',
  ZoomOut: 'IconZoomOut',
  Contrast: 'IconContrast',
  IconApple: 'IconApple', IconBook: 'IconBook', IconPencil: 'IconPencil', IconCar: 'IconCar', IconTree: 'IconTree', IconHome: 'IconHome', IconMusic: 'IconMusic', IconSun: 'IconSun', IconMoon: 'IconMoon', IconStar: 'IconStar', IconHeart: 'IconHeart', IconFish: 'IconFish', IconDog: 'IconDog', IconCat: 'IconCat', IconBug: 'IconBug', IconBus: 'IconBus', IconTrain: 'IconTrain', IconPlane: 'IconPlane', IconRocket: 'IconRocket', IconRobot: 'IconRobot', IconCrown: 'IconCrown', IconGhost: 'IconGhost', IconAlien: 'IconAlien', IconFlame: 'IconFlame', IconDrop: 'IconDrop', IconLeaf: 'IconLeaf', IconSnowflake: 'IconSnowflake', IconBolt: 'IconBolt', IconCloud: 'IconCloud', IconRainbow: 'IconRainbow'
};
let imports = '';
for (const [alias, original] of Object.entries(names)) {
  imports += `import ${alias} from '@tabler/icons-react/dist/esm/icons/${original}.mjs';\n`;
}
const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
content = content.replace(/import { IconDownload as Download[^;]+;/, imports);
fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated with deep imports');
