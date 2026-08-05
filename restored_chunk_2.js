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
      { id: `header_name_date_${newPageIdx}`, pageIndex: newPageIdx, text: 'Name : ...........................................................Date : ...........................', x: 50, y: 50, fontSize: 24, fontFamily: 'Comic Sans MS', isBold: false, isItalic: false, isUnderline: false, align: 'left', fill: '#0f172a' },
      { id: `header_title_${newPageIdx}`, pageIndex: newPageIdx, text: titleText, x: 220, y: 150, fontSize: 42, fontFamily: 'Comic Sans MS', isBold: true, isItalic: false, isUnderline: false, align: 'left', fill: '#000000' }
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
      const textTarget = customTexts.find(t => t.id === id);
      if (textTarget) {
        const newId = `text_${Date.now()}_${Math.random()}`;
        newTexts.push({ ...textTarget, id: newId, y: textTarget.y + 40 });
        newSelectedIds.push(newId);
      }
      const imgTarget = customImages.find(img => img.id === id);
      if (imgTarget) {
        const newId = `img_${Date.now()}_${Math.random()}`;
        newImages.push({ ...imgTarget, id: newId, y: imgTarget.y + 40 });
        newSelectedIds.push(newId);
      }
      const probTarget = problems.find(p => p.id === id);
      if (probTarget) {
        const newId = `prob_${Date.now()}_${Math.random()}`;
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
      const idSuffix = `${Date.now()}_`;
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
