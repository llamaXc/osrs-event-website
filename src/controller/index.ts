import  {playerService } from "../service"
import { PlayerController } from "./playerController"

export const playerController = new PlayerController(playerService)

