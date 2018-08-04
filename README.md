# pokr

[![Coverage Status](https://coveralls.io/repos/github/alexbrbr/pokr/badge.svg?branch=master)](https://coveralls.io/github/alexbrbr/pokr?branch=master)
[![npm version](https://badge.fury.io/js/pokr.svg)](https://badge.fury.io/js/pokr)
[![Build Status](https://travis-ci.org/alexbrbr/pokr.svg?branch=master)](https://travis-ci.org/alexbrbr/pokr)

## description

This library simulates poker hands being played and gives the winner, for instance :

```js
const pokr = require("pokr");

const deck = pokr.createDeck();
const hand = pokr.dealHand(deck);
const hand2 = pokr.dealHand(deck);

console.log(hand.hand);
console.log(hand2.hand);

console.log(pokr.winningPlayer(hand.hand, hand2.hand, deck.splice(0, 5)));
```
