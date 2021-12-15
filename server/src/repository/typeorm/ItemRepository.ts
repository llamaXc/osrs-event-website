import { Item } from "../../entity/Item";
import { IItemIRepository } from "../interfaces/IItemRepository";

export class TypeOrmItemRepository implements IItemIRepository{

    async saveItem(item: Item): Promise<Item|undefined> {
        return await Item.save(item);
    }

    async getItemById(id: number): Promise<Item | undefined> {
        return await Item.findOne(id);
    }

}