import GameModel from "./GameModel";

class Presenter {
  private model: GameModel;

  constructor(model: GameModel) {
    this.model = model;
  }

  tapSquare(row: number, column: number) {
    if (this.model.isGameOver()) {
      return;
    }

    this.model.placeSymbol(row, column);
  }
}

export default Presenter;
