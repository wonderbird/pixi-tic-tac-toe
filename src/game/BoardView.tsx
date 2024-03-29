import * as PIXI from 'pixi.js';
import Presenter from "./Presenter";
import PlayerSymbol from "./PlayerSymbol";
import BoardSquareVisual from "./BoardSquareVisual";
import GameOverVisual from "./GameOverVisual";

class BoardView {
  private readonly presenter: Presenter;

  private readonly app: PIXI.Application;

  private board: BoardSquareVisual[][] = [];
  private gameOver: GameOverVisual;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.presenter = new Presenter(this);
    this.board = this.createBoard();
    this.gameOver = new GameOverVisual(this.app);
  }

  public async init() {
    await this.preloadAssets();
  }

  private async preloadAssets() {
    const assets = [
      { alias: PlayerSymbol.X, src: 'bunny.png' },
      { alias: PlayerSymbol.O, src: 'elk.png' },
    ];

    await PIXI.Assets.load(assets);
  }

  private createBoard() {
    let theBoard: BoardSquareVisual[][] = [];

    for (let row = 0; row < 3; row++) {
      theBoard[row] = [];
      for (let column = 0; column < 3; column++) {
        theBoard[row][column] = new BoardSquareVisual(this.app, this.presenter, row, column);
      }
    }
    return theBoard;
  }

  public setGameOver(isGameOver: boolean) {
    if (isGameOver) {
      this.gameOver.show();
    } else {
      this.gameOver.hide();
    }
  }

  public setSymbolAt(symbol: PlayerSymbol, row: number, column: number) {
    this.board[row][column].setSymbol(symbol);
  }
}

export default BoardView;
