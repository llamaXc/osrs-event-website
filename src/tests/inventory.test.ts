import { SlowBuffer } from 'buffer';
import {expect} from 'chai';
import { Inventory } from '../entity/Inventory';
import { InventorySlot } from '../entity/InventorySlot';
import { Item } from '../entity/Item';
import { ItemDrop } from '../entity/ItemDrop';
import { Player } from '../entity/Player';
import { Position } from '../entity/Position';
import { itemService, playerService } from '../service/Services';

describe('Inventory Test', () => {

    it('should create an inventory', async () => {
        console.log("\n\n\n================================\n")

        const player = await playerService.registerNewPlayer("InvoTestPlayer");
        console.log("Player owner of invo: " + JSON.stringify(player, null, 2));

        const invo = new Inventory();
        invo.slots = [];
        const saved = await Inventory.save(invo);

        console.log("invo = " + JSON.stringify(saved, null, 2))

        const item = new Item();
        item.icon = "FF";
        item.id = 1323;
        item.name = "godsword";
        await Item.save(item);

        const slot = new InventorySlot();
        slot.item = item;
        slot.quantity = 1;
        slot.slotIndex = 1;
        const savedSlot = await InventorySlot.save(slot);

        saved.slots = [savedSlot];
        const finalInvo = await Inventory.save(saved);

        player.inventory = finalInvo;
        const savedPlayer = await Player.save(player);

        console.log("SAVED INO: " + JSON.stringify(savedPlayer, null, 2));

        const updatedSlow = new InventorySlot();
        updatedSlow.item = item;
        updatedSlow.quantity = 2;
        updatedSlow.slotIndex = 2;
        savedPlayer.inventory.slots = [updatedSlow];
        const saveState = await Player.save(savedPlayer)

        console.log("SAVED After changing to 2: " + JSON.stringify(saveState, null, 2));

        console.log("\n\n\n================================\n\n\n\n\n\n\n\n")
    })
});