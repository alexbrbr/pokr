const { findFlush, find5Highest } = require("./hands-results");

test("findFlush should return the 5 cards composing the flush (same suit)", () => {
  expect(findFlush(["3s", "As", "5c", "Ah", "2s", "Ts", "4s"])).toEqual([
    "As",
    "Ts",
    "4s",
    "3s",
    "2s"
  ]);
});

test("findFlush should return the 5 highest cards composing the flush (same suit)", () => {
  expect(findFlush(["3s", "As", "5s", "Ah", "2s", "Ts", "4s"])).toEqual([
    "As",
    "Ts",
    "5s",
    "4s",
    "3s"
  ]);
});

test("findFlush should return null when not a suit", () => {
  expect(findFlush(["3c", "As", "5c", "Ah", "2s", "Ts", "4s"])).toEqual(null);
});

test("find5Highest should return 5 highest cards", () => {
  expect(find5Highest(["Ac", "As", "Ad", "Ah", "2s", "Ts", "4s"])).toEqual([
    "Ac",
    "As",
    "Ad",
    "Ah",
    "Ts"
  ]);
});

test("find5Highest should return 5 highest cards in order", () => {
  expect(find5Highest(["Ac", "As", "Ad", "2s", "Ts", "4s", "Ah"])).toEqual([
    "Ac",
    "As",
    "Ad",
    "Ah",
    "Ts"
  ]);
});
