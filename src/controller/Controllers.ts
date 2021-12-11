
import { playerService } from "../service/Services";
import { PlayerController } from "./playerController"

export const playerController = new PlayerController(playerService);
