import { Equipment } from "../../entity/Equipment";
import { Inventory } from "../../entity/Inventory";
import { ItemDrop } from "../../entity/ItemDrop";
import { Level } from "../../entity/Level";
import { Monster } from "../../entity/Monster";
import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";
import { Position } from "../../entity/Position";
import { IPlayerRepository } from "./../interfaces/IPlayerRepository";

export class TypeOrmPlayerRepository implements IPlayerRepository{

    async createNpcKill(npcKill: NpcKill, droppedItems: ItemDrop[], npc: Monster, player: Player): Promise<NpcKill|undefined>{
        console.log("Creating NPC Kill");

        console.log("=========== Player to save kill onto: ==========\n" + JSON.stringify(player, null, 2));

        npcKill.monster = npc;
        npcKill.items = droppedItems;
        if(player.kills === undefined || player.kills === null){
            player.kills = [npcKill];
        }else{
            player.kills.push(npcKill);
        }

        await Player.save(player);

        return npcKill;
    }

    async getPlayerByToken(playerToken: string): Promise<Player|undefined>{
        return await Player.findOne({where: {token: playerToken}});
    }

    async getPlayerById(id: number): Promise<Player|undefined>{
        return await Player.findOne(id);
    }

    // async updateBank(player: IPlayer, bank: IBank): Promise<boolean>{
    //     await this._db.updateBank(player.id, bank);
    //     return true;
    // }

    // async getBank(player: IPlayer): Promise<IBank|undefined>{
    //     return await this._db.getBank(player.id);
    // }

    // async updateQuestListForPlayer(player: IPlayer, questList: IQuestList): Promise<boolean>{
    //     await this._db.updateQuestList(player.id, questList);
    //     return true;
    // }

    // async getQuestListForPlayer(player: IPlayer): Promise<IQuestList|undefined>{
    //     return await this._db.getQuestList(player.id);
    // }

    async getNpcKillsForPlayer(player: Player): Promise<NpcKill[]>{
        return await NpcKill.find({where: {player: {id: player.id}}});
    }

    async addNewPlayer(player: Player): Promise<Player>{
        return await Player.save(player);
    }

    async updatePosition(player: Player, coords: Position): Promise<Player>{
        console.log("Latest position: " + JSON.stringify(coords, null, 2))
        console.log("Players current position: "+ JSON.stringify(player.position, null, 2));


        if(player.position === undefined || player.position === null){
            console.log("No position exists, making one")
            player.position = coords;
            return await Player.save(player)
        }else{
            console.log("Updating position")
            player.position.x = coords.x;
            player.position.y = coords.y;
            player.position.z = coords.z;
            return await Player.save(player);
        }
    }

    async getPosition(player: Player): Promise<Position|undefined>{
        return player.position;
    }

    async updateNameAndLevel(player: Player, username: string, level: number): Promise<Player>{
        player.username = username;
        player.combatLevel = level;
        return await Player.save(player);
    }

    // async getPlayerByToken(token: string): Promise<Player|undefined>{
    //     return await this._db.getPlayerByHash(token);
    // }

    // async getPlayerById(id: number): Promise<IPlayer|undefined>{
    //     return await this._db.getPlayerById(id);
    // }

    async getPlayerInventory(player: Player): Promise<Inventory|undefined>{
        return player.inventory;
    }

    async updateInventory(player: Player, invo: Inventory): Promise<Player>{
        console.log("Goal: Update inventory to=>\n" + JSON.stringify(invo, null, 2));
        player.inventory = invo;
        return await Player.save(player);

    }

    // async getPlayerEquippedItems(player: IPlayer): Promise<IEquippedItems|undefined>{
    //     return await this._db.getEquippedItemsByPlayerId(player.id)
    // }

    async updateEquipment(equipment: Equipment, player: Player): Promise<Player> {
        console.log("Seeking to update armou: \n" + JSON.stringify(equipment, null, 2))
        player.equipment = equipment;
        return await Player.save(player);
    }

    async updateLevelData(levels: Level[], questPoints: number, player: Player): Promise<Player>{
        player.levels = levels;
        player.questPoints = questPoints;
        return await Player.save(player);
    }

}

