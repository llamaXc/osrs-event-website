import { Request, Response, NextFunction } from "express";
import { IPlayerService } from "../service/interfaces/IPlayerService";

export class AuthRuneliteMiddleware{

    constructor(private readonly playerService: IPlayerService){}

    public async validateOsrs(req: Request, res: Response, next: NextFunction){
        const header = req.headers;

        if(req.body === undefined){
            return res.json({msg: "No body found on request"}).status(404);
        }

        const authBearer = header['authorization']
        let supplementInfo;

        if(req.body['playerInfo'] === undefined){
            console.log("No player info attached to message")
        }else{
            supplementInfo = req.body['playerInfo']
        }


        const playerHash = authBearer?.split(' ')[1]

        if(playerHash === undefined || playerHash === ""){
            console.log("No bearer token found on request " + playerHash)
            return res.json({msg: "No bearer token found on request"}).status(404);
        }else{
            console.log("Player has found: " + playerHash)
        }

        const player = await this.playerService.getPlayerByHash(playerHash);

        if(player === undefined){
            console.log("Player not found with hash: " + playerHash)
            return res.json({msg: "Player with hash: " + playerHash + " is not found"}).status(404);
        }else{
            console.log("Player found in database")
        }

        res.locals.playerHash = playerHash;
        res.locals.player = player;

        if(supplementInfo !== undefined){
            const {combatLevel, position, username} = supplementInfo
            const {x, y, plane} = position;
            console.log("Supplement information: " + JSON.stringify(supplementInfo))
            const currentPlayerWIthInfo = await this.playerService.updateSupplementInformation(
                player,
                combatLevel,
                username,
                x,
                y,
                plane
            );

            res.locals.player = currentPlayerWIthInfo;
        }else{
            console.log("Supplement info was empty: " + JSON.stringify(supplementInfo, null, 2))
        }

        return next();

    }
}

export default module;

