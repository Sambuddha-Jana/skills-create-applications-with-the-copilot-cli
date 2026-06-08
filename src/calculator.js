#!/usr/bin/env node

// Supports addition, subtraction, multiplication, division, modulo, exponentiation, and square root.

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
    throw new Error('Cannot modulo by zero.');
  }

  return a % b;
}

function exponentiation(a, b) {
  return a ** b;
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
    'Usage: node src/calculator.js <operation> <left> [right]\n' +
      'Binary operations: add, addition, +, subtract, subtraction, -, multiply, multiplication, *, divide, division, /, modulo, mod, %, exponentiation, exponent, power, pow, **\n' +
      'Unary operations: sqrt, squareroot, √'
  );
}

function run(argv = process.argv.slice(2)) {
  const [operationInput, leftInput, rightInput] = argv;
  const operation = operationInput?.toLowerCase();
  const unaryOperations = new Set(['sqrt', 'squareroot', '√']);
  const isUnaryOperation = unaryOperations.has(operation);

  if (
    !operationInput ||
    leftInput === undefined ||
    (!isUnaryOperation && rightInput === undefined)
  ) {
    printUsage();
    throw new Error('Missing required operation or numeric arguments.');
  }

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
    mod: { fn: modulo, arity: 2 },
    '%': { fn: modulo, arity: 2 },
    exponentiation: { fn: exponentiation, arity: 2 },
    exponent: { fn: exponentiation, arity: 2 },
    power: { fn: exponentiation, arity: 2 },
    pow: { fn: exponentiation, arity: 2 },
    '**': { fn: exponentiation, arity: 2 },
    sqrt: { fn: squareRoot, arity: 1 },
    squareroot: { fn: squareRoot, arity: 1 },
    '√': { fn: squareRoot, arity: 1 },
  };

  const operationConfig = operations[operation];

  if (!operationConfig) {
    printUsage();
    throw new Error(`Unsupported operation: ${operationInput}`);
  }

  const left = parseNumber(leftInput, 'Left operand');
  const right = operationConfig.arity === 2 ? parseNumber(rightInput, 'Right operand') : undefined;
  const result = operationConfig.arity === 2 ? operationConfig.fn(left, right) : operationConfig.fn(left);
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
  exponentiation,
  squareRoot,
  run,
};
