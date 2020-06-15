import clone from "./Clone.js"
import TurneBasedGame from "./TurnBasedGame.js"

export default class Seven extends TurneBasedGame{
 
  constructor(){
    super()
    this.maxRows = 6;
    this.maxCols = 7;
    this.state = 1;
  }
  resetGame(){
    this.columns = [];
    for(let i = 0; i < this.maxCols; i++){
      this.columns.push([]);
    }
    this.currentPlayer = 0;
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
  
  
}