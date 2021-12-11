import { Monster } from '../entity/Monster';
import { IMonsterRepository } from '../repository/interfaces/IMonsterRepository'

export class MonsterService{
    constructor(private readonly _monsterRepo: IMonsterRepository){}

    async getMonsterById(id: number){
        return await this._monsterRepo.getMonsterById(id);
    }

    async insertMonster(monster: Monster){
        return await this._monsterRepo.insertMonster(monster);
    }

}