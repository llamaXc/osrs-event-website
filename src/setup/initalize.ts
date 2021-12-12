
import { IDatabase, sqlite3 } from "../state/Database";
import { playerService } from "../service";
const db : IDatabase = sqlite3;

db.initalize().then(async () => {
    console.log("========= Database initalized succesfully ===============");

    try{
        const doesExist = await playerService.doesPlayerExist("1000");
        if(doesExist === false){
            await playerService.registerNewPlayer("GIMmyJohns", "1000")
        }
    }catch(err){
        console.log("Player already exists in db");
    }
})