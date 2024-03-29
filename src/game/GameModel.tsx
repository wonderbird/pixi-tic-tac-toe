import PlayerSymbol from "./PlayerSymbol";

export class GameModel {
  private board: PlayerSymbol[][] = [];

  private symbols = [PlayerSymbol.X, PlayerSymbol.O];
  private currentSymbol = 0;

  constructor() {
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let column = 0; column < 3; column++) {
        this.board[row][column] = PlayerSymbol.BLANK;
      }
    }
  }

  placeSymbol(row: number, column: number) {
    if (this.board[row][column] !== PlayerSymbol.BLANK) {
      return;
    }

    this.board[row][column] = this.symbols[this.currentSymbol];
    this.currentSymbol = (this.currentSymbol + 1) % 2;
  }

  symbolAt(row: number, column: number): PlayerSymbol {
    return this.board[row][column];
  }

  isGameOver() {
    // check whether there is a row with the same symbol
    for (let row = 0; row < 3; row++) {
      if (this.board[row][0] !== PlayerSymbol.BLANK && this.board[row][0] === this.board[row][1] && this.board[row][1] === this.board[row][2]) {
        return true;
      }
    }

    // check whether there is a column with the same symbol
    for (let column = 0; column < 3; column++) {
      if (this.board[0][column] !== PlayerSymbol.BLANK && this.board[0][column] === this.board[1][column] && this.board[1][column] === this.board[2][column]) {
        return true;
      }
    }

    // check whether the diagonal from the top left to the bottom right has the same symbol
    if (this.board[0][0] !== PlayerSymbol.BLANK && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return true;
    }

    // check whether the diagonal from the top right to the bottom left has the same symbol
    if (this.board[0][2] !== PlayerSymbol.BLANK && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      return true;
    }

    // check whether the board contains an empty square
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (this.board[row][column] === PlayerSymbol.BLANK) {
          return false;
        }
      }
    }

    return true;
  }
}

export default GameModel;
