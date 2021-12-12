
import { playerService } from "../service";
import { AuthRuneliteMiddleware } from "./AuthRunelite";

const authService = new AuthRuneliteMiddleware(playerService);

export const osrsAuthValidator = authService.validateOsrs.bind(authService)