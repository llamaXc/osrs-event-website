import { TypeOrmPlayerRepository } from "../repository/typeorm/PlayerRepository";
import { TypeOrmMonsterRepository } from "../repository/typeorm/MonsterRepository";
import { TypeOrmItemRepository } from "../repository/typeorm/ItemRepository";
import { ItemService } from "../service/itemService";
import { MonsterService } from "../service/monsterService";
import { PlayerService } from "../service/playerService";

const playerRepo  = new TypeOrmPlayerRepository();
const monsterRepo = new TypeOrmMonsterRepository();
const itemRepo    = new TypeOrmItemRepository();

export const itemService    = new ItemService(itemRepo);
export const monsterService = new MonsterService(monsterRepo);
export const playerService  = new PlayerService(playerRepo, monsterService, itemService);