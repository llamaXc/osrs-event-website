import { assert } from 'console';
import { playerService } from '../service';

describe('Test QP', () => {

    it('should save qp', async () => {
        const newPlayer = await playerService.registerNewPlayer("LevelTestMan");
        const updatedQuests = await playerService.updateQuestData(newPlayer, [], 100)
        const player = await playerService.getPlayerById(newPlayer.id)
        if(player){
            assert(player.questPoints == 100)
        }else{
            assert(false)
        }
    });

});