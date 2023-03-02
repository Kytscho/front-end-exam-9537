import mySqrt from ".";


const testInput = {
  squareNumbers: new Array(100).fill(0).map(() => Math.floor(Math.random() * 1_000) ** 2),
  integers: new Array(100).fill(0).map(() => Math.floor(Math.random() * 1_000_000)),
  decimal: new Array(100).fill(0).map(() => 1.0 + Math.random() * 1_000_000),
  betweenZeroAndOne: new Array(10).fill(0).map(() => Math.random()),
} as const;

describe('mySqrt', () => {

  test('Zero input', () => {
    expect(mySqrt(0)).toBe(0);
  });

  test('Square number input', () => {
    for (const input of testInput.squareNumbers) {
      expect(mySqrt(input)).toBeCloseTo(Math.sqrt(input), 6);
    }
  });

  test('Integer input', () => {
    for (const input of testInput.integers) {
      expect(mySqrt(input)).toBeCloseTo(Math.sqrt(input), 6);
    }
  });

  test('Decimal input', () => {
    for (const input of testInput.decimal) {
      expect(mySqrt(input)).toBeCloseTo(Math.sqrt(input), 6);
    }
  });

  test('Input between 0 ~ 1', () => {
    for (const input of testInput.betweenZeroAndOne) {
      expect(mySqrt(input)).toBeCloseTo(Math.sqrt(input), 6);
    }
  });

});

