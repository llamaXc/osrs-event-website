import { IDatabase, mysql } from "../state/Database";
import { playerService } from "../service";
const db : IDatabase = mysql;

db.initalize().then(async () => {
    console.log("========= Database initalized succesfully ===============");

    try{
        const doesExist = await playerService.doesPlayerExist("1000");
        const doesExist2 = await playerService.doesPlayerExist("2000");

        try{
            if(doesExist === false){
                await playerService.registerNewPlayer("int GIM", "1000")
            }
        }catch(e){

        }

        try{
         if(!doesExist2){
            await playerService.registerNewPlayer("GIMmyJohns", "2000")
         }
        }catch(e){
            
        }
    }catch(err){
        console.log("Player already exists in db");
    }
}).catch(async (err) => {
    console.log(err)
})