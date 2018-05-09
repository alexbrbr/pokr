const { suits, ranks } = require("../index");

module.exports = {
  findFlush
};

function findFlush(cards) {
  const cardSuits = cards.map(c => c[1]);
  const flushSuit = suits.find(
    suit => cardSuits.filter(cardSuit => cardSuit === suit).length >= 5
  );
  if (!flushSuit) {
    return null;
  }
  return cards
    .filter(card => card[1] === flushSuit)
    .map(c => c[0])
    .sort((a, b) => ranks.indexOf(b) - ranks.indexOf(a))
    .slice(0, 5)
    .map(c => `${c}${flushSuit}`);
}
