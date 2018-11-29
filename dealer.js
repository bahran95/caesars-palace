const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

/*
-- deal card
-- shuffle
-- discard
-- cut
-- order
-- rebuild deck
 */

class Deck {
  constructor() {
    this.deck = [];
    this.rebuildDeck();
  }

  /*builds deck with default sort order*/

  rebuildDeck() {
    this.deck = [];
    this.discardPile = [];

    const suites = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

    for (let suit in suites) {
      for (let value in values) {
        this.deck.push(`${values[value]} of ${suites[suit]}`);
      }
    }
  }

  /*deal one card of the top*/

  deal() {
    let card = this.deck.shift();
    return card;
  }

  /*shuffle the intialized deck*/

  shuffle() {
    //using Fisher-Yates Shuffle method
    let m = this.deck.length;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
    }

    return this;
  }

  /*discard a specific card and send to discard pile*/

  discard(card) {
    let findCard = this.deck.indexOf(card);
    let removedCard = this.deck.splice(findCard, 1);
    let discardedArr = this.discardPile.concat(removedCard);
    this.discardPile = discardedArr;
  }

  /*cut location specified to split deck to
  two and sets bottom half on top of the top half*/
  cut(location) {
    let bottomHalf = this.deck.splice(location, this.deck.length);
    let cutDeck = bottomHalf.concat(this.deck);
    this.deck = cutDeck;
  }
}

let newDeck = new Deck();

app.get('/deal', (req, res) => {
  res.json(newDeck.deal());
});

app.get('/shuffle', (req, res) => {
  res.json(newDeck.shuffle());
});

app.post('/discard', (req, res) => {
  newDeck.discard(req.body.card);
  res.json(`${req.body.card} has been discarded!`);
});

app.post('/cut', (req, res) => {
  newDeck.cut(req.body.location);
  res.json(newDeck.deck);
});

app.get('/rebuildDeck', (req, res) => {
  newDeck.rebuildDeck();
  res.json(newDeck);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
