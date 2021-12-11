import {createConnection} from "typeorm";
import { PlayerController } from '../controller/playerController';
import { InMemeoryItemRepository } from '../repository/itemRepository';
import { InMemoryMonsterRepository } from '../repository/monsterRepository';
import { InMemoryPlayerRepo } from '../repository/playerRepositroy';
import { MonsterService } from '../service/monsterService';
import { PlayerService } from '../service/playerService';
import { ItemService } from '../service/itemService';
import { ItemImporter, MonsterImporter } from './importOsrsData';
import { GroupRepository } from '../repository/groupRepoistory';
import { GroupService } from '../service/groupService';

import { Player } from "../entity/Player";
import { NpcKill } from "../entity/NpcKill";
import { Item, ItemDrop } from "../entity/Item";
import { Monster } from "../entity/Monster";

export const playerRepo = new InMemoryPlayerRepo();
export const monsterRepo = new InMemoryMonsterRepository();
export const itemRepo = new InMemeoryItemRepository();
export const groupRepo = new GroupRepository();

export const itemService = new ItemService(itemRepo);
export const monsterService = new MonsterService(monsterRepo);
export const playerService = new PlayerService(playerRepo, monsterService, itemService);
export const groupService = new GroupService(groupRepo, playerService);

export const playerController = new PlayerController(playerService);

playerService.registerNewPlayer("int GIM", '1111').then(() => {
    console.log(">Initalize< int GIM")
})

createConnection({
    type: "sqlite",
    database: "../../data/sqlite3/dev.sqlite",
    synchronize: true,
    entities: [ Player, NpcKill, Item, Monster, ItemDrop],
    logging: true
}).then( async function(connection){
    console.log("Initalized SQLITE Database")

    let bandos = new Monster();
    bandos.combat_level = 200;
    bandos.name = "Bandos"
    bandos.hitpoints = 100;
    bandos.id = 15;

    try{
        await Monster.save(bandos);
        console.log("saved bandos")
    }catch(err){
        let found = await Monster.findOne(15);
        if(found){
            bandos = found;
        }
        console.log("Bandos already exists");
    }
    
    let osrsPlayer = await Player.findOne({username: 'Iron 69M'})
    if(osrsPlayer){
        console.log(osrsPlayer);

        let item = new Item();
        item.id = 20;
        item.icon = "ABCD"
        item.name = "Scimatar"
        let [items, count] = await Item.findAndCount({where: {id: 20}})


        console.log("Item count: " + count)
        if(count == 0){
            console.log("Saving new item")
            await Item.save(item);
        }


        let kill = new NpcKill();
        let dragonScimmy = await Item.findOne(20);
        let itemDrop = new ItemDrop();
        itemDrop.quantity = 4;
        

        kill.killValue = Math.floor(Math.random() * 100000);
        kill.player = osrsPlayer;
        kill.items = [];
        // kill.npc = bandos;

        if(kill && dragonScimmy){
            console.log("adding d scimmy to kill items")
            itemDrop.item = dragonScimmy
            await NpcKill.save(kill);

            itemDrop.kill = kill;
            await ItemDrop.save(itemDrop);
            console.log("=== Item Drop ====")
            console.log(itemDrop)

            kill.items.push(itemDrop);
            await NpcKill.save(kill);

        }
    }

    // let latest = await Player.findOne({username: 'Iron 69M'})
   
    let kills = await NpcKill.find({where: {player: osrsPlayer}});
    console.log(JSON.stringify(kills[kills.length - 1], null, 2));
    // console.log(kills[kills.length - 1]);
    // osrsPlayer.combatLevel = 100;
    // osrsPlayer.username = "Iron 69M";
    // osrsPlayer.kills = []
    // osrsPlayer.token = '111';

    // try{
    //     let saved = await Player.save(osrsPlayer);
    //     console.log(saved);
    // }catch(err){
    //     console.log(err);
    //     console.log("Username already exists!");
    // }

})

