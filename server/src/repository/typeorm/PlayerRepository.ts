import { userInfo } from "os";
import { Bank } from "../../entity/Bank";
import { BankSlot } from "../../entity/BankSlot";
import { Equipment } from "../../entity/Equipment";
import { EquipmentSlot } from "../../entity/EquipmentSlot";
import { Inventory } from "../../entity/Inventory";
import { InventorySlot } from "../../entity/InventorySlot";
import { ItemDrop } from "../../entity/ItemDrop";
import { Level } from "../../entity/Level";
import { Monster } from "../../entity/Monster";
import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";
import { Position } from "../../entity/Position";
import { Quest } from "../../entity/Quest";
import { IPlayerRepository } from "./../interfaces/IPlayerRepository";

export class TypeOrmPlayerRepository implements IPlayerRepository{

    async createNpcKill(npcKill: NpcKill, droppedItems: ItemDrop[], npc: Monster, player: Player): Promise<NpcKill|undefined>{
        const playerKills =  await Player.createQueryBuilder("player").leftJoinAndSelect("player.kills", "NpcKill").getOne();

        npcKill.monster = npc;
        npcKill.items = droppedItems;

        if(playerKills === undefined || playerKills === null){
            player.kills = [npcKill];
            await Player.save(player);
        }else{
            playerKills.kills.push(npcKill);
            await Player.save(playerKills);
        }

        return npcKill;
    }

    async getPlayerByToken(playerToken: string): Promise<Player|undefined>{
        try{
            return await Player.createQueryBuilder("player").where("player.token = :token", {token: playerToken }).getOne();
        }catch(err){
            return undefined
        }
    }

    async getPlayerById(id: number): Promise<Player|undefined>{
        return await Player.createQueryBuilder("player").where("player.id = :id", { id }).getOne()
    }

    async updateBank(player: Player, bank: Bank): Promise<Player>{
        try{
            const playerWithBank = await Player.createQueryBuilder("player")
            .leftJoinAndSelect("player.bank", "bank")
            .where("player.id = :id", {id: player.id}).getOne();

            if(playerWithBank === undefined){
                throw new Error("Requires valid bank, will buid in catch")
            }

            // Remove all BankSlots attached to the current bank
            await BankSlot.delete({'bank': playerWithBank.bank});

            // Setup the new bank slots for our current inventory
            playerWithBank.bank.slots = bank.slots;

            // Save and apply the updated bank to our player.
            return await Player.save(playerWithBank);

        }catch(err){
            // No bank yet for this player, lets make and save one.
             const insertedBank = await Bank.save(bank)
             player.bank = insertedBank;
             return await Player.save(player);
        }
    }

    async updateQuestData(player: Player, quests: Quest[], qp: number): Promise<Player>{
        try{
            console.log("Updating quets!")
            const playerWithQuests = await Player.createQueryBuilder("player")
            .leftJoinAndSelect("player.quests", "quest")
            .where("player.id = :id", {id: player.id}).getOne();

            if(playerWithQuests === undefined){
                console.log("undefined!")
                throw new Error("Requires valid quest, will buid in catch")
            }

            console.log("Dete where player is our player")

            // Remove all Quset attached to the current equipment
            await Quest.delete({'player': playerWithQuests});

            // Setup the new quests slots for our current equipment
            playerWithQuests.quests = quests;
            playerWithQuests.questPoints = qp;

            // Save and apply the updated quests to our player.
            return await Player.save(playerWithQuests);
        }catch(err){
            // No levels yet for this player, lets make and save one.
            console.log("no quests found making them now!")
            player.quests = quests;
            player.questPoints = qp;
            return await Player.save(player);
        }
    }

    async addNewPlayer(player: Player): Promise<Player>{
        return await Player.save(player);
    }

    async updatePosition(player: Player, coords: Position): Promise<Player>{
        const playerWithPosition = await Player.createQueryBuilder("player")
        .leftJoinAndSelect("player.position", "position")
        .where("player.id = :id", {id: player.id}).getOne();

        console.log("Repo: Position update: " + JSON.stringify(coords, null, 2))

        if(!playerWithPosition || (playerWithPosition.position === undefined || playerWithPosition.position === null)){
            player.position = coords;
            return await Player.save(player)
        }else{
            playerWithPosition.position.x = coords.x;
            playerWithPosition.position.y = coords.y;
            playerWithPosition.position.z = coords.z;
            return await Player.save(playerWithPosition);
        }
    }

    async updateNameAndLevel(player: Player, username: string, level: number): Promise<Player>{
        player.username = username;
        player.combatLevel = level;
        return await Player.save(player);
    }

    async updateInventory(player: Player, invo: Inventory): Promise<Player>{
        try{
            const playerWithInventory = await Player.createQueryBuilder("player")
            .leftJoinAndSelect("player.inventory", "inventory")
            .where("player.id = :id", {id: player.id}).getOne();

            if(playerWithInventory === undefined){
                throw new Error("Requires valid inventory, will buid in catch")
            }

            // Remove all inventorySlots attached to the current inventory
            await InventorySlot.delete({'inventory': playerWithInventory.inventory});

            // Setup the new inventory slots for our current inventory
            playerWithInventory.inventory.slots = invo.slots;

            // Save and apply the updated inventory to our player.
            return await Player.save(playerWithInventory);
        }catch(err){
            // No inventory yet for this player, lets make and save one.
             const insertedInventory = await Inventory.save(invo)
             player.inventory = insertedInventory;
             return await Player.save(player);
        }
    }

    async updateEquipment(equipment: Equipment, player: Player): Promise<Player> {
        try{
            const playerWithEquipment = await Player.createQueryBuilder("player")
            .leftJoinAndSelect("player.equipment", "equipment")
            .where("player.id = :id", {id: player.id}).getOne();

            if(playerWithEquipment === undefined){
                throw new Error("Requires valid equipment, will buid in catch")
            }

            // Remove all EquipmentSlot attached to the current equipment
            await EquipmentSlot.delete({'equipment': playerWithEquipment.equipment});

            // Setup the new equipment slots for our current equipment
            playerWithEquipment.equipment.slots = equipment.slots;

            // Save and apply the updated equipment to our player.
            return await Player.save(playerWithEquipment);

        }catch(err){
            // No inventory yet for this player, lets make and save one.
             const insertedEquipment = await Equipment.save(equipment)
             player.equipment = insertedEquipment;
             return await Player.save(player);
        }
    }

    async updateLevelData(levels: Level[], totalLevel: number, player: Player): Promise<Player>{
        try{
            const playerWithLevels = await Player.createQueryBuilder("player")
            .leftJoinAndSelect("player.levels", "levels")
            .where("player.id = :id", {id: player.id}).getOne();

            if(playerWithLevels === undefined){
                throw new Error("Requires valid levels, will buid in catch")
            }

            // Remove all Level attached to the current equipment
            await Level.delete({'player': playerWithLevels});

            // Setup the new levels slots for our current equipment
            playerWithLevels.levels = levels;

            playerWithLevels.totalLevel = totalLevel;

            // Save and apply the updated levels to our player.
            return await Player.save(playerWithLevels);

        }catch(err){
            // No levels yet for this player, lets make and save one.
             player.levels = levels;
             player.totalLevel = totalLevel;
             return await Player.save(player);
        }
    }

    async getPlayers(): Promise<Player[]> {
        const players = Player.find();
        console.log(players);
        return players;
    }
}

