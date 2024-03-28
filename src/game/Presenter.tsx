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

    this.view.show(this.model);
  }
}

export default Presenter;
