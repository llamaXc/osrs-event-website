import { GroupRepository } from "../repository/groupRepoistory";
import { IPlayer } from "../state/database";
import { PlayerService } from "./playerService";

export class GroupService{
    constructor(private readonly _groupRepo: GroupRepository,
        private readonly _playerService: PlayerService){}
    
}
