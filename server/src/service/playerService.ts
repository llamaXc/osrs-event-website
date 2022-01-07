import { ItemDrop } from "../entity/ItemDrop";
import { NpcKill } from "../entity/NpcKill";
import { Player } from "../entity/Player";
import { IPlayerRepository } from "../repository/interfaces/IPlayerRepository";
import { ItemService } from "./itemService";
import { MonsterService } from "./monsterService";
import { v4 as uuidv4 } from "uuid";
import { Position } from "../entity/Position";
import { InventorySlot } from "../entity/InventorySlot";
import { Inventory } from "../entity/Inventory";
import { Level } from "../entity/Level";
import { Equipment } from "../entity/Equipment";

import { itemService } from ".";

import { EquipmentSlot } from "../entity/EquipmentSlot";
import { Bank } from "../entity/Bank";
import { BankSlot } from "../entity/BankSlot";
import { Quest } from "../entity/Quest";
import { APIItemDropInformation } from "./ModelInterfaces/ApiDataTypes";
import { IPlayerService } from "./interfaces/IPlayerService";

export class PlayerService implements IPlayerService {
    constructor(
        private readonly _playerRepo: IPlayerRepository,
        private readonly _monsterService: MonsterService,
        private readonly _itemService: ItemService
    ) {}

    async updateQuestData(player: Player, quests: Quest[], qp: number) {
        console.log("=== Updating quest data ===")
        console.log(JSON.stringify(quests));
        return await this._playerRepo.updateQuestData(player, quests, qp);
    }

    async doesPlayerExist(playerToken: string) {
        let p = await this._playerRepo.getPlayerByToken(playerToken)
        console.log(p?.username + " " + playerToken);
        let r = p !== undefined;
        console.log("result: " + r)

        return r
    }

    async registerNewPlayer(username: string, key?: string) {
        if (key === undefined) {
            key = uuidv4();
        }
        try {
            const addedPlayer = await this._playerRepo.addNewPlayer({
                username,
                token: key,
                combatLevel: 0,
            } as Player);
            console.log(
                "Player added to database: " +
                    addedPlayer.username +
                    " " +
                    addedPlayer.token
            );
            return addedPlayer;
        } catch (err) {
            console.error(err);
            throw new Error("Error while saving player.");
        }
    }

    async updateSupplementInformation(
        player: Player,
        combatLevel: number,
        username: string,
        x: number,
        y: number,
        plane: number
    ) {
        const pos: Position = {
            x,
            y,
            z: plane,
        } as Position;

        console.log("Updating supplement information in service");
        const updatedPlayer = await this._playerRepo.updatePosition(
            player,
            pos
        );
        return await this._playerRepo.updateNameAndLevel(
            updatedPlayer,
            username,
            combatLevel
        );
    }

    async getPlayerById(playerId: number): Promise<Player | undefined> {
        return await this._playerRepo.getPlayerById(playerId);
    }

    async getPlayerByHash(playerToken: string): Promise<Player | undefined> {
        return await this._playerRepo.getPlayerByToken(playerToken);
    }

    async updateEquippiedItems(
        mapOfSlottedItems: Map<string, APIItemDropInformation>,
        player: Player
    ) {
        const keys = Array.from(mapOfSlottedItems.keys());
        const slots: EquipmentSlot[] = [];

        for (const key of keys) {
            const basicItemInfo = mapOfSlottedItems.get(key);

            if (basicItemInfo) {
                const itemId = basicItemInfo.id;
                const itemQuantity = basicItemInfo.quantity;
                const fetchedItem = await itemService.getItemById(itemId);

                if (fetchedItem && itemId > 0) {
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

        await this._playerRepo.updateEquipment(equipment, player);
    }

    async updateInventoryItems(
        basicItems: APIItemDropInformation[],
        player: Player,
        value: number
    ) {
        const slots: InventorySlot[] = [];

        let slotIndex = 0;

        for (const basicItemInfo of basicItems) {
            const fetchedItem = await this._itemService.getItemById(
                basicItemInfo.id
            );

            if (fetchedItem) {
                const slotItem: InventorySlot = {
                    quantity: basicItemInfo.quantity,
                    item: fetchedItem,
                    slotIndex,
                } as InventorySlot;

                if (slotItem.item.id > 0) {
                    slots.push(slotItem);
                }
            }
            slotIndex++;
        }

        const inventory = new Inventory();
        inventory.slots = slots;

        await this._playerRepo.updateInventory(player, inventory);
    }

    async createNpcKill(
        npcId: number,
        droppedItems: APIItemDropInformation[],
        killValue: number,
        player: Player
    ): Promise<NpcKill | undefined> {
        const kill: NpcKill = new NpcKill();
        kill.killValue = killValue;

        const npc = await this._monsterService.getMonsterById(npcId);
        const items: ItemDrop[] = [];

        for (const item of droppedItems) {
            const fetchedItem = await this._itemService.getItemById(item.id);

            if (fetchedItem) {
                const droppedItem: ItemDrop = new ItemDrop();
                droppedItem.quantity = item.quantity;
                droppedItem.kill = kill;
                droppedItem.item = fetchedItem;

                items.push(droppedItem);
            } else {
                throw new Error(
                    "Unable to locate item in the database: " + item.id
                );
            }
        }

        if (npc) {
            return this._playerRepo.createNpcKill(kill, items, npc, player);
        } else {
            throw new Error("Unable to locate npc in the databse: " + npcId);
        }
    }

    async updateLevels(
        player: Player,
        levelsMap: Map<string, number>,
        totalLevel: number
    ) {
        const levels: Level[] = [];

        const keys = Array.from(levelsMap.keys());
        for (const key of keys) {
            const levelToAdd: Level = {
                name: key,
                level: levelsMap.get(key),
            } as Level;

            levels.push(levelToAdd);
        }

        return await this._playerRepo.updateLevelData(
            levels,
            totalLevel,
            player
        );
    }

    async updateBankItems(
        bankItems: APIItemDropInformation[],
        value: number,
        player: Player
    ) {
        const bankSlots: BankSlot[] = [];
        let slotIndex = 0;

        for (const basicItemInfo of bankItems) {
            if (basicItemInfo) {
                const item = await this._itemService.getItemById(
                    basicItemInfo.id
                );
                if (item && item.id > 0) {
                    const slot = new BankSlot();
                    slot.quantity = basicItemInfo.quantity;
                    slot.slotIndex = slotIndex;
                    slot.item = item;
                    bankSlots.push(slot);
                    console.log("Creating bank slot for item id: " + item.id);
                } else {
                    console.log(
                        "Item is invalid: " + JSON.stringify(item, null, 2)
                    );
                }
                slotIndex++;
            } else {
                console.log(
                    "Basic item in bank items is empty? Uh Oh: " +
                        JSON.stringify(basicItemInfo)
                );
            }
        }

        const bank: Bank = {
            slots: bankSlots,
        } as Bank;

        return await this._playerRepo.updateBank(player, bank);
    }

    async getPlayerBankById(id: number){
        const start = Date.now();

        const playerData = await Player.createQueryBuilder("player")
        .where("player.id = :id", {id: id})
        .innerJoinAndSelect("player.bank", "bank")
        .leftJoinAndSelect("bank.slots", "slots")
        .leftJoinAndSelect("slots.item", "item")
        .getOne();

        const end = Date.now();
        const executionTime = end - start;
        return { executionTime, bank: playerData?.bank };
    }
    async getPlayerByUsername(username: string) {
        const start = Date.now();

        const playerData = await Player.createQueryBuilder("player")
        .where("player.username = :username", {username: username})
        .innerJoinAndSelect("player.levels", "levels")
        .getOne();

        const playerInfo = await Player.findOne({where: {username: username},
            relations: ['inventory', 'equipment', 'quests'],
        })

        const end = Date.now();
        const executionTime = end - start;
        const playerResult = {
            inventory: playerInfo?.inventory,
            equipment: playerInfo?.equipment,
            levels: playerData?.levels,
            username: playerInfo?.username,
            questPoints: playerInfo?.questPoints,
            combatLevel: playerInfo?.combatLevel,
            totalLevel: playerInfo?.totalLevel,
            quests: playerInfo?.quests,
        }

        return { executionTime, player: playerResult };
    }

    async getPlayers(): Promise<Player[]> {
        const players = this._playerRepo.getPlayers();
        return players
    }
}
