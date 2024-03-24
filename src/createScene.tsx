import * as PIXI from 'pixi.js';
import GameController from "./gameController";
import BoardView from "./boardView";
import GameModel from "./gameModel";

async function createScene(app: PIXI.Application) {
    const model = new GameModel();
    const controller = new GameController(model);
    new BoardView(app, model, controller);
}

export default createScene;
