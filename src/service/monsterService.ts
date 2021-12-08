import { MonsterRepository } from '../repository/monsterRepository'
import { IMonster } from '../state/database';

export class MonsterService{
    constructor(private readonly _monsterRepo: MonsterRepository){}

    async populateMonsters(monsters: [IMonster?]){
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