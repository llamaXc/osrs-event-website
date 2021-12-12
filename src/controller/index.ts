

// Export instance of the player controller to be used by our Routes

console.log("==== Controllers initalized ====")

import {playerService} from "../service"

import { PlayerController } from "./playerController"
export const playerController = new PlayerController(playerService)

console.log("==== Controllers end initalized ====")
