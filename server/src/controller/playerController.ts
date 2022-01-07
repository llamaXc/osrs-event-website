import { NextFunction, Request, Response } from 'express';
import { Quest } from '../entity/Quest';
import { APIItemDropInformation, SlotName } from '../service/ModelInterfaces/ApiDataTypes';
import { IPlayerService } from '../service/interfaces/IPlayerService';
import { nextTick } from 'process';

export class PlayerController{

    constructor(private readonly playerService: IPlayerService){}

    getPlayerFromSession(res: Response){
        return [res.locals.player, res.locals.playerHash]
    }

    async updateSupplementInformation(req: Request, res: Response, next: NextFunction){
        try{
            const player = res.locals.player;
            const playerHash = res.locals.playerHash;
            const {username, combatLevel, position} = req.body['playerInfo'];

            console.log(username, combatLevel, position)

            if(player && playerHash && position != undefined && position.x  != undefined && position.y != undefined && position.z !== undefined){

                this.playerService.updateSupplementInformation(
                    player,
                    combatLevel,
                    username,
                    position.x,
                    position.y,
                    position.plane
                )
            }

            return next();
        }catch(err){
            return res.json("Failed to get information from player");
        }
    }

    async updateLevels(req: Request, res: Response){
        try{
            const data = req.body.data;
            const [player, playerHash] = this.getPlayerFromSession(res);

            if(player){
                const lvlMap = new Map<string, number>(Object.entries(data['levels']))
                const totalLvl = data['totalLevel']
                await this.playerService.updateLevels(player, lvlMap, totalLvl);
            }

            return res.json({msg: "Levels updated"}).status(200);
        }catch(err){
            return res.json("Failed to update levels").status(500)
        }
    }

    async updateBank(req: Request, res: Response){
        try{
            const [player, playerHash] = this.getPlayerFromSession(res);
            const data = req.body.data;

            if(player){
                const {items, value} = data;

                const itemArray = Array.from(items);
                const bankItems : APIItemDropInformation[] = []
                for(const rawItemInfo of itemArray){
                    const bankBasicItemInfo = rawItemInfo as APIItemDropInformation;
                    bankItems.push(bankBasicItemInfo);
                }

                await this.playerService.updateBankItems(bankItems, value, player);

            }
            return res.json({msg: "Bank updated"}).status(200);
        }catch(err){
            return res.json("Failed to update bank").status(500)
        }
    }

    async updateQuests(req: Request, res: Response){
        try{
            const [player, playerHash] = this.getPlayerFromSession(res);
            const data = req.body.data;

            const quests : Quest[] = []
            if(player){
                const questArray = Array.from(data['quests'])

                for (let i = 0; i < questArray.length; i++){
                    const quest : any = questArray[i];
                    const state: string = quest['state']
                    const name: string = quest['name']
                    const questId: number = quest['id']

                    const questToAdd = {
                        name,
                        questId,
                        state
                    } as Quest

                    quests.push(questToAdd);
                }

                const qp = data['qp']
                this.playerService.updateQuestData(player, quests, qp);
                return res.json({msg: "Quests updated"}).status(200);
            }

        }catch(err){
            return res.json("Failed to update quests").status(500)
        }
    }

    async updateInventoryItems(req: Request, res: Response){
        try{
            const data = req.body.data;

            const [player, playerHash] = this.getPlayerFromSession(res);

            const value = data['gePrice']

            await this.playerService.updateInventoryItems(data['inventory'], player, value)
            return res.json({msg: "Inventory updated"}).status(200);
        }catch(err){
            return res.json("Failed to update inventory items").status(500)
        }
    }

    async updateEquippedItems(req: Request, res: Response){
        try{
            const [player, playerHash] = this.getPlayerFromSession(res);
            const data = req.body.data

            const map = new Map<SlotName, APIItemDropInformation>(Object.entries(data['equippedItems']));
            const mapOfSlots: Map<SlotName, APIItemDropInformation> = new Map()

            for (const slotName of Array.from(map.keys())){
                const item = map.get(slotName);
                if(item != null){
                    mapOfSlots.set(slotName, item)
                }
            }

            await this.playerService.updateEquippiedItems(mapOfSlots, player)
            return res.json({msg: "Equipment updated"}).status(200);
        }catch(err){
            return res.json("Failed to updated equipment").status(500);
        }
    }

    async saveNpcLoot(req : Request, res: Response){
        try{
            const data = req.body.data
            const npcId = data['npcId']
            const droppedItems = data['items']
            const killValue = data['gePrice'];

            const [player, playerHash] = this.getPlayerFromSession(res);

            if(player){
                await this.playerService.createNpcKill(npcId, droppedItems, killValue, player)
            }else{
                console.log("Failed to locate player with key: " + playerHash)
                return res.json({msg: "Failed to add kill for player with hash: " + playerHash}).status(404);
            }
            return res.json({msg: "Npc loot saved to player"}).status(200);
        }catch(err){
            return res.json("Failed to save npc loot").status(500);
        }
    }

    async getPlayers(req: Request, res: Response){
        try{
            const players = await this.playerService.getPlayers();
            const playerResponseArray = []
            for (const player of players){
                const {username, id, combatLevel, totalLevel} = player;
                playerResponseArray.push({username, id, combatLevel, totalLevel});
            }
            return res.json({players: playerResponseArray});
        }catch(err){
            return res.json("Failed to get players").status(500);
        }
    }

    async getPlayerDetails(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            console.log(JSON.stringify(req.params, null, 2))

            console.log("ID: " + id)

            const player = await this.playerService.getPlayerById(id);
            let username = player?.username
            if(username){
                console.log("Username: " + username);
                const playerDetails = await this.playerService.getPlayerByUsername(username);
                console.log(JSON.stringify(playerDetails, null, 2))
                return res.json({player: playerDetails});
            }else{
                return res.json({msg: "No player with id found"}).status(404);
            }
        }catch(err){
            return res.json("Failed getting player details").status(500)
        }
    }

    async getBankForPlayer(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            const bankRes = await this.playerService.getPlayerBankById(id)
            return res.json(bankRes).status(200);
        }catch(err){
            return res.json("Failed").status(500)
        }
    }
    async getAllTest(req : Request, res: Response){
        try{
            throw new Error("Failling")
            return res.json({msg: "Hitting api route"}).status(200);
        }catch(err){
            return res.json("Failed").status(500)
        }
    }
}
