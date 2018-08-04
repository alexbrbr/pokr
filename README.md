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

console.log(hand.hand); // [ 'Jd', 'Th' ]
console.log(hand2.hand); // [ 'Qd', '5h' ]

console.log(pokr.winningPlayer(hand.hand, hand2.hand, deck.splice(0, 5))); // { winner: 'player2', hand: { cards: [ '2c', '2s', '2h', '2d', 'Qd' ], hand: 'fourOfAKind' } }
```
