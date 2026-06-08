#!/usr/bin/env node

// Supports addition, subtraction, multiplication, division, modulo, power, and square root.

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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Cannot take square root of a negative number.');
  }

  return Math.sqrt(value);
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
      'Operations: add, addition, +, subtract, subtraction, -, multiply, multiplication, *, divide, division, /, modulo, %, power, ^, sqrt'
  );
}

function run(argv = process.argv.slice(2)) {
  const [operationInput, leftInput, rightInput] = argv;

  if (!operationInput || leftInput === undefined) {
    printUsage();
    throw new Error('Missing required operation or numeric arguments.');
  }

  const operation = operationInput.toLowerCase();
  const operations = {
    add: { fn: addition, arity: 2 },
    addition: { fn: addition, arity: 2 },
    '+': { fn: addition, arity: 2 },
    subtract: { fn: subtraction, arity: 2 },
    subtraction: { fn: subtraction, arity: 2 },
    '-': { fn: subtraction, arity: 2 },
    multiply: { fn: multiplication, arity: 2 },
    multiplication: { fn: multiplication, arity: 2 },
    '*': { fn: multiplication, arity: 2 },
    divide: { fn: division, arity: 2 },
    division: { fn: division, arity: 2 },
    '/': { fn: division, arity: 2 },
    modulo: { fn: modulo, arity: 2 },
    '%': { fn: modulo, arity: 2 },
    power: { fn: power, arity: 2 },
    '^': { fn: power, arity: 2 },
    sqrt: { fn: squareRoot, arity: 1 },
    squareroot: { fn: squareRoot, arity: 1 },
    'square root': { fn: squareRoot, arity: 1 },
  };

  const operationConfig = operations[operation];

  if (!operationConfig) {
    printUsage();
    throw new Error(`Unsupported operation: ${operationInput}`);
  }

  const left = parseNumber(leftInput, 'Operand');
  const result =
    operationConfig.arity === 1
      ? operationConfig.fn(left)
      : operationConfig.fn(left, parseNumber(rightInput, 'Right operand'));

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
  modulo,
  power,
  squareRoot,
  run,
};
