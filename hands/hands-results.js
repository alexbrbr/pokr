const { suits, ranks } = require("../index");

module.exports = {
  findFlush,
  find5Highest
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

function find5Highest(cards) {
  return findHighest(5, cards);
}

function findHighest(numberToPick, cards) {
  return cards
    .sort((a, b) => ranks.indexOf(b[0]) - ranks.indexOf(a[0]))
    .slice(0, numberToPick);
}
