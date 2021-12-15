import { ConnectionOptions } from "typeorm";

export const sqlite3InMemory : ConnectionOptions= {
    type: "better-sqlite3",
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
    entities: ["src/entity/*.{ts,js}"],
    synchronize: true,
    logging: false
}

export const mysqlServer : ConnectionOptions= {
    type: "mysql",
    host: "mysql_server",
    port: 3306,
    username: "user",
    password: "user_password",
    database: "development",
    entities: ["src/entity/*.{ts,js}"],
    synchronize: true,
    logging: false
}