import clone from "./Clone.js"
import TurneBasedGame from "./TurnBasedGame.js"

export default class Seven extends TurneBasedGame{
 
  constructor(){
    super()
    this.maxRows = 6;
    this.maxCols = 7;
    this.state = 1;
    this.PLAYER_1_WINS = "Player 1 Wins!"
    this.PLAYER_2_WINS = "Player 2 Wins!"
    this.TIE = "The game ends in a time";
    this.NO_WINNER_YET = "The game continues";
  }
  resetGame(){
    this.columns = [];
    for(let i = 0; i < this.maxCols; i++){
      this.columns.push([]);
    }
    this.currentPlayer = 0;
    this.result = this.NO_WINNER_YET
  }
  canPlayCol(col){
    if(arguments.length != 1) throw new Error("canPlayCol expects exactly one argument");
    if(col < 0 || col >= this.maxCols) throw new Error("Column out of bounds");
    return this.columns[col].length < this.maxRows;
  }
  getColRow(col, row){
    if(arguments.length!=2) throw new Error("getColRow expects exactly two aurgements.")
    if(col < 0 || col >= this.maxCols) throw new Error("Column out o bonuds");
    if(row < 0 || row >= this.maxRows) throw new Error("Row out of bounds");
    let column = this.columns[col];
    if(row >= column.length)
      return "Empty";
    else return column[row];
  }
  playCol(col){
    if(arguments.length!=1) throw new Error("getColRow expects exactly two aurgements.")
    if(col < 0 || col >= this.maxCols) throw new Error("Column out o bonuds");
    let column = this.columns[col];
    if(column.length >= this.maxRows) throw new Error("Column is full, can't play to that column");
    column.push(this.currentPlayer);
    this.endTurn();
  }
  getWinnerText(){
    //Check up
    //Convert to a grid
    let grid = [];
    for(let c = 0; c < this.maxCols; c++){
      let column = [];
      grid.push(column);
      for(let r = 0; r < this.maxRows; r++){
        if(r < this.columns[c].length)
          column.push(this.columns[c][r])
        else
          column.push(-1);
      }
    }

    //Vertical
    for(let c = 0; c < this.maxCols; c++){
      for(let r = 0; r < this.maxRows-3; r++){
        let arr = [];
        for(let i = 0; i < 4; i++){
          arr.push(grid[c][r+i])
        }
        let equal = arr.every(i=>i == arr[0]);
        if(equal){
          if(arr[0] == 0)
            return this.PLAYER_1_WINS;
          if(arr[0] == 1)
            return this.PLAYER_2_WINS
        }
      }
    }
    //Vertical
    for(let c = 0; c < this.maxCols-3; c++){
      for(let r = 0; r < this.maxRows; r++){
        let arr = [];
        for(let i = 0; i < 4; i++){
          arr.push(grid[c+i][r])
        }
        let equal = arr.every(i=>i == arr[0]);
        if(equal){
          if(arr[0] == 0)
            return this.PLAYER_1_WINS;
          if(arr[0] == 1)
            return this.PLAYER_2_WINS;
        }
      }
    }
    //Diagonal 1
    for(let c = 0; c < this.maxCols-3; c++){
      for(let r = 0; r < this.maxRows-3; r++){
        let arr = [];
        for(let i = 0; i < 4; i++){
          arr.push(grid[c+i][r+i])
        }
        let equal = arr.every(i=>i == arr[0]);
        if(equal){
          if(arr[0] == 0)
            return this.PLAYER_1_WINS;
          if(arr[0] == 1)
            return this.PLAYER_2_WINS;
        }
      }
    }
    //Diagonal 2
    for(let c = 3; c < this.maxCols; c++){
      for(let r = 0; r < this.maxRows-3; r++){
        let arr = [];
        for(let i = 0; i < 4; i++){
          arr.push(grid[c-i][r+i])
        }
        let equal = arr.every(i=>i == arr[0]);
        if(equal){
          if(arr[0] == 0)
            return this.PLAYER_1_WINS;
          if(arr[0] == 1)
            return this.PLAYER_2_WINS;
        }
      }
    }

    //If we get here and every spot is full, then it is a tie
    for(let c = 0; c < this.maxCols; c++){
      if(grid[c].some(i=>i == -1))
        return this.NO_WINNER_YET;
    }

    return this.TIE;
  }
  isGameOver(){
    let result = this.getWinnerText();
    if(result == this.NO_WINNER_YET)
      return false;
    return true;
  }
  
  
}