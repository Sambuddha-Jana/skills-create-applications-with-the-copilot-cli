#!/usr/bin/env node

// Supports addition, subtraction, multiplication, and division.

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return a / b;
}

function parseNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }

  return number;
}

function printUsage() {
  console.error(
    'Usage: node src/calculator.js <operation> <left> <right>\n' +
      'Operations: add, addition, +, subtract, subtraction, -, multiply, multiplication, *, divide, division, /'
  );
}

function run(argv = process.argv.slice(2)) {
  const [operationInput, leftInput, rightInput] = argv;

  if (!operationInput || leftInput === undefined || rightInput === undefined) {
    printUsage();
    throw new Error('Missing required operation or numeric arguments.');
  }

  const operation = operationInput.toLowerCase();
  const left = parseNumber(leftInput, 'Left operand');
  const right = parseNumber(rightInput, 'Right operand');

  const operations = {
    add: addition,
    addition,
    '+': addition,
    subtract: subtraction,
    subtraction,
    '-': subtraction,
    multiply: multiplication,
    multiplication,
    '*': multiplication,
    divide: division,
    division,
    '/': division,
  };

  const operationFn = operations[operation];

  if (!operationFn) {
    printUsage();
    throw new Error(`Unsupported operation: ${operationInput}`);
  }

  const result = operationFn(left, right);
  console.log(result);
  return result;
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  run,
};
