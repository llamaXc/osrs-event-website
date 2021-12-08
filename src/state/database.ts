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
    name: string,
    token: string,
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

export interface ILevel extends Saveable{
    name: string,
    xp: number,
    level: number
}

export interface ILevels extends Saveable{
    levels: Map<string, ILevel>,
    total: number
}


export interface IDatabaseState{
    npcKills: INpcKill[]
    monsters: Map<number, IMonster>,
    items: Map<number, IItem>,
    players: IPlayer[],
    invos: Map<string, IInventory>,
    equippedItems: Map<string, IEquippedItems>,
    levels: Map<string, ILevels>
}

class Database{
    private state: IDatabaseState = {
        npcKills: [],
        players: [],
        monsters: new Map<number, IMonster>(),
        items: new Map<number, IItem>(),
        invos: new Map<string, IInventory>(),
        equippedItems: new Map<string, IEquippedItems>(),
        levels: new Map<string, ILevels>()
    }

    async updateLevelsByPlayerHash(playerHash: string, levels: ILevels){
        console.log("Saving levels: ")
        console.log(levels)
        await this.state.levels.set(playerHash, levels);
    }

    async getLevelsByPlayerHash(playerHash: string){
        return await this.state.levels.get(playerHash);
    }

    async insertPlayer(player: IPlayer){
        this.state.players.push(player)
    }

    async getInventoryByPlayerHash(playerToken: string){
        return await this.state.invos.get(playerToken)
    }

    async updateInventoryByPlayerHash(playerHash: string, invo : IInventory){
        return await this.state.invos.set(playerHash, invo);
    }

    async updateEquippedItemByPlayerHash(playerHash: string, equippedItems: IEquippedItems){
        return await this.state.equippedItems.set(playerHash, equippedItems)
    }

    async getEquippedItemsByPlayerHash(playerToken: string){
        return await this.state.equippedItems.get(playerToken)
    }

    async getPlayerByHash(playerHash: string){
        for (const player of this.state.players){
            if(player && player.token == playerHash){
                return player
            }
        }
        return null
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

    async createNpcKill(npcData: INpcKill){
        return this.state.npcKills.push(npcData)
    }

    async findAllNpcKills(){        
        return this.state.npcKills;
    }
}

export default new Database()