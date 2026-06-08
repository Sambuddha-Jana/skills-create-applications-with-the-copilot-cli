const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  exponentiation,
  squareRoot,
  run,
} = require('../calculator');

describe('calculator operations', () => {
  test('adds numbers', () => {
    expect(addition(2, 3)).toBe(5);
  });

  test('subtracts numbers', () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test('multiplies numbers', () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test('divides numbers', () => {
    expect(division(20, 5)).toBe(4);
  });

  test('throws when dividing by zero', () => {
    expect(() => division(20, 0)).toThrow('Cannot divide by zero.');
  });

  test('calculates modulo', () => {
    expect(modulo(20, 3)).toBe(2);
  });

  test('throws when modulo divisor is zero', () => {
    expect(() => modulo(20, 0)).toThrow('Cannot modulo by zero.');
  });

  test('calculates exponentiation', () => {
    expect(exponentiation(2, 5)).toBe(32);
  });

  test('calculates square root', () => {
    expect(squareRoot(49)).toBe(7);
  });

  test('throws when square root input is negative', () => {
    expect(() => squareRoot(-1)).toThrow('Cannot take square root of a negative number.');
  });
});

describe('calculator CLI runner', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    logSpy.mockClear();
    errorSpy.mockClear();
  });

  afterAll(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test('runs addition from CLI arguments', () => {
    expect(run(['add', '2', '3'])).toBe(5);
    expect(logSpy).toHaveBeenCalledWith(5);
  });

  test('runs subtraction from CLI arguments', () => {
    expect(run(['-', '10', '4'])).toBe(6);
    expect(logSpy).toHaveBeenCalledWith(6);
  });

  test('runs multiplication from CLI arguments', () => {
    expect(run(['*', '45', '2'])).toBe(90);
    expect(logSpy).toHaveBeenCalledWith(90);
  });

  test('runs division from CLI arguments', () => {
    expect(run(['/', '20', '5'])).toBe(4);
    expect(logSpy).toHaveBeenCalledWith(4);
  });

  test('runs modulo from CLI arguments', () => {
    expect(run(['%', '20', '3'])).toBe(2);
    expect(logSpy).toHaveBeenCalledWith(2);
  });

  test('runs exponentiation from CLI arguments', () => {
    expect(run(['pow', '2', '5'])).toBe(32);
    expect(logSpy).toHaveBeenCalledWith(32);
  });

  test('runs square root from CLI arguments', () => {
    expect(run(['sqrt', '49'])).toBe(7);
    expect(logSpy).toHaveBeenCalledWith(7);
  });
});
