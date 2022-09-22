
import { CreateGame, UpdateGame } from "@ts-types/games-type";
import Base from "./base";

class Game extends Base<CreateGame, UpdateGame> {}

export default new Game();
