import Database from "../state/database";
import { IMonster } from "../state/database";

export class MonsterRepository{
    private readonly _db = Database;

    async saveMonster(monster: IMonster){
        return this._db.insertMonster(monster);
    }

    async getMonsterById(id: number){
        return this._db.getMonster(id);
    }
}

