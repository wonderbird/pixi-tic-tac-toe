import * as PIXI from 'pixi.js';
import BoardView from "./BoardView";

async function createScene(app: PIXI.Application) {
    const boardView = new BoardView(app);
    await boardView.init();
}

export default createScene;
