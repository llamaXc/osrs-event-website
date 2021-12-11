import { IBank, ICoordinate, IEquippedItems, IInventory, ILevels, INpcKill, IPlayer, IQuestList } from "../../state/database";

export interface IPlayerRepository{
    createNpcKill(npcKill: INpcKill, player: IPlayer): Promise<boolean>
    updateBank(player: IPlayer, bank: IBank): Promise<boolean>
    getBank(player: IPlayer): Promise<IBank|undefined>
    updateQuestListForPlayer(player: IPlayer, questList: IQuestList): Promise<boolean>
    getQuestListForPlayer(player: IPlayer): Promise<IQuestList|undefined>
    getNpcKillsForPlayer(player: IPlayer): Promise<INpcKill[]>
    addNewPlayer(player: IPlayer):  Promise<boolean>
    updatePosition(player: IPlayer, coords: ICoordinate): Promise<boolean>
    getPosition(player: IPlayer): Promise<ICoordinate|undefined>
    updateNameAndLevel(player: IPlayer, username: string, level: number): Promise<boolean>
    getPlayerByToken(token: string): Promise<IPlayer|undefined>
    getPlayerById(id: number): Promise<IPlayer|undefined>
    getPlayerInventory(player: IPlayer): Promise<IInventory|undefined>
    updatePlayerInventory(player: IPlayer, invo: IInventory): Promise<boolean>
    getPlayerEquippedItems(player: IPlayer): Promise<IEquippedItems|undefined>
    updatePlayerEquippedItems(equippedItem: IEquippedItems, player: IPlayer): Promise<boolean>
    updatePlayerLevels(levels: ILevels, player: IPlayer): Promise<boolean>
    getPlayerLevels(player: IPlayer): Promise<ILevels|undefined>
}