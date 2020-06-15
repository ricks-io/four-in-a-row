export default class TurnBasedGame {
  constructor() {
    this.GAME_STATE_STARTING = 0;
    this.GAME_STATE_PLAYING = 1;
    this.GAME_STATE_GAME_OVER = 3;
    this.state = 0;
    this.currentPlayer= 0; //Whose turn is it?
    this.players = 2;


  }
  isCurrentPlayer(player) {
    if(arguments.length != 1) throw new Error("isCurrentPlayer function expects one argument.");
      return this.currentPlayer == player - 1
  }
  isGameOver() {
    if(arguments.length !=0) throw new Error("isGameOver function expects zero argument.");
    return this.state == this.GAME_STATE_GAME_OVER;
  }
  isGameStarting() {
    if(arguments.length != 0) throw new Error("isGameStarting function expects zero argument.");
    return this.state == this.GAME_STATE_STARTING
  }
  isGamePlayable() {
    if(arguments.length != 0) throw new Error("isGamePlayable function expects one argument.");
    return this.state == this.GAME_STATE_PLAYING || this.state == this.GAME_STATE_FINAL_ROLL;
  }
  startGame() {
    if(arguments.length != 0) throw new Error("startGame function expects one argument.");
    
    this.state = this.GAME_STATE_PLAYING;
    this.resetGame();
  }
  resetGame()
  {
    throw new Error("Reset Game should be overridden in the inheriting class");
  }
  endTurn(){
    if(arguments.length != 0) throw new Error("endTurn in TurnBasedGame expects exactly zero arguments.")
    this.currentPlayer += 1;
    this.currentPlayer %= this.players;
  }
}