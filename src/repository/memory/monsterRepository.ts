import { Monster } from "../../entity/Monster";
import Database from "../../state/database";
import { IMonsterRepository } from "./../interfaces/IMonsterRepository";

export class InMemoryMonsterRepository implements IMonsterRepository{
    private readonly _db = Database;

    async saveMonster(monster: Monster): Promise<boolean>{
        await this._db.insertMonster(monster);
        return true;
    }

    async getMonsterById(id: number): Promise<Monster|undefined>{
        return this._db.getMonster(id);
    }
}

