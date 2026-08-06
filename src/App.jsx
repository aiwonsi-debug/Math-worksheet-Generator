import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import Download from '@tabler/icons-react/dist/esm/icons/IconDownload.mjs';
import ImageIcon from '@tabler/icons-react/dist/esm/icons/IconPhoto.mjs';
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
import IconDeviceFloppy from '@tabler/icons-react/dist/esm/icons/IconDeviceFloppy.mjs';
import IconFolderOpen from '@tabler/icons-react/dist/esm/icons/IconFolderOpen.mjs';
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
import TPTListingHelper from './components/TPTListingHelper';
import TrendPlanner from './components/TrendPlanner';
import "./index.css";

const HEADER_NAME_DATE_TEXT = "Name : ............................................................................................................................Date : ........................................................ ";

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
  const [coverDataUrl, setCoverDataUrl] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showElements, setShowElements] = useState(false);
  const [clipartSearch, setClipartSearch] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [emojiStyle, setEmojiStyle] = useState('bw');
  const [isFetchingEmoji, setIsFetchingEmoji] = useState(false);
  const [emojiFetchStatus, setEmojiFetchStatus] = useState('');
  
  const updateEmojiStyle = (style) => {
    setEmojiStyle(style);
    setCustomImages(prev => prev.map(img => {
      if (img.src.startsWith('/emoji/bw/') || img.src.startsWith('/emoji/color/')) {
        const parts = img.src.split('/');
        const filename = parts[parts.length - 1];
        return { ...img, src: `/emoji/${style}/${filename}` };
      }
      return img;
    }));
  };

  const handleGenerateLiveEmoji = async (inputQuery) => {
    const query = (inputQuery || clipartSearch).trim();
    if (!query) return;

    setIsFetchingEmoji(true);
    setEmojiFetchStatus('Searching GitHub for vector clipart...');

    try {
      let hex = '';
      if (/^[0-9a-fA-F_]+$/.test(query)) {
        hex = query.toLowerCase();
      } else {
        const codePoints = [];
        for (const char of query) {
          codePoints.push(char.codePointAt(0).toString(16));
        }
        hex = codePoints.join('_');
      }

      const url = `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${hex}.svg`;
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Emoji '${query}' (${hex}) not found on GitHub.`);
      }

      let svgText = await resp.text();
      if (!svgText.includes('width=')) {
        svgText = svgText.replace('<svg', '<svg width="512" height="512"');
      }
      const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgText)))}`;

      const id = `clip_${Date.now()}`;
      setCustomImages(prev => [...prev, { id, pageIndex: currentPage, src: dataUrl, x: 200, y: 300, width: 160, height: 160, grayscale: false }]);
      setSelectedIds([id]);
      setEmojiFetchStatus(`✅ Added clipart for '${query}'!`);
      setTimeout(() => setEmojiFetchStatus(''), 3500);
    } catch (err) {
      setEmojiFetchStatus(`❌ ${err.message || 'Could not fetch emoji'}`);
      setTimeout(() => setEmojiFetchStatus(''), 4500);
    } finally {
      setIsFetchingEmoji(false);
    }
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
  }, [history.length, problems, customTexts, customImages, totalPages]);

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
  }, [problems, customTexts, customImages, totalPages, history, historyIndex]);

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

  const getPositionedProblems = (rawProblems, activeTopic, activeOrientation, targetStartPage) => {
    let cols = 2;
    let itemsPerPage = 10;
    let startX = 60;
    let spacingX = 360;
    let startY = 230;
    let targetMaxY = 970;
    let itemHeight = 75;
    let defaultSpacingY = 120;
    let maxAllowedSpacing = 220;

    if (activeTopic === 'basic_math') {
      cols = activeOrientation === 'horizontal' ? 2 : 3;
      itemsPerPage = activeOrientation === 'horizontal' ? 12 : 15;
      startX = activeOrientation === 'horizontal' ? 60 : 80;
      spacingX = activeOrientation === 'horizontal' ? 360 : 240;
      itemHeight = activeOrientation === 'horizontal' ? 75 : 100;
      defaultSpacingY = activeOrientation === 'horizontal' ? 120 : 135;
      maxAllowedSpacing = activeOrientation === 'horizontal' ? 220 : 175;
    } else if (activeTopic === 'missing_number') {
      cols = 1; itemsPerPage = 8; startX = 70; itemHeight = 90; defaultSpacingY = 110; maxAllowedSpacing = 130;
    } else if (activeTopic === 'comparison') {
      cols = 2; itemsPerPage = 14; startX = 120; spacingX = 300; itemHeight = 50; defaultSpacingY = 100; maxAllowedSpacing = 150;
    } else if (activeTopic === 'number_bond') {
      cols = 3; itemsPerPage = 9; startX = 70; spacingX = 240; startY = 210; itemHeight = 210; defaultSpacingY = 250; maxAllowedSpacing = 270;
    } else if (activeTopic === 'number_line') {
      cols = 1; itemsPerPage = 8; startX = 80; itemHeight = 80; defaultSpacingY = 100; maxAllowedSpacing = 130;
    } else if (activeTopic === 'ten_frame') {
      cols = 2; itemsPerPage = 4; startX = 80; spacingX = 350; itemHeight = 180; defaultSpacingY = 250; maxAllowedSpacing = 300;
    } else if (activeTopic === 'ten_frame_comparison') {
      cols = 1; itemsPerPage = 7; startX = 50; startY = 220; itemHeight = 100; defaultSpacingY = 120; maxAllowedSpacing = 140;
    } else if (activeTopic === 'word_problem' || activeTopic === 'decodable_word_problem') {
      cols = 1; itemsPerPage = 3; startX = 70; startY = 220; itemHeight = 250; defaultSpacingY = 265; maxAllowedSpacing = 275;
    } else if (activeTopic === 'fact_family') {
      cols = 1; itemsPerPage = 3; startX = 70; spacingX = 350; startY = 220; itemHeight = 180; defaultSpacingY = 260; maxAllowedSpacing = 270;
    } else if (activeTopic === 'missing_addend') {
      cols = 2; itemsPerPage = 12; startX = 60; spacingX = 360; itemHeight = 75; defaultSpacingY = 120; maxAllowedSpacing = 220;
    }

    const problemsByPageOffset = {};
    rawProblems.forEach((prob, index) => {
      const pageOffset = Math.floor(index / itemsPerPage);
      if (!problemsByPageOffset[pageOffset]) problemsByPageOffset[pageOffset] = [];
      problemsByPageOffset[pageOffset].push({ prob, indexOnPage: index % itemsPerPage });
    });

    const problemsWithPositions = [];

    Object.keys(problemsByPageOffset).forEach(offsetStr => {
      const pageOffset = parseInt(offsetStr, 10);
      const targetPage = targetStartPage + pageOffset;
      const pageItems = problemsByPageOffset[offsetStr];
      const countOnPage = pageItems.length;
      const rowsOnPage = Math.ceil(countOnPage / cols);

      const availHeight = (targetMaxY - itemHeight) - startY;
      let spacingY = defaultSpacingY;
      let actualStartY = startY;

      if (rowsOnPage === 1) {
        actualStartY = startY + availHeight / 2;
      } else if (rowsOnPage > 1) {
        spacingY = Math.min(maxAllowedSpacing, availHeight / (rowsOnPage - 1));
        const totalSpan = (rowsOnPage - 1) * spacingY;
        actualStartY = startY + (availHeight - totalSpan) / 2;
      }

      pageItems.forEach(({ prob, indexOnPage }) => {
        const col = indexOnPage % cols;
        const row = Math.floor(indexOnPage / cols);
        const x = startX + (col * spacingX);
        const y = actualStartY + (row * spacingY);
        problemsWithPositions.push({ ...prob, pageIndex: targetPage, x, y });
      });
    });

    return { problemsWithPositions, itemsPerPage, cols };
  };

  const handleGenerate = (customConfig = null, customCount = null) => {
    const activeTopic = customConfig?.topic || topic;
    const activeOperator = customConfig?.operator || operator;
    const activeMinVal = customConfig?.minVal !== undefined ? customConfig.minVal : minVal;
    const activeMaxVal = customConfig?.maxVal !== undefined ? customConfig.maxVal : maxVal;
    const activeAllowCarryBorrow = customConfig?.allowCarryBorrow !== undefined ? customConfig.allowCarryBorrow : allowCarryBorrow;
    const activeOrientation = customConfig?.orientation || orientation;
    const activeMissingPart = customConfig?.missingPart || missingPart;
    const activeSequenceLength = customConfig?.sequenceLength || sequenceLength;
    const pCount = customCount || customConfig?.problemCount || problemCount;

    const config = {
      topic: activeTopic,
      operator: activeOperator,
      min: activeMinVal,
      max: activeMaxVal,
      allowCarryBorrow: activeAllowCarryBorrow,
      orientation: activeOrientation,
      missingPart: activeMissingPart,
      sequenceLength: activeSequenceLength
    };
    
    const rawProblems = generateWorksheet(pCount, config);
    const targetStartPage = customConfig ? 0 : currentPage;
    if (customConfig) {
      setCurrentPage(0);
    }

    const { problemsWithPositions, itemsPerPage } = getPositionedProblems(rawProblems, activeTopic, activeOrientation, targetStartPage);
    const total = Math.ceil(pCount / itemsPerPage) || 1;
    setTotalPages(prev => Math.max(prev, targetStartPage + total));

    const pagesAffected = Array.from({length: total}, (_, i) => targetStartPage + i);
    
    setProblems(prev => [
      ...prev.filter(p => !pagesAffected.includes(p.pageIndex)),
      ...problemsWithPositions
    ]);

    let titleText = 'Math Worksheet';
    if (activeTopic === 'basic_math') {
      titleText = activeOperator === '+' ? `Addition Within ${activeMaxVal}` : `Subtraction Within ${activeMaxVal}`;
    } else if (activeTopic === 'number_bond') {
      titleText = `Number Bonds Within ${activeMaxVal}`;
    } else if (activeTopic === 'missing_number') {
      titleText = 'Missing Numbers';
    } else if (activeTopic === 'comparison') {
      titleText = 'Comparing Numbers';
    } else if (activeTopic === 'number_line') {
      titleText = 'Number Line Addition';
    } else if (activeTopic === 'ten_frame') {
      titleText = 'Ten Frames';
    } else if (activeTopic === 'ten_frame_comparison') {
      titleText = 'COMPARING NUMBERS';
    } else if (activeTopic === 'word_problem') {
      titleText = 'Math Word Problems';
    } else if (activeTopic === 'fact_family') {
      titleText = 'Fact Families';
    } else if (activeTopic === 'missing_addend') {
      titleText = `Missing Addends (Sum to ${activeMaxVal})`;
    } else if (activeTopic === 'decodable_word_problem') {
      titleText = 'Read & Solve Math Problems';
    }

    setCustomTexts(prevTexts => {
       const updated = prevTexts.filter(t => !t.id.startsWith('text_wp_') || !pagesAffected.includes(t.pageIndex));
       pagesAffected.forEach(pageIdx => {
          const nameId = `header_name_date_${pageIdx}`;
          const titleId = `header_title_${pageIdx}`;
          const existingName = updated.find(t => t.id === nameId);
          if (existingName) {
             existingName.text = HEADER_NAME_DATE_TEXT;
             existingName.x = 50;
             existingName.y = 50;
             existingName.width = 1400;
             existingName.fontSize = 20;
          } else {
             updated.push({ id: nameId, pageIndex: pageIdx, text: HEADER_NAME_DATE_TEXT, x: 50, y: 50, width: 1400, fontSize: 20, fontFamily: 'Comic Neue', isBold: false, isItalic: false, isUnderline: false, align: 'left', fill: '#0f172a' });
          }
          const existingTitle = updated.find(t => t.id === titleId);
          if (existingTitle) existingTitle.text = titleText;
          else updated.push({ id: titleId, pageIndex: pageIdx, text: titleText, x: 220, y: 150, fontSize: 42, fontFamily: 'Comic Neue', isBold: true, isItalic: false, isUnderline: false, align: 'left', fill: '#000000' });
       });
       
       problemsWithPositions.forEach(prob => {
         if (prob.type === 'word_problem' || prob.type === 'decodable_word_problem') {
           const id = `text_wp_${prob.id}`;
           const existing = updated.find(t => t.id === id);
           if (existing) {
             existing.x = prob.x + 45;
             existing.y = prob.y + 5;
             existing.pageIndex = prob.pageIndex;
           } else {
             updated.push({
               id,
               pageIndex: prob.pageIndex,
               text: prob.options.question,
               x: prob.x + 45,
               y: prob.y + 5,
               width: 600,
               fontSize: 18,
               fontFamily: 'Comic Neue',
               isBold: false,
               isItalic: false,
               isUnderline: false,
               align: 'left',
               fill: '#0f172a'
             });
           }
         }
       });

       return updated;
    });
    setSelectedIds([]);
  };

  const handleBatchGenerate = () => {
    const config = { topic, operator, min: minVal, max: maxVal, allowCarryBorrow, orientation, missingPart, sequenceLength };
    
    // Determine itemsPerPage for pagesPerVariation calculation
    const sample = getPositionedProblems([], topic, orientation, 0);
    const itemsPerPage = sample.itemsPerPage;
    
    const pagesPerVariation = Math.ceil(problemCount / itemsPerPage) || 1;
    const totalVariations = 5;
    const totalNewPages = pagesPerVariation * totalVariations;
    
    // If the document is currently empty (1 blank page with 0 problems), start at 0, otherwise append
    const targetStartPage = (totalPages === 1 && problems.length === 0) ? 0 : totalPages;
    setTotalPages(prev => Math.max(prev, targetStartPage + totalNewPages));

    let allNewProblems = [];
    let allNewTexts = [];
    
    let titleText = 'Math Worksheet';
    if (topic === 'basic_math') {
      titleText = operator === '+' ? `Addition Within ${maxVal}` : `Subtraction Within ${maxVal}`;
    } else if (topic === 'number_bond') {
      titleText = `Number Bonds Within ${maxVal}`;
    } else if (topic === 'missing_number') {
      titleText = 'Missing Numbers';
    } else if (topic === 'comparison') {
      titleText = 'Comparing Numbers';
    } else if (topic === 'number_line') {
      titleText = 'Number Line Addition';
    } else if (topic === 'ten_frame') {
      titleText = 'Ten Frames';
    } else if (topic === 'ten_frame_comparison') {
      titleText = 'COMPARING NUMBERS';
    } else if (topic === 'word_problem') {
      titleText = 'Math Word Problems';
    } else if (topic === 'fact_family') {
      titleText = 'Fact Families';
    } else if (topic === 'missing_addend') {
      titleText = `Missing Addends (Sum to ${maxVal})`;
    } else if (topic === 'decodable_word_problem') {
      titleText = 'Read & Solve Math Problems';
    }

    for(let v = 0; v < totalVariations; v++) {
      const rawProblems = generateWorksheet(problemCount, config);
      const varStartPage = targetStartPage + (v * pagesPerVariation);
      
      const { problemsWithPositions } = getPositionedProblems(rawProblems, topic, orientation, varStartPage);
      allNewProblems.push(...problemsWithPositions);
      
      for(let p = 0; p < pagesPerVariation; p++) {
        const pageIdx = varStartPage + p;
        const nameId = `header_name_date_${pageIdx}`;
        const titleId = `header_title_${pageIdx}`;
        allNewTexts.push({ id: nameId, pageIndex: pageIdx, text: HEADER_NAME_DATE_TEXT, x: 50, y: 50, width: 1400, fontSize: 20, fontFamily: 'Comic Neue', isBold: false, isItalic: false, isUnderline: false, align: 'left', fill: '#0f172a' });
        allNewTexts.push({ id: titleId, pageIndex: pageIdx, text: titleText, x: 220, y: 150, fontSize: 42, fontFamily: 'Comic Neue', isBold: true, isItalic: false, isUnderline: false, align: 'left', fill: '#000000' });
      }
      
      problemsWithPositions.forEach(prob => {
         if (prob.type === 'word_problem' || prob.type === 'decodable_word_problem') {
           const id = `text_wp_${prob.id}`;
           allNewTexts.push({
             id,
             pageIndex: prob.pageIndex,
             text: prob.options.question,
             x: prob.x + 45,
             y: prob.y + 5,
             width: 600,
             fontSize: 18,
             fontFamily: 'Comic Neue',
             isBold: false,
             isItalic: false,
             isUnderline: false,
             align: 'left',
             fill: '#0f172a'
           });
         }
      });
    }

    setProblems(prev => [...prev, ...allNewProblems]);
    setCustomTexts(prevTexts => {
       const updated = [...prevTexts];
       allNewTexts.forEach(newText => {
         const existing = updated.find(t => t.id === newText.id);
         if (existing) {
           existing.text = newText.text;
         } else {
           updated.push(newText);
         }
       });
       return updated;
    });
    
    // Copy the cliparts and custom texts (excluding auto-generated headers) from page 0 to all new pages
    setCustomImages(prevImages => {
      const updated = [...prevImages];
      const templateImages = updated.filter(img => img.pageIndex === 0 || img.pageIndex === undefined);
      
      for(let v = 0; v < totalVariations; v++) {
        for(let p = 0; p < pagesPerVariation; p++) {
          const pageIdx = targetStartPage + (v * pagesPerVariation) + p;
          if (pageIdx === 0) continue; // Don't duplicate to page 0 if we started there
          
          templateImages.forEach(img => {
            const newId = `${img.id}_var_${pageIdx}_${Math.random().toString(36).substr(2, 5)}`;
            updated.push({ ...img, id: newId, pageIndex: pageIdx });
          });
        }
      }
      return updated;
    });

    setSelectedIds([]);
    setCurrentPage(targetStartPage);
  };

  useEffect(() => { handleGenerate(); }, []);

  const handleProblemDragEnd = (id, newX, newY) => setProblems(prev => prev.map(p => p.id === id ? { ...p, x: newX, y: newY } : p));
  const handleTextDragEnd = (id, newX, newY) => setCustomTexts(prev => prev.map(t => t.id === id ? { ...t, x: newX, y: newY } : t));
  const handleTextChange = (id, newAttrs) => setCustomTexts(prev => prev.map(t => t.id === id ? { ...t, ...newAttrs } : t));
  const handleImageDragEnd = (id, newX, newY) => setCustomImages(prev => prev.map(img => img.id === id ? { ...img, x: newX, y: newY } : img));
  const handleImageChange = (id, newAttrs) => setCustomImages(prev => prev.map(img => img.id === id ? { ...img, ...newAttrs } : img));

  const addCustomText = () => {
    const id = `text_${Date.now()}`;
    setCustomTexts([...customTexts, { id, pageIndex: currentPage, text: 'Double click to edit', x: 100, y: 100, fontSize: 24, fontFamily: 'Comic Neue', isBold: false, isItalic: false, isUnderline: false, align: 'left', fill: '#0f172a' }]);
    setSelectedIds([id]);
  };

  const triggerImageUpload = () => fileInputRef.current && fileInputRef.current.click();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const id = `img_${Date.now()}`;
      setCustomImages([...customImages, { id, pageIndex: currentPage, src: event.target.result, x: 100, y: 100, width: 150, height: 150, grayscale: false }]);
      setSelectedIds([id]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const addClipart = (clipart) => {
    const id = `clip_${Date.now()}`;
    let src = '';
    
    if (clipart.isTabler) {
      const svgString = ReactDOMServer.renderToStaticMarkup(
        React.createElement(clipart.component, { size: 512, color: emojiStyle === 'bw' ? 'black' : '#3b82f6', strokeWidth: 1.5 })
      );
      let properSvg = svgString;
      if (!properSvg.includes('xmlns=')) {
        properSvg = properSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(properSvg)))}`;
    } else {
      const ext = clipart.ext || 'svg';
      src = `/emoji/${emojiStyle}/${clipart.code}.${ext}`;
    }
    
    setCustomImages(prev => [...prev, { id, pageIndex: currentPage, src, x: 200, y: 300, width: 160, height: 160, grayscale: false }]);
    setSelectedIds([id]);
  };

  const filteredClipart = useMemo(() => {
    if (!clipartSearch.trim()) return clipartCategories;
    const q = clipartSearch.toLowerCase();
    
    const standardCategories = clipartCategories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.name.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q))
    })).filter(cat => cat.items.length > 0);

    const tablerMatches = Object.keys(curatedTablerIcons)
      .filter(key => key.toLowerCase().includes(q))
      .map(key => ({
        name: key.replace('Icon', '').replace(/([A-Z])/g, ' $1').trim(),
        code: key,
        isTabler: true,
        component: curatedTablerIcons[key]
      }));

    if (tablerMatches.length > 0) {
      standardCategories.push({
        name: 'Tabler Icons (Search)',
        items: tablerMatches
      });
    }

    return standardCategories;
  }, [clipartSearch]);

  const addBlankPage = () => {
    const newPageIdx = totalPages;
    setTotalPages(prev => prev + 1);
    setCurrentPage(newPageIdx);
    
    let titleText = 'Math Worksheet';
    if (topic === 'basic_math') {
      titleText = operator === '+' ? `Addition Within ${maxVal}` : `Subtraction Within ${maxVal}`;
    } else if (topic === 'number_bond') {
      titleText = `Number Bonds Within ${maxVal}`;
    }
    
    setCustomTexts(prev => [
      ...prev,
      { id: `header_name_date_${newPageIdx}`, pageIndex: newPageIdx, text: HEADER_NAME_DATE_TEXT, x: 50, y: 50, width: 1400, fontSize: 20, fontFamily: 'Comic Neue', isBold: false, isItalic: false, isUnderline: false, align: 'left', fill: '#0f172a' },
      { id: `header_title_${newPageIdx}`, pageIndex: newPageIdx, text: titleText, x: 220, y: 150, fontSize: 42, fontFamily: 'Comic Neue', isBold: true, isItalic: false, isUnderline: false, align: 'left', fill: '#000000' }
    ]);
  };

  const deletePage = () => {
    if (totalPages <= 1) return;
    const pageToDelete = currentPage;
    
    const reindex = (items) => items
      .filter(item => item.pageIndex !== pageToDelete)
      .map(item => item.pageIndex > pageToDelete ? { ...item, pageIndex: item.pageIndex - 1 } : item);
    
    setProblems(reindex);
    setCustomTexts(reindex);
    setCustomImages(reindex);
    setTotalPages(prev => prev - 1);
    setCurrentPage(prev => prev > 0 ? prev - 1 : 0);
    setSelectedIds([]);
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setCustomTexts(prev => prev.filter(t => !selectedIds.includes(t.id)));
    setCustomImages(prev => prev.filter(img => !selectedIds.includes(img.id)));
    setProblems(prev => prev.filter(p => !selectedIds.includes(p.id))); 
    setSelectedIds([]);
  };

  const duplicateSelected = () => {
    if (selectedIds.length === 0) return;
    const newTexts = [];
    const newImages = [];
    const newProblems = [];
    const newSelectedIds = [];

    selectedIds.forEach(id => {
      const idSuffix = `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      const textTarget = customTexts.find(t => t.id === id);
      if (textTarget) {
        const newId = `text_${idSuffix}`;
        newTexts.push({ ...textTarget, id: newId, y: textTarget.y + 40 });
        newSelectedIds.push(newId);
      }
      const imgTarget = customImages.find(img => img.id === id);
      if (imgTarget) {
        const newId = `img_${idSuffix}`;
        newImages.push({ ...imgTarget, id: newId, y: imgTarget.y + 40 });
        newSelectedIds.push(newId);
      }
      const probTarget = problems.find(p => p.id === id);
      if (probTarget) {
        const newId = `prob_${idSuffix}`;
        newProblems.push({ ...probTarget, id: newId, y: probTarget.y + 40 });
        newSelectedIds.push(newId);
      }
    });

    setCustomTexts([...customTexts, ...newTexts]);
    setCustomImages([...customImages, ...newImages]);
    setProblems([...problems, ...newProblems]);
    setSelectedIds(newSelectedIds);
  };

  const clipboardRef = useRef([]);

  const handleCopy = () => {
    if (selectedIds.length === 0) return;
    const copiedItems = [];
    selectedIds.forEach(id => {
      const textTarget = customTexts.find(t => t.id === id);
      if (textTarget) copiedItems.push({ type: 'text', data: { ...textTarget } });
      const imgTarget = customImages.find(img => img.id === id);
      if (imgTarget) copiedItems.push({ type: 'image', data: { ...imgTarget } });
      const probTarget = problems.find(p => p.id === id);
      if (probTarget) copiedItems.push({ type: 'problem', data: { ...probTarget } });
    });
    clipboardRef.current = copiedItems;
  };

  const handlePaste = () => {
    if (!clipboardRef.current || clipboardRef.current.length === 0) return;
    const newTexts = []; const newImages = []; const newProblems = []; const newSelectedIds = [];
    
    clipboardRef.current.forEach(item => {
      const idSuffix = `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      if (item.type === 'text') {
        const newId = `text_${idSuffix}`;
        newTexts.push({ ...item.data, id: newId, x: item.data.x + 20, y: item.data.y + 20 });
        newSelectedIds.push(newId);
      } else if (item.type === 'image') {
        const newId = `img_${idSuffix}`;
        newImages.push({ ...item.data, id: newId, x: item.data.x + 20, y: item.data.y + 20 });
        newSelectedIds.push(newId);
      } else if (item.type === 'problem') {
        const newId = `prob_${idSuffix}`;
        newProblems.push({ ...item.data, id: newId, x: item.data.x + 20, y: item.data.y + 20 });
        newSelectedIds.push(newId);
      }
    });

    if (newTexts.length > 0) setCustomTexts(prev => [...prev, ...newTexts]);
    if (newImages.length > 0) setCustomImages(prev => [...prev, ...newImages]);
    if (newProblems.length > 0) setProblems(prev => [...prev, ...newProblems]);
    setSelectedIds(newSelectedIds);
    
    clipboardRef.current = clipboardRef.current.map((item, idx) => {
      if (item.type === 'text') return { ...item, data: newTexts[idx] };
      if (item.type === 'image') return { ...item, data: newImages[idx] };
      if (item.type === 'problem') return { ...item, data: newProblems[idx] };
      return item;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') { e.preventDefault(); handleCopy(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') { e.preventDefault(); handlePaste(); }
      if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); deleteSelected(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds, customTexts, customImages, problems]);

  const applyTextFormat = (attrs) => {
    setCustomTexts(prev => prev.map(t => selectedIds.includes(t.id) ? { ...t, ...attrs } : t));
  };

  const alignSelected = (type) => {
    if (selectedIds.length < 2) return;
    const getItems = () => [
      ...problems.filter(p => selectedIds.includes(p.id)).map(p => ({ ...p, _collection: 'problems' })),
      ...customTexts.filter(t => selectedIds.includes(t.id)).map(t => ({ ...t, _collection: 'customTexts' })),
      ...customImages.filter(i => selectedIds.includes(i.id)).map(i => ({ ...i, _collection: 'customImages' }))
    ];
    let items = getItems();
    if (items.length === 0) return;

    let minX = Math.min(...items.map(i => i.x));
    let maxX = Math.max(...items.map(i => i.x));
    let avgX = items.reduce((sum, i) => sum + i.x, 0) / items.length;
    let minY = Math.min(...items.map(i => i.y));
    let maxY = Math.max(...items.map(i => i.y));
    let avgY = items.reduce((sum, i) => sum + i.y, 0) / items.length;

    if (type === 'distribute-h') {
      items.sort((a, b) => a.x - b.x);
      const step = items.length > 1 ? (maxX - minX) / (items.length - 1) : 0;
      items.forEach((item, idx) => { item.x = minX + (step * idx); });
    } else if (type === 'distribute-v') {
      items.sort((a, b) => a.y - b.y);
      const step = items.length > 1 ? (maxY - minY) / (items.length - 1) : 0;
      items.forEach((item, idx) => { item.y = minY + (step * idx); });
    } else {
      items.forEach(item => {
        if (type === 'left') item.x = minX;
        if (type === 'center-h') item.x = avgX;
        if (type === 'right') item.x = maxX;
        if (type === 'top') item.y = minY;
        if (type === 'center-v') item.y = avgY;
        if (type === 'bottom') item.y = maxY;
      });
    }

    setProblems(prev => prev.map(p => items.find(i => i.id === p.id && i._collection === 'problems') || p));
    setCustomTexts(prev => prev.map(t => items.find(i => i.id === t.id && i._collection === 'customTexts') || t));
    setCustomImages(prev => prev.map(img => items.find(i => i.id === img.id && i._collection === 'customImages') || img));
  };

  const exportPDF = async () => {
    try {
      if (!stageRef.current) return;
      setIsExporting(true);
      setSelectedIds([]); 
      
      const originalPage = currentPage;
      const originalShowAnswers = showAnswers;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (1123 * pdfWidth) / 794; 
      
      if (includeAnswerKey) setShowAnswers(false);
      
      if (coverDataUrl) {
        pdf.addImage(coverDataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        if (totalPages > 0) pdf.addPage();
      }
      
      for (let i = 0; i < totalPages; i++) {
        setCurrentPage(i);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 });
        if (i > 0) pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }
      
      if (includeAnswerKey) {
        setShowAnswers(true);
        for (let i = 0; i < totalPages; i++) {
          setCurrentPage(i);
          await new Promise(resolve => setTimeout(resolve, 500));
          const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 });
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        }
      }
      
      // Auto-generate TOU & Credits page at the end of the PDF
      pdf.addPage();
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Terms of Use & Credits', pdfWidth / 2, 40, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      
      const touText = [
        'Thank you for downloading this resource!',
        '',
        'Terms of Use:',
        '© 2026 Math Worksheet Generator.',
        'All rights reserved. Purchase or download of this item entitles the',
        'purchaser the right to reproduce the pages in limited quantities for',
        'single classroom use only. Duplication for an entire school, an entire',
        'school system, or commercial purposes is strictly forbidden without',
        'written permission from the author.',
        '',
        'Copying any part of this product and placing it on the internet in any',
        'form (even a personal/classroom website) is strictly forbidden and is',
        'a violation of the Digital Millennium Copyright Act (DMCA).',
        '',
        'Credits:',
        'Clipart and icons provided by Google Noto Emoji.',
        'Licensed under the SIL Open Font License 1.1.'
      ];
      
      pdf.text(touText, 20, 70);

      pdf.save('math-worksheet-bundle.pdf');
      
      setCurrentPage(originalPage);
      setShowAnswers(originalShowAnswers);
    } catch (err) {
      console.error(err);
      alert('Error exporting PDF: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const saveProject = () => {
    const projectData = {
      problems,
      customTexts,
      customImages,
      config: {
        topic, operator, minVal, maxVal, problemCount, orientation, missingPart, sequenceLength, copyrightText
      }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "math_worksheet_project.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const loadProject = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.problems) setProblems(data.problems);
        if (data.customTexts) setCustomTexts(data.customTexts);
        if (data.customImages) setCustomImages(data.customImages);
        if (data.config) {
          if (data.config.topic) setTopic(data.config.topic);
          if (data.config.operator) setOperator(data.config.operator);
          if (data.config.minVal !== undefined) setMinVal(data.config.minVal);
          if (data.config.maxVal !== undefined) setMaxVal(data.config.maxVal);
          if (data.config.problemCount !== undefined) setProblemCount(data.config.problemCount);
          if (data.config.orientation) setOrientation(data.config.orientation);
          if (data.config.missingPart) setMissingPart(data.config.missingPart);
          if (data.config.sequenceLength !== undefined) setSequenceLength(data.config.sequenceLength);
          if (data.config.copyrightText !== undefined) setCopyrightText(data.config.copyrightText);
        }
        setHistory([{ problems: data.problems, customTexts: data.customTexts, customImages: data.customImages, totalPages }]);
        setHistoryIndex(0);
        setCurrentPage(0);
      } catch (err) {
        alert("Error loading project: Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const createCover = async () => {
    try {
      if (!stageRef.current) return;
      setIsExporting(true);
      setSelectedIds([]);
      
      const originalPage = currentPage;
      const pagesToCapture = [];
      const numToCapture = Math.min(3, totalPages);
      
      const possiblePages = Array.from({length: totalPages}, (_, i) => i);
      const shuffled = possiblePages.sort(() => 0.5 - Math.random());
      const selectedPages = shuffled.slice(0, numToCapture);
      
      for (const p of selectedPages) {
        setCurrentPage(p);
        // Wait longer so React re-renders the canvas with the new page content
        await new Promise(resolve => setTimeout(resolve, 800));
        // Wait an extra frame to ensure Konva has drawn
        await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 200)));
        pagesToCapture.push(stageRef.current.toDataURL({ pixelRatio: 1.5 }));
      }
      
      setCurrentPage(originalPage);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCoverPageImages(pagesToCapture);
      setIsCoverModalOpen(true);
    } catch (e) {
      console.error(e);
      alert('Error generating cover previews.');
    } finally {
      setIsExporting(false);
    }
  };

  const pageProblems = problems.filter(p => p.pageIndex === currentPage);
  const pageTexts = customTexts.filter(t => t.pageIndex === currentPage || t.pageIndex === undefined);
  const pageImages = customImages.filter(img => img.pageIndex === currentPage || img.pageIndex === undefined);

  const selectedText = customTexts.find(t => selectedIds.includes(t.id));
  const selectedImage = customImages.find(img => selectedIds.includes(img.id));

  const [activeTab, setActiveTab] = useState('worksheet'); // 'worksheet' | 'tpt'

  return (
    <div className="app-container">
      <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />

      <aside className="sidebar">
        {/* Tab Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          {[['worksheet', '📝', 'Worksheet'], ['tpt', '🛒', 'TPT Helper'], ['planner', '📈', 'Planner']].map(([id, icon, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              flex: 1, padding: '12px 6px', border: 'none', cursor: 'pointer', fontSize: '12px',
              fontWeight: activeTab === id ? 700 : 500,
              color: activeTab === id ? '#3b82f6' : '#64748b',
              background: activeTab === id ? 'white' : 'transparent',
              borderBottom: activeTab === id ? '2px solid #3b82f6' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>
              {icon} {label}
            </button>
          ))}
        </div>
        {activeTab === 'worksheet' && <div className="sidebar-header"><h2>Worksheet Settings</h2></div>}
        <div className="sidebar-content" style={{ display: activeTab === 'worksheet' ? 'flex' : 'none', flexDirection: 'column' }}>
          <div className="form-group">
            <label className="form-label">Topic</label>
            <select className="form-select" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="basic_math">Basic Arithmetic</option>
              <option value="missing_number">Missing Sequence</option>
              <option value="comparison">Comparing Numbers</option>
              <option value="number_bond">Number Bonds</option>
              <option value="number_line">Number Line Addition</option>
              <option value="ten_frame">Ten Frames</option>
              <option value="ten_frame_comparison">Comparing (Ten Frames)</option>
              <option value="word_problem">Word Problems</option>
              <option value="decodable_word_problem">Decodable Word Problems</option>
              <option value="missing_addend">Missing Addends</option>
              <option value="fact_family">Fact Families</option>
            </select>
          </div>

          {topic === 'basic_math' && (
            <>
              <div className="form-group fade-in">
                <label className="form-label">Operation</label>
                <select className="form-select" value={operator} onChange={(e) => setOperator(e.target.value)}>
                  <option value="+">Addition (+)</option>
                  <option value="-">Subtraction (-)</option>
                </select>
              </div>
              <div className="form-group fade-in">
                <label className="form-label">Layout Orientation</label>
                <select className="form-select" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                  <option value="horizontal">Horizontal (1 + 2 = 3)</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
              {orientation === 'horizontal' && (
                <div className="form-group fade-in">
                  <label className="form-label">Missing Part</label>
                  <select className="form-select" value={missingPart} onChange={(e) => setMissingPart(e.target.value)}>
                    <option value="answer">Answer (A + B = [ ])</option>
                    <option value="first">First Addend ([ ] + B = C)</option>
                    <option value="second">Second Addend (A + [ ] = C)</option>
                  </select>
                </div>
              )}
            </>
          )}

          {topic === 'missing_number' && (
            <div className="form-group fade-in">
              <label className="form-label">Sequence Length</label>
              <input type="number" className="form-input" value={sequenceLength} onChange={(e) => setSequenceLength(Math.max(3, Math.min(15, Number(e.target.value))))} />
              <small className="text-muted">Number of boxes (3-15).</small>
            </div>
          )}
          
          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Min Value</label>
              <input type="number" className="form-input" value={minVal} onChange={(e) => setMinVal(Number(e.target.value))} />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Max Value</label>
              <input type="number" className="form-input" value={maxVal} onChange={(e) => setMaxVal(Number(e.target.value))} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Number of Problems</label>
            <input type="number" className="form-input" value={problemCount} onChange={(e) => setProblemCount(Number(e.target.value))} />
            <small className="text-muted">Generates problems starting on the current page.</small>
          </div>

          <div className="form-group">
            <label className="form-label">Copyright Text (Footer)</label>
            <input type="text" className="form-input" value={copyrightText} onChange={(e) => setCopyrightText(e.target.value)} placeholder="© 2026 Math Worksheet" />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="showBorder" checked={showBorder} onChange={(e) => setShowBorder(e.target.checked)} style={{ cursor: 'pointer' }} />
            <label htmlFor="showBorder" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Decorative Page Border</label>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleGenerate}>
            <Calculator size={18} /> Generate Worksheet
          </button>
          <button className="btn" style={{ width: '100%', marginTop: '0.5rem', background: '#f59e0b', color: 'white', border: 'none' }} onClick={handleBatchGenerate}>
            <Copy size={18} /> Generate 5 Variations (Batch)
          </button>

          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#e2e8f0', padding: '8px', borderRadius: '8px' }}>
              <button className="btn-icon small" disabled={currentPage === 0} onClick={() => setCurrentPage(c => c - 1)}><ChevronLeft size={16} /></button>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Page {currentPage + 1} of {totalPages}</span>
              <button className="btn-icon small" disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(c => c + 1)}><ChevronRight size={16} /></button>
              <div style={{ width: '1px', height: '16px', background: '#cbd5e1', margin: '0 4px' }} />
              <button className="btn-icon small text-primary" onClick={addBlankPage} title="Add Blank Page"><FilePlus size={16} /></button>
              <button className="btn-icon small text-danger" disabled={totalPages <= 1} onClick={deletePage} title="Delete Current Page"><Trash2 size={16} /></button>
            </div>

            <button 
              className="btn" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', background: showElements ? '#e0e7ff' : '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer', padding: '10px', borderRadius: '8px', fontWeight: 600 }}
              onClick={() => setShowElements(!showElements)}
            >
              <Sticker size={18} /> {showElements ? 'Hide Elements' : 'Show Elements'}
            </button>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', color: '#64748b', marginTop: '4px' }}>
              <input type="checkbox" checked={includeAnswerKey} onChange={(e) => setIncludeAnswerKey(e.target.checked)} style={{ cursor: 'pointer' }} />
              Include Answer Key
            </label>
            
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button className="btn" style={{ flex: 1, backgroundColor: '#10b981', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', padding: '10px 8px', fontSize: '0.85rem' }} onClick={createCover} disabled={isExporting}>
                <ImageIcon size={16} /> {isExporting ? 'Wait...' : 'Cover'}
              </button>
              <button className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', padding: '10px 8px', fontSize: '0.85rem' }} onClick={exportPDF} disabled={isExporting}>
                <Download size={16} /> {isExporting ? 'Wait...' : 'PDF'}
              </button>
            </div>
          </div>

          {showElements && (
            <div className="fade-in" style={{ marginTop: '0.75rem' }}>
              {/* Quick-add row */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                <button
                  className="btn"
                  style={{ flex: 1, fontSize: '0.78rem', padding: '7px 6px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={addCustomText}
                  title="Add Text Element"
                >
                  <Type size={14} /> Add Text
                </button>
                <button
                  className="btn"
                  style={{ flex: 1, fontSize: '0.78rem', padding: '7px 6px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={triggerImageUpload}
                  title="Upload Image"
                >
                  <ImagePlus size={14} /> Add Image
                </button>
              </div>

              {/* Emoji style toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', flex: 1 }}>Clipart Style</span>
                <button
                  onClick={() => updateEmojiStyle('bw')}
                  style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '6px', border: '1px solid', cursor: 'pointer', fontWeight: 600, transition: 'all 0.15s',
                    background: emojiStyle === 'bw' ? '#1e293b' : '#fff',
                    color: emojiStyle === 'bw' ? '#fff' : '#64748b',
                    borderColor: emojiStyle === 'bw' ? '#1e293b' : '#cbd5e1'
                  }}
                >B&W</button>
                <button
                  onClick={() => updateEmojiStyle('color')}
                  style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '6px', border: '1px solid', cursor: 'pointer', fontWeight: 600, transition: 'all 0.15s',
                    background: emojiStyle === 'color' ? 'linear-gradient(135deg,#f97316,#ec4899)' : '#fff',
                    color: emojiStyle === 'color' ? '#fff' : '#64748b',
                    borderColor: emojiStyle === 'color' ? '#f97316' : '#cbd5e1'
                  }}
                >Color</button>
              </div>

              {/* Search */}
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" className="form-input" placeholder="Search clipart or paste emoji (e.g. 🦁)..." 
                  value={clipartSearch} onChange={(e) => setClipartSearch(e.target.value)}
                  style={{ paddingLeft: '32px' }}
                />
              </div>

              {/* 1-Click Live Emoji / GitHub Clipart Fetcher */}
              {clipartSearch.trim() && (
                <button
                  onClick={() => handleGenerateLiveEmoji(clipartSearch)}
                  disabled={isFetchingEmoji}
                  style={{
                    width: '100%', marginBottom: '10px', padding: '8px 12px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    color: 'white', border: 'none', borderRadius: '8px',
                    fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    boxShadow: '0 2px 6px rgba(99,102,241,0.25)'
                  }}
                >
                  {isFetchingEmoji ? '⏳ Fetching from GitHub...' : `✨ Fetch & Add '${clipartSearch}' Clipart`}
                </button>
              )}
              {emojiFetchStatus && (
                <div style={{ fontSize: '0.72rem', color: emojiFetchStatus.startsWith('✅') ? '#10b981' : '#ef4444', marginBottom: '8px', fontWeight: 600, textAlign: 'center' }}>
                  {emojiFetchStatus}
                </div>
              )}

              <div style={{ paddingRight: '4px' }}>
                {filteredClipart.map(cat => (
                  <div key={cat.name} style={{ marginBottom: '8px' }}>
                    <button 
                      onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                      style={{ width: '100%', textAlign: 'left', padding: '6px 10px', background: expandedCategory === cat.name ? '#e0e7ff' : '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', color: '#334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      {cat.name}
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{cat.items.length}</span>
                    </button>
                    {(expandedCategory === cat.name || clipartSearch.trim()) && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '8px 4px' }}>
                        {cat.items.map(item => (
                          <button 
                            key={item.code} onClick={() => addClipart(item)} title={item.name}
                            style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(99,102,241,0.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
                          >
                            {item.isTabler ? (
                              <item.component size={32} color={emojiStyle === 'bw' ? 'black' : '#3b82f6'} stroke={1.5} />
                            ) : (
                              <img 
                                src={`/emoji/${emojiStyle}/${item.code}.${item.ext || 'svg'}`} 
                                alt="" 
                                style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
                                loading="lazy" 
                                onError={(e) => {
                                  if (emojiStyle === 'bw' && !e.currentTarget.getAttribute('data-retried')) {
                                    e.currentTarget.setAttribute('data-retried', 'true');
                                    e.currentTarget.src = `/emoji/color/${item.code}.${item.ext || 'svg'}`;
                                  }
                                }}
                              />
                            )}
                            <span style={{ fontSize: '0.65rem', color: '#64748b', textAlign: 'center' }}>{item.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="main-content" style={{ position: 'relative' }}>
        <header className="toolbar text-formatting-toolbar" style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="btn-icon" disabled={historyIndex <= 0} onClick={handleUndo} title="Undo"><Undo size={20} /></button>
            <button className="btn-icon" disabled={historyIndex >= history.length - 1} onClick={handleRedo} title="Redo"><Redo size={20} /></button>
            <div className="divider" />
            
<button className={`btn-icon ${showGrid ? 'active' : ''}`} onClick={() => setShowGrid(!showGrid)} title="Toggle Grid"><Grid3X3 size={20} /></button>
            <button className={`btn-icon ${showAnswers ? 'active text-danger' : ''}`} onClick={() => setShowAnswers(!showAnswers)} title="Toggle Answer Key"><Calculator size={20} /></button>
            <button className="btn-icon" onClick={addCustomText} title="Add Text"><Type size={20} /></button>
            <button className="btn-icon" onClick={triggerImageUpload} title="Add Image"><ImagePlus size={20} /></button>
            <div className="divider" />
            <button className="btn-icon" onClick={saveProject} title="Save Project"><IconDeviceFloppy size={20} /></button>
            <label className="btn-icon" title="Open Project" style={{ margin: 0, cursor: 'pointer' }}>
              <IconFolderOpen size={20} />
              <input type="file" accept=".json" style={{ display: 'none' }} onChange={loadProject} />
            </label>
            <div className="divider" />
            
            {selectedText && (
              <>
                <select 
                  className="form-select" style={{ width: '130px', height: '32px', fontSize: '14px', padding: '0 8px' }}
                  value={selectedText.fontFamily} onChange={(e) => applyTextFormat({ fontFamily: e.target.value })}
                >
                  <option value="Comic Neue">Comic Neue</option>
                  <option value="Comic Sans MS">Comic Sans</option>
                  <option value="Plus Jakarta Sans">Jakarta</option>
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier</option>
                  <option value="Times New Roman">Times</option>
                </select>
                <div className="font-size-control">
                  <button className="btn-icon small" onClick={() => applyTextFormat({ fontSize: Math.max(10, selectedText.fontSize - 2) })}><Minus size={16} /></button>
                  <span style={{ fontSize: '14px', width: '30px', textAlign: 'center' }}>{selectedText.fontSize}</span>
                  <button className="btn-icon small" onClick={() => applyTextFormat({ fontSize: selectedText.fontSize + 2 })}><Plus size={16} /></button>
                </div>
                <div className="divider" />
                <button className={`btn-icon small ${selectedText.isBold ? 'active' : ''}`} onClick={() => applyTextFormat({ isBold: !selectedText.isBold })}><Bold size={16} /></button>
                <button className={`btn-icon small ${selectedText.isItalic ? 'active' : ''}`} onClick={() => applyTextFormat({ isItalic: !selectedText.isItalic })}><Italic size={16} /></button>
                <button className={`btn-icon small ${selectedText.isUnderline ? 'active' : ''}`} onClick={() => applyTextFormat({ isUnderline: !selectedText.isUnderline })}><Underline size={16} /></button>
                <div className="divider" />
                <button className={`btn-icon small ${selectedText.align === 'left' ? 'active' : ''}`} onClick={() => applyTextFormat({ align: 'left' })}><AlignLeft size={16} /></button>
                <button className={`btn-icon small ${selectedText.align === 'center' ? 'active' : ''}`} onClick={() => applyTextFormat({ align: 'center' })}><AlignCenter size={16} /></button>
                <button className={`btn-icon small ${selectedText.align === 'right' ? 'active' : ''}`} onClick={() => applyTextFormat({ align: 'right' })}><AlignRight size={16} /></button>
                <div className="divider" />
                <input type="color" value={selectedText.fill} onChange={(e) => applyTextFormat({ fill: e.target.value })} style={{ width: '30px', height: '30px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
              </>
            )}

            {selectedImage && (
              <>
                <button 
                  className={`btn-icon small ${selectedImage.grayscale ? 'active' : ''}`} 
                  onClick={() => {
                    setCustomImages(prev => prev.map(img => img.id === selectedImage.id ? { ...img, grayscale: !img.grayscale } : img));
                  }} 
                  title="Toggle Black & White Mode"
                >
                  <Contrast size={16} />
                </button>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>B&W Filter</span>
              </>
            )}

            {selectedIds.length > 0 && (
              <>
                <div className="divider" />
                <button className="btn-icon small text-danger" onClick={deleteSelected} title="Delete"><Trash2 size={16} /></button>
                <button className="btn-icon small" onClick={duplicateSelected} title="Duplicate"><Copy size={16} /></button>
              </>
            )}

            {selectedIds.length > 1 && (
              <>
                <div className="divider" />
                <button className="btn-icon small" onClick={() => alignSelected('left')} title="Align Left"><AlignStartVertical size={16} /></button>
                <button className="btn-icon small" onClick={() => alignSelected('center-h')} title="Align Center"><AlignCenterVertical size={16} /></button>
                <button className="btn-icon small" onClick={() => alignSelected('right')} title="Align Right"><AlignEndVertical size={16} /></button>
                <div className="divider" />
                <button className="btn-icon small" onClick={() => alignSelected('top')} title="Align Top"><AlignStartHorizontal size={16} /></button>
                <button className="btn-icon small" onClick={() => alignSelected('center-v')} title="Align Middle"><AlignCenterHorizontal size={16} /></button>
                <button className="btn-icon small" onClick={() => alignSelected('bottom')} title="Align Bottom"><AlignEndHorizontal size={16} /></button>
                <div className="divider" />
                <button className="btn-icon small" onClick={() => alignSelected('distribute-h')} title="Distribute Horizontally"><AlignHorizontalSpaceBetween size={16} /></button>
                <button className="btn-icon small" onClick={() => alignSelected('distribute-v')} title="Distribute Vertically"><AlignVerticalSpaceBetween size={16} /></button>
              </>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#e2e8f0', padding: '4px 8px', borderRadius: '8px' }}>
              <button className="btn-icon small" disabled={zoom <= 0.3} onClick={() => setZoom(z => Math.max(0.3, +(z - 0.1).toFixed(1)))} title="Zoom Out"><ZoomOut size={16} /></button>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', minWidth: '40px', textAlign: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</span>
              <button className="btn-icon small" disabled={zoom >= 2} onClick={() => setZoom(z => Math.min(2, +(z + 0.1).toFixed(1)))} title="Zoom In"><ZoomIn size={16} /></button>
            </div>


            

          </div>
        </header>

        <div className="canvas-area">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                ['⌘Z', 'Undo'],
                ['⌘Y', 'Redo'],
                ['⌘C', 'Copy'],
                ['⌘V', 'Paste'],
                ['Del', 'Delete'],
                ['Dbl-click', 'Edit text'],
                ['Shift+click', 'Multi-select'],
              ].map(([key, label]) => (
                <span key={key} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#64748b', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '2px 7px' }}>
                  <kbd style={{ fontFamily: 'monospace', fontWeight: 700, color: '#334155', background: '#e2e8f0', borderRadius: '3px', padding: '0 4px', fontSize: '0.68rem' }}>{key}</kbd>
                  {label}
                </span>
              ))}
            </div>
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.15s ease' }}>
              <CanvasEditor 
                problems={pageProblems} customTexts={pageTexts} customImages={pageImages} showGrid={showGrid} showAnswers={showAnswers} showBorder={showBorder}
                stageRef={stageRef} onDragProblem={handleProblemDragEnd} onDragText={handleTextDragEnd} onChangeText={handleTextChange} onDragImage={handleImageDragEnd} onChangeImage={handleImageChange}
                selectedIds={selectedIds} setSelectedIds={setSelectedIds} copyrightText={copyrightText}
              />
            </div>
          </div>
        </div>
      </main>
      {/* TPT Helper full-page overlay when tab is active */}
      {(activeTab === 'tpt' || activeTab === 'planner') && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex' }}>
          {/* Sidebar still visible with tabs */}
          <div style={{ width: '280px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              {[['worksheet', '📝', 'Worksheet'], ['tpt', '🛒', 'TPT Helper'], ['planner', '📈', 'Planner']].map(([id, icon, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{
                  flex: 1, padding: '12px 6px', border: 'none', cursor: 'pointer', fontSize: '12px',
                  fontWeight: activeTab === id ? 700 : 500,
                  color: activeTab === id ? '#3b82f6' : '#64748b',
                  background: activeTab === id ? 'white' : 'transparent',
                  borderBottom: activeTab === id ? '2px solid #3b82f6' : '2px solid transparent',
                }}>
                  {icon} {label}
                </button>
              ))}
            </div>
            <div style={{ padding: '16px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>Your worksheet settings are auto-applied to the TPT listing fields.</div>
              <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '12px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8', marginBottom: '6px' }}>CURRENT WORKSHEET</div>
                {[['Topic', topic], ['Operation', operator], ['Max Value', maxVal], ['Pages', totalPages], ['Problems/pg', problemCount]].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#1e40af', padding: '2px 0' }}>
                    <span style={{ color: '#64748b' }}>{k}</span><strong>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Main TPT content */}
          <div style={{ flex: 1, overflowY: 'auto', background: '#f1f5f9' }}>
            {activeTab === 'tpt' && (
              <TPTListingHelper
                topic={topic}
                operator={operator}
                maxVal={maxVal}
                totalPages={totalPages}
                numProblems={problemCount}
              />
            )}
            {activeTab === 'planner' && (
              <TrendPlanner 
                onApplyPreset={(p) => {
                  const cfg = p.config || {};
                  if (cfg.topic) setTopic(cfg.topic);
                  if (cfg.operator) setOperator(cfg.operator);
                  if (cfg.minVal !== undefined) setMinVal(cfg.minVal);
                  if (cfg.maxVal !== undefined) setMaxVal(cfg.maxVal);
                  if (cfg.problemCount) setProblemCount(cfg.problemCount);
                  if (cfg.allowCarryBorrow !== undefined) setAllowCarryBorrow(cfg.allowCarryBorrow);
                  if (cfg.missingPart) setMissingPart(cfg.missingPart);

                  handleGenerate(cfg, cfg.problemCount);

                  setActiveTab('worksheet');
                  setShowElements(true);
                  if (p.themeCategory) {
                    setExpandedCategory(p.themeCategory);
                  }
                }}
              />
            )}
          </div>
        </div>
      )}

      <CoverGeneratorModal 
        isOpen={isCoverModalOpen} 
        onClose={() => setIsCoverModalOpen(false)} 
        pageImages={coverPageImages} 
        onApplyCover={setCoverDataUrl}
      />
    </div>
  );
}

export default App;
