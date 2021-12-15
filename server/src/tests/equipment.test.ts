import {expect} from 'chai';
import { createLanguageServiceSourceFile } from 'typescript';
import { Equipment } from '../entity/Equipment';
import { EquipmentSlot } from '../entity/EquipmentSlot';
import { Item } from '../entity/Item';
import { Level } from '../entity/Level';
import { Player } from '../entity/Player';
import { playerService } from '../service';

describe('Equipment Test', () => {

    it('should create equipment slots', async () => {

        const helmOfNezy = {
            icon: "FFFF",
            name: "Helm of Neitznot",
            id: 10828
        } as Item;

        const savedHelmOfNezy = await Item.save(helmOfNezy);

        const headSlot = new EquipmentSlot();
        headSlot.item = savedHelmOfNezy;
        headSlot.quantity = 1;
        headSlot.slotName = "HEAD"

        const armour = new Equipment();
        armour.slots = [headSlot];

        const player = await playerService.registerNewPlayer("EquipmentTestPlayer");
        player.equipment = armour;

        const saved = await Player.save(player);

        expect(saved.equipment.slots[0].slotName).to.equal("HEAD")
        expect(saved.equipment.slots[0].item.id).to.equal(10828)
        expect(saved.equipment.slots[0].quantity).to.equal(1)
    });

});