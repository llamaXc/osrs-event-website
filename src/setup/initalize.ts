import {createConnection} from "typeorm";
import { PlayerController } from '../controller/playerController';

import { Player } from "../entity/Player";
import { NpcKill } from "../entity/NpcKill";
import { Item, ItemDrop } from "../entity/Item";
import { Monster } from "../entity/Monster";
import { TypeOrmPlayerRepository } from "../repository/typeorm/PlayerRepository";
import { TypeOrmMonsterRepository } from "../repository/typeorm/MonsterRepository";
import { TypeOrmItemRepository } from "../repository/typeorm/ItemRepository";
import { ItemService } from "../service/itemService";
import { MonsterService } from "../service/monsterService";
import { PlayerService } from "../service/playerService";

export const playerRepo  = new TypeOrmPlayerRepository();
export const monsterRepo = new TypeOrmMonsterRepository();
export const itemRepo    = new TypeOrmItemRepository();

export const itemService    = new ItemService(itemRepo);
export const monsterService = new MonsterService(monsterRepo);
export const playerService  = new PlayerService(playerRepo, monsterService, itemService);

export const playerController = new PlayerController(playerService);

// playerService.registerNewPlayer("int GIM", '1111').then(() => {
//     console.log(">Initalize< int GIM")
// })

createConnection({
    type: "sqlite",
    database: "../../data/sqlite3/dev_test.sqlite",
    synchronize: true,
    entities: [ Player, NpcKill, Item, Monster, ItemDrop],
    logging: true
}).then( async function(connection){
    console.log("Initalized SQLITE Database")
    await connection.synchronize();

    // let bandos = await Monster.findOne(6588);

    
    // let osrsPlayer = await Player.findOne({username: 'Iron 69M'})
    // if(osrsPlayer && bandos){

    //     console.log("================ NPC FROM KILL: " + bandos.name + "================")
    //     let item1 = await Item.findOne(11798)


    //     let kill = new NpcKill();
    //     kill.monster = bandos;
    //     kill.killValue = 140000;
    //     kill.player = osrsPlayer;

    //     await NpcKill.save(kill);

    //     let itemDrop = new ItemDrop();
    //     let itemDrop2 = new ItemDrop();

    //     itemDrop.quantity = 4;
    //     itemDrop2.quantity =2

    //     if(item1){
    //         itemDrop.item = item1;
    //         itemDrop.kill = kill;

    //         itemDrop2.kill = kill;
    //         itemDrop2.item = item1;
    //         kill.monster = bandos;
    //         await ItemDrop.save(itemDrop)
    //         await ItemDrop.save(itemDrop2)
    //     }

    //     kill.items = [itemDrop, itemDrop2];
    //     await NpcKill.save(kill);

    // }
   
    // let kills = await NpcKill.find({where: {player: osrsPlayer}});
    // console.log(JSON.stringify(kills[kills.length - 1], null, 2));


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

