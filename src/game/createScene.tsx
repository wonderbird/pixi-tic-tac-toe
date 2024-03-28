import * as PIXI from 'pixi.js';
import Presenter from "./Presenter";
import BoardView from "./BoardView";
import GameModel from "./GameModel";

async function createScene(app: PIXI.Application) {
    const model = new GameModel();
    const presenter = new Presenter(model);
    const boardView = new BoardView(app, model, presenter);

    await boardView.init();
}

export default createScene;
