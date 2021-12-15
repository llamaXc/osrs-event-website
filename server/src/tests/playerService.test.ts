import { Item } from "../entity/Item";
import { Monster } from "../entity/Monster";
import { Player } from "../entity/Player";
import { itemService, monsterService, playerService } from "../service";
import {expect} from 'chai';
import {inMemeory} from "../state/Database"
import { APIItemDropInformation } from "../service/ModelInterfaces/ApiDataTypes";

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

    it ('can handle duplicate usernames', async () => {
        try{
            const createdPlayer = await playerService.registerNewPlayer("Bob");
            const duplicateName = await playerService.registerNewPlayer("Bob");
        }catch(err){
            expect(err).to.be.an('error')
        }
    })

    it('can get a player by id', async () => {
        const FIRST_PLAYER_ID = 1
        const playerFound = await playerService.getPlayerById(FIRST_PLAYER_ID);
        expect(playerFound?.username === "Iron 69M")
        expect(playerFound?.combatLevel === 0)
        expect(playerFound?.token === "1000")
    });

    it('can record a npc kill for a player', async () => {
        const items: APIItemDropInformation[] = [
            { id: dragonScimItem.id, quantity: 4 },
            { id: dragonBonesItem.id, quantity: 1 }
        ]

        const kill = await playerService.createNpcKill(blackDragonNpc.id, items, 1000, playerIron69M);

        console.log("Kill returned from creation:\n" + JSON.stringify(kill, null, 2));

        expect(kill?.items.length).to.equal(2);
        const itemsOnKill = kill?.items;

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

    it ('can throw error on invalid item drop', async () => {
        const items: APIItemDropInformation[] = [
            { id: 99999999, quantity: 4 },
        ]

        try{
            await playerService.createNpcKill(blackDragonNpc.id, items, 1000, playerIron69M)
        }catch(error){
            expect(error)
            .to
            .be
            .an('error')
        }
    })

    it('can update supplement info', async () => {
        const updated = await playerService.updateSupplementInformation(playerIron69M, 121, "Zezima", 15, 20, 1);
        expect(updated.position.x).to.equal(15);
        expect(updated.position.y).to.equal(20);
        expect(updated.position.z).to.equal(1);
        expect(updated.combatLevel).to.equal(121);
        expect(updated.username).to.equal("Zezima")
    });

});