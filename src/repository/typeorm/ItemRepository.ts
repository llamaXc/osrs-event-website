import { Item } from "../../entity/Item";
import { IItemIRepository } from "../interfaces/IItemRepository";

export class TypeOrmItemRepository implements IItemIRepository{

    async saveItem(item: Item): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getItemById(id: number): Promise<Item | undefined> {
        return await Item.findOne(id);
    }

}