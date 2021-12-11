import { ConnectionOptions } from "typeorm";
import { ItemDrop } from "../../entity/ItemDrop";
import { Item } from "../../entity/Item";
import { Monster } from "../../entity/Monster";
import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";

export const sqlite3InMemory : ConnectionOptions= {
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: ["src/entity/**/*.ts"],
    synchronize: true,
    logging: false
}

export const sqlite3File : ConnectionOptions= {
    type: "sqlite",
    database: "./data/sqlite3/dev_test.sqlite",
    dropSchema: true,
    entities: [Player, Item, Monster, NpcKill, ItemDrop],
    synchronize: true,
    logging: true
}