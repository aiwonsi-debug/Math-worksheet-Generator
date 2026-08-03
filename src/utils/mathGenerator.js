// Utility for generating random math problems for Kindergarten to Grade 2

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateProblems = (grade, topic, count) => {
  const problems = [];
  
  for (let i = 0; i < count; i++) {
    problems.push(generateSingleProblem(grade, topic));
  }
  
  return problems;
};

const generateSingleProblem = (grade, topic) => {
  let maxNum = 10;
  if (grade === 'Grade 1') maxNum = 20;
  if (grade === 'Grade 2') maxNum = 100;

  switch (topic) {
    case 'Addition': {
      let a, b;
      if (grade === 'Kindergarten') {
        a = randomInt(1, 9);
        b = randomInt(1, 10 - a); // Sum up to 10
      } else if (grade === 'Grade 1') {
        a = randomInt(1, 19);
        b = randomInt(1, 20 - a); // Sum up to 20
      } else {
        a = randomInt(10, 89);
        b = randomInt(10, 99 - a); // Sum up to 99
      }
      return { type: 'vertical', operator: '+', top: a, bottom: b, id: Math.random().toString(36).substr(2, 9) };
    }
    case 'Subtraction': {
      let a, b;
      if (grade === 'Kindergarten') {
        a = randomInt(2, 10);
        b = randomInt(1, a - 1); // No negative numbers
      } else if (grade === 'Grade 1') {
        a = randomInt(5, 20);
        b = randomInt(1, a - 1);
      } else {
        a = randomInt(20, 99);
        b = randomInt(10, a - 1);
      }
      return { type: 'vertical', operator: '-', top: a, bottom: b, id: Math.random().toString(36).substr(2, 9) };
    }
    case 'Missing Numbers': {
      // Sequence of 4 numbers, one missing
      const start = randomInt(1, maxNum - 4);
      const missingIndex = randomInt(0, 3);
      const sequence = Array.from({ length: 4 }, (_, i) => (i === missingIndex ? '?' : start + i));
      return { type: 'sequence', sequence, id: Math.random().toString(36).substr(2, 9) };
    }
    case 'Comparison': {
      const a = randomInt(1, maxNum);
      const b = randomInt(1, maxNum);
      return { type: 'compare', left: a, right: b, id: Math.random().toString(36).substr(2, 9) };
    }
    default:
      return null;
  }
};
