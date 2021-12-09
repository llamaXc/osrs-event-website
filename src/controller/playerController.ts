import { PlayerService } from '../service/playerService'
import { Request, Response } from 'express';
import { IBasicItemDropped } from '../state/database';

export class PlayerController{
    private readonly _playerService : PlayerService;

    constructor(playerService: PlayerService){
        this._playerService = playerService
    }

    async getPlayerFromHeader(req: Request){
        let header = req.headers;

        let authBearer = header['authorization']
        let playerHash = ''
        if(authBearer){
            playerHash = authBearer.split(' ')[1]
        }

        let doesExist = await this._playerService.doesPlayerExist(playerHash);
        if(doesExist == false){
            await this._playerService.registerNewPlayer(playerHash, "New Player");
        }

       return await this._playerService.getPlayerByHash(playerHash);
    }
    
    async getInventory(req: Request, res: Response){
        // let player = await this.getPlayerFromHeader(req)
        let player = await this._playerService.getPlayerByHash('a5345127-b33d-4565-a530-2ffe0970fac6');
        if(player){
            let invo = await this._playerService.getInventory(player);
            return res.json(invo).status(200)
        }

        return res.json({msg: "Failed to find player"}).status(404);
    }


    async updateLevels(req: Request, res: Response){
        let data = req.body.data;
        let player = await this.getPlayerFromHeader(req);

        if(player){
            let lvlMap = new Map<string, number>(Object.entries(data['levels']))
            let totalLvl = data['totalLevel']
            console.log(lvlMap)
            await this._playerService.updatePlayerLevels(player, lvlMap, totalLvl);
        }
        
        res.send("Done")
    }

    async getLevelsTest(req: Request, res: Response){
        let player = await this._playerService.getPlayerByHash('a5345127-b33d-4565-a530-2ffe0970fac6');
        if (player){
            let lvl =  await this._playerService.getLevelsForPlayer(player);
            let arrayOfLevels = []
            if(lvl){
                for (let curLevel of Array.from(lvl.levels.keys())){
                    if(curLevel){
                        let data = lvl.levels.get(curLevel);
                        if(data){
                            arrayOfLevels.push({name: curLevel, level: data.level})
                        }
                    }
                }

                let response = {
                    totalLevel: lvl.total,
                    levels: arrayOfLevels,
                    time_updated: lvl.time_updated
                }

                return res.json(response).status(200)
            }
        
        }
        return res.json({msg: "No levels items found"}).status(404)
    }

    async updateInventoryItems(req: Request, res: Response){
        let data = req.body.data;

        let player = await this.getPlayerFromHeader(req);
        let value = data['gePrice']
        if(player){
            await this._playerService.updateInventoryItems(data['inventory'], player, value)
        }
        
        res.send("Done")
    }

    async updateEquippedItems(req: Request, res: Response){
        let player = await this.getPlayerFromHeader(req);
        if (player){
            let data = req.body.data
            
            let map = new Map<string, IBasicItemDropped>(Object.entries(data['equippedItems']));
            let mapOfSlots: Map<string, IBasicItemDropped> = new Map()

            for (let k of Array.from(map.keys())){
                let item = map.get(k);
                if(item != null){
                    mapOfSlots.set(k, item)
                }
            }

            await this._playerService.updateEquippiedItems(mapOfSlots, player)
        }
        res.send("Done")
    }

    async getEquippedItemsTest(req: Request, res: Response){
        let player = await this._playerService.getPlayerByHash('a5345127-b33d-4565-a530-2ffe0970fac6');
        if (player){
            let equip =  await this._playerService.getEquippedItemsByForPlayer(player);
            return res.json(equip).status(200)
        }
        return res.json({msg: "No equipped items found"}).status(404)
    }

    async saveNpcLoot(req : Request, res: Response){
        let data = req.body.data

        let npcId = data['npcId']
        let droppedItems = data['items']
        let killValue = data['gePrice'];

        let player = await this.getPlayerFromHeader(req);
        
        if(player){
            await this._playerService.createNpcKill(npcId, droppedItems, killValue, player)
        }

        res.send("Done")
    }

    async getNpcKills(req : Request, res: Response){
        return res.send(await this._playerService.getAllNpcKills())
    }
}