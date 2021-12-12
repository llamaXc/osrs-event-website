import { ConnectionOptions } from "typeorm";

export const sqlite3InMemory : ConnectionOptions= {
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: ["src/entity/*.{ts,js}"],
    synchronize: true,
    logging: true
}

export const sqlite3File : ConnectionOptions= {
    type: "better-sqlite3",
    database: "data/sqlite3/sqlite3file.sqlite",
    migrations: ["src/migrations/**/*.ts"],
    entities: ["bin/entity/*.{ts,js}"],
    synchronize: true,
    logging: false
}