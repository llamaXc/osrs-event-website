import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { sqlite3File, sqlite3InMemory, mysqlServer } from "../setup/config/DatabaseConnections";

export interface IDatabase{
    initalize(): Promise<void>
    getConnection(): Promise<Connection>
}

class Database implements IDatabase{
    private readonly options: ConnectionOptions;
    private connection: Connection;

    constructor(options: ConnectionOptions){
        this.options = options;
        console.log("\t> Loaded db options for: " + options.database);
    }

    async initalize(){
        this.connection = await createConnection(this.options);
    }

    async getConnection(): Promise<Connection> {
        return this.connection;
    }
}

export const inMemeory: Database    = new Database(sqlite3InMemory);
export const sqlite3: Database      = new Database(sqlite3File);
export const mysql: Database        = new Database(mysqlServer);

