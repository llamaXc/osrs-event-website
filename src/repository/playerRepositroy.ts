import Database, { IEquippedItems, IInventory, ILevels, IPlayer } from "../state/database";
import { INpcKill, IMonster } from "../state/database";

export class PlayerRepository{
    private readonly _db = Database;

    async createNpcKill(npcKill: INpcKill){
        let current_unix_time = Math.floor(Date.now() / 1000)
        npcKill.time_updated = current_unix_time;
        npcKill.time_created= current_unix_time

        return this._db.createNpcKill(npcKill)
    }

    async getAllNpcKills(){
        return this._db.findAllNpcKills();
    }

    async addNewPlayer(player: IPlayer){
        return this._db.insertPlayer(player);
    }

    async getPlayerByToken(token: string){
        return this._db.getPlayerByHash(token);
    }

    async getPlayerInventory(player: IPlayer){
        return await this._db.getInventoryByPlayerHash(player.token)
    }

    async updatePlayerInventory(player: IPlayer, invo: IInventory){
        if (await this._db.getInventoryByPlayerHash(player.token) === null){
            invo.time_created = Math.floor(Date.now() / 1000)
        }
        return await this._db.updateInventoryByPlayerHash(player.token, invo)
    }

    async getPlayerEquippedItems(player: IPlayer){
        return await this._db.getEquippedItemsByPlayerHash(player.token)
    }

    async updatePlayerEquippedItems(equippedItem: IEquippedItems, player: IPlayer){
        return await this._db.updateEquippedItemByPlayerHash(player.token, equippedItem)
    }

    async updatePlayerLevels(levels: ILevels, player: IPlayer){
        levels.time_updated = Math.floor(Date.now() / 1000);
        return await this._db.updateLevelsByPlayerHash(player.token, levels)
    }

    async getPlayerLevels(player: IPlayer){
        return await this._db.getLevelsByPlayerHash(player.token);

    }
}

