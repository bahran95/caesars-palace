/** DOCUMENTATION IN README.MD **/

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
    this.dealtCards = [];

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

  order() {
    let currentDiscard = this.discardPile;
    let currentDealt = this.dealtCards;

    this.rebuildDeck();

    let newArr = this.deck.filter(el => {
      return currentDealt.indexOf(el) < 0;
    });

    let newArr2 = newArr.filter(el => {
      return currentDiscard.indexOf(el) < 0;
    });

    this.deck = newArr2;
  }
}

let newDeck = new Deck();

app.get('/deal', (req, res) => {
  newDeck.dealtCards.push(newDeck.deal());
  res.json(newDeck.dealtCards);
});

app.get('/shuffle', (req, res) => {
  newDeck.shuffle();
  res.json(newDeck.deck);
});

app.post('/discard', (req, res) => {
  if (newDeck.dealtCards.indexOf(req.body.card) > -1) {
    newDeck.discard(req.body.card);
    res.json(`${req.body.card} has been discarded!`);
  } else {
    res.json('You have not been dealt that card yet!');
  }
});

app.post('/cut', (req, res) => {
  newDeck.cut(req.body.location);
  res.json(newDeck.deck);
});

app.get('/rebuildDeck', (req, res) => {
  newDeck.rebuildDeck();
  res.json(newDeck);
});

app.get('/order', (req, res) => {
  newDeck.order();
  res.json(newDeck.deck);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
