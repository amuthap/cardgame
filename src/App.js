import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import React from 'react';

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

const ShowCard = Game({
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

class Show_card_board extends React.Component {
	onclick(id){
		if(this.isActive(id)){
			if(id=="c1")
				this.props.moves.drawCard();
			else if(id=="c2")
				this.props.moves.deal();
			else if(id=="c3")
				this.props.moves.getOpencard();
			else {
				this.props.moves.playCard(id);
			}
		}
	}
	isActive(button_id){
		    if (!this.props.isActive) return false;
			else
				return true;
	}
	render(){
		let tbody=[];
	tbody.push(<tr key={"tr1"}><td key={"td1"}>Deck</td><td>{this.props.G.deck_cards}</td></tr>);
	tbody.push(<tr key={"tr2"}><td key={"td2"}>Hand</td><td>{this.props.G.hand_cards}</td></tr>);
	tbody.push(<tr key={"tr3"}><td key={"td2"}>Hand_card is</td><td>{this.props.G.deck[this.props.G.hand_cards]}</td></tr>);
		
		let drawcard_button=[];
		drawcard_button.push(<button key={"b1"} type="button" id="1"  onClick={() => this.onclick('c1')}>DrawCard</button>);
		let deal_button=[];
		deal_button.push(<button key={"b2"} type="button" id="2"  onClick={() => this.onclick('c2')}>Deal</button>);
		let center_deck=[];
		center_deck.push(<img key={"i1"} className='card' src='cards/Red_Back.svg' onClick={() => this.onclick('c1')}/>);
		let hand_deck=[];
		for (var i =0;i<this.props.G.hand_cards;i++){
			let n=this.props.G.hand[i];
			let cpath="cards/";
			let srctag=cpath+this.props.G.deck[n]+".svg";
			hand_deck.push(<img key={i} className='card' src={srctag}  onClick={() => this.onclick(n)}/>);
		}
		let open_deck=[];
		let cpath="cards/";
		let n=this.props.G.open_deck[this.props.G.open_cards-1];
		let srctag=cpath+this.props.G.deck[n]+".svg";

		open_deck.push(<img key={"o1"} className='card' src={srctag}  onClick={() => this.onclick('c3')} />);

		return(
			


<div>

<table>
  <tbody>{tbody}</tbody>
</table>
<div>
{drawcard_button}
	{deal_button}
</div>
 <div className='card'>
 {center_deck}
</div>
 <div className="hand hhand-compact active-hand">
 {hand_deck}
</div>
<div className="card">
 {open_deck}
</div>
  
 </div>
		);
		
	}
}

const App = Client({
	game: ShowCard ,
	  board: Show_card_board,

	});

export default App;