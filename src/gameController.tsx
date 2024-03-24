import GameModel from "./gameModel";

class GameController {
  private model: GameModel;

  constructor(model: GameModel) {
    this.model = model;
  }

  tapSquare(row: number, column: number) {
    this.model.placeSymbol(row, column);
  }
}

export default GameController;
