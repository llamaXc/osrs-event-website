import { Request, Response } from 'express';
import { Quest } from '../entity/Quest';
import { APIItemDropInformation, SlotName } from '../service/ModelInterfaces/ApiDataTypes';
import { IPlayerService } from '../service/interfaces/IPlayerService';

export class PlayerController{

    constructor(private readonly playerService: IPlayerService){}

    getPlayerFromSession(res: Response){

        return [res.locals.player, res.locals.playerHash]
    }

    async updateLevels(req: Request, res: Response){
        const data = req.body.data;
        const [player, playerHash] = this.getPlayerFromSession(res);

        if(player){
            const lvlMap = new Map<string, number>(Object.entries(data['levels']))
            const totalLvl = data['totalLevel']
            await this.playerService.updateLevels(player, lvlMap, totalLvl);
        }

        return res.json({msg: "Levels updated"}).status(200);
    }

    async updateBank(req: Request, res: Response){

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
    }

    async updateQuests(req: Request, res: Response){
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

        return res.json({msg: "Player not found while updating quests"}).status(404);
    }

    async updateInventoryItems(req: Request, res: Response){
        const data = req.body.data;

        const [player, playerHash] = this.getPlayerFromSession(res);
        const value = data['gePrice']

        await this.playerService.updateInventoryItems(data['inventory'], player, value)
        return res.json({msg: "Inventory updated"}).status(200);
    }

    async updateEquippedItems(req: Request, res: Response){
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
    }

    async saveNpcLoot(req : Request, res: Response){
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
    }

    async getAllTest(req : Request, res: Response){
        const player = await this.playerService.getPlayerById(1);

        if(player){
            const serverResponse = await this.playerService.getPlayerDataById(1);
            return res.json(serverResponse);
        }
        return res.json({msg: "Player does not exist"}).status(404);
    }
}
