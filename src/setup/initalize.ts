import { PlayerController } from '../controller/playerController';
import { ItemRepository } from '../repository/itemRepository';
import { MonsterRepository } from '../repository/monsterRepository';
import { PlayerRepository } from '../repository/playerRepositroy';
import { MonsterService } from '../service/monsterService';
import { PlayerService } from '../service/playerService';
import { ItemService } from '../service/itemService';
import { ItemImporter, MonsterImporter } from './importOsrsData';
import { GroupRepository } from '../repository/groupRepoistory';
import { GroupService } from '../service/groupService';

export const playerRepo = new PlayerRepository();
export const monsterRepo = new MonsterRepository();
export const itemRepo = new ItemRepository();
export const groupRepo = new GroupRepository();


export const itemService = new ItemService(itemRepo);
export const monsterService = new MonsterService(monsterRepo);
export const playerService = new PlayerService(playerRepo, monsterService, itemService);
export const groupService = new GroupService(groupRepo, playerService);

export const playerController = new PlayerController(playerService);

const monsterImporter = new MonsterImporter(monsterService, "../../data/monsters-complete.json")
const itemImporter = new ItemImporter(itemService, "../../data/items-complete.json")
