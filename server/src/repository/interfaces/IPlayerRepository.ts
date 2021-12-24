import { Bank } from "../../entity/Bank";
import { Equipment } from "../../entity/Equipment";
import { Inventory } from "../../entity/Inventory";
import { ItemDrop } from "../../entity/ItemDrop";
import { Level } from "../../entity/Level";
import { Monster } from "../../entity/Monster";
import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";
import { Position } from "../../entity/Position";
import { Quest } from "../../entity/Quest";

export interface IPlayerRepository{
    createNpcKill(npcKill: NpcKill, droppedItems: ItemDrop[], npc: Monster, player: Player): Promise<NpcKill|undefined>
    updateBank(player: Player, bank: Bank): Promise<Player>

    updateQuestData(player: Player, quests: Quest[], qp: number): Promise<Player>

    addNewPlayer(player: Player):  Promise<Player>

    updatePosition(player: Player, coords: Position): Promise<Player>

    updateNameAndLevel(player: Player, username: string, level: number): Promise<Player>

    getPlayerByToken(token: string): Promise<Player|undefined>
    getPlayerById(id: number): Promise<Player|undefined>


    updateInventory(player: Player, invo: Inventory): Promise<Player>

    updateEquipment(equipment: Equipment, player: Player): Promise<Player>
    updateLevelData(levels: Level[], totalLevel: number, player: Player): Promise<Player>
    getPlayers(): Promise<Player[]>
}