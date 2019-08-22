import { Lobby } from 'boardgame.io/react';

<Lobby
  gameServer={`https://${window.location.hostname}:8000`}
  lobbyServer={`https://${window.location.hostname}:8000`}
  gameComponents={game: ShowCard ,
	  board: Show_card_board,}
/>;