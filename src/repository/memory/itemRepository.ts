import { Item } from "../entity/Item";
import Database from "../state/database";
import { IItemIRepository } from "./interfaces/IItemRepository";

export class InMemeoryItemRepository implements IItemIRepository{
    private readonly _db = Database;

    async saveItem(item: Item): Promise<boolean>{
        await this._db.insertItem(item);
        return true;
    }

    async getItemById(id: number): Promise<Item|undefined>{
        return this._db.getItem(id);
    }
}


export class TypeOrmRepository implements IItemIRepository{
    private readonly _db = Database;

    async saveItem(item: Item): Promise<boolean>{
        await this._db.insertItem(item);
        return true;
    }

    async getItemById(id: number){
        let item = await Item.findOne(id);
        console.log(item);

        return this._db.getItem(id);
    }
}