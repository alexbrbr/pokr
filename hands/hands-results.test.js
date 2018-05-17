const {findFlush, find5Highest, findFourOfAKind, findThreeOfAKind, findFull, findDoublePair, findStraight, findPair, findStraightFlush, findBestHand, winningPlayer} = require('./hands-results');

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

test('findFull should return null when 3 cards of same rank are passed but no pair', () => {
  expect(findFull(['Ac', 'As', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findFull should return 3 cards of same rank plus a pair', () => {
  expect(findFull(['Ac', 'As', 'Ad', '2s', '2h', '4s', 'Kh']))
    .toEqual([
      'Ac', 'As', 'Ad', '2s', '2h'
    ]);
});

test('findDoublePair should return null when no pair are not passed', () => {
  expect(findDoublePair(['Ac', '3s', '5d', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findDoublePair should return null when only 1 pair is passed', () => {
  expect(findDoublePair(['Ac', '3s', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findDoublePair should return two pairs + highest card', () => {
  expect(findDoublePair(['Ac', 'As', '3d', '2s', '2h', '4s', 'Kh']))
    .toEqual([
      '2s', '2h', 'Ac', 'As', 'Kh'
    ]);
});

test('findStraight should return null when no straight is passed', () => {
  expect(findStraight(['Ac', '3s', 'Ad', '2s', 'Ts', '4s', 'Kh']))
    .toEqual(null);
});

test('findStraight should return null 4 cards are in order', () => {
  expect(findStraight(['2s', '7d', 'Tc', '6h', 'As', '5s', '4s']))
    .toEqual(null);
});

test('findStraight should return straight', () => {
  expect(findStraight(['2s', '7d', '8c', '6h', 'As', '5s', '4s']))
    .toEqual(['8c', '7d', '6h', '5s', '4s']);
});

test('findStraight should return highest straight when all cards follow', () => {
  expect(findStraight(['9s', '7d', '8c', '6h', 'Ts', '5s', '4s']))
    .toEqual(['Ts', '9s', '8c', '7d', '6h']);
});

test('findPair should return null when no pair are passed', () => {
  expect(findPair(['2s', '7d', 'Tc', '6h', 'As', '5s', '4s']))
    .toEqual(null);
});

test('findPair should return pair and 3 top cards', () => {
  expect(findPair(['2s', 'Ad', '8c', '6h', 'As', '5s', '4s']))
    .toEqual(['Ad', 'As', '8c', '6h', '5s']);
});

test('findStraightFlush should return null when no pair are passed', () => {
  expect(findStraightFlush(['2s',
    '7d',
    '8d',
    '9s',
    'Td',
    'Jd',
    'Qs']))
    .toEqual(null);
});

test('findStraightFlush should return pair and 3 top cards', () => {
  expect(findStraightFlush(['2s',
    '7d',
    '8d',
    '9d',
    'Td',
    'Jd',
    'Qs']))
    .toEqual(['Jd', 'Td', '9d', '8d', '7d']);
});

test('findBestHand should identify a pair as best hand', () => {
  expect(findBestHand(['2s', 'Ad', '8c', '6h', 'As', '5s', '4s']))
    .toEqual({
      cards: ['Ad', 'As', '8c', '6h', '5s'],
      hand: 'pair'
    });
});

test('winningPlayer should find winning player 1', () => {
  expect(winningPlayer(['Ad', 'As'], ['2d', '7s'], ['6h', 'Ah', '5s', '4s', 'Ks']))
    .toEqual('player 1 wins');
});

test('winningPlayer should find winning player 2', () => {
  expect(winningPlayer(['2d', '7s'], ['Kd', 'As'], ['6h', 'Ah', '5s', '4s', 'Ks']))
    .toEqual('player 2 wins');
});


test('winningPlayer should find winning player 1 with same hand', () => {
  expect(winningPlayer(['2d', 'Qs'], ['3d', '2h'], ['6h', 'Ah', '5s', '4s', 'Ks']))
    .toEqual('player 1 wins');
});

test('winningPlayer should find winning player 2 with same hand', () => {
  expect(winningPlayer(['2d', '4s'], ['Qd', '2h'], ['6h', 'Ah', '5s', '8s', 'Ks']))
    .toEqual('player 2 wins');
});

test('winningPlayer should find draw', () => {
  expect(winningPlayer(['2d', '4s'], ['Qd', '2h'], ['As', 'Ah', 'Ad', '8s', '8d']))
    .toEqual('draw');
});
