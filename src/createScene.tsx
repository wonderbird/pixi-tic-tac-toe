import * as PIXI from 'pixi.js';

async function createScene(app: PIXI.Application) {
    const boxHeight = app.canvas.height / 3;
    const boxWidth = app.canvas.width / 3;

    const boxGraphics = new PIXI.Graphics();
    boxGraphics.rect(0, 0, boxWidth, boxHeight);
    boxGraphics.stroke({ width: 3, color: 'white' });
    const boxTexture = app.renderer.generateTexture(boxGraphics);

    const circleGraphics = new PIXI.Graphics();
    circleGraphics.circle(0, 0, (boxWidth - 10) / 2);
    circleGraphics.stroke({ width: 3, color: 'blue' });
    const circleTexture = app.renderer.generateTexture(circleGraphics);

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            const boxSprite = PIXI.Sprite.from(boxTexture);
            boxSprite.anchor.set(0.5);
            boxSprite.position.set((0.5 + column) * boxWidth, (0.5 + row) * boxHeight);

            boxSprite.eventMode = 'static';
            boxSprite.cursor = 'pointer';
            boxSprite.on('pointerdown', () => {
                boxSprite.texture = circleTexture;
            });

            app.stage.addChild(boxSprite);
        }
    }
}

export default createScene;
