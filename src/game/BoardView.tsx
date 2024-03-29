import * as PIXI from 'pixi.js';
import Presenter from "./Presenter";
import PlayerSymbol from "./PlayerSymbol";
import BoardSquare from "./BoardSquare";

class BoardView {
  private readonly presenter: Presenter;

  private theBoard: BoardSquare[][] = [];
  private readonly app: PIXI.Application;
  private gameOverSprite: PIXI.Text = new PIXI.Text();

  constructor(app: PIXI.Application) {
    this.app = app;
    this.presenter = new Presenter(this);
  }

  public async init() {
    await this.preloadAssets();
    this.gameOverSprite = this.createGameOverSprite();
    this.theBoard = this.createBoard();
  }

  private async preloadAssets() {
    const assets = [
      { alias: PlayerSymbol.X, src: 'bunny.png' },
      { alias: PlayerSymbol.O, src: 'elk.png' },
    ];

    await PIXI.Assets.load(assets);
  }
  private createBoard() {
    let theBoard: BoardSquare[][] = [];

    for (let row = 0; row < 3; row++) {
      theBoard[row] = [];
      for (let column = 0; column < 3; column++) {
        theBoard[row][column] = new BoardSquare(this.app, this.presenter, row, column);
      }
    }
    return theBoard;
  }
  private createGameOverSprite(): PIXI.Text {
    const fill = new PIXI.FillGradient(0, 0, 0, 36 * 1.7 * 7);
    const colors = [0xffffff, 0x00ff99].map((color) => PIXI.Color.shared.setValue(color).toNumber());

    colors.forEach((number, index) => {
      const ratio = index / colors.length;

      fill.addColorStop(ratio, number);
    });

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: {fill},
      stroke: {color: '#000000', width: 3, join: 'round'},
      dropShadow: {
        color: '#555555',
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const gameOverSprite = new PIXI.Text({text: 'Game Over', style});
    gameOverSprite.anchor.set(0.5);
    gameOverSprite.position.set(this.app.canvas.width / 2, this.app.canvas.height / 2);

    return gameOverSprite;
  }

  public setGameOver(isGameOver: boolean) {
    if (isGameOver) {
      this.app.stage.addChild(this.gameOverSprite);
    } else {
      this.app.stage.removeChild(this.gameOverSprite);
    }
  }

  public setSymbolAt(symbol: PlayerSymbol, row: number, column: number) {
    this.theBoard[row][column].setSymbol(symbol);
  }
}

export default BoardView;
