import * as PIXI from 'pixi.js';

async function createScene(app: PIXI.Application) {
    const texture = await PIXI.Assets.load(
        "https://pixijs.com/assets/bunny.png"
    );
    const sprite = PIXI.Sprite.from(texture);
    sprite.texture.source.scaleMode = "nearest";
    sprite.anchor.set(0.5);
    sprite.scale.set(10);
    sprite.position.set(
        app.renderer.screen.width / 2,
        app.renderer.screen.height / 2
    );
    app.stage.addChild(sprite);
}

export default createScene;
