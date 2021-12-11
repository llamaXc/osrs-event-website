import "reflect-metadata";
const fs = require('fs');
const path = require("path");
import {createConnection} from "typeorm";
import { Item, ItemDrop } from "../entity/Item";
import { Monster } from "../entity/Monster";
import { NpcKill } from "../entity/NpcKill";
import { Player } from "../entity/Player";

const MONSTER_PATH = "../../data/json/monsters-complete.json"
const ITEM_PATH    = "../../data/json/items-complete.json"

function getDataFromFile(filepath: string){
    let rawdata = fs.readFileSync(path.resolve(__dirname, filepath));
    return  JSON.parse(rawdata);   
}

async function importMonsters(){
    let monsterRaw = getDataFromFile(MONSTER_PATH);
    let monstersMap =  new Map(Object.entries(monsterRaw))
    let keys = Array.from(monstersMap.keys())
    
    for (var i = 0; i < keys.length; i++){
        let monster : any = monstersMap.get(keys[i])
        let monsterToInsert = new Monster();
        monsterToInsert.combat_level = monster["combat_level"];
        monsterToInsert.name         = monster["name"];
        monsterToInsert.hitpoints    = monster["hitpoints"];
        monsterToInsert.max_hit      = monster["max_hit"];
        monsterToInsert.id           = monster["id"]
        await Monster.save(monsterToInsert)
    }
    console.log(">Monsters imported: ");
}

async function importItems(){
    let itemRaw = getDataFromFile(ITEM_PATH);
    let itemsMap =  new Map(Object.entries(itemRaw))
    let keys = Array.from(itemsMap.keys())
    for(var i = 0; i < keys.length; i++){
        let item : any = itemsMap.get(keys[i])
        let itemToInsert = new Item();

        itemToInsert.icon = item["icon"]
        itemToInsert.name = item["name"]
        itemToInsert.id   = item["id"]
        
        await Item.save(itemToInsert);
    }
}


createConnection({
    type: "sqlite",
    database: "../../data/sqlite3/dev.sqlite",
    synchronize: true,
    entities: [ Player, NpcKill, Item, Monster, ItemDrop],
    logging: false
}).then( async function(connection){
    console.log("Connected. Importing data");

    await importMonsters();
    await importItems();
});
