import os

with open('src/App.jsx', 'a', encoding='utf-8') as f:
    with open('restored_chunk_2.js', 'r', encoding='utf-8') as r2:
        f.write(r2.read())
        
    f.write('''
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
      
      pdf.save('math-worksheet.pdf');
      
      setCurrentPage(originalPage);
      setShowAnswers(originalShowAnswers);
    } catch (err) {
      console.error(err);
      alert('Error exporting PDF: ' + err.message);
    } finally {
      setIsExporting(false);
    }
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
        await new Promise(resolve => setTimeout(resolve, 500));
        pagesToCapture.push(stageRef.current.toDataURL({ pixelRatio: 2 }));
      }
      
      setCoverPageImages(pagesToCapture);
      setIsCoverModalOpen(true);
      
      setCurrentPage(originalPage);
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

  return (
    <div className="app-container">
      <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />

      <aside className="sidebar">
        <div className="sidebar-header"><h2>Worksheet Settings</h2></div>
        <div className="sidebar-content">
          <div className="form-group">
            <label className="form-label">Topic</label>
            <select className="form-select" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="basic_math">Basic Arithmetic</option>
              <option value="missing_number">Missing Sequence</option>
              <option value="comparison">Comparing Numbers</option>
              <option value="number_bond">Number Bonds</option>
              <option value="number_line">Number Line Addition</option>
              <option value="ten_frame">Ten Frames</option>
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

          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1rem', paddingTop: '1rem' }}>
            <button 
              className="btn" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', background: showElements ? '#e0e7ff' : '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer', padding: '10px', borderRadius: '8px', fontWeight: 600 }}
              onClick={() => setShowElements(!showElements)}
            >
              <Sticker size={18} /> {showElements ? 'Hide Elements' : 'Show Elements'}
            </button>
          </div>

          {showElements && (
            <div className="fade-in" style={{ marginTop: '0.75rem' }}>
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" className="form-input" placeholder="Search elements..." 
                  value={clipartSearch} onChange={(e) => setClipartSearch(e.target.value)}
                  style={{ paddingLeft: '32px' }}
                />
              </div>

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
                              <img src={/emoji//.svg} alt={item.name} style={{ width: '32px', height: '32px' }} loading="lazy" />
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
            
            <button className={tn-icon } onClick={() => setShowGrid(!showGrid)} title="Toggle Grid"><Grid3X3 size={20} /></button>
            <button className={tn-icon } onClick={() => setShowAnswers(!showAnswers)} title="Toggle Answer Key"><Calculator size={20} /></button>
            <button className="btn-icon" onClick={addCustomText} title="Add Text"><Type size={20} /></button>
            <button className="btn-icon" onClick={triggerImageUpload} title="Add Image"><ImagePlus size={20} /></button>
            <div className="divider" />
            
            {selectedText && (
              <>
                <select 
                  className="form-select" style={{ width: '130px', height: '32px', fontSize: '14px', padding: '0 8px' }}
                  value={selectedText.fontFamily} onChange={(e) => applyTextFormat({ fontFamily: e.target.value })}
                >
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
                <button className={tn-icon small } onClick={() => applyTextFormat({ isBold: !selectedText.isBold })}><Bold size={16} /></button>
                <button className={tn-icon small } onClick={() => applyTextFormat({ isItalic: !selectedText.isItalic })}><Italic size={16} /></button>
                <button className={tn-icon small } onClick={() => applyTextFormat({ isUnderline: !selectedText.isUnderline })}><Underline size={16} /></button>
                <div className="divider" />
                <button className={tn-icon small } onClick={() => applyTextFormat({ align: 'left' })}><AlignLeft size={16} /></button>
                <button className={tn-icon small } onClick={() => applyTextFormat({ align: 'center' })}><AlignCenter size={16} /></button>
                <button className={tn-icon small } onClick={() => applyTextFormat({ align: 'right' })}><AlignRight size={16} /></button>
                <div className="divider" />
                <input type="color" value={selectedText.fill} onChange={(e) => applyTextFormat({ fill: e.target.value })} style={{ width: '30px', height: '30px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
              </>
            )}

            {selectedImage && (
              <>
                <button 
                  className={tn-icon small } 
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#e2e8f0', padding: '4px 8px', borderRadius: '8px' }}>
              <button className="btn-icon small" disabled={currentPage === 0} onClick={() => setCurrentPage(c => c - 1)}><ChevronLeft size={16} /></button>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Page {currentPage + 1} of {totalPages}</span>
              <button className="btn-icon small" disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(c => c + 1)}><ChevronRight size={16} /></button>
              <div style={{ width: '1px', height: '16px', background: '#cbd5e1', margin: '0 4px' }} />
              <button className="btn-icon small text-primary" onClick={addBlankPage} title="Add Blank Page"><FilePlus size={16} /></button>
              <button className="btn-icon small text-danger" disabled={totalPages <= 1} onClick={deletePage} title="Delete Current Page"><Trash2 size={16} /></button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', color: '#64748b' }}>
                <input type="checkbox" checked={includeAnswerKey} onChange={(e) => setIncludeAnswerKey(e.target.checked)} style={{ cursor: 'pointer' }} />
                Include Answer Key
              </label>
              <button className="btn" style={{ backgroundColor: '#10b981', color: 'white' }} onClick={createCover} disabled={isExporting}>
                <ImageIcon size={18} /> {isExporting ? 'Preparing...' : 'Create Cover'}
              </button>
              <button className="btn btn-primary" onClick={exportPDF} disabled={isExporting}>
                <Download size={18} /> {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
            </div>
          </div>
        </header>

        <div className="canvas-area">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="text-muted" style={{ fontSize: '0.875rem', textAlign: 'center' }}>
              💡 Tip: Click and drag on the background to multi-select. Shift+Click to add to selection. Double-click text to edit.
            </div>
            <div style={{ transform: scale(), transformOrigin: 'top center', transition: 'transform 0.15s ease' }}>
              <CanvasEditor 
                problems={pageProblems} customTexts={pageTexts} customImages={pageImages} showGrid={showGrid} showAnswers={showAnswers} showBorder={showBorder}
                stageRef={stageRef} onDragProblem={handleProblemDragEnd} onDragText={handleTextDragEnd} onChangeText={handleTextChange} onDragImage={handleImageDragEnd} onChangeImage={handleImageChange}
                selectedIds={selectedIds} setSelectedIds={setSelectedIds} copyrightText={copyrightText}
              />
            </div>
          </div>
        </div>
      </main>
      <CoverGeneratorModal 
        isOpen={isCoverModalOpen} 
        onClose={() => setIsCoverModalOpen(false)} 
        pageImages={coverPageImages} 
      />
    </div>
  );
}

export default App;
''')
