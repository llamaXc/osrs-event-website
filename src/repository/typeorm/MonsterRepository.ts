import { Monster } from "../../entity/Monster";
import { IMonsterRepository } from "../interfaces/IMonsterRepository";

export class TypeOrmMonsterRepository implements IMonsterRepository{

    async getMonsterById(id: number): Promise<Monster | undefined> {
        return await Monster.findOne(id);
    }
}