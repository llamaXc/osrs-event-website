import { Item } from "../../entity/Item";

export interface IItemIRepository{
    saveItem(item: Item): Promise<Item|undefined>
    getItemById(id: number): Promise<Item|undefined>
}