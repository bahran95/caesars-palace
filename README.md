# caesars-palace
Web based Card Dealing API - made with Node + Express.js - <i>by Bahran Abraham</i>

<h1>Card Dealing API Docs</h1>
<br>
<ul>
  <li>To get started clone the repo to your machine.</li>
  <li>Run npm init to download the npm packages required</li>
  <li>In your local machines commandline you can use npm start to start a local server</li>
  <li>Then you can use an app like postman to make GET and POST request to this API </li>
</ul>
<br>
<h3>To Deal a Card</h3>
<p>make a GET request to <b>'/deal'</b> and you will receive a response with an array of all the cards dealt so far.</p>
<h3>To Shuffle the Deck</h3>
<p>make a GET request to <b>'/shuffle'</b> and you will receive a response with the shuffled deck.</p>
<h3>To Discard a Specific Card</h3>
<p>make a POST request to <b>'/discard'</b> with a JSON containing the card you wish to discard.</p>
<p><b>Example:</b> <br>
  { <br>
    "card" : "Ace of Spades"
  <br>
  }
  <br>
<p>You will receive a response saying <i>"Ace of Spades has been discarded!"</i></p>
<p>However, if you weren't dealt that card before you will get a response saying <i>"You have not been dealt that card yet!"</i></p>
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
