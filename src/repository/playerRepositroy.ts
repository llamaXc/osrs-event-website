import Database, { IBank, ICoordinate, IEquippedItems, IInventory, ILevels, IPlayer, IQuest, IQuestList, PlayerId } from "../state/database";
import { INpcKill, IMonster } from "../state/database";

export class PlayerRepository{
    private readonly _db = Database;

    async createNpcKill(npcKill: INpcKill, player: IPlayer){
        let current_unix_time = Math.floor(Date.now() / 1000)
        npcKill.time_updated = current_unix_time;
        npcKill.time_created= current_unix_time
        return await this._db.createNpcKillForPlayer(npcKill, player)
    }

    async updateBank(player: IPlayer, bank: IBank){
        return await this._db.updateBank(player.id, bank);
    }

    async getBank(player: IPlayer){
        return await this._db.getBank(player.id);
    }

    async updateQuestListForPlayer(player: IPlayer, questList: IQuestList){
        return await this._db.updateQuestList(player.id, questList);
    }

    async getQuestListForPlayer(player: IPlayer): Promise<IQuestList|undefined>{
        return await this._db.getQuestList(player.id);
    }

    async getNpcKillsForPlayer(player: IPlayer): Promise<INpcKill[]>{
        return await this._db.getKillsFromPlayerId(player.id);
    }

    async addNewPlayer(player: IPlayer){
        return await this._db.insertPlayer(player);
    }
    
    async updatePosition(player: IPlayer, coords: ICoordinate){
        let current_unix_time = Math.floor(Date.now() / 1000)
        coords.time_updated = current_unix_time;
        await this._db.updatePositionByPlayerId(player.id, coords);
    }

    async getPosition(player: IPlayer){
        return await this._db.getPositionByPlayerId(player.id);
    }

    async updateNameAndLevel(player: IPlayer, username: string, level: number){
        return await this._db.updateUsernameAndLevelByPlayerId(player.id, username, level);
    }

    async getPlayerByToken(token: string){
        return await this._db.getPlayerByHash(token);
    }

    async getPlayerById(id: number){
        return await this._db.getPlayerById(id);
    }

    async getPlayerInventory(player: IPlayer){
        return await this._db.getInventoryByPlayerId(player.id)
    }

    async updatePlayerInventory(player: IPlayer, invo: IInventory){
        if (await this._db.getInventoryByPlayerId(player.id) === null){
            invo.time_created = Math.floor(Date.now() / 1000)
        }
        return await this._db.updateInventoryByPlayerId(player.id, invo)
    }

    async getPlayerEquippedItems(player: IPlayer){
        return await this._db.getEquippedItemsByPlayerId(player.id)
    }

    async updatePlayerEquippedItems(equippedItem: IEquippedItems, player: IPlayer){
        return await this._db.updateEquippedItemByPlayerId(player.id, equippedItem)
    }

    async updatePlayerLevels(levels: ILevels, player: IPlayer){
        levels.time_updated = Math.floor(Date.now() / 1000);
        return await this._db.updateLevelsByPlayerId(player.id, levels)
    }

    async getPlayerLevels(player: IPlayer){
        return await this._db.getLevelsByPlayerId(player.id);

    }
}

