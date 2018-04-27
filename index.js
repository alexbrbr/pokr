const values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A'
]

const colors = [
  'c',
  's',
  'h',
  'd'
]

function createDeck() {
  return values
    .map(v => colors.map(c => `${v}${c}`))
    .reduce((acc, val) => acc.concat(val), []);
}

function pickRandomCard(deck) {
  const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
  return {
    deck,
    card
  }
}

function dealHand(deck) {
  const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
  const card2 = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];

  return {
    deck,
    hand: [card, card2]
  };
}

module.exports = {
  createDeck,
  pickRandomCard,
  dealHand
};
