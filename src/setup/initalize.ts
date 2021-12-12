import { IDatabase, sqlite3 } from "../state/Database";

const db : IDatabase = sqlite3;

db.initalize().then(async () => {
    console.log("========= Database initalized succesfully ===============");
})