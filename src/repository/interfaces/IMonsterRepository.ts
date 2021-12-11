import { Monster } from "../../entity/Monster";

export interface IMonsterRepository{
    saveMonster(monster: Monster): Promise<boolean>
    getMonsterById(id: number): Promise<Monster|undefined>
}