import { Equipment } from "../../entity/Equipment";
import { Inventory } from "../../entity/Inventory";
import { ItemDrop } from "../../entity/ItemDrop";
import { Level } from "../../entity/Level";
import { Monster } from "../../entity/Monster";
import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";
import { Position } from "../../entity/Position";

export interface IPlayerRepository{
    createNpcKill(npcKill: NpcKill, droppedItems: ItemDrop[], npc: Monster, player: Player): Promise<NpcKill|undefined>
    // updateBank(player: IPlayer, bank: IBank): Promise<boolean>
    // getBank(player: IPlayer): Promise<IBank|undefined>
    // updateQuestListForPlayer(player: IPlayer, questList: IQuestList): Promise<boolean>
    // getQuestListForPlayer(player: IPlayer): Promise<IQuestList|undefined>
    getNpcKillsForPlayer(player: Player): Promise<NpcKill[]>
    addNewPlayer(player: Player):  Promise<Player>

    updatePosition(player: Player, coords: Position): Promise<Player>
    getPosition(player: Player): Promise<Position|undefined>

    updateNameAndLevel(player: Player, username: string, level: number): Promise<Player>

    getPlayerByToken(token: string): Promise<Player|undefined>
    getPlayerById(id: number): Promise<Player|undefined>
    getPlayerInventory(player: Player): Promise<Inventory|undefined>


    updateInventory(player: Player, invo: Inventory): Promise<Player>

    // getPlayerEquippedItems(player: IPlayer): Promise<IEquippedItems|undefined>

    updateEquipment(equipment: Equipment, player: Player): Promise<Player>
    updateLevelData(levels: Level[], questPoints: number, player: Player): Promise<Player>
}