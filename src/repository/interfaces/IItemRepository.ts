import { Item } from "../../entity/Item";

export interface IItemIRepository{
    saveItem(item: Item): Promise<boolean>
    getItemById(id: number): Promise<Item|undefined>
}