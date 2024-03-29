import * as PIXI from 'pixi.js';
import Presenter from "./Presenter";
import PlayerSymbol from "./PlayerSymbol";

class BoardSquare {
  private app: PIXI.Application;
  private readonly blankSquareTexture: PIXI.Texture;
  private readonly square: PIXI.Sprite;

  constructor(app: PIXI.Application, presenter: Presenter, row: number, column: number) {
    this.app = app;
    this.blankSquareTexture = this.createBlankSquareTexture();
    
    this.square = PIXI.Sprite.from(this.blankSquareTexture);

    this.square.anchor.set(0.5);
    this.square.position.set((0.5 + column) * this.squareWidth(), (0.5 + row) * this.squareHeight());

    this.square.interactive = true;
    this.square.cursor = 'pointer';

    this.square.on('pointerdown', () => {
      presenter.tapSquare(row, column);
    });

    app.stage.addChild(this.square);
  }

  setSymbol(symbol: PlayerSymbol) {
    if (symbol === PlayerSymbol.BLANK) {
      this.square.texture = this.blankSquareTexture;
    } else {
      const squarePadding = Math.min(this.squareWidth(), this.squareHeight()) / 3;

      const paddedSquareWidth = this.squareWidth() - squarePadding;
      const paddedSquareHeight = this.squareHeight() - squarePadding;

      const texture = PIXI.Assets.get(symbol);

      const scaleWidth = paddedSquareWidth / texture.width;
      const scaleHeight = paddedSquareHeight / texture.height;
      const scale = Math.min(scaleWidth, scaleHeight);

      this.square.texture = texture;
      this.square.setSize(texture.width * scale, texture.height * scale);
    }
  }

  private createBlankSquareTexture() {
    const blankSquareGraphics = new PIXI.Graphics();
    blankSquareGraphics.rect(0, 0, this.squareWidth(), this.squareHeight());
    blankSquareGraphics.stroke({width: 3, color: 'white'});
    return this.app.renderer.generateTexture(blankSquareGraphics);
  }

  private squareHeight() {
    return this.app.canvas.height / 3;
  }

  private squareWidth() {
    return this.app.canvas.width / 3;
  }
}

export default BoardSquare;
