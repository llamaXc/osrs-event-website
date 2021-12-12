import { PlayerService } from '../service/playerService'
import { Request, Response } from 'express';
import { Player } from '../entity/Player';
import { IBasicItemDropped } from '../state/old_ts';
import { Quest } from '../entity/Quest';

export class PlayerController{
    private readonly _playerService : PlayerService;

    constructor(playerService: PlayerService){
        this._playerService = playerService
    }

    async getPlayerFromHeader(req: Request){
        const header = req.headers;
        const supplementInfo = req.body['playerInfo']

        const authBearer = header['authorization']
        let playerHash = ''
        if(authBearer){
            playerHash = authBearer.split(' ')[1]
        }

        console.log("Checking if player exists")
        let doesExist = await this._playerService.doesPlayerExist(playerHash);
        console.log("DOne checking if player exists. They do: " + doesExist)

        if(!doesExist){
            let username = "Zezima"
            if(supplementInfo !== null){
                username = supplementInfo['username']
            }
            await this._playerService.registerNewPlayer(playerHash, username);
            doesExist = true
        }

        console.log("About to get player from hash: " + playerHash)

        let player : Player = await this._playerService.getPlayerByHash(playerHash);

        console.log("ABout to start supp info")

        if(supplementInfo !== null && doesExist){
            const {combatLevel, position, username} = supplementInfo
            const {x, y, plane} = position;

            player = await this._playerService.updateSupplementInformation(
                player,
                combatLevel,
                username,
                x,
                y,
                plane
            );
        }
        return {playerHash, player}
    }

    // async getPlayerById(req: Request, res: Response){
    //     try{
    //         let id = parseInt(req.params.id);
    //         let player = await this._playerService.getPlayerById(id);
    //         let completeData : any = {}
    //         if(player){
    //             completeData['player'] = await this._playerService.getPlayerById(id);

    //             let lvls = await this._playerService.getLevelsForPlayer(player)
    //             completeData['levels'] = lvls
    //             if(lvls){
    //                 completeData['levels']['levels'] = Array.from(lvls.levels.values())
    //             }

    //             completeData['invo'] = await this._playerService.getInventory(player)
    //             completeData['armour'] = await this._playerService.getEquippedItemsByForPlayer(player);
    //             completeData['kills'] = await this._playerService.getNpcKills(player);
    //             completeData['quests'] = await this._playerService.getQuestListForPlayer(player);
    //             completeData['bank'] = await this._playerService.getBank(player);
    //             completeData['position'] = await this._playerService.getPosition(player);
    //         }
    //         return res.json(completeData);
    //     }catch{
    //         return res.status(404);
    //     }
    // }

    // async getInventoryTest(req: Request, res: Response){
    //     // let player = await this.getPlayerFromHeader(req)
    //     let player = await this._playerService.getPlayerByHash('a5345127-b33d-4565-a530-2ffe0970fac6');
    //     if(player){
    //         let invo = await this._playerService.getInventory(player);
    //         return res.json(invo).status(200)
    //     }

    //     return res.json({msg: "Failed to find player"}).status(404);
    // }


    async updateLevels(req: Request, res: Response){
        const data = req.body.data;
        const {player} = await this.getPlayerFromHeader(req);

        if(player){
            const lvlMap = new Map<string, number>(Object.entries(data['levels']))
            const totalLvl = data['totalLevel']
            await this._playerService.updateLevels(player, lvlMap, totalLvl);
        }

        res.send("Done")
    }

    async updateBank(req: Request, res: Response){
        console.log("Controller time to start update bank method");

        const {player} = await this.getPlayerFromHeader(req);

        console.log("Got the player from the header")

        const data = req.body.data;

        console.log("CONTROLLER IS NOW HAS THE PLAYER");
        if(player){
            const {items, value} = data;

            const itemArray = Array.from(items);
            const bankItems : IBasicItemDropped[] = []
            for(const rawItemInfo of itemArray){
                const bankBasicItemInfo: IBasicItemDropped = rawItemInfo as IBasicItemDropped;
                bankItems.push(bankBasicItemInfo);
            }

            console.log(" PKM DEBUG UPDATE BANK " + bankItems.length + " " + player.username)
            await this._playerService.updateBankItems(bankItems, value, player);

        }
        return res.status(200);
    }

    async updateQuests(req: Request, res: Response){
        const {player} = await this.getPlayerFromHeader(req);
        const data = req.body.data;

        const quests : Quest[] = []

        if(player){
            const questArray = Array.from(data['quests'])

            for (let i = 0; i < questArray.length; i++){
                const quest : any = questArray[i];
                const state: string = quest['state']
                const name: string = quest['name']
                const id: number = quest['id']

                const questToAdd = {
                    name,
                    id,
                    state
                } as Quest

                quests.push(questToAdd);
            }

            const qp = data['qp']

            this._playerService.updateQuestData(player, quests, qp);
            return res.status(200);
        }

        return res.status(404);
    }

    // async getLevelsTest(req: Request, res: Response){
    //     let player = await this._playerService.getPlayerByHash('a5345127-b33d-4565-a530-2ffe0970fac6');
    //     if (player){
    //         let lvl =  await this._playerService.getLevelsForPlayer(player);
    //         let arrayOfLevels = []
    //         if(lvl){
    //             for (let curLevel of Array.from(lvl.levels.keys())){
    //                 if(curLevel){
    //                     let data = lvl.levels.get(curLevel);
    //                     if(data){
    //                         arrayOfLevels.push({name: curLevel, level: data.level})
    //                     }
    //                 }
    //             }

    //             let response = {
    //                 totalLevel: lvl.total,
    //                 levels: arrayOfLevels,
    //                 time_updated: lvl.time_updated
    //             }

    //             return res.json(response).status(200)
    //         }

    //     }
    //     return res.json({msg: "No levels items found"}).status(404)
    // }

    async updateInventoryItems(req: Request, res: Response){
        const data = req.body.data;

        const {player, playerHash} = await this.getPlayerFromHeader(req);
        const value = data['gePrice']

        console.log(">Updating inventory<")
        console.log(JSON.stringify(player, null, 2));

        if(player){
            await this._playerService.updateInventoryItems(data['inventory'], player, value)
        }

        res.send("Done")
    }

    async updateEquippedItems(req: Request, res: Response){
        const {player} = await this.getPlayerFromHeader(req);
        if (player){
            const data = req.body.data

            const map = new Map<string, IBasicItemDropped>(Object.entries(data['equippedItems']));
            const mapOfSlots: Map<string, IBasicItemDropped> = new Map()

            for (const k of Array.from(map.keys())){
                const item = map.get(k);
                if(item != null){
                    mapOfSlots.set(k, item)
                }
            }

            await this._playerService.updateEquippiedItems(mapOfSlots, player)
        }
        res.send("Done")
    }

    async saveNpcLoot(req : Request, res: Response){
        const data = req.body.data
        const npcId = data['npcId']
        const droppedItems = data['items']
        const killValue = data['gePrice'];

        const {playerHash, player} = await this.getPlayerFromHeader(req);

        if(player){
            await this._playerService.createNpcKill(npcId, droppedItems, killValue, player)
        }else{
            console.log("Failed to locate player with key: " + playerHash)
        }

        res.send("Done")
    }

    async getAllTest(req : Request, res: Response){
        const player = await this._playerService.getPlayerById(1);

        const responseMap : any = {};

        if(player){
            responseMap['questPoints'] = player.questPoints;
            responseMap['levels'] = player.levels;
            responseMap['kills'] = player.kills;
            responseMap['invontory'] = player.inventory.slots
            return res.json(responseMap);
        }
        return res.status(404);
    }
}