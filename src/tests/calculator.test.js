const {
  addition,
  subtraction,
  multiplication,
  division,
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
});
