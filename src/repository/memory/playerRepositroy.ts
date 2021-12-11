import Database, { IBank, ICoordinate, IEquippedItems, IInventory, ILevels, IPlayer,  IQuestList } from "../../state/database";
import { INpcKill } from "../../state/database";
import { IPlayerRepository } from "./../interfaces/IPlayerRepository";

export class InMemoryPlayerRepo implements IPlayerRepository{
    private readonly _db = Database;

    async createNpcKill(npcKill: INpcKill, player: IPlayer): Promise<boolean>{
        let current_unix_time = Math.floor(Date.now() / 1000)
        npcKill.time_updated = current_unix_time;
        npcKill.time_created= current_unix_time
        this._db.createNpcKillForPlayer(npcKill, player)
        return true;
    }

    async updateBank(player: IPlayer, bank: IBank): Promise<boolean>{
        await this._db.updateBank(player.id, bank);
        return true;
    }

    async getBank(player: IPlayer): Promise<IBank|undefined>{
        return await this._db.getBank(player.id);
    }

    async updateQuestListForPlayer(player: IPlayer, questList: IQuestList): Promise<boolean>{
        await this._db.updateQuestList(player.id, questList);
        return true;
    }

    async getQuestListForPlayer(player: IPlayer): Promise<IQuestList|undefined>{
        return await this._db.getQuestList(player.id);
    }

    async getNpcKillsForPlayer(player: IPlayer): Promise<INpcKill[]>{
        return await this._db.getKillsFromPlayerId(player.id);
    }

    async addNewPlayer(player: IPlayer): Promise<boolean>{
        await this._db.insertPlayer(player);
        return true;
    }
    
    async updatePosition(player: IPlayer, coords: ICoordinate): Promise<boolean>{
        let current_unix_time = Math.floor(Date.now() / 1000)
        coords.time_updated = current_unix_time;
        await this._db.updatePositionByPlayerId(player.id, coords);
        return true;
    }

    async getPosition(player: IPlayer): Promise<ICoordinate|undefined>{
        return await this._db.getPositionByPlayerId(player.id);
    }

    async updateNameAndLevel(player: IPlayer, username: string, level: number): Promise<boolean>{
        await this._db.updateUsernameAndLevelByPlayerId(player.id, username, level);
        return true;
    }

    async getPlayerByToken(token: string): Promise<Player|undefined>{
        return await this._db.getPlayerByHash(token);
    }

    async getPlayerById(id: number): Promise<IPlayer|undefined>{
        return await this._db.getPlayerById(id);
    }

    async getPlayerInventory(player: IPlayer): Promise<IInventory|undefined>{
        return await this._db.getInventoryByPlayerId(player.id)
    }

    async updatePlayerInventory(player: IPlayer, invo: IInventory): Promise<boolean>{
        if (await this._db.getInventoryByPlayerId(player.id) === null){
            invo.time_created = Math.floor(Date.now() / 1000)
        }
        await this._db.updateInventoryByPlayerId(player.id, invo)
        return true;
    }

    async getPlayerEquippedItems(player: IPlayer): Promise<IEquippedItems|undefined>{
        return await this._db.getEquippedItemsByPlayerId(player.id)
    }

    async updatePlayerEquippedItems(equippedItem: IEquippedItems, player: IPlayer): Promise<boolean>{
        await this._db.updateEquippedItemByPlayerId(player.id, equippedItem)
        return true;
    }

    async updatePlayerLevels(levels: ILevels, player: IPlayer): Promise<boolean>{
        await this._db.updateLevelsByPlayerId(player.id, levels)
        return true;
    }

    async getPlayerLevels(player: IPlayer): Promise<ILevels|undefined>{
        return await this._db.getLevelsByPlayerId(player.id);
    }
}

