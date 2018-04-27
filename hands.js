const {colors, values, dealSeven, createDeck} = require("./index")

module.exports = {
  hasFourOfAKind,
  hasThreeOfAKind,
  hasAtLeastAPair,
  hasFullHouse,
  hasStraight
}

function hasFourOfAKind(cards) {
  const high = cards.map(c => c[0])
  const counts = {}

  for (let i = 0; i < high.length; i++) {
    const num = high[i]
    counts[num] = counts[num] ? counts[num] + 1 : 1
  }

  return Object.values(counts).some(c => c === 4)
}

function hasThreeOfAKind(cards) {
  const high = cards.map(c => c[0])
  const counts = {}

  for (let i = 0; i < high.length; i++) {
    const num = high[i]
    counts[num] = counts[num] ? counts[num] + 1 : 1
  }

  return Object.values(counts).some(c => c === 3)
}

function hasAtLeastAPair(cards) {
  const high = cards.map(c => c[0])
  const counts = {}

  for (let i = 0; i < high.length; i++) {
    const num = high[i]
    counts[num] = counts[num] ? counts[num] + 1 : 1
  }

  return Object.values(counts).some(c => c === 2)
}

function hasFullHouse(cards) {
  return hasThreeOfAKind(cards) && hasAtLeastAPair(cards)
}

function hasStraight(cards) {
  const straightOrderAceFirst = ['A', ...values.slice(0, -1)]
  const straightOrderAceLast = [...values]
  return isOrderedSubset(straightOrderAceFirst, cards) || isOrderedSubset(straightOrderAceLast, cards)
}

const uniqueElements = arr => [...new Set(arr)]
function isOrderedSubset(straightOrder, cards) {
  const sortedUniqValues = uniqueElements(cards
    .map(c => c[0])
    .sort((a, b) => straightOrder.indexOf(a) - straightOrder.indexOf(b)));
  if (sortedUniqValues.length < 5) return false
  for (let i = 0; i < straightOrder.length; i += 1) {
    if (straightOrder[i] === sortedUniqValues[0] && straightOrder[i + 4] === sortedUniqValues[4]) {
      return true
    }
    if (straightOrder[i] === sortedUniqValues[1] && straightOrder[i + 4] === sortedUniqValues[5]) {
      return true
    }
    if (straightOrder[i] === sortedUniqValues[2] && straightOrder[i + 4] === sortedUniqValues[6]) {
      return true
    }
  }
  return false
}
