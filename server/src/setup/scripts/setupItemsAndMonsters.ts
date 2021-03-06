import "reflect-metadata";
import fs from "fs"
import path from "path"
import { Item } from "../../entity/Item";
import { Monster } from "../../entity/Monster";
import { IDatabase, mysql } from "../../state/Database";

const MONSTER_PATH = "../../../data/json/monsters-complete.json"
const ITEM_PATH    = "../../../data/json/items-complete.json"

const db: IDatabase = mysql;

db.initalize().then(async () => {
    console.log("Connected. Importing data");

    await importMonsters();
    await importItems();
    console.log("===== Closing connection. Finished Importing ======")
})

function getDataFromFile(filepath: string){
    const rawdata = fs.readFileSync(path.resolve(__dirname, filepath));
    return  JSON.parse(rawdata.toString());
}

async function importMonsters(){
    const monsterRaw = getDataFromFile(MONSTER_PATH);
    const monstersMap =  new Map(Object.entries(monsterRaw))
    const keys = Array.from(monstersMap.keys())
    const monsterEntites = []

    for (let i = 0; i < keys.length; i++){
        const monster : any = monstersMap.get(keys[i])
        const monsterToInsert = new Monster();
        monsterToInsert.combat_level = monster["combat_level"];
        monsterToInsert.name         = monster["name"];
        monsterToInsert.hitpoints    = monster["hitpoints"];
        monsterToInsert.max_hit      = monster["max_hit"];
        monsterToInsert.id           = monster["id"]

        if( i % 1000 === 0){
            console.log("Monsters Imported: " + i);
        }

        monsterEntites.push(monsterToInsert)
        // await Monster.save(monsterToInsert)
    }

    const res = await Monster.createQueryBuilder()
        .insert()
        .values(monsterEntites)
        .orIgnore()
        .execute();
    
        console.log(JSON.stringify(res));

    console.log(">Monsters imported");
}

async function importItems(){
    const itemRaw = getDataFromFile(ITEM_PATH);
    const itemsMap =  new Map(Object.entries(itemRaw))
    const keys = Array.from(itemsMap.keys())
    const itemEntites = []

    for(let i = 0; i < keys.length; i++){
        const item : any = itemsMap.get(keys[i])
        const itemToInsert = new Item();

        itemToInsert.icon = item["icon"]
        itemToInsert.name = item["name"]
        itemToInsert.id   = item["id"]

        if( i % 1000 === 0){
            console.log("Items Imported: " + i);
        }

        itemEntites.push(itemToInsert);
        // await Item.save(itemToInsert);
    }


    const res = await Item.createQueryBuilder()
        .insert()
        .values(itemEntites)
        .orIgnore()
        .execute();
    
    console.log(JSON.stringify(res));
    console.log(">Items imported");
}