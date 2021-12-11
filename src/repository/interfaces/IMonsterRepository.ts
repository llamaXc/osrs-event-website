import { IMonster } from "../../state/database";

export interface IMonsterRepository{
    saveMonster(monster: IMonster): Promise<boolean>
    getMonsterById(id: number): Promise<IMonster|undefined>
}