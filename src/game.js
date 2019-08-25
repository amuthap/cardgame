import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

function IsVictory() {
 // ...
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
 // return cells.filter(c => c === null).length == 0;
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function arrayRemove(arr, val) {
	var value=arr.indexOf(val);
	var a1=arr.slice(0,value);
	var a2=arr.slice(value+1,arr.length);
	
	
	return(a1.concat(a2));
}
function sum_hand(cardVals,arr){
	let arrSum=0,item;
	for (item of arr){
		let val = cardVals[item];
		val = val.substring(0, val.length - 1);
		if (val=="A"){val = 1;}
		if (val=="J"){val = 10;}
		if (val=="Q"){val = 10;}
		if (val=="K"){val = 10;}
		val = parseInt(val);
		arrSum+=val;
	}
	return arrSum;
}
function min(input) {
	if (toString.call(input) !== "[object Array]")  
	  return false;
 return Math.min.apply(null, input);
   }

export function getInitialstate(ctx){
	const G = { deck_back: "cards/Red_Back.svg" ,deck : ['AS','KS','QS','JS','10S','9S','8S','7S','6S','5S','4S','3S','2S','AC','KC','QC','JC','10C','9C','8C','7C','6C','5C','4C','3C','2C','AD','KD','QD','JD','10D','9D','8D','7D','6D','5D','4D','3D','2D','AH','KH','QH','JH','10H','9H','8H','7H','6H','5H','4H','3H','2H'
 ],deck_cards: 51, open_cards: 0,open_deck:[],roundWinner:-1,sum_arr:[],x:0, no_of_hands : ctx.numPlayers,hand : [],temp:52,players:{'0':{hand:[],count:0},'1':{hand:[],count:0},'2':{hand:[],count:0},'3':{hand:[],count:0},'4':{hand:[],count:0},'5':{hand:[],count:0}}};
	 shuffleArray(G.deck);
	  G.open_deck[G.open_cards]=G.deck_cards;
      G.deck_cards--;
	  G.open_cards++;
	  for(let j=0;j < G.no_of_hands;j++){
	  for(let i=0;i<3;i++){
		G.players[j].hand[G.players[j].count]=G.deck_cards;
		G.deck_cards--;
		G.players[j].count++;
	  }}
	  return G;
}

export const ShowCard = Game({
  setup: getInitialstate,
  moves: {
  deal:G => {
	  shuffleArray(G.deck);
	  G.open_deck[G.open_cards]=G.deck_cards;
      G.deck_cards--;
	  G.open_cards++;
	  for(let j=0;j<2;j++){
	  for(let i=0;i<5;i++){
		G.players[j].hand[G.players[j].count]=G.deck_cards;
		G.deck_cards--;
		G.players[j].count++;
	  }
	  }
	
	},
    drawCard(G,ctx,playerid) {
	  G.players[playerid].hand[G.players[playerid].count]=G.deck_cards;
      G.deck_cards--;
      G.players[playerid].count++;	
	    G.open_deck[G.open_cards]=G.temp;
		 G.open_cards++;
		 G.temp=52;
    },
    playCard(G,ctx,n,playerid) {
		

	  G.temp=n;
      G.players[playerid].hand=arrayRemove(G.players[playerid].hand,n); 
      G.players[playerid].count--;
	 
    },
    getOpencard(G,ctx,playerid){
	  G.players[playerid].hand[G.players[playerid].count]=G.open_deck[G.open_cards-1];
      G.players[playerid].count++;	
	  G.open_deck.pop();
	  G.open_cards--;
	  G.open_deck[G.open_cards]=G.temp;
	  G.open_cards++;
	  G.temp=52;

	},
	endgame(G,playerid){
		let sum_arr=[],arr=[];
		for(let i=0;i<G.no_of_hands;i++){
			
			G.x=sum_hand(G.deck,G.players[i].hand);
			G.sum_arr[i]= G.x;
		}
		let LowScore=min(G.sum_arr);
		let LowScorePlayer=G.sum_arr.indexOf(LowScore);
	//	if(LowScorePlayer==playerid){

			G.roundWinner=LowScorePlayer;
	//	}
		
		
		
	},
	
	
  },


  flow: {
    
    

	  	    movesPerTurn: 2,

  },
});

export default ShowCard;