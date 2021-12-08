import Database from "../state/database";
import { IItem } from "../state/database";

export class ItemRepository{
    private readonly _db = Database;

    async saveItem(item: IItem){
        return this._db.insertItem(item);
    }

    async getItemById(id: number){
        return this._db.getItem(id);
    }
}

