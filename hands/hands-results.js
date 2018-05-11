const {suits, ranks} = require('../index');

module.exports = {
  findFlush,
  find5Highest,
  findFourOfAKind
};

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
  const cardsRank = cards.map(c => c[0]);
  const rankCounts = {};

  for (let i = 0; i < cardsRank.length; i += 1) {
    const rank = cardsRank[i];
    rankCounts[rank] = rankCounts[rank] ? rankCounts[rank] + 1 : 1;
  }

  const fourOfAkindValue = Object
    .entries(rankCounts)
    .find(r => r[1] === 4);
  if (!fourOfAkindValue) {
    return null;
  }

  return [
    ...cards.filter(c => c[0] === fourOfAkindValue[0]),
    ...findHighest(1, cards.filter(c => c[0] !== fourOfAkindValue[0]))
  ];
}

function find5Highest(cards) {
  return findHighest(5, cards);
}

function findHighest(numberToPick, cards) {
  return cards
    .sort((a, b) => ranks.indexOf(b[0]) - ranks.indexOf(a[0]))
    .slice(0, numberToPick);
}
