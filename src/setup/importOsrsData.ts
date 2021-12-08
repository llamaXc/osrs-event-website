import { ItemService } from "../service/itemService";
import { MonsterService } from "../service/monsterService";
import { IItem, IMonster } from "../state/database";

const fs = require('fs');
const path = require("path");

export class MonsterImporter{
    private filepath : string;
    private monsterService: MonsterService;

    constructor(monsterService: MonsterService, filepath: string){
        this.filepath = filepath;
        this.monsterService = monsterService
        this.import();
    }

    import(){
        let rawdata = fs.readFileSync(path.resolve(__dirname, this.filepath));
        let monstersMapRaw = JSON.parse(rawdata);
        
        let monstersMap =  new Map(Object.entries(monstersMapRaw))
        
        let monstersToAdd : [IMonster?] = []
        let keys = Array.from(monstersMap.keys())
        
        for (var i = 0; i < keys.length; i++){
            let monster : any = monstersMap.get(keys[i])
            let create : IMonster = {
                name: monster['name'],
                combat_level: monster['combat_level'],
                max_hit: monster['max_hit'],
                id: monster['id'],
                hitpoints: monster['hitpoints']
            }
            monstersToAdd.push(create);
        };

        this.monsterService.populateMonsters(monstersToAdd).then( () => {
            console.log("Saved monsters!")
        });
    }
}

export class ItemImporter{
    private filepath : string;
    private itemService: ItemService;

    constructor(itemService: ItemService, filepath: string){
        this.filepath = filepath;
        this.itemService = itemService
        this.import();
    }

    import(){
        let rawdata = fs.readFileSync(path.resolve(__dirname, this.filepath));
        let itemsMapRaw = JSON.parse(rawdata);
        
        let itemsMap =  new Map(Object.entries(itemsMapRaw))
        
        let itemsToAdd : [IItem?] = []
        let keys = Array.from(itemsMap.keys())
        
        for (var i = 0; i < keys.length; i++){
            let item : any = itemsMap.get(keys[i])
            let create : IItem = {
                name: item['name'],
                id: item['id'],
                icon: item['icon']
            }
            itemsToAdd.push(create);
        };

        this.itemService.populateItems(itemsToAdd).then( () => {
            console.log("Saved items!")
        });
    }
}
