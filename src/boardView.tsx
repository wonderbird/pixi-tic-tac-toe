import * as PIXI from 'pixi.js';
import GameModel from "./gameModel";
import GameController from "./gameController";

class BoardView {
  private readonly boxTexture: PIXI.Texture;
  private readonly circleTexture: PIXI.Texture;
  private readonly crossTexture: PIXI.Texture;

  private board: PIXI.Sprite[][] = [];

  private gameOverSprite: PIXI.Text;

  private app: PIXI.Application;

  constructor(app: PIXI.Application, model: GameModel, controller: GameController) {
    this.app = app;

    const boxHeight = app.canvas.height / 3;
    const boxWidth = app.canvas.width / 3;

    const boxGraphics = new PIXI.Graphics();
    boxGraphics.rect(0, 0, boxWidth, boxHeight);
    boxGraphics.stroke({ width: 3, color: 'white' });
    this.boxTexture = app.renderer.generateTexture(boxGraphics);

    const circleGraphics = new PIXI.Graphics();
    const radius = (Math.min(boxWidth, boxHeight) - 10) / 2;
    circleGraphics.circle(0, 0, radius);
    circleGraphics.stroke({ width: 3, color: 'blue' });
    this.circleTexture = app.renderer.generateTexture(circleGraphics);

    const crossGraphics = new PIXI.Graphics();
    crossGraphics.moveTo(-radius, -radius);
    crossGraphics.lineTo(radius, radius);
    crossGraphics.moveTo(-radius, radius);
    crossGraphics.lineTo(radius, -radius);
    crossGraphics.stroke({ width: 3, color: 'red' });
    this.crossTexture = app.renderer.generateTexture(crossGraphics);

    const fill = new PIXI.FillGradient(0, 0, 0, 36 * 1.7 * 7);
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: { fill },
      stroke: { color: '#ffffff', width: 5, join: 'round' },
      dropShadow: {
        color: '#cccccc',
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    });

    this.gameOverSprite = new PIXI.Text({ text: 'Game Over', style });
    this.gameOverSprite.anchor.set(0.5);
    this.gameOverSprite.position.set(app.canvas.width / 2, app.canvas.height / 2);

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
          controller.tapSquare(row, column);
        });

        app.stage.addChild(square);
      }
    }

    model.subscribe((model: GameModel) => this.update(this, model));
  }

  private update(self: BoardView, model: GameModel) {
    if (model.isGameOver()) {
      this.app.stage.addChild(self.gameOverSprite);
    }
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const symbol = model.symbolAt(row, column);

        switch (symbol) {
          case 'X':
            self.board[row][column].texture = this.crossTexture;
            break;
          case 'O':
            self.board[row][column].texture = this.circleTexture;
            break;
          default:
            self.board[row][column].texture = this.boxTexture;
            break;
        }
      }
    }
  }
}

export default BoardView;
