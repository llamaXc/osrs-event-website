import {expect} from 'chai';
import { Level } from '../entity/Level';
import { Player } from '../entity/Player';
import { playerService } from '../service';

describe('Levels Test', () => {

    it('should create all levels', async () => {
        console.log("Time to rune the levels test")
        const firemaking = new Level();
        firemaking.name = "Firemaking"
        firemaking.level = 55

        const sved =await Level.save(firemaking);

        const newPlayer = await playerService.registerNewPlayer("LevelTestMan");
        newPlayer.levels = [firemaking];

        const savedPlayer = await Player.save(newPlayer);
        expect(savedPlayer.levels.length).to.equal(1);
        expect(savedPlayer.levels[0].name).to.equal("Firemaking")

    });

});