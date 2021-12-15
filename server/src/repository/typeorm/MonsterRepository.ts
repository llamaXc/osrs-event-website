import { Monster } from "../../entity/Monster";
import { IMonsterRepository } from "../interfaces/IMonsterRepository";

export class TypeOrmMonsterRepository implements IMonsterRepository{

    async insertMonster(monster: Monster): Promise<Monster | undefined> {
        return await Monster.save(monster);
    }

    async getMonsterById(id: number): Promise<Monster | undefined> {
        return await Monster.findOne(id);
    }
}