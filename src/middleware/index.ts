
import { playerService } from "../service";
import { AuthRuneliteMiddleware } from "./AuthRunelite";

const service = playerService;
const authService = new AuthRuneliteMiddleware(service);

export const osrsAuthValidator = authService.validateOsrs.bind(authService)