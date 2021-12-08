import { updateCall } from 'typescript';
import { PlayerRepository } from '../repository/playerRepositroy'
import { INpcKill, IItemDrop, IBasicItemDropped, IPlayer, IInventory, IItem, IEquippedItems, ILevels, ILevel } from '../state/database';
import { ItemService } from './itemService';
import { MonsterService } from './monsterService';

export class PlayerService{
    constructor(private readonly _playerRepo: PlayerRepository, 
        private readonly _monsterService: MonsterService,
        private readonly _itemService: ItemService){}

    async getAllNpcKills(){
        return this._playerRepo.getAllNpcKills();
    }

    async doesPlayerExist(playerToken: string){
        return false;
    }

    async registerNewPlayer(playerToken: string, name: string){
        return this._playerRepo.addNewPlayer(<IPlayer>{
            token: playerToken, name: name, id: 1
        })
    }

    async getPlayerByHash(playerToken: string){
        return this._playerRepo.getPlayerByToken(playerToken);
    }

    async getInventory(player: IPlayer){
        return await this._playerRepo.getPlayerInventory(player)
    }
    
    async turnMappedEquipmentToSlot(item?: IBasicItemDropped){
        if(item){
            let fetchedItem = await this._itemService.getItemById(item.id);
            if(item){
                return <IItemDrop>{
                    item: fetchedItem,
                    quantity: item.quantity
                };
            }
        }
        return null;
    }

    async getEquippedItemsByForPlayer(player: IPlayer){
        return await this._playerRepo.getPlayerEquippedItems(player)
    }

    async updateEquippiedItems(mapOfSlottedItems: Map<string, IBasicItemDropped>, player: IPlayer){
        let amulet = await  this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("AMULET"))
        let legs = await  this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("LEGS"))
        let boots = await  this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("BOOTS"))
        let gloves = await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("GLOVES"))
        let chest =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("BODY"))
        let head =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("HEAD"))
        let weapon =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("WEAPON"))
        let cape =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("CAPE"))
        let ammo =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("AMMO"))

        let equipped = <IEquippedItems>{
            ammo: ammo,
            cape: cape,
            weapon: weapon,
            head: head,
            chest: chest,
            gloves: gloves,
            boots: boots,
            legs: legs,
            amulet: amulet
        }

        this._playerRepo.updatePlayerEquippedItems(equipped, player)
    }

    async updateInventoryItems(basicItems: IBasicItemDropped[], player: IPlayer, value: number){
        let items : IItemDrop[] = []

        for (const basicItemInfo of basicItems){
            let fetchedItem = await this._itemService.getItemById(basicItemInfo.id)
            if(fetchedItem){
                let droppedItem : IItemDrop = <IItemDrop>{
                    quantity: basicItemInfo.quantity,
                    item: fetchedItem
                }
                if(basicItemInfo.id > 0){
                    items.push(droppedItem);
                }
            }
        }

        let current_unix_time = Math.floor(Date.now() / 1000)
        let invo = <IInventory>{
            value: value,
            slots: items,
            player: player,
            time_updated: current_unix_time,
        }

        return await this._playerRepo.updatePlayerInventory(player, invo);
    }

    async createNpcKill(npcId: number, droppedItems: IBasicItemDropped[], killValue: number, player: IPlayer){
        let npc = await this._monsterService.getMonsterById(npcId);
        let items : IItemDrop[] = [];

        for (const item of droppedItems){
            let fetchedItem = await this._itemService.getItemById(item.id)
            if(fetchedItem){
                let droppedItem : IItemDrop = <IItemDrop>{
                    quantity: item.quantity,
                    item: fetchedItem
                }
                items.push(droppedItem);
            }
        }

        let npcKill : INpcKill = <INpcKill>{
            id: 1,
            killValue: killValue,
            items: items,
            npc: npc,
            player: player,
        }

        console.log(npcKill)
        return this._playerRepo.createNpcKill(npcKill);
    }

    async getLevelsForPlayer(player: IPlayer){
        return await this._playerRepo.getPlayerLevels(player);
    }

    async updatePlayerLevels(player: IPlayer, levelsMap: Map<string, number>, totalLevel: number){
        let convertedLevels: Map<string, ILevel> = new Map()
        for (let levelName of Array.from(levelsMap.keys())){
            let extractedLevel = levelsMap.get(levelName);
            if(extractedLevel){
                let lvl : ILevel = <ILevel>{name: levelName, level: extractedLevel, xp: 1}
                convertedLevels.set(levelName, lvl);
            }
        }
        
        let levels = <ILevels>{
            total: totalLevel,
            levels: convertedLevels
        }

        console.log("Passing ILevels obj")
        console.log(levels)

        return this._playerRepo.updatePlayerLevels(levels, player)
    }
}