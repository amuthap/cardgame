import { Server, FlatFile } from 'boardgame.io/server';
import { ShowCard } from './game';
import Router from 'koa-router';
import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
//import { getTypeString } from './utils';
import { getDatabase } from './config';
import request from 'superagent';
import uuidv4 from 'uuid/v4';
import { SERVER_PORT, API_PORT, INTERNAL_API_PORT } from './constants';

const app = new Koa();
const router = new Router();

const server = Server({
  games: [ShowCard],
  db: getDatabase(),
});

router.get('/players/:id', async ctx => {
  const gameID = ctx.params.id;
  const r = await request
    .get(`http://localhost:${INTERNAL_API_PORT}/games/${ShowCard.name}/${gameID}`);
  ctx.body = r.body;
});

router.post('/create', koaBody(), async ctx => {
  const r = await request.post(`http://localhost:${INTERNAL_API_PORT}/games/${ShowCard.name}/create`).send({
      numPlayers: ctx.request.body.players,
    });

  const gameName = ShowCard.name;
  const gameId = r.body.gameID;

  const credentials = [];

  for (var i=0; i<ctx.request.body.players; i++) {
    const j = await request
      .post(`http://localhost:${INTERNAL_API_PORT}/games/${ShowCard.name}/${gameId}/join`)
      .send({
        playerID: i,
        playerName: ctx.request.body.names[i],
      });
    
      credentials.push(j.body.playerCredentials);
  }

  if (typeof ctx.request.body.model !== 'undefined') {
    // save the model in the db, not in the setupData
    await server.db.set(`${gameName}:${gameId}:model`, ctx.request.body.model);
  }

  ctx.body = {
    game: gameId,
    credentials,
  };
});

const serverHandle = server.run({
  port: SERVER_PORT,
  callback: () => {
    console.log(`Serving at: http://localhost:${SERVER_PORT}/`);
  },
  lobbyConfig: {
    apiPort: INTERNAL_API_PORT,
    uuid: uuidv4,
    apiCallback: () => {
      console.log(`Internal API serving at: http://localhost:${INTERNAL_API_PORT}/`);
    },
  }
});
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
const appHandle = app.listen(API_PORT, () => {
  console.log(`API serving at: http://localhost:${API_PORT}/`);
});

export {
  app,
  server,
  serverHandle,
  appHandle,
}