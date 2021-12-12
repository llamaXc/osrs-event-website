import { userInfo } from "os";
import { Bank } from "../../entity/Bank";
import { Equipment } from "../../entity/Equipment";
import { Inventory } from "../../entity/Inventory";
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
        console.log("Time to get player by finding token match to: " + playerToken)
        const p = await Player.createQueryBuilder("player").where("player.token = :token", {playerToken }).getOne();
        console.log("Done saerching for user")
        return p;
    }

    async getPlayerById(id: number): Promise<Player|undefined>{
        return await Player.createQueryBuilder("player").where("player.token = :id", {id }).getOne()
    }

    async updateBank(player: Player, bank: Bank): Promise<Player>{
        player.bank = bank
        console.log("Saving bank to player!")
        const res = await Player.save(player);
        console.log("DONE SAVIN BANK!");
        return res;
    }

    // async getBank(player: IPlayer): Promise<IBank|undefined>{
    //     return await this._db.getBank(player.id);
    // }

    async updateQuestData(player: Player, quests: Quest[], qp: number): Promise<Player>{
        player.questPoints = qp;
        player.quests = quests;
        console.log("Quest update: " + JSON.stringify(quests, null, 2));
        return await Player.save(player);
    }

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
        player.inventory = invo;
        return await Player.save(player);

    }

    // async getPlayerEquippedItems(player: IPlayer): Promise<IEquippedItems|undefined>{
    //     return await this._db.getEquippedItemsByPlayerId(player.id)
    // }

    async updateEquipment(equipment: Equipment, player: Player): Promise<Player> {
        player.equipment = equipment;
        return await Player.save(player);
    }

    async updateLevelData(levels: Level[], totalLevel: number, player: Player): Promise<Player>{
        player.levels = levels;
        player.totalLevel = totalLevel;
        return await Player.save(player);
    }

}

