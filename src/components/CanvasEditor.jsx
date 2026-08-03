import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Group, Rect, Line, Circle, Image as KonvaImage, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import useImage from 'use-image';

export const EditableText = ({ textObj, isSelected, onSelect, onChange, onDragEnd, nodeRef }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDoubleClick = () => setIsEditing(true);
  const handleDragEnd = (e) => onDragEnd(textObj.id, e.target.x(), e.target.y());

  if (isEditing) {
    return (
      <Html groupProps={{ x: textObj.x, y: textObj.y }} divProps={{ style: { position: 'absolute', zIndex: 10 } }}>
        <textarea
          defaultValue={textObj.text}
          autoFocus
          onBlur={(e) => { onChange(textObj.id, { text: e.target.value }); setIsEditing(false); }}
          onKeyDown={(e) => { if (e.key === 'Escape') setIsEditing(false); }}
          style={{
            fontSize: `${textObj.fontSize}px`, fontFamily: textObj.fontFamily, 
            fontWeight: textObj.isBold ? 'bold' : 'normal', fontStyle: textObj.isItalic ? 'italic' : 'normal',
            textDecoration: textObj.isUnderline ? 'underline' : 'none', textAlign: textObj.align || 'left',
            color: textObj.fill, border: '2px solid #22c55e', padding: '4px', margin: '0px', background: 'white',
            outline: 'none', resize: 'both', 
            width: `${Math.max(200, textObj.width || textObj.text.length * (textObj.fontSize * 0.6))}px`, height: `${textObj.fontSize * 1.5}px`
          }}
        />
      </Html>
    );
  }

  const fontStyleArray = [];
  if (textObj.isBold) fontStyleArray.push('bold');
  if (textObj.isItalic) fontStyleArray.push('italic');
  const fontStyle = fontStyleArray.join(' ') || 'normal';

  return (
    <Text
      id={textObj.id} ref={nodeRef} x={textObj.x} y={textObj.y} text={textObj.text} 
      fontSize={textObj.fontSize} fontFamily={textObj.fontFamily} fontStyle={fontStyle} fill={textObj.fill} 
      textDecoration={textObj.isUnderline ? 'underline' : ''} align={textObj.align || 'left'} width={textObj.width}
      scaleX={1} scaleY={1}
      draggable onDragEnd={handleDragEnd} onDblClick={handleDoubleClick}
      onClick={onSelect} onTap={onSelect}
      onMouseEnter={(e) => { setIsHovered(true); e.target.getStage().container().style.cursor = 'text'; }}
      onMouseLeave={(e) => { setIsHovered(false); e.target.getStage().container().style.cursor = 'default'; }}
      opacity={isHovered && !isSelected ? 0.8 : 1}
    />
  );
};

import Konva from 'konva';

export const ResizableImage = ({ imageObj, isSelected, onSelect, onChange, onDragEnd, nodeRef }) => {
  const [image] = useImage(imageObj.src, 'anonymous');
  const imgRef = useRef();

  useEffect(() => {
    if (image && imgRef.current) {
      try {
        imgRef.current.cache();
        const layer = imgRef.current.getLayer();
        if (layer) layer.batchDraw();
      } catch (e) {
        console.warn("Could not cache image: ", e);
      }
    }
  }, [image, imageObj.grayscale]);

  const setRef = (node) => {
    imgRef.current = node;
    if (nodeRef) {
      if (typeof nodeRef === 'function') {
        nodeRef(node);
      } else {
        nodeRef.current = node;
      }
    }
  };

  return (
    <KonvaImage
      id={imageObj.id} onClick={onSelect} onTap={onSelect} ref={setRef} image={image} x={imageObj.x} y={imageObj.y}
      width={imageObj.width || 150} height={imageObj.height || 150} draggable
      scaleX={imageObj.scaleX || 1} scaleY={imageObj.scaleY || 1}
      filters={imageObj.grayscale ? [Konva.Filters.Grayscale] : []}
      onDragEnd={(e) => onDragEnd(imageObj.id, e.target.x(), e.target.y())}
      onMouseEnter={(e) => { e.target.getStage().container().style.cursor = 'move'; }}
      onMouseLeave={(e) => { e.target.getStage().container().style.cursor = 'default'; }}
    />
  );
};

const ProblemBlock = ({ problem, index, showAnswers, onDragEnd, onSelect, nodeRef }) => {
  const { id, operands, operator, type, answer, options, x, y } = problem;
  const [isHovered, setIsHovered] = useState(false);

  const handleDragEnd = (e) => onDragEnd(id, e.target.x(), e.target.y());

  const commonProps = {
    id, ref: nodeRef, x, y, draggable: true, onDragEnd: handleDragEnd, onClick: onSelect, onTap: onSelect,
    onMouseEnter: (e) => { setIsHovered(true); e.target.getStage().container().style.cursor = 'move'; },
    onMouseLeave: (e) => { setIsHovered(false); e.target.getStage().container().style.cursor = 'default'; },
    opacity: isHovered ? 0.7 : 1,
  };

  const fontSize = 32;
  const problemNumber = index + 1;
  
  if (type === 'basic_math') {
    if (options.orientation === 'vertical') {
      return (
        <Group {...commonProps}>
          <Text text={operands[0].toString()} fontSize={fontSize} fontFamily="Comic Sans MS" fontStyle="bold" align="right" width={80} y={0} />
          <Text text={operator} fontSize={fontSize} fontFamily="Comic Sans MS" fontStyle="bold" x={10} y={40} />
          <Text text={operands[1].toString()} fontSize={fontSize} fontFamily="Comic Sans MS" fontStyle="bold" align="right" width={80} y={40} />
          <Line points={[20, 80, 80, 80]} stroke="black" strokeWidth={3} />
          <Rect x={0} y={0} width={90} height={90} fill="transparent" />
        </Group>
      );
    } else {
      const drawBox = (val, posX) => (
        <Group x={posX} y={-17}>
          <Rect width={75} height={75} stroke="black" strokeWidth={2} cornerRadius={10} />
          {showAnswers && <Text text={val.toString()} fontSize={fontSize} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" y={21} width={75} align="center" />}
        </Group>
      );
      const drawText = (val, posX, isMissing) => isMissing ? drawBox(val, posX) : <Text text={val.toString()} fontSize={fontSize} fontFamily="Comic Sans MS" x={posX} y={4} width={75} align="center" />;
      return (
        <Group {...commonProps}>
          <Circle x={15} y={20} radius={18} stroke="black" strokeWidth={1.5} />
          <Text text={problemNumber.toString()} fontSize={20} fontFamily="Comic Sans MS" x={-5} y={10} width={40} align="center" />
          
          {drawText(operands[0], 45, options.missingPart === 'first')}
          <Text text={operator} fontSize={fontSize} fontFamily="Comic Sans MS" x={125} y={4} width={20} align="center" />
          {drawText(operands[1], 145, options.missingPart === 'second')}
          <Text text="=" fontSize={fontSize} fontFamily="Comic Sans MS" x={225} y={4} width={20} align="center" />
          {drawText(answer, 245, options.missingPart === 'answer')}
          
          <Rect x={0} y={-20} width={320} height={80} fill="transparent" />
        </Group>
      );
    }
  }

  if (type === 'missing_addend') {
    const isMissingFirst = options.missingIndex === 0;
    const isMissingSecond = options.missingIndex === 1;
    
    const drawLine = (val, posX) => (
      <Group x={posX}>
        <Line points={[10, 40, 65, 40]} stroke="black" strokeWidth={3} />
        {showAnswers && <Text text={val.toString()} fontSize={fontSize} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" y={4} width={75} align="center" />}
      </Group>
    );
    const drawText = (val, posX, isMissing) => isMissing ? drawLine(val, posX) : <Text text={val.toString()} fontSize={fontSize} fontFamily="Comic Sans MS" x={posX} y={4} width={75} align="center" />;
    
    return (
      <Group {...commonProps}>
        <Circle x={15} y={20} radius={18} stroke="black" strokeWidth={1.5} />
        <Text text={problemNumber.toString()} fontSize={20} fontFamily="Comic Sans MS" x={-5} y={10} width={40} align="center" />
        
        {drawText(operands[0], 45, isMissingFirst)}
        <Text text={operator} fontSize={fontSize} fontFamily="Comic Sans MS" x={125} y={4} width={20} align="center" />
        {drawText(operands[1], 145, isMissingSecond)}
        <Text text="=" fontSize={fontSize} fontFamily="Comic Sans MS" x={225} y={4} width={20} align="center" />
        <Text text={options.sum.toString()} fontSize={fontSize} fontFamily="Comic Sans MS" x={245} y={4} width={75} align="center" />
        
        <Rect x={0} y={-20} width={320} height={80} fill="transparent" />
      </Group>
    );
  }
  
  if (type === 'missing_number') {
    const sequenceWidth = 670;
    const contentWidth = 640; // 670 - 15 (left padding) - 15 (right padding)
    const boxWidth = 55;
    const totalEmptySpace = contentWidth - (operands.length * boxWidth);
    const spacing = operands.length > 1 ? totalEmptySpace / (operands.length - 1) : 0;
    
    return (
      <Group {...commonProps}>
        <Rect x={-15} y={-25} width={sequenceWidth} height={90} stroke="#475569" strokeWidth={2} cornerRadius={12} />
        {operands.map((num, i) => {
          const isMissing = options.missingIndices.includes(i);
          const boxX = i * (boxWidth + spacing);
          return (
            <Group x={boxX} key={i}>
              <Rect width={55} height={55} y={-8} stroke="#0f172a" strokeWidth={2} cornerRadius={8} dash={isMissing ? [4, 4] : undefined} />
              {(!isMissing || showAnswers) && (
                <Text text={num.toString()} fontSize={32} fontFamily="Comic Sans MS" fontStyle="bold" fill={isMissing && showAnswers ? '#ef4444' : '#0f172a'} width={55} y={5} align="center" />
              )}
            </Group>
          );
        })}
        <Rect x={-15} y={-25} width={sequenceWidth} height={90} fill="transparent" />
      </Group>
    );
  }

  if (type === 'number_line') {
    const [op1, op2] = operands;
    const lineStart = op1 - 1;
    const lineEnd = answer + Math.max(2, 5 - (answer - op1));
    const numTicks = lineEnd - lineStart + 1;
    const tickSpacing = 30;
    const lineWidth = (numTicks - 1) * tickSpacing;

    return (
      <Group {...commonProps}>
        {/* Equation */}
        <Text text={`${op1} + ${op2} =`} fontSize={32} fontFamily="Comic Sans MS" x={0} y={15} />
        <Group x={140} y={0}>
          <Rect width={50} height={60} stroke="black" strokeWidth={2} />
          {showAnswers && <Text text={answer.toString()} fontSize={32} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" width={50} y={15} align="center" />}
        </Group>

        {/* Number Line */}
        <Group x={220} y={15}>
          {/* Main Axis */}
          <Line points={[0, 20, lineWidth, 20]} stroke="black" strokeWidth={2} />
          {/* Left Arrow */}
          <Line points={[0, 20, 10, 10]} stroke="black" strokeWidth={2} />
          <Line points={[0, 20, 10, 30]} stroke="black" strokeWidth={2} />
          {/* Right Arrow */}
          <Line points={[lineWidth, 20, lineWidth - 10, 10]} stroke="black" strokeWidth={2} />
          <Line points={[lineWidth, 20, lineWidth - 10, 30]} stroke="black" strokeWidth={2} />
          
          {/* Ticks and Numbers */}
          {Array.from({ length: numTicks }).map((_, i) => (
            <Group x={i * tickSpacing} key={i}>
              <Line points={[0, 10, 0, 30]} stroke="black" strokeWidth={2} />
              <Text text={(lineStart + i).toString()} fontSize={14} fontFamily="Comic Sans MS" x={-10} y={35} width={20} align="center" />
            </Group>
          ))}
        </Group>
        <Rect x={0} y={-10} width={220 + lineWidth + 20} height={80} fill="transparent" />
      </Group>
    );
  }

  if (type === 'ten_frame') {
    const val = answer;
    const framesCount = val > 10 ? 2 : 1;
    
    return (
      <Group {...commonProps}>
        {Array.from({ length: framesCount }).map((_, frameIdx) => {
          const dotsInThisFrame = Math.min(10, Math.max(0, val - frameIdx * 10));
          return (
            <Group x={0} y={frameIdx * 120} key={frameIdx}>
              {/* Draw 2x5 Grid */}
              <Rect width={250} height={100} stroke="black" strokeWidth={2} />
              <Line points={[0, 50, 250, 50]} stroke="black" strokeWidth={2} />
              {Array.from({ length: 4 }).map((_, col) => (
                <Line key={col} points={[(col + 1) * 50, 0, (col + 1) * 50, 100]} stroke="black" strokeWidth={2} />
              ))}
              
              {/* Draw Dots */}
              {Array.from({ length: dotsInThisFrame }).map((_, dotIdx) => {
                const col = dotIdx % 5;
                const row = Math.floor(dotIdx / 5);
                return (
                  <Circle key={dotIdx} x={col * 50 + 25} y={row * 50 + 25} radius={18} fill="#334155" />
                );
              })}
            </Group>
          );
        })}
        {/* Answer Box */}
        <Group x={100} y={framesCount * 120 + 20}>
          <Rect width={50} height={50} stroke="black" strokeWidth={2} />
          {showAnswers && <Text text={val.toString()} fontSize={32} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" width={50} y={8} align="center" />}
        </Group>
        
        <Rect x={-10} y={-10} width={270} height={framesCount * 120 + 90} fill="transparent" />
      </Group>
    );
  }

  if (type === 'ten_frame_comparison') {
    const [leftVal, rightVal] = operands;
    const drawTenFrame = (val, startX, startY) => {
      const framesCount = val > 10 ? 2 : 1;
      return (
        <Group x={startX} y={startY}>
          {Array.from({ length: framesCount }).map((_, frameIdx) => {
            const dotsInThisFrame = Math.min(10, Math.max(0, val - frameIdx * 10));
            return (
              <Group x={0} y={frameIdx * 90} key={frameIdx}>
                <Rect width={200} height={80} stroke="black" strokeWidth={2} />
                <Line points={[0, 40, 200, 40]} stroke="black" strokeWidth={2} />
                {Array.from({ length: 4 }).map((_, col) => (
                  <Line key={col} points={[(col + 1) * 40, 0, (col + 1) * 40, 80]} stroke="black" strokeWidth={2} />
                ))}
                {Array.from({ length: dotsInThisFrame }).map((_, dotIdx) => {
                  const col = dotIdx % 5;
                  const row = Math.floor(dotIdx / 5);
                  return (
                    <Circle key={dotIdx} x={col * 40 + 20} y={row * 40 + 20} radius={14} fill="#334155" />
                  );
                })}
              </Group>
            );
          })}
        </Group>
      );
    };

    return (
      <Group {...commonProps}>
        {drawTenFrame(leftVal, 0, 0)}
        
        <Line points={[220, 70, 280, 70]} stroke="black" strokeWidth={2} />
        {showAnswers && <Text text={leftVal.toString()} fontSize={36} fontFamily="Comic Sans MS" fill="#ef4444" x={220} y={28} width={60} align="center" />}
        
        <Rect x={300} y={15} width={60} height={60} stroke="black" strokeWidth={2} />
        {showAnswers && <Text text={answer} fontSize={40} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" x={300} y={17} width={60} align="center" />}
        
        <Line points={[380, 70, 440, 70]} stroke="black" strokeWidth={2} />
        {showAnswers && <Text text={rightVal.toString()} fontSize={36} fontFamily="Comic Sans MS" fill="#ef4444" x={380} y={28} width={60} align="center" />}
        
        {drawTenFrame(rightVal, 460, 0)}
        
        <Rect x={-10} y={-10} width={680} height={100} fill="transparent" />
      </Group>
    );
  }

  if (type === 'comparison') {
    return (
      <Group {...commonProps}>
        <Text text={operands[0].toString()} fontSize={fontSize} fontFamily="Comic Sans MS" fontStyle="bold" x={0} y={5} width={40} align="center" />
        <Circle x={75} y={20} radius={25} stroke="black" strokeWidth={2} />
        {showAnswers && <Text text={answer} fontSize={32} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" x={55} y={1} width={40} align="center" />}
        <Text text={operands[1].toString()} fontSize={fontSize} fontFamily="Comic Sans MS" fontStyle="bold" x={110} y={5} width={40} align="center" />
        <Rect x={0} y={-5} width={150} height={50} fill="transparent" />
      </Group>
    );
  }

  if (type === 'number_bond') {
    const [whole, part1, part2] = operands;
    
    const drawEqBox = (val, xPos, isMissing) => {
      return (
        <Group x={xPos} y={150}>
          <Rect x={0} y={0} width={40} height={40} stroke="black" strokeWidth={2} cornerRadius={6} />
          {!isMissing && <Text text={val.toString()} fontSize={24} fontFamily="Comic Sans MS" fontStyle="bold" width={40} y={8} align="center" />}
          {isMissing && showAnswers && <Text text={val.toString()} fontSize={24} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" width={40} y={8} align="center" />}
        </Group>
      );
    };

    return (
      <Group {...commonProps}>
        {/* Lines */}
        <Line points={[100, 50, 60, 90]} stroke="black" strokeWidth={2} />
        <Line points={[100, 50, 140, 90]} stroke="black" strokeWidth={2} />
        
        {/* Top Circle (Whole) */}
        <Circle x={100} y={25} radius={30} stroke="black" strokeWidth={2} fill="white" />
        {options.missingIndex !== 0 && <Text text={whole.toString()} fontSize={28} fontFamily="Comic Sans MS" fontStyle="bold" x={75} y={12} width={50} align="center" />}
        {options.missingIndex === 0 && showAnswers && <Text text={whole.toString()} fontSize={28} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" x={75} y={12} width={50} align="center" />}
        
        {/* Left Circle (Part 1) */}
        <Circle x={60} y={100} radius={25} stroke="black" strokeWidth={2} fill="white" />
        {options.missingIndex !== 1 && <Text text={part1.toString()} fontSize={24} fontFamily="Comic Sans MS" fontStyle="bold" x={40} y={88} width={40} align="center" />}
        {options.missingIndex === 1 && showAnswers && <Text text={part1.toString()} fontSize={24} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" x={40} y={88} width={40} align="center" />}
        
        {/* Right Circle (Part 2) */}
        <Circle x={140} y={100} radius={25} stroke="black" strokeWidth={2} fill="white" />
        {options.missingIndex !== 2 && <Text text={part2.toString()} fontSize={24} fontFamily="Comic Sans MS" fontStyle="bold" x={120} y={88} width={40} align="center" />}
        {options.missingIndex === 2 && showAnswers && <Text text={part2.toString()} fontSize={24} fontFamily="Comic Sans MS" fill="#ef4444" fontStyle="bold" x={120} y={88} width={40} align="center" />}
        
        {/* Equation underneath: Part 1 + Part 2 = Whole */}
        {drawEqBox(part1, 25, options.missingIndex === 1)}
        <Text text="+" fontSize={24} fontFamily="Comic Sans MS" fontStyle="bold" x={70} y={155} width={20} align="center" />
        {drawEqBox(part2, 95, options.missingIndex === 2)}
        <Text text="=" fontSize={24} fontFamily="Comic Sans MS" fontStyle="bold" x={140} y={155} width={20} align="center" />
        {drawEqBox(whole, 165, options.missingIndex === 0)}

        {/* Drag bounds */}
        <Rect x={15} y={-10} width={200} height={210} fill="transparent" />
      </Group>
    );
  }

  if (type === 'word_problem' || type === 'decodable_word_problem') {
    return (
      <Group {...commonProps}>
        <Circle x={15} y={15} radius={18} stroke="black" strokeWidth={1.5} />
        <Text text={problemNumber.toString()} fontSize={20} fontFamily="Comic Sans MS" x={-5} y={5} width={40} align="center" />

        {/* Dash work space container */}
        <Rect 
          x={45} 
          y={75} 
          width={600} 
          height={140} 
          stroke="#94a3b8" 
          strokeWidth={1} 
          dash={[5, 5]} 
          cornerRadius={6}
        />


        {/* Answer line */}
        <Text 
          text={`Answer: _______________________ ${options.answerWord}`} 
          fontSize={20} 
          fontFamily="Comic Sans MS" 
          x={45} 
          y={235} 
        />
        {showAnswers && (
          <Text 
            text={answer.toString()} 
            fontSize={22} 
            fontFamily="Comic Sans MS" 
            fontStyle="bold" 
            fill="#ef4444" 
            x={130} 
            y={232} 
          />
        )}
        <Rect x={0} y={-10} width={660} height={280} fill="transparent" />
      </Group>
    );
  }

  if (type === 'fact_family') {
    const [a, b, c] = operands; // a, b parts, c whole
    return (
      <Group {...commonProps}>
        {/* Draw Triad Triangle */}
        <Line points={[100, 10, 30, 130, 170, 130, 100, 10]} stroke="black" strokeWidth={3} closed fill="#f8fafc" />
        
        {/* Apex Circle & Whole Number */}
        <Circle x={100} y={20} radius={22} fill="white" stroke="black" strokeWidth={1.5} />
        <Text text={c.toString()} fontSize={22} fontFamily="Comic Sans MS" fontStyle="bold" x={75} y={10} width={50} align="center" />

        {/* Left corner Circle & Part A */}
        <Circle x={30} y={130} radius={22} fill="white" stroke="black" strokeWidth={1.5} />
        <Text text={a.toString()} fontSize={22} fontFamily="Comic Sans MS" fontStyle="bold" x={5} y={120} width={50} align="center" />

        {/* Right corner Circle & Part B */}
        <Circle x={170} y={130} radius={22} fill="white" stroke="black" strokeWidth={1.5} />
        <Text text={b.toString()} fontSize={22} fontFamily="Comic Sans MS" fontStyle="bold" x={145} y={120} width={50} align="center" />

        {/* Math Operation symbols inside the triangle */}
        <Text text="+" fontSize={24} fontFamily="Comic Sans MS" fontStyle="bold" x={88} y={100} />
        <Text text="-" fontSize={22} fontFamily="Comic Sans MS" x={58} y={55} />
        <Text text="-" fontSize={22} fontFamily="Comic Sans MS" x={128} y={55} />

        {/* Blank equation templates */}
        {/* Equation 1: A + B = C */}
        <Group x={210} y={10}>
          <Text text="____ + ____ = ____" fontSize={20} fontFamily="Comic Sans MS" />
          {showAnswers && (
            <Group>
              <Text text={a.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={10} y={-2} />
              <Text text={b.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={90} y={-2} />
              <Text text={c.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={170} y={-2} />
            </Group>
          )}
        </Group>

        {/* Equation 2: B + A = C */}
        <Group x={210} y={45}>
          <Text text="____ + ____ = ____" fontSize={20} fontFamily="Comic Sans MS" />
          {showAnswers && (
            <Group>
              <Text text={b.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={10} y={-2} />
              <Text text={a.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={90} y={-2} />
              <Text text={c.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={170} y={-2} />
            </Group>
          )}
        </Group>

        {/* Equation 3: C - A = B */}
        <Group x={210} y={80}>
          <Text text="____ - ____ = ____" fontSize={20} fontFamily="Comic Sans MS" />
          {showAnswers && (
            <Group>
              <Text text={c.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={10} y={-2} />
              <Text text={a.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={90} y={-2} />
              <Text text={b.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={170} y={-2} />
            </Group>
          )}
        </Group>

        {/* Equation 4: C - B = A */}
        <Group x={210} y={115}>
          <Text text="____ - ____ = ____" fontSize={20} fontFamily="Comic Sans MS" />
          {showAnswers && (
            <Group>
              <Text text={c.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={10} y={-2} />
              <Text text={b.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={90} y={-2} />
              <Text text={a.toString()} fontSize={20} fontFamily="Comic Sans MS" fontStyle="bold" fill="#ef4444" x={170} y={-2} />
            </Group>
          )}
        </Group>

        <Rect x={0} y={-10} width={420} height={180} fill="transparent" />
      </Group>
    );
  }
  
  return null;
};

const CanvasEditor = ({ 
  problems, customTexts, customImages, showGrid, showAnswers, showBorder, stageRef, 
  onDragProblem, onDragText, onChangeText, onDragImage, onChangeImage, 
  selectedIds, setSelectedIds, copyrightText
}) => {
  const paperWidth = 794;
  const paperHeight = 1123;

  const [selectionBox, setSelectionBox] = useState({ visible: false, x1: 0, y1: 0, x2: 0, y2: 0 });
  const trRef = useRef();
  const layerRef = useRef();
  
  const nodesMap = useRef({});

  useEffect(() => {
    if (trRef.current) {
      const nodes = selectedIds.map(id => nodesMap.current[id]).filter(node => node != null);
      trRef.current.nodes(nodes);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedIds, problems, customTexts, customImages]);

  const handleMouseDown = (e) => {
    if (e.target === e.target.getStage() || e.target.name() === 'bgRect') {
      const pos = e.target.getStage().getPointerPosition();
      setSelectionBox({ visible: true, x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y });
      setSelectedIds([]);
    }
  };

  const handleMouseMove = (e) => {
    if (!selectionBox.visible) return;
    const pos = e.target.getStage().getPointerPosition();
    setSelectionBox(prev => ({ ...prev, x2: pos.x, y2: pos.y }));
  };

  const handleMouseUp = (e) => {
    if (!selectionBox.visible) return;
    setSelectionBox(prev => ({ ...prev, visible: false }));
    
    const box = {
      x: Math.min(selectionBox.x1, selectionBox.x2),
      y: Math.min(selectionBox.y1, selectionBox.y2),
      width: Math.abs(selectionBox.x1 - selectionBox.x2),
      height: Math.abs(selectionBox.y1 - selectionBox.y2),
    };

    if (box.width === 0 || box.height === 0) return;

    const shapes = layerRef.current.getChildren();
    const newSelectedIds = [];
    
    shapes.forEach((shape) => {
      if (shape.name() === 'bgRect' || shape.name() === 'selectionBox' || shape === trRef.current) return;
      const shapeBox = shape.getClientRect();
      const hasIntersection = !(
        shapeBox.x > box.x + box.width ||
        shapeBox.x + shapeBox.width < box.x ||
        shapeBox.y > box.y + box.height ||
        shapeBox.y + shapeBox.height < box.y
      );
      if (hasIntersection) {
        newSelectedIds.push(shape.id());
      }
    });
    
    setSelectedIds(newSelectedIds);
  };

  const handleItemSelect = (id, e) => {
    const isShiftPressed = e.evt.shiftKey;
    if (isShiftPressed) {
      if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(selId => selId !== id));
      else setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds([id]);
    }
  };

  const handleTransformEnd = (e) => {
    try {
      const nodes = trRef.current.nodes();
      if (nodes.length === 0) return;
      
      nodes.forEach(node => {
        const id = node.id();
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        
        const isImage = customImages.some(img => img.id === id);
        const isText = customTexts.some(txt => txt.id === id);

        if (isImage) {
          // For images, we simply save the new scale without resetting the node width
          onChangeImage(id, { x: node.x(), y: node.y(), scaleX, scaleY });
        } else if (isText) {
          const w = node.width();
          node.scaleX(1);
          node.scaleY(1);
          onChangeText(id, { x: node.x(), y: node.y(), width: Math.max(50, Math.abs(w * scaleX)), fontSize: Math.max(10, Math.abs(node.fontSize() * scaleY)) });
        }
      });
    } catch (err) {
      setDebugMsg('Error: ' + err.message);
    }
  };

  return (
    <div className="canvas-wrapper" style={{ boxShadow: 'var(--shadow-lg)', backgroundColor: 'white', position: 'relative' }}>
      <Stage 
        width={paperWidth} height={paperHeight} ref={stageRef}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}
      >
        <Layer ref={layerRef}>
          <Rect x={0} y={0} width={paperWidth} height={paperHeight} fill="white" name="bgRect" />
          {showGrid && (
            <>
              {Array.from({ length: Math.floor(paperHeight / 20) + 1 }).map((_, i) => (
                <Line key={`gh${i}`} points={[0, i * 20, paperWidth, i * 20]} stroke="#e2e8f0" strokeWidth={0.5} name="bgRect" />
              ))}
              {Array.from({ length: Math.floor(paperWidth / 20) + 1 }).map((_, i) => (
                <Line key={`gv${i}`} points={[i * 20, 0, i * 20, paperHeight]} stroke="#e2e8f0" strokeWidth={0.5} name="bgRect" />
              ))}
            </>
          )}
          
          {showBorder && (
            <Rect 
              x={30} y={110} width={paperWidth - 60} height={paperHeight - 170} 
              stroke="#0f172a" strokeWidth={3} cornerRadius={20} dash={[15, 10]} 
              name="bgRect" 
            />
          )}
          
          {copyrightText && (
            <Text text={copyrightText} x={0} y={paperHeight - 40} width={paperWidth} align="center" fontSize={12} fontFamily="Comic Sans MS" fill="#94a3b8" name="bgRect" />
          )}

          {customTexts.map((textObj) => (
            <EditableText 
              key={textObj.id} textObj={textObj} 
              isSelected={selectedIds.includes(textObj.id)} 
              onSelect={(e) => handleItemSelect(textObj.id, e)} 
              onChange={onChangeText} onDragEnd={onDragText} 
              nodeRef={(node) => nodesMap.current[textObj.id] = node}
            />
          ))}

          {problems.map((prob, i) => (
            <ProblemBlock 
              key={prob.id} problem={prob} index={i} showAnswers={showAnswers}
              onSelect={(e) => handleItemSelect(prob.id, e)}
              onDragEnd={onDragProblem} 
              nodeRef={(node) => nodesMap.current[prob.id] = node}
            />
          ))}

          {customImages.map((imgObj) => (
            <ResizableImage 
              key={imgObj.id} imageObj={imgObj} 
              isSelected={selectedIds.includes(imgObj.id)} 
              onSelect={(e) => handleItemSelect(imgObj.id, e)} 
              onChange={onChangeImage} onDragEnd={onDragImage} 
              nodeRef={(node) => nodesMap.current[imgObj.id] = node}
            />
          ))}
          
          <Transformer 
            ref={trRef} anchorStroke="#22c55e" anchorFill="white" borderStroke="#22c55e" borderStrokeWidth={2}
            boundBoxFunc={(oldBox, newBox) => (newBox.width < 10 || newBox.height < 10 ? oldBox : newBox)}
            onTransformEnd={handleTransformEnd}
          />
          
          {selectionBox.visible && (
            <Rect 
              name="selectionBox"
              x={Math.min(selectionBox.x1, selectionBox.x2)} y={Math.min(selectionBox.y1, selectionBox.y2)}
              width={Math.abs(selectionBox.x1 - selectionBox.x2)} height={Math.abs(selectionBox.y1 - selectionBox.y2)}
              fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={1}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasEditor;
