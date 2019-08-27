import React from 'react';
import PropTypes from 'prop-types';
import { grammarJoin, resolvePlayerNames, resolvePlayerName, getPlayers } from '../../utils';

class Status extends React.Component {
  static propTypes = {
    playerID: PropTypes.any,
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    current: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    names: PropTypes.any.isRequired,
    dealtCard: PropTypes.string.isRequired,
  };

  render() {
      let currentPlayerName = resolvePlayerName(this.props.ctx.currentPlayer, this.props.names, this.props.playerID);
      let prefix = <span />;

      
      return (
        <span>{prefix}Waiting for <strong>{currentPlayerName}</strong> to play.</span>
      );
    

    return <span />;
  }
}

export default Status;