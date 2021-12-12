import { ItemDrop } from '../entity/ItemDrop';
import { NpcKill } from '../entity/NpcKill';
import { Player } from '../entity/Player';
import { IPlayerRepository } from '../repository/interfaces/IPlayerRepository'
import { IBasicItemDropped } from '../state/old_ts';
import { ItemService } from './itemService';
import { MonsterService } from './monsterService';
import {v4 as uuidv4} from 'uuid';
import { Position } from '../entity/Position';

export class PlayerService{
    constructor(private readonly _playerRepo: IPlayerRepository,
        private readonly _monsterService: MonsterService,
        private readonly _itemService: ItemService){
            console.log("PlayerService initalized succesfully");
        }

    async getNpcKills(player: Player): Promise<NpcKill[]>{
        return await this._playerRepo.getNpcKillsForPlayer(player);
    }

    // async updateQuestList(player: IPlayer, questList: IQuestList){
    //     return await this._playerRepo.updateQuestListForPlayer(player, questList);
    // }

    // async getQuestListForPlayer(player: IPlayer){
    //     return await this._playerRepo.getQuestListForPlayer(player);
    // }

    async doesPlayerExist(playerToken: string){
        return await this._playerRepo.getPlayerByToken(playerToken) !== undefined;
    }

    async registerNewPlayer(username: string, key?: string){
        if(key === undefined){
            key = uuidv4()
        }
        try{
            return await this._playerRepo.addNewPlayer({
                username, token: key, combatLevel: 0
            } as Player)
        }catch(err){
            console.error(err)
            throw  new Error("Error while saving player.")
        }
    }

    async updateSupplementInformation(player: Player, combatLevel: number, username: string, x: number, y: number, plane: number){
        const pos: Position = {
            x,
            y,
            z: plane
        } as Position

        const updatedPlayer = await this._playerRepo.updatePosition(player, pos);
        return await this._playerRepo.updateNameAndLevel(updatedPlayer, username, combatLevel);
    }

    async getPosition(player: Player){
        return await this._playerRepo.getPosition(player);
    }

    async getPlayerById(playerId: number){
        return await this._playerRepo.getPlayerById(playerId);
    }

    async getPlayerByHash(playerToken: string): Promise<Player>{
        const player = await this._playerRepo.getPlayerByToken(playerToken);
        if(player){
            return player;
        }else{
            throw new Error("Cant find player")
        }
    }

    // async getInventory(player: IPlayer){
    //     return await this._playerRepo.getPlayerInventory(player)
    // }

    // async turnMappedEquipmentToSlot(item?: IBasicItemDropped){
    //     if(item){
    //         let fetchedItem = await this._itemService.getItemById(item.id);
    //         if(item){
    //             return <IItemDrop>{
    //                 item: fetchedItem,
    //                 quantity: item.quantity
    //             };
    //         }
    //     }
    //     return null;
    // }

    // async getEquippedItemsByForPlayer(player: IPlayer){
    //     return await this._playerRepo.getPlayerEquippedItems(player)
    // }

    // async updateEquippiedItems(mapOfSlottedItems: Map<string, IBasicItemDropped>, player: IPlayer){
    //     let amulet = await  this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("AMULET"))
    //     let legs = await  this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("LEGS"))
    //     let boots = await  this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("BOOTS"))
    //     let gloves = await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("GLOVES"))
    //     let chest =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("BODY"))
    //     let head =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("HEAD"))
    //     let weapon =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("WEAPON"))
    //     let cape =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("CAPE"))
    //     let ammo =  await this.turnMappedEquipmentToSlot(mapOfSlottedItems.get("AMMO"))

    //     let equipped = <IEquippedItems>{
    //         ammo: ammo,
    //         cape: cape,
    //         weapon: weapon,
    //         head: head,
    //         chest: chest,
    //         gloves: gloves,
    //         boots: boots,
    //         legs: legs,
    //         amulet: amulet
    //     }

    //     this._playerRepo.updatePlayerEquippedItems(equipped, player)
    // }

    // async updateInventoryItems(basicItems: IBasicItemDropped[], player: IPlayer, value: number){
    //     let items : IItemDrop[] = []

    //     for (const basicItemInfo of basicItems){
    //         let fetchedItem = await this._itemService.getItemById(basicItemInfo.id)
    //         if(fetchedItem){
    //             let droppedItem : IItemDrop = <IItemDrop>{
    //                 quantity: basicItemInfo.quantity,
    //                 item: fetchedItem
    //             }
    //             if(basicItemInfo.id > 0){
    //                 items.push(droppedItem);
    //             }
    //         }
    //     }

    //     let current_unix_time = Math.floor(Date.now() / 1000)
    //     let invo = <IInventory>{
    //         value: value,
    //         slots: items,
    //         player: player,
    //         time_updated: current_unix_time,
    //     }

    //     return await this._playerRepo.updatePlayerInventory(player, invo);
    // }

    async createNpcKill(npcId: number, droppedItems: IBasicItemDropped[], killValue: number, player: Player){
        const kill : NpcKill = new NpcKill();
        kill.killValue = killValue;

        const npc = await this._monsterService.getMonsterById(npcId);
        const items : ItemDrop[] = [];

        for (const item of droppedItems){
            const fetchedItem = await this._itemService.getItemById(item.id)

            if(fetchedItem){
                const droppedItem : ItemDrop = new ItemDrop();
                droppedItem.quantity =  item.quantity
                droppedItem.kill = kill
                droppedItem.item = fetchedItem;

                items.push(droppedItem);
            }else{
                throw new Error("Unable to locate item in the database: " + item.id)
            }
        }

        if(npc){
            return this._playerRepo.createNpcKill(kill, items, npc, player);
        }else{
            throw new Error("Unable to locate npc in the databse: " + npcId);
        }

    }

    // async getLevelsForPlayer(player: IPlayer){
    //     return await this._playerRepo.getPlayerLevels(player);
    // }

    // async updatePlayerLevels(player: IPlayer, levelsMap: Map<string, number>, totalLevel: number){
    //     let levelsFormatted: ILevels = {
    //         levels: new Map<string, ILevel>(),
    //         total: totalLevel,
    //     }

    //     let keys = Array.from(levelsMap.keys());
    //     for (let key of keys){
    //         let lvl: ILevel = {
    //             name: key,
    //             level: 1,
    //             xp: 1
    //         }

    //         let levels = levelsFormatted.levels;
    //         levels.set(key, lvl);
    //         levelsFormatted.levels = levels;

    //     }

    //     return await this._playerRepo.updatePlayerLevels(levelsFormatted, player)
    // }

    // async updateBankItems(bankItems: IBasicItemDropped[], value: number, player: IPlayer){
    //     let bankSlotItems: IItem[] = []
    //     for(const basicItemInfo of bankItems){
    //         if(basicItemInfo){
    //             let item = await this._itemService.getItemById(basicItemInfo.id)
    //             if(item){
    //                 bankSlotItems.push(item);
    //             }
    //         }
    //     }

    //     let bank : IBank = {
    //         items: bankSlotItems,
    //         value: value
    //     }
    //     return await this._playerRepo.updateBank(player, bank)
    // }

    // async getBank(player: IPlayer){
    //     return await this._playerRepo.getBank(player);
    // }
}