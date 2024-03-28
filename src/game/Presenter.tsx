import GameModel from "./GameModel";
import BoardView from "./BoardView";

class Presenter {
  private readonly model: GameModel;
  private view: BoardView;

  constructor(view: BoardView) {
    this.model = new GameModel();
    this.view = view;
  }

  tapSquare(row: number, column: number) {
    if (this.model.isGameOver()) {
      return;
    }

    this.model.placeSymbol(row, column);

    this.view.setGameOver(this.model.isGameOver());

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const symbol = this.model.symbolAt(row, column);
        this.view.setSymbolAt(symbol, row, column);
      }
    }
  }
}

export default Presenter;
