const Server = require('boardgame.io/server').Server;
const ShowCard = require('./game').ShowCard;
const server = Server({ games: [ShowCard] });
server.run(8000);