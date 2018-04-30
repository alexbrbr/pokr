const {
  createDeck,
  pickRandomCard,
  dealHand,
  dealSeven
} = require("./index");

test("createDeck should return a 52 cards deck", () => {
  expect(createDeck().length).toBe(52);
});

test("pickRandomCard should return a 51 cards deck and a random card", () => {
  const newDeck = createDeck();
  const { deck, card } = pickRandomCard(newDeck);
  expect(deck.length).toBe(51);
  expect(typeof card).toBe("string");
});

test("dealHand should deal 2 random cards from the deck", () => {
  const newDeck = createDeck();
  const { deck, hand } = dealHand(newDeck);
  expect(deck.length).toBe(50);
  expect(hand.length).toBe(2);
  expect(typeof hand[0]).toBe("string");
  expect(typeof hand[1]).toBe("string");
});

test("dealSeven should deal 7 random cards from the deck", () => {
  const newDeck = createDeck();
  const { deck, cards } = dealSeven(newDeck);
  expect(deck.length).toBe(45);
  expect(cards.length).toBe(7);
  expect(typeof cards[0]).toBe("string");
  expect(typeof cards[1]).toBe("string");
});
