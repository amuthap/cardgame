
import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { ShowCard } from "./game";
import { Show_card_board } from "./board";

const ShowCardClient = Client({
  game: ShowCard,
  board: Show_card_board,
  multiplayer: { local: true }
});

const App = () => (
  <div>
    Player 0
    <ShowCardClient playerID="0" />
    <br />
    Player 1
    <ShowCardClient playerID="1" />
  </div>
);

render(<App />, document.getElementById("root"));