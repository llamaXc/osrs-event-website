import { ItemDrop } from '../entity/ItemDrop';
import { NpcKill } from '../entity/NpcKill';
import { Player } from '../entity/Player';
import { IPlayerRepository } from '../repository/interfaces/IPlayerRepository'
import { IBasicItemDropped } from '../state/old_ts';
import { ItemService } from './itemService';
import { MonsterService } from './monsterService';
import {v4 as uuidv4} from 'uuid';
import { Position } from '../entity/Position';
import { InventorySlot } from '../entity/InventorySlot';
import { Inventory } from '../entity/Inventory';
import { Level } from '../entity/Level';
import { Equipment } from '../entity/Equipment';
import { itemService } from './Services';
import { EquipmentSlot } from '../entity/EquipmentSlot';
import { Bank } from '../entity/Bank';
import { BankSlot } from '../entity/BankSlot';
import { Quest } from '../entity/Quest';

export class PlayerService{
    constructor(private readonly _playerRepo: IPlayerRepository,
        private readonly _monsterService: MonsterService,
        private readonly _itemService: ItemService){
            console.log("PlayerService initalized succesfully");
        }

    async getNpcKills(player: Player): Promise<NpcKill[]>{
        return await this._playerRepo.getNpcKillsForPlayer(player);
    }

    async updateQuestData(player: Player, quests: Quest[], qp: number){
        return await this._playerRepo.updateQuestData(player, quests, qp);
    }

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

    async getInventory(player: Player){
        return await this._playerRepo.getPlayerInventory(player)
    }

    async updateEquippiedItems(mapOfSlottedItems: Map<string, IBasicItemDropped>, player: Player){
        const keys = Array.from(mapOfSlottedItems.keys());
        const slots : EquipmentSlot[] = [];

        for(const key of keys){
            const basicItemInfo = mapOfSlottedItems.get(key);

            if(basicItemInfo){
                const itemId = basicItemInfo.id;
                const itemQuantity = basicItemInfo.quantity;
                const fetchedItem = await itemService.getItemById(itemId);

                if(fetchedItem && itemId > 0){
                    const slot = new EquipmentSlot();
                    slot.slotName = key;
                    slot.quantity = itemQuantity;
                    slot.item = fetchedItem;
                    slots.push(slot);
                }
            }
        }

        const equipment = new Equipment();
        equipment.slots = slots;

        await this._playerRepo.updateEquipment(equipment, player)
    }

    async updateInventoryItems(basicItems: IBasicItemDropped[], player: Player, value: number){
        const slots : InventorySlot[] = []

        let slotIndex = 0;

        for (const basicItemInfo of basicItems){
            const fetchedItem = await this._itemService.getItemById(basicItemInfo.id)

            if(fetchedItem){
                const slotItem : InventorySlot = {
                    quantity: basicItemInfo.quantity,
                    item: fetchedItem,
                    slotIndex
                } as InventorySlot

                if(slotItem.item.id > 0){
                    slots.push(slotItem);
                }
            }
            slotIndex++;
        }

        const inventory = new Inventory();
        inventory.slots = slots;

        return await this._playerRepo.updateInventory(player, inventory);
    }

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

    async updateLevels(player: Player, levelsMap: Map<string, number>, totalLevel: number){
        const levels : Level[] = [];

        const keys = Array.from(levelsMap.keys());
        for (const key of keys){
            const levelToAdd: Level = {
                name: key,
                level: 1,
            } as Level;

            levels.push(levelToAdd);
        }

        return await this._playerRepo.updateLevelData(levels, totalLevel, player)
    }

    async updateBankItems(bankItems: IBasicItemDropped[], value: number, player: Player){
        const bankSlots: BankSlot[] = []
        let slotIndex = 0;
        console.log("Service === TIME TO UPDATE BANK ITEMS ")

        for(const basicItemInfo of bankItems){

            if(basicItemInfo){
                const item = await this._itemService.getItemById(basicItemInfo.id)
                if(item && item.id > 0){
                    const slot = new BankSlot();
                    slot.quantity = basicItemInfo.quantity
                    slot.slotIndex = slotIndex;
                    bankSlots.push(slot);
                }
                slotIndex++;
            }
        }

        const bank : Bank = {
            slots: bankSlots
        } as Bank;

        console.log("Service got request to update bank now")
        return await this._playerRepo.updateBank(player, bank)
    }
}