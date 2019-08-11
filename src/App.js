import { Client } from 'boardgame.io/react';
import { ShowCard } from './game';
import { Show_card_board } from './board';
import React from 'react';


const ShowCardClient = Client({
	game: ShowCard ,
	  board: Show_card_board,
  multiplayer: { local: true },

	});
const App = () => (
	<div>
	<ShowCard playerID="0" />
	<ShowCard playerID="1" />
	</div>
);
render(<App />, document.getElementById("root"));
//export default App;