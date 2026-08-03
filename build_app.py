import os

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write('''import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import Download from '@tabler/icons-react/dist/esm/icons/IconDownload.mjs';
import ImageIcon from '@tabler/icons-react/dist/esm/icons/IconPhoto.mjs';
import RotateCcw from '@tabler/icons-react/dist/esm/icons/IconRotate.mjs';
import Grid3X3 from '@tabler/icons-react/dist/esm/icons/IconGrid3x3.mjs';
import Calculator from '@tabler/icons-react/dist/esm/icons/IconCalculator.mjs';
import Type from '@tabler/icons-react/dist/esm/icons/IconTypography.mjs';
import ImagePlus from '@tabler/icons-react/dist/esm/icons/IconPhotoPlus.mjs';
import Bold from '@tabler/icons-react/dist/esm/icons/IconBold.mjs';
import Italic from '@tabler/icons-react/dist/esm/icons/IconItalic.mjs';
import Underline from '@tabler/icons-react/dist/esm/icons/IconUnderline.mjs';
import AlignLeft from '@tabler/icons-react/dist/esm/icons/IconAlignLeft.mjs';
import AlignCenter from '@tabler/icons-react/dist/esm/icons/IconAlignCenter.mjs';
import AlignRight from '@tabler/icons-react/dist/esm/icons/IconAlignRight.mjs';
import Trash2 from '@tabler/icons-react/dist/esm/icons/IconTrash.mjs';
import Copy from '@tabler/icons-react/dist/esm/icons/IconCopy.mjs';
import Plus from '@tabler/icons-react/dist/esm/icons/IconPlus.mjs';
import Minus from '@tabler/icons-react/dist/esm/icons/IconMinus.mjs';
import ChevronLeft from '@tabler/icons-react/dist/esm/icons/IconChevronLeft.mjs';
import ChevronRight from '@tabler/icons-react/dist/esm/icons/IconChevronRight.mjs';
import FilePlus from '@tabler/icons-react/dist/esm/icons/IconFilePlus.mjs';
import AlignStartVertical from '@tabler/icons-react/dist/esm/icons/IconLayoutAlignLeft.mjs';
import AlignCenterVertical from '@tabler/icons-react/dist/esm/icons/IconLayoutAlignCenter.mjs';
import AlignEndVertical from '@tabler/icons-react/dist/esm/icons/IconLayoutAlignRight.mjs';
import AlignStartHorizontal from '@tabler/icons-react/dist/esm/icons/IconLayoutAlignTop.mjs';
import AlignCenterHorizontal from '@tabler/icons-react/dist/esm/icons/IconLayoutAlignMiddle.mjs';
import AlignEndHorizontal from '@tabler/icons-react/dist/esm/icons/IconLayoutAlignBottom.mjs';
import AlignHorizontalSpaceBetween from '@tabler/icons-react/dist/esm/icons/IconLayoutDistributeHorizontal.mjs';
import AlignVerticalSpaceBetween from '@tabler/icons-react/dist/esm/icons/IconLayoutDistributeVertical.mjs';
import Undo from '@tabler/icons-react/dist/esm/icons/IconArrowBackUp.mjs';
import Redo from '@tabler/icons-react/dist/esm/icons/IconArrowForwardUp.mjs';
import Sticker from '@tabler/icons-react/dist/esm/icons/IconSticker.mjs';
import Search from '@tabler/icons-react/dist/esm/icons/IconSearch.mjs';
import ZoomIn from '@tabler/icons-react/dist/esm/icons/IconZoomIn.mjs';
import ZoomOut from '@tabler/icons-react/dist/esm/icons/IconZoomOut.mjs';
import Contrast from '@tabler/icons-react/dist/esm/icons/IconContrast.mjs';
import IconApple from '@tabler/icons-react/dist/esm/icons/IconApple.mjs';
import IconBook from '@tabler/icons-react/dist/esm/icons/IconBook.mjs';
import IconPencil from '@tabler/icons-react/dist/esm/icons/IconPencil.mjs';
import IconCar from '@tabler/icons-react/dist/esm/icons/IconCar.mjs';
import IconTree from '@tabler/icons-react/dist/esm/icons/IconTree.mjs';
import IconHome from '@tabler/icons-react/dist/esm/icons/IconHome.mjs';
import IconMusic from '@tabler/icons-react/dist/esm/icons/IconMusic.mjs';
import IconSun from '@tabler/icons-react/dist/esm/icons/IconSun.mjs';
import IconMoon from '@tabler/icons-react/dist/esm/icons/IconMoon.mjs';
import IconStar from '@tabler/icons-react/dist/esm/icons/IconStar.mjs';
import IconHeart from '@tabler/icons-react/dist/esm/icons/IconHeart.mjs';
import IconFish from '@tabler/icons-react/dist/esm/icons/IconFish.mjs';
import IconDog from '@tabler/icons-react/dist/esm/icons/IconDog.mjs';
import IconCat from '@tabler/icons-react/dist/esm/icons/IconCat.mjs';
import IconBug from '@tabler/icons-react/dist/esm/icons/IconBug.mjs';
import IconBus from '@tabler/icons-react/dist/esm/icons/IconBus.mjs';
import IconTrain from '@tabler/icons-react/dist/esm/icons/IconTrain.mjs';
import IconPlane from '@tabler/icons-react/dist/esm/icons/IconPlane.mjs';
import IconRocket from '@tabler/icons-react/dist/esm/icons/IconRocket.mjs';
import IconRobot from '@tabler/icons-react/dist/esm/icons/IconRobot.mjs';
import IconCrown from '@tabler/icons-react/dist/esm/icons/IconCrown.mjs';
import IconGhost from '@tabler/icons-react/dist/esm/icons/IconGhost.mjs';
import IconAlien from '@tabler/icons-react/dist/esm/icons/IconAlien.mjs';
import IconFlame from '@tabler/icons-react/dist/esm/icons/IconFlame.mjs';
import IconDroplet from '@tabler/icons-react/dist/esm/icons/IconDroplet.mjs';
import IconLeaf from '@tabler/icons-react/dist/esm/icons/IconLeaf.mjs';
import IconSnowflake from '@tabler/icons-react/dist/esm/icons/IconSnowflake.mjs';
import IconCloud from '@tabler/icons-react/dist/esm/icons/IconCloud.mjs';
import IconRainbow from '@tabler/icons-react/dist/esm/icons/IconRainbow.mjs';

const curatedTablerIcons = {
  IconApple, IconBook, IconPencil, IconCar, IconTree, IconHome, IconMusic, IconSun, IconMoon, IconStar, IconHeart, IconFish, IconDog, IconCat, IconBug, IconBus, IconTrain, IconPlane, IconRocket, IconRobot, IconCrown, IconGhost, IconAlien, IconFlame, IconDroplet, IconLeaf, IconSnowflake, IconCloud, IconRainbow
};

import { jsPDF } from 'jspdf';
import { generateWorksheet } from './utils/generatorEngine';
import { clipartCategories } from './utils/clipartLibrary';
import CanvasEditor from './components/CanvasEditor';
import CoverGeneratorModal from './components/CoverGeneratorModal';
import "./index.css";

function App() {
  const [topic, setTopic] = useState('basic_math');
  const [operator, setOperator] = useState('+');
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(10);
  const [allowCarryBorrow, setAllowCarryBorrow] = useState(true);
  const [problemCount, setProblemCount] = useState(10);
  const [orientation, setOrientation] = useState('horizontal');
  const [missingPart, setMissingPart] = useState('first');
  const [sequenceLength, setSequenceLength] = useState(10);
  const [copyrightText, setCopyrightText] = useState('© 2026 Attapol K. All rights reserved. For personal or single-classroom use only. Redistribution or resale is prohibited.');
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [problems, setProblems] = useState([]);
  const [customTexts, setCustomTexts] = useState([]);
  const [customImages, setCustomImages] = useState([]);
  
  const [showGrid, setShowGrid] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showBorder, setShowBorder] = useState(true);
  const [includeAnswerKey, setIncludeAnswerKey] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [coverPageImages, setCoverPageImages] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showElements, setShowElements] = useState(false);
  const [clipartSearch, setClipartSearch] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [emojiStyle, setEmojiStyle] = useState('bw');
  
  const updateEmojiStyle = (style) => {
    setEmojiStyle(style);
    setCustomImages(prev => prev.map(img => {
      if (img.src.startsWith('/emoji/bw/') || img.src.startsWith('/emoji/color/')) {
        const parts = img.src.split('/');
        const filename = parts[parts.length - 1];
        return { ...img, src: /emoji// };
      }
      return img;
    }));
  };
  
  const stageRef = useRef(null);
  const fileInputRef = useRef(null);

  const isUndoing = useRef(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (history.length === 0) {
      setHistory([{ problems, customTexts, customImages, totalPages }]);
      setHistoryIndex(0);
    }
  }, []);

  useEffect(() => {
    if (isUndoing.current) {
      isUndoing.current = false;
      return;
    }
    if (history.length > 0) {
      const currentState = { problems, customTexts, customImages, totalPages };
      const lastState = history[historyIndex];
      if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(currentState);
        if (newHistory.length > 50) newHistory.shift();
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  }, [problems, customTexts, customImages, totalPages]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoing.current = true;
      const prevIndex = historyIndex - 1;
      const prevState = history[prevIndex];
      setProblems(prevState.problems);
      setCustomTexts(prevState.customTexts);
      setCustomImages(prevState.customImages);
      setTotalPages(prevState.totalPages);
      setHistoryIndex(prevIndex);
      setSelectedIds([]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoing.current = true;
      const nextIndex = historyIndex + 1;
      const nextState = history[nextIndex];
      setProblems(nextState.problems);
      setCustomTexts(nextState.customTexts);
      setCustomImages(nextState.customImages);
      setTotalPages(nextState.totalPages);
      setHistoryIndex(nextIndex);
      setSelectedIds([]);
    }
  };

  const handleGenerate = () => {
    const config = { topic, operator, min: minVal, max: maxVal, allowCarryBorrow, orientation, missingPart, sequenceLength };
    const rawProblems = generateWorksheet(problemCount, config);
    
    let cols = 2; let itemsPerPage = 10; let startX = 60; let spacingX = 360; let spacingY = 120; let startY = 250;

    if (topic === 'basic_math') {
      cols = orientation === 'horizontal' ? 2 : 3;
      itemsPerPage = orientation === 'horizontal' ? 10 : 15;
      startX = orientation === 'horizontal' ? 60 : 80;
      spacingX = orientation === 'horizontal' ? 360 : 240;
    } else if (topic === 'missing_number') {
      cols = 1; itemsPerPage = 7; startX = 70; spacingY = 110;
    } else if (topic === 'comparison') {
      cols = 2; itemsPerPage = 12; spacingY = 100;
    } else if (topic === 'number_bond') {
      cols = 3; itemsPerPage = 9; startX = 70; spacingX = 240; spacingY = 260; startY = 200;
    } else if (topic === 'number_line') {
      cols = 1; itemsPerPage = 8; startX = 80; spacingY = 100; startY = 250;
    } else if (topic === 'ten_frame') {
      cols = 2; itemsPerPage = 4; startX = 80; spacingX = 350; spacingY = 320; startY = 250;
    }
    
    const total = Math.ceil(problemCount / itemsPerPage) || 1;
    const targetStartPage = currentPage;
    setTotalPages(prev => Math.max(prev, targetStartPage + total));

    const problemsWithPositions = rawProblems.map((prob, index) => {
      const pageOffset = Math.floor(index / itemsPerPage);
      const targetPage = targetStartPage + pageOffset;
      const indexOnPage = index % itemsPerPage;
      const col = indexOnPage % cols;
      const row = Math.floor(indexOnPage / cols);
      return { ...prob, pageIndex: targetPage, x: startX + (col * spacingX), y: startY + (row * spacingY) };
    });
    
    const pagesAffected = Array.from({length: total}, (_, i) => targetStartPage + i);
    
    setProblems(prev => [
      ...prev.filter(p => !pagesAffected.includes(p.pageIndex)),
      ...problemsWithPositions
    ]);

    let titleText = 'Math Worksheet';
    if (topic === 'basic_math') {
      titleText = operator === '+' ? Addition Within  : Subtraction Within ;
    } else if (topic === 'number_bond') {
      titleText = Number Bonds Within ;
    } else if (topic === 'missing_number') {
      titleText = 'Missing Numbers';
    } else if (topic === 'comparison') {
      titleText = 'Comparing Numbers';
    } else if (topic === 'number_line') {
      titleText = 'Number Line Addition';
    } else if (topic === 'ten_frame') {
      titleText = 'Ten Frames';
    }

    setCustomTexts(prevTexts => {
       const updated = [...prevTexts];
       pagesAffected.forEach(pageIdx => {
          const nameId = header_name_date_;
          const titleId = header_title_;
          if (!updated.find(t => t.id === nameId)) {
             updated.push({ id: nameId, pageIndex: pageIdx, text: 'Name : ...........................................................Date : ...........................', x: 50, y: 50, fontSize: 24, fontFamily: 'Comic Sans MS', isBold: false, isItalic: false, isUnderline: false, align: 'left', fill: '#0f172a' });
          }
          const existingTitle = updated.find(t => t.id === titleId);
          if (existingTitle) existingTitle.text = titleText;
          else updated.push({ id: titleId, pageIndex: pageIdx, text: titleText, x: 220, y: 150, fontSize: 42, fontFamily: 'Comic Sans MS', isBold: true, isItalic: false, isUnderline: false, align: 'left', fill: '#000000' });
       });
       return updated;
    });
    setSelectedIds([]);
  };

  useEffect(() => { handleGenerate(); }, []);

  const handleProblemDragEnd = (id, newX, newY) => setProblems(prev => prev.map(p => p.id === id ? { ...p, x: newX, y: newY } : p));
  const handleTextDragEnd = (id, newX, newY) => setCustomTexts(prev => prev.map(t => t.id === id ? { ...t, x: newX, y: newY } : t));
  const handleTextChange = (id, newAttrs) => setCustomTexts(prev => prev.map(t => t.id === id ? { ...t, ...newAttrs } : t));
  const handleImageDragEnd = (id, newX, newY) => setCustomImages(prev => prev.map(img => img.id === id ? { ...img, x: newX, y: newY } : img));
  const handleImageChange = (id, newAttrs) => setCustomImages(prev => prev.map(img => img.id === id ? { ...img, ...newAttrs } : img));

  const addCustomText = () => {
    const id = 	ext_;
    setCustomTexts([...customTexts, { id, pageIndex: currentPage, text: 'Double click to edit', x: 100, y: 100, fontSize: 24, fontFamily: 'Comic Sans MS', isBold: false, isItalic: false, isUnderline: false, align: 'left', fill: '#0f172a' }]);
    setSelectedIds([id]);
  };

  const triggerImageUpload = () => fileInputRef.current && fileInputRef.current.click();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const id = img_;
      setCustomImages([...customImages, { id, pageIndex: currentPage, src: event.target.result, x: 100, y: 100, width: 150, height: 150, grayscale: true }]);
      setSelectedIds([id]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const addClipart = (clipart) => {
    const id = clip__;
    let src = '';
    
    if (clipart.isTabler) {
      const svgString = ReactDOMServer.renderToStaticMarkup(
        React.createElement(clipart.component, { size: 100, color: emojiStyle === 'bw' ? 'black' : '#3b82f6', strokeWidth: 1.5 })
      );
      let properSvg = svgString;
      if (!properSvg.includes('xmlns=')) {
        properSvg = properSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      src = data:image/svg+xml;base64,;
    } else {
      src = /emoji//.svg;
    }
    
    setCustomImages(prev => [...prev, { id, pageIndex: currentPage, src, x: 200, y: 300, width: 100, height: 100, grayscale: true }]);
    setSelectedIds([id]);
  };

''')
