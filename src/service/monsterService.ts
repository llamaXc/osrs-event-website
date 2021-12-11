import { Monster } from '../entity/Monster';
import { IMonsterRepository } from '../repository/interfaces/IMonsterRepository'
import { IMonster } from '../state/database';

export class MonsterService{
    constructor(private readonly _monsterRepo: IMonsterRepository){}

    async populateMonsters(monsters: Monster[]){
        for (const monster of monsters){
            if(monster != null){
                await this._monsterRepo.saveMonster(monster)
            }
        }
    }

    async getMonsterById(id: number){
        return await this._monsterRepo.getMonsterById(id);
    }

}