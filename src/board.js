import React from 'react';
import './cards.js'



export class Show_card_board extends React.Component {
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