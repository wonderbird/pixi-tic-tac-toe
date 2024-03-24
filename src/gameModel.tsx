export class GameModel {
  private observers: ((model: GameModel) => any)[] = [];

  private board: string[][] = [];

  private symbols = ['X', 'O'];
  private currentSymbol = 0;

  constructor() {
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let column = 0; column < 3; column++) {
        this.board[row][column] = '';
      }
    }
  }

  placeSymbol(row: number, column: number) {
    this.board[row][column] = this.symbols[this.currentSymbol];
    this.currentSymbol = (this.currentSymbol + 1) % 2;

    this.updateObservers();
  }

  symbolAt(row: number, column: number): string {
    return this.board[row][column];
  }

  subscribe(listener: (model: GameModel) => any) {
    this.observers.push(listener);
  }

  private updateObservers() {
    this.observers.forEach(listener => listener(this));
  }
}

export default GameModel;
