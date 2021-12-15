import { Monster } from "../../entity/Monster";

export interface IMonsterRepository{
    insertMonster(monster: Monster): Promise<Monster|undefined>
    getMonsterById(id: number): Promise<Monster|undefined>
}