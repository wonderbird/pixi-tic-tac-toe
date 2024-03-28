import * as PIXI from 'pixi.js';
import GameController from "./GameController";
import BoardView from "./BoardView";
import GameModel from "./GameModel";

async function createScene(app: PIXI.Application) {
    const model = new GameModel();
    const controller = new GameController(model);
    const boardView = new BoardView(app, model, controller);

    await boardView.init();
}

export default createScene;
