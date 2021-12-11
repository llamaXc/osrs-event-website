import { Monster } from '../entity/Monster';
import { IMonsterRepository } from '../repository/interfaces/IMonsterRepository'
import { IMonster } from '../state/database';

export class MonsterService{
    constructor(private readonly _monsterRepo: IMonsterRepository){}

    async getMonsterById(id: number){
        return await this._monsterRepo.getMonsterById(id);
    }

}