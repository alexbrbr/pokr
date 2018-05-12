const {findFlush, find5Highest, findFourOfAKind, findThreeOfAKind, findFull, findDoublePair} = require('./hands-results');

test('findFlush should return the 5 cards composing the flush (same suit)', () => {
  expect(findFlush(['3s', 'As', '5c', 'Ah', '2s', 'Ts', '4s'])).toEqual([
    'As',
    'Ts',
    '4s',
    '3s',
    '2s'
  ]);
});

test('findFlush should return the 5 highest cards composing the flush (same suit)', () => {
  expect(findFlush(['3s', 'As', '5s', 'Ah', '2s', 'Ts', '4s'])).toEqual([
    'As',
    'Ts',
    '5s',
    '4s',
    '3s'
  ]);
});

test('findFlush should return null when not a suit', () => {
  expect(findFlush(['3c', 'As', '5c', 'Ah', '2s', 'Ts', '4s'])).toEqual(null);
});

test('find5Highest should return 5 highest cards', () => {
  expect(find5Highest(['Ac', 'As', 'Ad', 'Ah', '2s', 'Ts', '4s'])).toEqual([
    'Ac',
    'As',
    'Ad',
    'Ah',
    'Ts'
  ]);
});

test('find5Highest should return 5 highest cards in order', () => {
  expect(find5Highest(['Ac', 'As', 'Ad', '2s', 'Ts', '4s', 'Ah'])).toEqual([
    'Ac',
    'As',
    'Ad',
    'Ah',
    'Ts'
  ]);
});

test('findFourOfAKind should return null when 4 cards of same rank are not present', () => {
  expect(findFourOfAKind(['Ac', 'As', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findFourOfAKind should return 4 cards of same rank plus higher card', () => {
  expect(findFourOfAKind(['Ac', 'As', 'Ad', '2s', 'Ah', '4s', 'Kh']))
    .toEqual([
      'Ac', 'As', 'Ad', 'Ah', 'Kh'
    ]);
});

test('findThreeOfAKind should return null when 3 cards of same rank are not present', () => {
  expect(findThreeOfAKind(['Ac', '3s', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findThreeOfAKind should return 3 cards of same rank plus higher card', () => {
  expect(findThreeOfAKind(['Ac', 'As', 'Ad', '2s', '3h', '4s', 'Kh']))
    .toEqual([
      'Ac', 'As', 'Ad', 'Kh', '4s'
    ]);
});

test('findFull should return null when 3 cards of same rank + a pair are not present', () => {
  expect(findFull(['Ac', '3s', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findFull should return null when 3 cards of same rank are present but no pair', () => {
  expect(findFull(['Ac', 'As', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findFull should return 3 cards of same rank plus a pair', () => {
  expect(findFull(['Ac', 'As', 'Ad', '2s', '2h', '4s', 'Kh']))
    .toEqual([
      'Ac', 'As', 'Ad', '2s', '2h'
    ]);
});

test('findDoublePair should return null when no pair are not present', () => {
  expect(findDoublePair(['Ac', '3s', '5d', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findDoublePair should return null when only 1 pair is present', () => {
  expect(findDoublePair(['Ac', '3s', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findDoublePair should return two pairs + highest card', () => {
  expect(findDoublePair(['Ac', 'As', '3d', '2s', '2h', '4s', 'Kh']))
    .toEqual([
      '2s', '2h', 'Ac', 'As', 'Kh'
    ]);
});
