import { ItemDrop } from "../../entity/ItemDrop";
import { Monster } from "../../entity/Monster";
import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";
import { Position } from "../../entity/Position";
import { IPlayerRepository } from "./../interfaces/IPlayerRepository";

export class TypeOrmPlayerRepository implements IPlayerRepository{

    async createNpcKill(npcKill: NpcKill, droppedItems: ItemDrop[], npc: Monster, player: Player): Promise<NpcKill|undefined>{
        console.log("Creating NPC Kill");

        npcKill.player = player;
        npcKill.monster = npc;
        // await NpcKill.save(npcKill);

        // for(const item of droppedItems){
        //     item.kill = npcKill;
        //     await ItemDrop.save(item);
        // }
        npcKill.items = droppedItems;

        return await NpcKill.save(npcKill);
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
        if(player.position === undefined){
            player.position = coords;
            return await Player.save(player)
        }else{
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

    // async getPlayerInventory(player: IPlayer): Promise<IInventory|undefined>{
    //     return await this._db.getInventoryByPlayerId(player.id)
    // }

    // async updatePlayerInventory(player: IPlayer, invo: IInventory): Promise<boolean>{
    //     if (await this._db.getInventoryByPlayerId(player.id) === null){
    //         invo.time_created = Math.floor(Date.now() / 1000)
    //     }
    //     await this._db.updateInventoryByPlayerId(player.id, invo)
    //     return true;
    // }

    // async getPlayerEquippedItems(player: IPlayer): Promise<IEquippedItems|undefined>{
    //     return await this._db.getEquippedItemsByPlayerId(player.id)
    // }

    // async updatePlayerEquippedItems(equippedItem: IEquippedItems, player: IPlayer): Promise<boolean>{
    //     await this._db.updateEquippedItemByPlayerId(player.id, equippedItem)
    //     return true;
    // }

    // async updatePlayerLevels(levels: ILevels, player: IPlayer): Promise<boolean>{
    //     await this._db.updateLevelsByPlayerId(player.id, levels)
    //     return true;
    // }

    // async getPlayerLevels(player: IPlayer): Promise<ILevels|undefined>{
    //     return await this._db.getLevelsByPlayerId(player.id);
    // }
}

