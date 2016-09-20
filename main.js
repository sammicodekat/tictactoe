var Game = React.createClass({
  getInitialState() {
    return {
      tiles: ['', '', '', '', '', '', '', '', ''],
      turn: 0,
      winner: '',
      player:'Cat'
    };
  },
  render() {
    let {tiles,turn,winner,player}=this.state;
    return (
      <div className='game'>
        <div>
          <div className={winner === '' ? 'visible': 'hidden'}>
          <h3 className="text-center">Player {player}'s turn</h3>
          </div>
          <div className={winner === '' ? 'hidden': 'visible'}>
           <h2 className ='text-center'>Player {player} Won!</h2>
           </div>
            <button className ="btn btn-lg btn-block btn-primary" onClick={this.resetGame}>New Game</button></div>
         {tiles.map(function(tile, position){
          return (
            <Tile turn={turn} tileClass={tile} onClickHandler={this.CheckStatus} id={position} />
          );
          },this)}
      </div>
    );
  },

  CheckStatus(e) {
    let position = e.target.id;
    let {tiles,turn,winner,player} =this.state;
    let playerNow = 'Dog';
    var gameTiles = tiles;
    if (tiles[position] === '') {
      tiles[position] = turn.toString()};

    var check = function(a, b, c) {
      return !!(a + b + c).match(/^(000|111)$/gi);
    };

    if (check(gameTiles[0], gameTiles[1], gameTiles[2]) || check(gameTiles[0], gameTiles[3], gameTiles[6]) || check(gameTiles[1], gameTiles[4], gameTiles[7]) ||
      check(gameTiles[2], gameTiles[5], gameTiles[8]) || check(gameTiles[3], gameTiles[4], gameTiles[5]) || check(gameTiles[6], gameTiles[7], gameTiles[8]) ||
      check(gameTiles[2], gameTiles[4], gameTiles[6]) || check(gameTiles[0], gameTiles[4], gameTiles[8])) {
      winner = turn.toString();
      this.setState({
        turn: turn,
        winner: winner
      });
    } else {
      if(turn === 1){
        playerNow = 'Cat';
      }
      this.setState({
        turn: 1 - turn,
        player:playerNow
      });
    }

  },

  resetGame() {
    this.setState(this.getInitialState());
  }
});

var Tile = React.createClass({
  render() {
    let {tileClass,turn,onClickHandler,id} =this.props;
    return <div className={ tileClass === ""?'tile turn_' + turn : 'tile' + ' clicked_'+tileClass} onClick={onClickHandler} id={id}></div>;
  }
});

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
