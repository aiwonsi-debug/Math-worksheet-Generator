/**
 * Data Schema for Math Problems
 */

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateBasicProblem = (operator, min, max, allowCarryBorrow, orientation = 'vertical', missingPart = 'answer') => {
  let top, bottom, answer;

  if (operator === '+') {
    if (!allowCarryBorrow) {
      top = randomInt(min, max);
      const topStr = top.toString();
      let bottomStr = '';
      for (let i = 0; i < topStr.length; i++) {
        const topDigit = parseInt(topStr[i], 10);
        const maxBottomDigit = 9 - topDigit;
        bottomStr += randomInt(0, maxBottomDigit).toString();
      }
      bottom = parseInt(bottomStr, 10);
      if (bottom === 0 && max > 9) bottom = randomInt(1, 9);
    } else {
      const minSum = Math.max(min * 2, 0); // e.g., if min is 1, minSum is 2
      if (max < minSum) max = minSum; // Safety check
      answer = randomInt(minSum, max);
      top = randomInt(min, answer - min);
      bottom = answer - top;
    }
    answer = top + bottom;
  } else {
    if (!allowCarryBorrow) {
      top = randomInt(Math.max(min, 10), max); 
      const topStr = top.toString();
      let bottomStr = '';
      for (let i = 0; i < topStr.length; i++) {
        const topDigit = parseInt(topStr[i], 10);
        bottomStr += randomInt(0, topDigit).toString();
      }
      bottom = parseInt(bottomStr, 10);
      if (bottom === 0) bottom = randomInt(1, top % 10 || 9);
    } else {
      top = randomInt(min, max);
      bottom = randomInt(min, top - 1); 
    }
    answer = top - bottom;
  }

  // Preserve all values so we can show answers later
  let op1 = top;
  let op2 = bottom;
  let ans = answer;

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'basic_math',
    operator,
    operands: [op1, op2],
    answer: ans,
    options: {
      orientation,
      missingPart: orientation === 'horizontal' ? missingPart : 'none'
    }
  };
};

export const generateMissingNumber = (min, max, length = 10) => {
  const start = randomInt(min, Math.max(min, max - (length - 1)));
  const sequence = Array.from({length}, (_, i) => start + i);
  
  const missingCount = Math.max(1, Math.floor(length * 0.35)); // ~35% missing
  const missingIndices = [];
  while (missingIndices.length < missingCount) {
    const r = randomInt(0, length - 1);
    if (!missingIndices.includes(r)) missingIndices.push(r);
  }
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'missing_number',
    operands: sequence,
    answer: sequence.filter((_, i) => missingIndices.includes(i)),
    options: { missingIndices, orientation: 'horizontal' }
  };
};

export const generateNumberLine = (min, max) => {
  const op1 = randomInt(min, max);
  const op2 = randomInt(min, max);
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'number_line',
    operands: [op1, op2],
    answer: op1 + op2,
    operator: '+',
    options: { orientation: 'horizontal' }
  };
};

export const generateTenFrame = (min, max) => {
  const val = randomInt(Math.max(1, min), Math.min(20, max));
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'ten_frame',
    operands: [val],
    answer: val,
    options: { orientation: 'horizontal' }
  };
};

export const generateTenFrameComparison = (min, max) => {
  const cap = Math.min(20, max);
  const left = randomInt(Math.max(1, min), cap);
  const right = Math.random() < 0.2 ? left : randomInt(Math.max(1, min), cap);
  let answer = '=';
  if (left < right) answer = '<';
  if (left > right) answer = '>';

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'ten_frame_comparison',
    operands: [left, right],
    answer,
    options: { orientation: 'horizontal' }
  };
};

export const generateComparison = (min, max) => {
  const left = randomInt(min, max);
  const right = Math.random() < 0.2 ? left : randomInt(min, max);
  let answer = '=';
  if (left < right) answer = '<';
  if (left > right) answer = '>';

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'comparison',
    operands: [left, right],
    answer,
    options: { orientation: 'horizontal' }
  };
};

export const generateNumberBond = (min, max) => {
  const whole = randomInt(min * 2, max); 
  const part1 = randomInt(min, whole - 1);
  const part2 = whole - part1;
  const missingIndex = randomInt(0, 2);
  let answer;
  if (missingIndex === 0) answer = whole;
  if (missingIndex === 1) answer = part1;
  if (missingIndex === 2) answer = part2;

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'number_bond',
    operands: [whole, part1, part2], 
    answer,
    options: { missingIndex }
  };
};

export const generateWordProblem = (min, max) => {
  const op = Math.random() < 0.5 ? '+' : '-';
  const val1 = randomInt(Math.max(5, min), max);
  const val2 = randomInt(min, val1 - 1);
  const answer = op === '+' ? val1 + val2 : val1 - val2;

  const additionTemplates = [
    { text: `There are {v1} birds sitting on a fence. {v2} more birds fly over and land on the fence. How many birds are on the fence now?`, answerWord: 'birds' },
    { text: `Sam has {v1} shiny marbles. Emma gives him {v2} more marbles. How many marbles does Sam have in total?`, answerWord: 'marbles' },
    { text: `A farmer picked {v1} red apples and {v2} green apples from the orchard. How many apples did the farmer pick altogether?`, answerWord: 'apples' },
    { text: `There are {v1} frogs splashing in a pond. {v2} more frogs hop in to join them. How many frogs are in the pond now?`, answerWord: 'frogs' }
  ];

  const subtractionTemplates = [
    { text: `There are {v1} sweet cupcakes on a tray. Leo eats {v2} of them. How many cupcakes are left on the tray?`, answerWord: 'cupcakes' },
    { text: `Jenny ballooned up {v1} colorful balloons, but {v2} of them popped. How many balloons are still inflated?`, answerWord: 'balloons' },
    { text: `There were {v1} busy bees on a flower. {v2} of them buzzed away. How many bees are remaining on the flower?`, answerWord: 'bees' },
    { text: `A library table has {v1} books. A student checks out {v2} books. How many books are left on the table?`, answerWord: 'books' }
  ];

  const templates = op === '+' ? additionTemplates : subtractionTemplates;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const question = template.text.replace('{v1}', val1).replace('{v2}', val2);

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'word_problem',
    operands: [val1, val2],
    operator: op,
    answer,
    options: {
      question,
      answerWord: template.answerWord,
      orientation: 'horizontal'
    }
  };
};

export const generateMissingAddend = (min, max) => {
  const c = randomInt(Math.max(1, min), max);
  const a = randomInt(0, c);
  const b = c - a;
  const missingIndex = randomInt(0, 1);
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'missing_addend',
    operator: '+',
    operands: [a, b],
    options: { sum: c, missingIndex }
  };
};

export const generateDecodableWordProblem = (min, max) => {
  const val1 = randomInt(Math.max(2, min), Math.max(2, Math.floor(max / 2)));
  const val2 = randomInt(1, val1);
  
  const templates = [
    { text: `A cat has {v1} red hats. A dog has {v2} red hats. How many hats in all?`, answerWord: 'hats' },
    { text: `I see {v1} big bugs. You see {v2} big bugs. How many bugs are there?`, answerWord: 'bugs' },
    { text: `Sam has {v1} pet pigs. Pam has {v2} pet pigs. How many pigs do they have?`, answerWord: 'pigs' },
    { text: `Ten bats sit. {v1} bats fly up. {v2} bats fly down. How many bats fly?`, answerWord: 'bats' }
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  const question = template.text.replace('{v1}', val1).replace('{v2}', val2);

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'decodable_word_problem',
    operands: [val1, val2],
    operator: '+',
    answer: val1 + val2,
    options: {
      question,
      answerWord: template.answerWord,
      orientation: 'horizontal'
    }
  };
};

export const generateFactFamily = (min, max) => {
  // A + B = C
  const a = randomInt(Math.max(1, min), Math.max(2, Math.floor(max / 2)));
  const b = randomInt(Math.max(1, min), Math.max(2, Math.floor(max / 2)));
  const c = a + b;

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'fact_family',
    operands: [a, b, c], // C is whole, A and B are parts
    answer: {
      eq1: [a, b, c], // a + b = c
      eq2: [b, a, c], // b + a = c
      eq3: [c, a, b], // c - a = b
      eq4: [c, b, a]  // c - b = a
    },
    options: { orientation: 'horizontal' }
  };
};

export const generateWorksheet = (count, config) => {
  const problems = [];
  const seen = new Set();

  for (let i = 0; i < count; i++) {
    let problem;
    let attempts = 0;
    
    while (attempts < 50) {
      switch (config.topic) {
        case 'basic_math':
          problem = generateBasicProblem(config.operator, config.min, config.max, config.allowCarryBorrow, config.orientation, config.missingPart);
          break;
        case 'missing_number':
          problem = generateMissingNumber(config.min, config.max, config.sequenceLength);
          break;
        case 'comparison':
          problem = generateComparison(config.min, config.max);
          break;
        case 'number_bond':
          problem = generateNumberBond(config.min, config.max);
          break;
        case 'number_line':
          problem = generateNumberLine(config.min, config.max);
          break;
        case 'ten_frame':
          problem = generateTenFrame(config.min, config.max);
          break;
        case 'ten_frame_comparison':
          problem = generateTenFrameComparison(config.min, config.max);
          break;
        case 'word_problem':
          problem = generateWordProblem(config.min, config.max);
          break;
        case 'decodable_word_problem':
          problem = generateDecodableWordProblem(config.min, config.max);
          break;
        case 'missing_addend':
          problem = generateMissingAddend(config.min, config.max);
          break;
        case 'fact_family':
          problem = generateFactFamily(config.min, config.max);
          break;
        default:
          problem = generateBasicProblem('+', config.min, config.max, true, 'vertical', 'answer');
      }
      
      const fingerprint = `${problem.type}-${problem.operator || ''}-${problem.operands.join(',')}`;
      if (!seen.has(fingerprint)) {
        seen.add(fingerprint);
        break;
      }
      attempts++;
    }
    
    problems.push(problem);
  }
  return problems;
};
