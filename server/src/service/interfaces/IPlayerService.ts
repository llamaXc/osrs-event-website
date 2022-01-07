import { NpcKill } from "../../entity/NpcKill";
import { Player } from "../../entity/Player";
import { Quest } from "../../entity/Quest";
import { APIItemDropInformation } from "../ModelInterfaces/ApiDataTypes";

export interface IPlayerService {
    updateQuestData(
        player: Player,
        quests: Quest[],
        qp: number
    ): Promise<Player>;

    doesPlayerExist(playerToken: string): Promise<boolean>;

    getPlayers(): Promise<Player[]>

    registerNewPlayer(username: string, key?: string): Promise<Player>;

    updateSupplementInformation(
        player: Player,
        combatLevel: number,
        username: string,
        x: number,
        y: number,
        plane: number
    ): Promise<Player>;

    getPlayerById(playerId: number): Promise<Player | undefined>;

    getPlayerByHash(playerToken: string): Promise<Player | undefined>;

    updateEquippiedItems(
        mapOfSlottedItems: Map<string, APIItemDropInformation>,
        player: Player
    ): Promise<void>;

    updateInventoryItems(
        basicItems: APIItemDropInformation[],
        player: Player,
        value: number
    ): Promise<void>;

    createNpcKill(
        npcId: number,
        droppedItems: APIItemDropInformation[],
        killValue: number,
        player: Player
    ): Promise<NpcKill | undefined>;

    updateLevels(
        player: Player,
        levelsMap: Map<string, number>,
        totalLevel: number
    ): Promise<Player>;

    updateBankItems(
        bankItems: APIItemDropInformation[],
        value: number,
        player: Player
    ): Promise<Player>;

    getPlayerBankById(id: number): Promise<any>;

    getPlayerByUsername(username: string): Promise<any>;
}