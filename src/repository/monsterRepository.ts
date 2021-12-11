import Database from "../state/database";
import { IMonster } from "../state/database";
import { IMonsterRepository } from "./interfaces/IMonsterRepository";

export class InMemoryMonsterRepository implements IMonsterRepository{
    private readonly _db = Database;

    async saveMonster(monster: IMonster): Promise<boolean>{
        await this._db.insertMonster(monster);
        return true;
    }

    async getMonsterById(id: number): Promise<IMonster|undefined>{
        return this._db.getMonster(id);
    }
}

