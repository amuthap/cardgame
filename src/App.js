import React from 'react';
import { Client } from 'boardgame.io/react';
import Show_card_board from './board';
import showGame from './game';
import { SERVER_PORT } from './constants';

const url = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');

const ShowCard = Client({
  game: showGame,
  board: Show_card_board,
 // debug: false,
  multiplayer: {
    server: (process.env.NODE_ENV === 'production') ? `${url}` : `${window.location.hostname}:${SERVER_PORT}`
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.state = {
      game: params.game,
	  
      id: params.id,
      secret: params.secret,
    };
  }

  render() {
    return (
      <div className="player-container">
        <ShowCard gameID={this.state.game} credentials={this.state.secret} playerID={this.state.id + ''} />
      </div>
    );
  }
}

export default App;