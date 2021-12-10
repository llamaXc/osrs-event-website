export interface IItemDrop{
    item: IItem,
    quantity: number,
}

export interface IBasicItemDropped{
    id: number,
    quantity: number,
}

export interface INpcKill extends Saveable{
    id: number,
    npc: IMonster,
    killValue: number,
    items: IItemDrop[],
    player: IPlayer
}

export interface IMonster{
    name: string,
    id: number,
    combat_level: number
    hitpoints: number,
    max_hit: number,
}

export interface Saveable{
    time_updated?: number,
    time_created?: number
}

export interface IItem extends Saveable{
    name: string,
    id: number,
    icon: string
}

export interface IPlayer extends Saveable{
    username: string,
    token: string,
    combatLevel: number,
    id: number,
}

export interface IInventory extends Saveable{
    value: number,
    slots: IItemDrop[]
}

export interface IEquippedItems extends Saveable{
    head?: IItemDrop,
    neck?: IItemDrop,
    chest?: IItemDrop,
    legs?: IItemDrop,
    cape?: IItemDrop,
    weapon?: IItemDrop,
    shield?: IItemDrop,
    boots?: IItemDrop,
    gloves?: IItemDrop,
    ring?: IItemDrop,
    ammo?: IItemDrop 
}

export interface ILevel{
    name: string,
    xp: number,
    level: number
}

export interface ILevels extends Saveable{
    levels: Map<string, ILevel>,
    total: number
}

export interface ICoordinate extends Saveable{
    x: number,
    y: number,
    z?: number
}

export enum IQuestState{
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = "FINISHED",
    NOT_STARTED = "NOT_STARTED"
}

export interface IQuest{
    name: string,
    id: number,
    state: IQuestState
}

export interface IQuestList extends Saveable{
    quests: IQuest[],
    qp: number
}

export interface IBank extends Saveable{
    items: IItem[],
    value: number
}

export type PlayerHash = string
export type PlayerId = number
export type NpcId = number
export type ItemId = number

export interface IDatabaseState{
    monsters: Map<NpcId, IMonster>,
    items: Map<ItemId, IItem>,

    npcKills: Map<PlayerId, INpcKill[]>,
    players: Map<PlayerId, IPlayer>,
    invos: Map<PlayerId, IInventory>,
    equippedItems: Map<PlayerId, IEquippedItems>,
    levels: Map<PlayerId, ILevels>,
    positions: Map<PlayerId, ICoordinate>,
    quests: Map<PlayerId, IQuestList>,
    banks: Map<PlayerId, IBank>,
    playerIdToPlayerHash: Map<PlayerId, PlayerHash>
    playerHashToPlayerId: Map<PlayerHash, PlayerId>
}

class Database{
    private state: IDatabaseState = {
        npcKills: new Map<PlayerId, INpcKill[]>(),
        players: new Map<PlayerId, IPlayer>(),
        monsters: new Map<NpcId, IMonster>(),
        items: new Map<ItemId, IItem>(),
        invos: new Map<PlayerId, IInventory>(),
        equippedItems: new Map<PlayerId, IEquippedItems>(),
        levels: new Map<PlayerId, ILevels>(),
        positions: new Map<PlayerId, ICoordinate>(),
        quests: new Map<PlayerId, IQuestList>(),
        banks: new Map<PlayerId, IBank>(),
        playerIdToPlayerHash: new Map<number, string>(),
        playerHashToPlayerId: new Map<PlayerHash, PlayerId>()

    }

    async updateBank(playerId: PlayerId, bank: IBank){
        return await this.state.banks.set(playerId, bank);
    }

    async getBank(playerId: PlayerId){
        return await this.state.banks.get(playerId);
    }

    async updateQuestList(playerId: PlayerId, questList: IQuestList){
        return await this.state.quests.set(playerId, questList);
    }

    async getQuestList(playerId: PlayerId): Promise<IQuestList|undefined>{
        let quests = await this.state.quests.get(playerId);
        if(quests){
            return await this.state.quests.get(playerId);
        }
    }

    async updateLevelsByPlayerId(playerId: PlayerId, levels: ILevels){
        console.log(playerId + JSON.stringify(levels))
        await this.state.levels.set(playerId, levels);
    }

    async updatePositionByPlayerId(playerId: PlayerId, coords: ICoordinate){
        await this.state.positions.set(playerId, coords)
    }

    async getPositionByPlayerId(playerId: PlayerId): Promise<ICoordinate | undefined>{
        return await this.state.positions.get(playerId);
    }

    async updateUsernameAndLevelByPlayerId(playerId: PlayerId, username: string, combatLevel: number){
        let player = this.state.players.get(playerId)
        if(player && (player?.username != username || player.combatLevel != combatLevel)){
            player.username = username;
            player.combatLevel = combatLevel;
            await this.state.players.set(playerId, player);
        }
    }

    async getLevelsByPlayerId(playerId: PlayerId){
        let l = await this.state.levels.get(playerId)
        console.log(playerId + " GETT" + JSON.stringify(l))
        return await this.state.levels.get(playerId);
    }

    async getKillsFromPlayerId(playerId: PlayerId): Promise<INpcKill[]>{
        let kills = await this.state.npcKills.get(playerId);
        if(kills == undefined){
            return []
        }else{
            return kills;
        }
    }
    
    async insertPlayer(player: IPlayer){
        player.id = await this.state.players.size + 1;

        this.state.playerIdToPlayerHash.set(player.id, player.token);
        this.state.playerHashToPlayerId.set(player.token, player.id);

        console.log("Inserting player: " + player.username + " id: " + player.id + "\ntoken: " + player.token);
        await this.state.players.set(player.id, player)
    }

    async getInventoryByPlayerId(playerId: PlayerId){
        return await this.state.invos.get(playerId)
    }

    async updateInventoryByPlayerId(playerId: PlayerId, invo : IInventory){
        return await this.state.invos.set(playerId, invo);
    }

    async updateEquippedItemByPlayerId(playerId: PlayerId, equippedItems: IEquippedItems){
        return await this.state.equippedItems.set(playerId, equippedItems)
    }

    async getEquippedItemsByPlayerId(playerId: PlayerId){
        return await this.state.equippedItems.get(playerId)
    }

    async getPlayerIdFromHash(playerHash: PlayerHash){
        return await this.state.playerHashToPlayerId.get(playerHash);
    }

    async getPlayerById(playerId: PlayerId){
        return await this.state.players.get(playerId);
    }

    async getPlayerByHash(playerHash: string){
        let id = await this.getPlayerIdFromHash(playerHash);
        if(id){
            return await this.state.players.get(id)
        }
    }

    async getPlayerHashFromPlayerId(playerId: number){
        return await this.state.playerIdToPlayerHash.get(playerId)
    }

    async insertMonster(monster: IMonster){
        return this.state.monsters.set(monster.id, monster);
    }

    async insertItem(item : IItem){
        return this.state.items.set(item.id, item)
    }

    async getItem(id: number){
        return this.state.items.get(id);
    }

    async getMonster(id: number){
        return this.state.monsters.get(id);
    }

    async createNpcKillForPlayer(npcData: INpcKill, player: IPlayer){
        let npcKills = this.state.npcKills.get(player.id);
        console.log("Creating kill for playerId: " + player.id)
        if(npcKills){
            await npcKills.push(npcData);
            return this.state.npcKills.set(player.id, npcKills)
        }else{
            let kills: INpcKill[] = [npcData];
            return this.state.npcKills.set(player.id, kills)
        }

    }
}

export default new Database()