const {winningPlayer} = require('./hands-results');

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const suits = ['c', 's', 'h', 'd'];
const hands = [
  'straightFlush',
  'fourOfAKind',
  'fullHouse',
  'flush',
  'threeOfAKind',
  'twoPairs',
  'pair',
  'highCard'
];

function createDeck() {
  return ranks
    .map(rank => suits.map(suit => `${rank}${suit}`))
    .reduce((acc, val) => acc.concat(val), []);
}

function pickRandomCard(deck) {
  const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
  return {
    deck,
    card
  };
}

function dealHand(deck) {
  const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
  const card2 = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];

  return {
    deck,
    hand: [card, card2]
  };
}

function dealSeven(deck) {
  // simulate hand + 5 on table
  const cards = [];
  for (let i = 0; i < 7; i += 1) {
    cards.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
  }

  return {
    deck,
    cards
  };
}

module.exports = {
  createDeck,
  pickRandomCard,
  dealHand,
  dealSeven,
  ranks,
  suits,
  hands,
  winningPlayer
};
