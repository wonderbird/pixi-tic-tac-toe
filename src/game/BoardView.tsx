import * as PIXI from 'pixi.js';
import Presenter from "./Presenter";

class BoardView {
  private boxTexture: PIXI.Texture = PIXI.Texture.EMPTY;
  private circleTexture: PIXI.Texture = PIXI.Texture.EMPTY;
  private circleScale: number = 1.0;

  private crossTexture: PIXI.Texture = PIXI.Texture.EMPTY;
  private crossScale: number = 1.0;

  private board: PIXI.Sprite[][] = [];

  private gameOverSprite: PIXI.Text = new PIXI.Text();
  private app: PIXI.Application;
  private presenter: Presenter;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.presenter = new Presenter(this);
  }

  public async init() {
    const boxHeight = this.app.canvas.height / 3;
    const boxWidth = this.app.canvas.width / 3;

    const padding = Math.min(boxHeight, boxWidth) / 3;
    const paddedBoxWidth = boxWidth - padding;
    const paddedBoxHeight = boxHeight - padding;

    const boxGraphics = new PIXI.Graphics();
    boxGraphics.rect(0, 0, boxWidth, boxHeight);
    boxGraphics.stroke({ width: 3, color: 'white' });
    this.boxTexture = this.app.renderer.generateTexture(boxGraphics);

    this.circleTexture = await PIXI.Assets.load('bunny.png');
    const circleScaleWidth = paddedBoxWidth / this.circleTexture.width;
    const circleScaleHeight = paddedBoxHeight / this.circleTexture.height;
    this.circleScale = Math.min(circleScaleWidth, circleScaleHeight);

    this.crossTexture = await PIXI.Assets.load('elk.png');
    const crossScaleWidth = paddedBoxWidth / this.circleTexture.width;
    const crossScaleHeight = paddedBoxHeight / this.circleTexture.height;
    this.crossScale = Math.min(crossScaleWidth, crossScaleHeight);


    const fill = new PIXI.FillGradient(0, 0, 0, 36 * 1.7 * 7);
    const colors = [0xffffff, 0x00ff99].map((color) => PIXI.Color.shared.setValue(color).toNumber());

    colors.forEach((number, index) =>
    {
      const ratio = index / colors.length;

      fill.addColorStop(ratio, number);
    });

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: { fill },
      stroke: { color: '#000000', width: 3, join: 'round' },
      dropShadow: {
        color: '#555555',
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    });

    this.gameOverSprite = new PIXI.Text({ text: 'Game Over', style });
    this.gameOverSprite.anchor.set(0.5);
    this.gameOverSprite.position.set(this.app.canvas.width / 2, this.app.canvas.height / 2);

    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let column = 0; column < 3; column++) {
        const square = PIXI.Sprite.from(this.boxTexture);
        this.board[row][column] = square;

        square.anchor.set(0.5);
        square.position.set((0.5 + column) * boxWidth, (0.5 + row) * boxHeight);

        square.interactive = true;
        square.cursor = 'pointer';

        square.on('pointerdown', () => {
          this.presenter.tapSquare(row, column);
        });

        this.app.stage.addChild(square);
      }
    }
  }

  public setGameOver(isGameOver: boolean) {
    if (isGameOver) {
      this.app.stage.addChild(this.gameOverSprite);
    } else {
      this.app.stage.removeChild(this.gameOverSprite);
    }
  }

  public setSymbolAt(symbol: string, row: number, column: number) {
    switch (symbol) {
      case 'X':
        this.board[row][column].texture = this.crossTexture;
        this.board[row][column].setSize(this.crossTexture.width * this.crossScale, this.crossTexture.height * this.crossScale);
        break;
      case 'O':
        this.board[row][column].texture = this.circleTexture;
        this.board[row][column].setSize(this.circleTexture.width * this.circleScale, this.circleTexture.height * this.circleScale);
        break;
      default:
        this.board[row][column].texture = this.boxTexture;
        break;
    }
  }
}

export default BoardView;
