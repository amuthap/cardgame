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

export const ShowCard = Game({
  setup: () => ({ deck_back: "cards/Red_Back.svg" ,deck : ['AS','KS','QS','JS','10S','9S','8S','7S','6S','5S','4S','3S','2S','AC','KC','QC','JC','10C','9C','8C','7C','6C','5C','4C','3C','2C','AD','KD','QD','JD','10D','9D','8D','7D','6D','5D','4D','3D','2D','AH','KH','QH','JH','10H','9H','8H','7H','6H','5H','4H','3H','2H'
 ],deck_cards: 51, hand_cards: 0,hand : [] ,open_cards: 0,open_deck:[] }),

  moves: {
  deal:G => {
	  shuffleArray(G.deck);
	  G.open_deck[G.open_cards]=G.deck_cards;
      G.deck_cards--;
	  G.open_cards++;
	},
    drawCard: G => {
	  G.hand[G.hand_cards]=G.deck_cards;
      G.deck_cards--;
      G.hand_cards++;	
    },
    playCard(G,ctx,n) {
      G.open_deck[G.open_cards]=n;
      G.hand=arrayRemove(G.hand,n); 
      G.hand_cards--;
	  //G.hand_cards=G.hand.length;
	  G.open_cards++;
      
    },
    getOpencard(G,ctx,n){
	  G.hand[G.hand_cards]=G.open_deck[G.open_cards-1];
      G.hand_cards++;	
	  G.open_deck.pop();
	  G.open_cards--;
    },
  },

  flow: {
   /* endGameIf: (G, ctx) => {
      if (IsVictory()) {
        //return { winner: ctx.currentPlayer };
      }
      if (IsDraw()) {
        //return { draw: true };
      }
    },*/
  },
});