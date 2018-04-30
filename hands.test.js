const {
  createDeck,
  pickRandomCard,
  dealHand,
  dealSeven
} = require("./index");
const {
  hasFourOfAKind,
  hasThreeOfAKind,
  hasAtLeastAPair,
  hasFullHouse,
  hasStraight,
  hasFlush,
  hasStraightFlush
} = require("./hands");

test("hasFourOfAKind should return true when 4 cards with same value are passed", () => {
  expect(
    hasFourOfAKind([
      "As",
      "Ad",
      "Ac",
      "Ah",
      "2s",
      "3s",
      "4s"
    ])
  ).toBe(true);
});

test("hasFourOfAKind should return false when 4 cards with same value are not passed", () => {
  expect(
    hasFourOfAKind([
      "As",
      "Ad",
      "Ac",
      "5h",
      "2s",
      "3s",
      "4s"
    ])
  ).toBe(false);
});

test("hasThreeOfAKind should return true when 4 cards with same value are passed", () => {
  expect(
    hasThreeOfAKind([
      "As",
      "Ad",
      "Ac",
      "5h",
      "2s",
      "3s",
      "4s"
    ])
  ).toBe(true);
});

test("hasThreeOfAKind should return false when 4 cards with same value are not passed", () => {
  expect(
    hasThreeOfAKind([
      "As",
      "Ad",
      "Jc",
      "5h",
      "2s",
      "3s",
      "4s"
    ])
  ).toBe(false);
});

test("hasAtLeastAPair should return true when 4 cards with same value are passed", () => {
  expect(
    hasAtLeastAPair([
      "As",
      "Ad",
      "Jc",
      "5h",
      "2s",
      "3s",
      "4s"
    ])
  ).toBe(true);
});

test("hasAtLeastAPair should return false when 4 cards with same value are not passed", () => {
  expect(
    hasAtLeastAPair([
      "As",
      "Qd",
      "Jc",
      "5h",
      "2s",
      "3s",
      "4s"
    ])
  ).toBe(false);
});

test("hasFullHouse should return true when full house (3+2) are passed", () => {
  expect(
    hasFullHouse(["As", "Ad", "Ac", "5h", "5s", "3s", "4s"])
  ).toBe(true);
});

test("hasFullHouse should return false when no full house (3+2) are passed", () => {
  expect(
    hasFullHouse(["As", "Qd", "Jc", "5h", "2s", "3s", "4s"])
  ).toBe(false);
});

test("hasStraight should return true when 5 cards in order are passed", () => {
  expect(
    hasStraight(["As", "7d", "3c", "6h", "7s", "5s", "4s"])
  ).toBe(true);
});

test("hasStraight should return true when 5 cards in order are passed", () => {
  expect(
    hasStraight(["2s", "7d", "8c", "6h", "As", "5s", "4s"])
  ).toBe(true);
});

test("hasStraight should return true when broadway straight are passed", () => {
  expect(
    hasStraight(["Ks", "Qd", "Tc", "6h", "As", "5s", "Js"])
  ).toBe(true);
});

test("hasStraight should return false when no 5 cards in order are passed", () => {
  expect(
    hasStraight(["2s", "7d", "8c", "Th", "As", "5s", "Qs"])
  ).toBe(false);
});

test("hasFlush should return true when 5 or more cards of the same suit are passed", () => {
  expect(
    hasFlush(["2s", "7s", "8s", "Th", "As", "5s", "Qs"])
  ).toBe(true);
});

test("hasFlush should return false when 4 or less cards of the same suit are passed", () => {
  expect(
    hasFlush(["2s", "7d", "8d", "Th", "As", "5s", "Qs"])
  ).toBe(false);
});

test("hasStraightFlush should return true when cards are straight and flush", () => {
  expect(
    hasStraightFlush([
      "2s",
      "7d",
      "8d",
      "9d",
      "Td",
      "Jd",
      "Qs"
    ])
  ).toBe(true);
});

test("hasStraightFlush should return false when cards are straight and but not flush", () => {
  expect(
    hasStraightFlush([
      "2s",
      "7d",
      "8h",
      "9d",
      "Td",
      "Jd",
      "Qs"
    ])
  ).toBe(false);
});

test("hasStraightFlush should return false when cards are flush and but not straight", () => {
  expect(
    hasStraightFlush([
      "2s",
      "7d",
      "3d",
      "9d",
      "Td",
      "Jd",
      "Qs"
    ])
  ).toBe(false);
});

test("hasStraightFlush should return false when cards are neither flush nor straight", () => {
  expect(
    hasStraightFlush([
      "2s",
      "7d",
      "3s",
      "9d",
      "Ts",
      "Jd",
      "As"
    ])
  ).toBe(false);
});
