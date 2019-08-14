
import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { ShowCard } from "./game";
import { Show_card_board } from "./board";
import { Game, PlayerView } from 'boardgame.io/core';


const ShowCardClient = Client({
  game: ShowCard,
  board: Show_card_board,
  playerView: PlayerView.STRIP_SECRETS,
  multiplayer: {  server: 'localhost:8000' }
});
/*
const App = () => (
  <div>
    Player 0
    <ShowCardClient playerID="0" />
    <br />
    Player 1
    <ShowCardClient playerID="1" />
  </div>
  
);
*/

class App extends React.Component {
  state = { playerID: null };
  playerView: PlayerView.STRIP_SECRETS;

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <ShowCardClient playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));