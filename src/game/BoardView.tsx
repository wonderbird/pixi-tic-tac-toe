import * as PIXI from 'pixi.js';
import Presenter from "./Presenter";

class BoardView {
  private board: PIXI.Sprite[][] = [];

  private presenter: Presenter;

  private app: PIXI.Application;
  private blankSquareTexture: PIXI.Texture = PIXI.Texture.EMPTY;
  private gameOverSprite: PIXI.Text = new PIXI.Text();

  constructor(app: PIXI.Application) {
    this.app = app;
    this.presenter = new Presenter(this);
  }

  public async init() {
    await this.preloadAssets();
    this.blankSquareTexture = this.createBlankSquareTexture();
    this.gameOverSprite = this.createGameOverSprite();
    this.board = this.createBoard();
  }

  private async preloadAssets() {
    const assets = [
      { alias: 'X', src: 'bunny.png' },
      { alias: 'O', src: 'elk.png' },
    ];

    await PIXI.Assets.load(assets);
  }

  private createBlankSquareTexture() {
    const blankSquareGraphics = new PIXI.Graphics();
    blankSquareGraphics.rect(0, 0, this.squareWidth(), this.squareHeight());
    blankSquareGraphics.stroke({width: 3, color: 'white'});
    return this.app.renderer.generateTexture(blankSquareGraphics);
  }

  private createBoard() {
    let board: PIXI.Sprite[][] = [];

    for (let row = 0; row < 3; row++) {
      board[row] = [];
      for (let column = 0; column < 3; column++) {
        const square = PIXI.Sprite.from(this.blankSquareTexture);
        board[row][column] = square;

        square.anchor.set(0.5);
        square.position.set((0.5 + column) * this.squareWidth(), (0.5 + row) * this.squareHeight());

        square.interactive = true;
        square.cursor = 'pointer';

        square.on('pointerdown', () => {
          this.presenter.tapSquare(row, column);
        });

        this.app.stage.addChild(square);
      }
    }
    return board;
  }

  private squareHeight() {
    return this.app.canvas.height / 3;
  }

  private squareWidth() {
    return this.app.canvas.width / 3;
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

  public setSymbolAt(symbol: string, row: number, column: number) {
    if (symbol !== 'X' && symbol !== 'O') {
      this.board[row][column].texture = this.blankSquareTexture;
    } else {
      const texture = PIXI.Assets.get(symbol);

      const squarePadding = Math.min(this.squareWidth(), this.squareHeight()) / 3;
      const paddedSquareWidth = this.squareWidth() - squarePadding;
      const paddedSquareHeight = this.squareHeight() - squarePadding;

      const scaleWidth = paddedSquareWidth / texture.width;
      const scaleHeight = paddedSquareHeight / texture.height;
      const scale = Math.min(scaleWidth, scaleHeight);
      this.board[row][column].texture = texture;
      this.board[row][column].setSize(texture.width * scale, texture.height * scale);
    }
  }
}

export default BoardView;
