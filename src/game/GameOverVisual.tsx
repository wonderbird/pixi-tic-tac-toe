import * as PIXI from 'pixi.js';

class GameOverVisual {
  private app: PIXI.Application;
  private readonly gameOverSprite: PIXI.Text;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.gameOverSprite = this.createGameOverSprite();
  }

  public show() {
    this.app.stage.addChild(this.gameOverSprite);
  }

  public hide() {
    this.app.stage.removeChild(this.gameOverSprite);
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

}

export default GameOverVisual;
