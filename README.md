# caesars-palace
Web based Card Dealing API - made with Node + Express.js

<h1>Card Dealing API Docs</h1>
<h3>To Deal a Card</h3>
<p>make a GET request to <b>'/deal'</b> and you will receive a response of the card dealt.</p>
<h3>To Shuffle the Deck</h3>
<p>make a GET request to <b>'/shuffle'</b> and you will receive a response saying <i>"The deck has been shuffled!"</i></p>
<h3>To Discard a Specific Card</h3>
<p>make a POST request to <b>'/discard'</b> with a JSON containing the card you wish to discard.</p>
<p><b>Example:</b> <br>
  { <br>
    "card" : "Ace of Spades"
  <br>
  }
  <br>
<p>You will receive a response saying <i>"Ace of Spades has been discarded!"</i></p>
<h3>To Cut the Deck</h3>
<p>make a POST request to <b>'/cut'</b> with a JSON containing the location of where you want to cut the deck.</p>
<p><b>Example:</b> <br>
  { <br>
    "location" : "10"
  <br>
  }
  <br>
<p>You will receive a response saying <i>"The deck has been cut!"</i></p>
<h3>To Order the Remaining Deck</h3>
<p>make a get request to <b>'/order'</b> and you will receive a response of the current deck ordered to default.</p>
<h3>To Rebuild/Rest the Deck </h3>
<p>make a get request to <b>'/rebuildDeck'</b> and you will receive a response with the brand new deck.</p>
