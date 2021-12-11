import { ItemDrop } from '../entity/Item';
import { NpcKill } from '../entity/NpcKill';
import { Player } from '../entity/Player';
import { IPlayerRepository } from '../repository/interfaces/IPlayerRepository'
import { INpcKill, IItemDrop, IBasicItemDropped, IPlayer, IInventory, IItem, IEquippedItems, ILevels, ILevel, ICoordinate, IQuestList, IBank } from '../state/database';
import { ItemService } from './itemService';
import { MonsterService } from './monsterService';
const crypto = require('crypto')

export class PlayerService{
    constructor(private readonly _playerRepo: IPlayerRepository, 
        private readonly _monsterService: MonsterService,
        private readonly _itemService: ItemService){}

    async getNpcKills(player: IPlayer): Promise<INpcKill[]>{
        return await this._playerRepo.getNpcKillsForPlayer(player);
    }

    async updateQuestList(player: IPlayer, questList: IQuestList){
        return await this._playerRepo.updateQuestListForPlayer(player, questList);
    }

    async getQuestListForPlayer(player: IPlayer){
        return await this._playerRepo.getQuestListForPlayer(player);
    }

    async doesPlayerExist(playerToken: string){
        let player = await this._playerRepo.getPlayerByToken(playerToken);
        return player !== undefined;
    }

    async registerNewPlayer(username: string, key: string){
        if(key == undefined){
            key = crypto.randomUUID();
        }
        console.log("New Player being registered: key=" + key)
        return await this._playerRepo.addNewPlayer(<IPlayer>{
            username: username, token: key
        })
    }

    async updateSupplementInformation(player: IPlayer, combatLevel: number, username: string, x: number, y: number, plane: number){
        let coords: ICoordinate = {
            x: x,
            y: x,
            z: plane
        }
        await this._playerRepo.updatePosition(player, coords);
        await this._playerRepo.updateNameAndLevel(player, username, combatLevel);
    }

    async getPosition(player: IPlayer){
        return await this._playerRepo.getPosition(player);
    }

    async getPlayerById(playerId: number){
        return await this._playerRepo.getPlayerById(playerId);
    }

    async getPlayerByHash(playerToken: string): Promise<Player>{
        let player = await this._playerRepo.getPlayerByToken(playerToken);
        if(player){
            return player;
        }else{
            throw new Error("Cant find player")
        }
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

    async createNpcKill(npcId: number, droppedItems: IBasicItemDropped[], killValue: number, player: Player){
        let kill : NpcKill = new NpcKill();
        kill.killValue = killValue;
        kill.player = player;
        await NpcKill.save(kill);

        // kill.items
      

        // let npc = await this._monsterService.getMonsterById(npcId);
        let items : ItemDrop[] = [];

        for (const item of droppedItems){
            let fetchedItem = await this._itemService.getItemById(item.id)

            if(fetchedItem){
                let droppedItem : ItemDrop = new ItemDrop();
                droppedItem.quantity =  item.quantity
                droppedItem.kill = kill
                droppedItem.item = fetchedItem;

                items.push(droppedItem);
            }
        }

        // let npcKill : INpcKill = <INpcKill>{
        //     id: 1,
        //     killValue: killValue,
        //     items: items,
        //     npc: npc,
        //     player: player,
        // }

        // console.log(npcKill)
        // return this._playerRepo.createNpcKill(npcKill, player);
    }

    async getLevelsForPlayer(player: IPlayer){
        return await this._playerRepo.getPlayerLevels(player);
    }

    async updatePlayerLevels(player: IPlayer, levelsMap: Map<string, number>, totalLevel: number){
        let levelsFormatted: ILevels = {
            levels: new Map<string, ILevel>(),
            total: totalLevel,
        }   

        let keys = Array.from(levelsMap.keys());
        for (let key of keys){
            let lvl: ILevel = {
                name: key,
                level: 1,
                xp: 1
            }

            let levels = levelsFormatted.levels;
            levels.set(key, lvl);
            levelsFormatted.levels = levels;

        }

        return await this._playerRepo.updatePlayerLevels(levelsFormatted, player)
    }

    async updateBankItems(bankItems: IBasicItemDropped[], value: number, player: IPlayer){
        let bankSlotItems: IItem[] = []
        for(const basicItemInfo of bankItems){
            if(basicItemInfo){
                let item = await this._itemService.getItemById(basicItemInfo.id)
                if(item){
                    bankSlotItems.push(item);
                }
            }
        }

        let bank : IBank = {
            items: bankSlotItems,
            value: value
        }
        return await this._playerRepo.updateBank(player, bank)
    }

    async getBank(player: IPlayer){
        return await this._playerRepo.getBank(player);
    }
}