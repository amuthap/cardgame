import React from 'react';
import './cards.js'
import { Game } from 'boardgame.io/core';

export function getPlayerID(ctx) {
	return this.props.G.state.playerID;
}


class Show_card_board extends React.Component {
	onclick(id){
		let temp_card=this.props.G.temp;
		if(this.isActive(id)){
			if(id=="c1" )
				if(temp_card != 52)
				this.props.moves.drawCard(this.props.playerID);
			
			if(id=="c3")
				if(temp_card != 52)
				this.props.moves.getOpencard(this.props.playerID);
			if(id!="c3" && id!="c1"){
				if(temp_card == 52)
				this.props.moves.playCard(id,this.props.playerID);

			}
		}
	}
	isActive(button_id){
		    if (!this.props.isActive) return false;
			else
				return true;
	}
	render(){
		
		
		
		let center_deck=[];
		center_deck.push(<img key={"i1"} className='card' src='cards/Red_Back.svg' onClick={() => this.onclick('c1')}/>);
		let hand_deck=[];
		let playerid = this.props.playerID;
		for (var i =0;i<this.props.G.players[playerid].count;i++){
			let n=this.props.G.players[playerid].hand[i];
			let cpath="cards/";
			let srctag=cpath+this.props.G.deck[n]+".svg";
			hand_deck.push(<img key={i} className='card' src={srctag}  onClick={() => this.onclick(n)}/>);
		}
		let open_deck=[];
		let cpath="cards/";
		let n=this.props.G.open_deck[this.props.G.open_cards-1];
		let srctag=cpath+this.props.G.deck[n]+".svg";

		open_deck.push(<img key={"o1"} className='card' src={srctag}  onClick={() => this.onclick('c3')} />);
		
		let temp_arr=[];
		let srctag_temp=cpath+this.props.G.deck[this.props.G.temp]+".svg";
		temp_arr.push(<img key={"temp"} className='card' src={srctag_temp}   />);

		return(
			


<div>

 <div className='card'>
 {center_deck}
</div>
<div className="card">
 {open_deck}
</div>
 <div className="hand hhand-compact active-hand">
 {hand_deck}
</div>
<div className="card">
 {temp_arr}
</div>

  
 </div>
		);
		
	}
}
export default Show_card_board;