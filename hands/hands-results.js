const {suits, ranks} = require('../index');

module.exports = {
  findFlush,
  find5Highest,
  findFourOfAKind,
  findThreeOfAKind,
  findFull,
  findDoublePair,
  findStraight,
  findPair,
  findStraightFlush
};

function findStraightFlush(cards) {
  const cardSuits = cards.map(c => c[1]);
  const flushSuit = suits.find(
    suit => cardSuits.filter(cardSuit => cardSuit === suit).length >= 5
  );
  if (!flushSuit) {
    return null;
  }
  return findStraight(cards.filter(card => card[1] === flushSuit));
}

function findFlush(cards) {
  const cardSuits = cards.map(c => c[1]);
  const flushSuit = suits.find(
    suit => cardSuits.filter(cardSuit => cardSuit === suit).length >= 5
  );
  if (!flushSuit) {
    return null;
  }
  return find5Highest(cards.filter(card => card[1] === flushSuit));
}

function findFourOfAKind(cards) {
  const fourOfAkindValue = findSameKind(4, cards);
  if (!fourOfAkindValue) {
    return null;
  }

  return [
    ...cards.filter(c => c[0] === fourOfAkindValue),
    ...findHighest(1, cards.filter(c => c[0] !== fourOfAkindValue))
  ];
}

function findThreeOfAKind(cards) {
  const threeOfAkindValue = findSameKind(3, cards);
  if (!threeOfAkindValue) {
    return null;
  }

  return [
    ...cards.filter(c => c[0] === threeOfAkindValue),
    ...findHighest(2, cards.filter(c => c[0] !== threeOfAkindValue))
  ];
}

function findFull(cards) {
  const threeOfAkindValue = findSameKind(3, cards);
  if (!threeOfAkindValue) {
    return null;
  }
  const pairValue = findSameKind(2, cards.filter(c => c[0] !== threeOfAkindValue));
  if (!pairValue) {
    return null;
  }

  return [
    ...cards.filter(c => c[0] === threeOfAkindValue),
    ...cards.filter(c => c[0] === pairValue)
  ];
}

function findDoublePair(cards) {
  const firstPair = findSameKind(2, cards);
  if (!firstPair) {
    return null;
  }
  const secondPair = findSameKind(2, cards.filter(c => c[0] !== firstPair));
  if (!secondPair) {
    return null;
  }

  return [
    ...cards.filter(c => c[0] === firstPair),
    ...cards.filter(c => c[0] === secondPair),
    ...findHighest(1, cards.filter(c => c[0] !== firstPair && c[0] !== secondPair))
  ];
}

function findPair(cards) {
  const pair = findSameKind(2, cards);
  if (!pair) {
    return null;
  }

  return [
    ...cards.filter(c => c[0] === pair),
    ...findHighest(3, cards.filter(c => c[0] !== pair))
  ];
}

function find5Highest(cards) {
  return findHighest(5, cards);
}

function findStraight(cards) {
  return findOrderedSubset(cards);
}
// internal functions

function findSameKind(numberByKind, cards) {
  const cardsRank = cards.map(c => c[0]);
  const rankCounts = {};

  for (let i = 0; i < cardsRank.length; i += 1) {
    const rank = cardsRank[i];
    rankCounts[rank] = rankCounts[rank] ? rankCounts[rank] + 1 : 1;
  }

  const kindValue = Object
    .entries(rankCounts)
    .find(r => r[1] === numberByKind);
  if (!kindValue) {
    return null;
  }

  return kindValue[0];
}

function findHighest(numberToPick, cards) {
  return cards
    .sort((a, b) => ranks.indexOf(b[0]) - ranks.indexOf(a[0]))
    .slice(0, numberToPick);
}

function uniqueElements(arr) {
  return [...new Set(arr)];
}

function findOrderedSubset(cards) {
  const straightOrder = ['A', ...ranks].reverse();

  const sortedUniqRanks = uniqueElements(
    cards
      .sort((a, b) => straightOrder.indexOf(a[0]) - straightOrder.indexOf(b[0]))
  );
  for (let i = 0; i < straightOrder.length - 4; i += 1) {
    const sequence = findSequence(straightOrder, sortedUniqRanks, i)
    if (sequence) {
      return sequence;
    }
  }
  return null;
}

function findSequence(straightOrder, sortedUniqCards, i) {
  return findSequenceBeginning(0, sortedUniqCards, straightOrder, i) ||
    findSequenceBeginning(1, sortedUniqCards, straightOrder, i) ||
    findSequenceBeginning(2, sortedUniqCards, straightOrder, i) ||
    null;
}

function findSequenceBeginning(beginning, sortedUniqCards, straightOrder, i) {
  if (straightOrder[i] === sortedUniqCards[beginning][0] &&
      straightOrder[i + 4] === sortedUniqCards[beginning + 4][0]) {
    return [...sortedUniqCards.slice(beginning, beginning + 5)];
  }
  return null;
}
