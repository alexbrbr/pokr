const {createDeck, pickRandomCard, dealHand, dealSeven} = require('./index');
const {hasFourOfAKind, hasThreeOfAKind, hasAtLeastAPair, hasFullHouse, hasStraight} = require('./hands');

test('hasFourOfAKind should return true when 4 cards with same value are passed', () => {
  expect(hasFourOfAKind([
    'As',
    'Ad',
    'Ac',
    'Ah',
    '2s',
    '3s',
    '4s'
  ])).toBe(true)
})

test('hasFourOfAKind should return false when 4 cards with same value are not passed', () => {
  expect(hasFourOfAKind([
    'As',
    'Ad',
    'Ac',
    '5h',
    '2s',
    '3s',
    '4s'
  ])).toBe(false)
})

test('hasThreeOfAKind should return true when 4 cards with same value are passed', () => {
  expect(hasThreeOfAKind([
    'As',
    'Ad',
    'Ac',
    '5h',
    '2s',
    '3s',
    '4s'
  ])).toBe(true)
})

test('hasThreeOfAKind should return false when 4 cards with same value are not passed', () => {
  expect(hasThreeOfAKind([
    'As',
    'Ad',
    'Jc',
    '5h',
    '2s',
    '3s',
    '4s'
  ])).toBe(false)
})

test('hasAtLeastAPair should return true when 4 cards with same value are passed', () => {
  expect(hasAtLeastAPair([
    'As',
    'Ad',
    'Jc',
    '5h',
    '2s',
    '3s',
    '4s'
  ])).toBe(true)
})

test('hasAtLeastAPair should return false when 4 cards with same value are not passed', () => {
  expect(hasAtLeastAPair([
    'As',
    'Qd',
    'Jc',
    '5h',
    '2s',
    '3s',
    '4s'
  ])).toBe(false)
})

test('hasFullHouse should return true when full house (3+2) are passed', () => {
  expect(hasFullHouse([
    'As',
    'Ad',
    'Ac',
    '5h',
    '5s',
    '3s',
    '4s'
  ])).toBe(true)
})

test('hasFullHouse should return false when no full house (3+2) are passed', () => {
  expect(hasFullHouse([
    'As',
    'Qd',
    'Jc',
    '5h',
    '2s',
    '3s',
    '4s'
  ])).toBe(false)
})

test('hasStraight should return true when 5 cards in order are passed', () => {
  expect(hasStraight([
    'As',
    '7d',
    '3c',
    '6h',
    '7s',
    '5s',
    '4s'
  ])).toBe(true)
})

test('hasStraight should return true when 5 cards in order are passed', () => {
  expect(hasStraight([
    '2s',
    '7d',
    '8c',
    '6h',
    'As',
    '5s',
    '4s'
  ])).toBe(true)
})

test('hasStraight should return true when broadway straight are passed', () => {
  expect(hasStraight([
    'Ks',
    'Qd',
    'Tc',
    '6h',
    'As',
    '5s',
    'Js'
  ])).toBe(true)
})

test('hasStraight should return false when no 5 cards in order are passed', () => {
  expect(hasStraight([
    '2s',
    '7d',
    '8c',
    'Th',
    'As',
    '5s',
    'Qs'
  ])).toBe(false)
})
