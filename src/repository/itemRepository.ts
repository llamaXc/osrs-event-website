import Database from "../state/database";
import { IItem } from "../state/database";
import { IItemIRepository } from "./interfaces/IItemRepository";

export class InMemeoryRepository implements IItemIRepository{
    private readonly _db = Database;

    async saveItem(item: IItem): Promise<boolean>{
        await this._db.insertItem(item);
        return true;
    }

    async getItemById(id: number){
        return this._db.getItem(id);
    }
}

