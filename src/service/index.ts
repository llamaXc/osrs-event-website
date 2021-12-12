import { TypeOrmPlayerRepository } from "../repository/typeorm/PlayerRepository";
import { TypeOrmMonsterRepository } from "../repository/typeorm/MonsterRepository";
import { TypeOrmItemRepository } from "../repository/typeorm/ItemRepository";
import { ItemService } from "./itemService";
import { MonsterService } from "./monsterService";
import { PlayerService } from "./playerService";
import { IPlayerService } from "./interfaces/IPlayerService";
import { IPlayerRepository } from "../repository/interfaces/IPlayerRepository";
import { IMonsterRepository } from "../repository/interfaces/IMonsterRepository";
import { IItemIRepository } from "../repository/interfaces/IItemRepository";

console.log("============= Services Created ===========")

const playerRepo: IPlayerRepository   = new TypeOrmPlayerRepository();
const monsterRepo: IMonsterRepository = new TypeOrmMonsterRepository();
const itemRepo: IItemIRepository      = new TypeOrmItemRepository();

// Todo make interfaces for these
export const itemService    = new ItemService(itemRepo);
export const monsterService = new MonsterService(monsterRepo);

export const playerService: IPlayerService  = new PlayerService(playerRepo, monsterService, itemService);

