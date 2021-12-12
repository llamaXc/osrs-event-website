import { Player } from "../entity/Player";
import { IDatabase, sqlite3 } from "../state/Database";
import { playerService } from '../service/Services';

// Pick our database
const db : IDatabase = sqlite3;

db.initalize().then(async () => {
    console.log("========= Database initalized succesfully ===============");

    try{
        const registered = await playerService.registerNewPlayer("Iron 69M", "11000");
        console.log("Created player")
    }catch(err){
        console.log("Error creating player");
    }

    const iron69M = await Player.findOne(1);
    console.log("Found player: " + JSON.stringify(iron69M, null, 2));
})

// createConnection({
//     type: "sqlite",
//     database: "../../data/sqlite3/dev_test.sqlite",
//     synchronize: true,
//     entities: [ Player, NpcKill, Item, Monster, ItemDrop],
//     logging: true
// }).then( async function(connection){
//     console.log("Initalized SQLITE Database")
//     await connection.synchronize();

//     // let bandos = await Monster.findOne(6588);

//     // let osrsPlayer = await Player.findOne({username: 'Iron 69M'})
//     // if(osrsPlayer && bandos){

//     //     console.log("================ NPC FROM KILL: " + bandos.name + "================")
//     //     let item1 = await Item.findOne(11798)


//     //     let kill = new NpcKill();
//     //     kill.monster = bandos;
//     //     kill.killValue = 140000;
//     //     kill.player = osrsPlayer;

//     //     await NpcKill.save(kill);

//     //     let itemDrop = new ItemDrop();
//     //     let itemDrop2 = new ItemDrop();

//     //     itemDrop.quantity = 4;
//     //     itemDrop2.quantity =2

//     //     if(item1){
//     //         itemDrop.item = item1;
//     //         itemDrop.kill = kill;

//     //         itemDrop2.kill = kill;
//     //         itemDrop2.item = item1;
//     //         kill.monster = bandos;
//     //         await ItemDrop.save(itemDrop)
//     //         await ItemDrop.save(itemDrop2)
//     //     }

//     //     kill.items = [itemDrop, itemDrop2];
//     //     await NpcKill.save(kill);

//     // }

//     // let kills = await NpcKill.find({where: {player: osrsPlayer}});
//     // console.log(JSON.stringify(kills[kills.length - 1], null, 2));


//     // console.log(kills[kills.length - 1]);
//     // osrsPlayer.combatLevel = 100;
//     // osrsPlayer.username = "Iron 69M";
//     // osrsPlayer.kills = []
//     // osrsPlayer.token = '111';

//     // try{
//     //     let saved = await Player.save(osrsPlayer);
//     //     console.log(saved);
//     // }catch(err){
//     //     console.log(err);
//     //     console.log("Username already exists!");
//     // }

// })

