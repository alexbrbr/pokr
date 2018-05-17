const {suits, ranks, hands} = require('../index');

module.exports = {
  findFlush,
  find5Highest,
  findFourOfAKind,
  findThreeOfAKind,
  findFull,
  findDoublePair,
  findStraight,
  findPair,
  findStraightFlush,
  findBestHand,
  winningPlayer
};

function winningPlayer(player1Cards, player2cards, tablecards) {
  const player1bestHand = findBestHand([...player1Cards, ...tablecards]);
  const player2bestHand = findBestHand([...player2cards, ...tablecards]);
  if (hands.findIndex(h => h === player1bestHand.hand) < hands.findIndex(h => h === player2bestHand.hand)) {
    return 'player 1 wins';
  } else if (hands.findIndex(h => h === player1bestHand.hand) > hands.findIndex(h => h === player2bestHand.hand)) {
    return 'player 2 wins';
  }
  // eslint-disable-next-line consistent-return
  for (let i = 0; i < player1bestHand.cards.length; i += 1) {
    const p1c = player1bestHand.cards[i];
    const p2c = player2bestHand.cards[i];
    if (ranks.findIndex(r => r === p1c[0]) > ranks.findIndex(r => r === p2c[0])) {
      return 'player 1 wins'
    }
    if (ranks.findIndex(r => r === p1c[0]) < ranks.findIndex(r => r === p2c[0])) {
      return 'player 2 wins'
    }
  }

  return 'draw';
}
// eslint-disable-next-line consistent-return
function findBestHand(cards) {
  const handFinders = {
    straightFlush: findStraightFlush,
    fourOfAKind: findFourOfAKind,
    fullHouse: findFull,
    flush: findFlush,
    threeOfAKind: findThreeOfAKind,
    twoPairs: findDoublePair,
    pair: findPair,
    highCard: find5Highest
  };
  for (const handName in handFinders) {
    const cardsForHand = handFinders[handName](cards);
    if (cardsForHand) {
      return {
        cards: cardsForHand,
        hand: handName
      };
    }
  }
}

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
  const pairValue = findSameKind(
    2,
    cards.filter(c => c[0] !== threeOfAkindValue)
  );
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
    ...findHighest(
      1,
      cards.filter(c => c[0] !== firstPair && c[0] !== secondPair)
    )
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

  const kindValue = Object.entries(rankCounts).find(r => r[1] === numberByKind);
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
    cards.sort(
      (a, b) => straightOrder.indexOf(a[0]) - straightOrder.indexOf(b[0])
    )
  );
  for (let i = 0; i < straightOrder.length - 4; i += 1) {
    const sequence = findSequence(straightOrder, sortedUniqRanks, i);
    if (sequence) {
      return sequence;
    }
  }
  return null;
}

function findSequence(straightOrder, sortedUniqCards, i) {
  return (
    findSequenceBeginning(0, sortedUniqCards, straightOrder, i) ||
    findSequenceBeginning(1, sortedUniqCards, straightOrder, i) ||
    findSequenceBeginning(2, sortedUniqCards, straightOrder, i) ||
    null
  );
}

function findSequenceBeginning(beginning, sortedUniqCards, straightOrder, i) {
  if (
    straightOrder[i] === sortedUniqCards[beginning][0] &&
    straightOrder[i + 4] === sortedUniqCards[beginning + 4][0]
  ) {
    return [...sortedUniqCards.slice(beginning, beginning + 5)];
  }
  return null;
}
