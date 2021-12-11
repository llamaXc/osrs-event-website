import { Item } from "../entity/Item";
import { Monster } from "../entity/Monster";
import { Player } from "../entity/Player";
import { itemService, monsterService, playerService } from "../service/Services";
import { IBasicItemDropped } from "../state/old_ts";
import {expect} from 'chai';
import {inMemeory} from "../state/Database"
import { ItemDrop } from "../entity/ItemDrop";

before(async () => {
    await inMemeory.initalize()
})

describe('Player service', () => {

    let playerIron69M: Player;
    let dragonScimItem: Item;
    let dragonBonesItem: Item;
    let blackDragonNpc: Monster;

    before(async () => {
        playerIron69M = await playerService.registerNewPlayer("Iron 69M", "1000");

        blackDragonNpc = {
            name: "Black Dragon",
            combat_level: 214,
            hitpoints: 211,
            max_hit: 16,
            id: 144
        } as Monster;

        dragonScimItem = {
            name: "Dragon Scimitar",
            id: 1500,
            icon: "ABCDEFG"
        } as Item;

        dragonBonesItem = {
            name: "Dragon Bones",
            id: 4500,
            icon: "AJZJDHYEY"
        } as Item;

        // Setup a monster and some items to use.
        await itemService.insertItem(dragonScimItem)
        await itemService.insertItem(dragonBonesItem)
        await monsterService.insertMonster(blackDragonNpc)

    })

    it('can create a new player', async () => {
        const createdPlayer = await playerService.registerNewPlayer("Drop Squad", "1005");
        const playerFound = await playerService.getPlayerById(createdPlayer.id);

        expect(playerFound?.username === "Drop Squad")
        expect(playerFound?.combatLevel === 0)
        expect(playerFound?.token === "1000")
    });

    it('can get a player by id', async () => {
        const FIRST_PLAYER_ID = 1
        const playerFound = await playerService.getPlayerById(FIRST_PLAYER_ID);
        expect(playerFound?.username === "Iron 69M")
        expect(playerFound?.combatLevel === 0)
        expect(playerFound?.token === "1000")
    });

    it('can record a npc kill for a player', async () => {
        const items: IBasicItemDropped[] = [
            { id: dragonScimItem.id, quantity: 4 },
            { id: dragonBonesItem.id, quantity: 1 }
        ]

        const npcKill = await playerService.createNpcKill(blackDragonNpc.id, items, 1000, playerIron69M);
        expect(npcKill?.player).to.equal(playerIron69M);
        const itemsOnKill = npcKill?.items;

        if(itemsOnKill === undefined){
            return expect.fail('No items found on kill. Expected 2 items');
        }

        for (const basicItem of items){
            const id = basicItem.id
            const quant = basicItem.quantity;
            let itemMatches = false;
            for(const droppedItem of itemsOnKill){
                if(droppedItem.item.id === id && droppedItem.quantity === quant){
                    itemMatches = true
                    break;
                }
            }
            expect(itemMatches)
        }
    })

    it('can get npc kill for a player', async () => {
        const kills = await playerService.getNpcKills(playerIron69M);
        for(const kill of kills){
            expect(kill.player.username).to.equal(playerIron69M.username);
        }
    })

});