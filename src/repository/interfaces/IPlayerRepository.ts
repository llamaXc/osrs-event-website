import { ItemDrop } from "../../entity/Item";
import { Monster } from "../../entity/Monster";
import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";

export interface IPlayerRepository{
    createNpcKill(npcKill: NpcKill, droppedItems: ItemDrop[], npc: Monster, player: Player): Promise<boolean>
    // updateBank(player: IPlayer, bank: IBank): Promise<boolean>
    // getBank(player: IPlayer): Promise<IBank|undefined>
    // updateQuestListForPlayer(player: IPlayer, questList: IQuestList): Promise<boolean>
    // getQuestListForPlayer(player: IPlayer): Promise<IQuestList|undefined>
    getNpcKillsForPlayer(player: Player): Promise<NpcKill[]>
    addNewPlayer(player: Player):  Promise<Player>
    // updatePosition(player: IPlayer, coords: ICoordinate): Promise<boolean>
    // getPosition(player: IPlayer): Promise<ICoordinate|undefined>
    // updateNameAndLevel(player: IPlayer, username: string, level: number): Promise<boolean>
    getPlayerByToken(token: string): Promise<Player|undefined>
    getPlayerById(id: number): Promise<Player|undefined>
    // getPlayerInventory(player: IPlayer): Promise<IInventory|undefined>
    // updatePlayerInventory(player: IPlayer, invo: IInventory): Promise<boolean>
    // getPlayerEquippedItems(player: IPlayer): Promise<IEquippedItems|undefined>
    // updatePlayerEquippedItems(equippedItem: IEquippedItems, player: IPlayer): Promise<boolean>
    // updatePlayerLevels(levels: ILevels, player: IPlayer): Promise<boolean>
    // getPlayerLevels(player: IPlayer): Promise<ILevels|undefined>
}