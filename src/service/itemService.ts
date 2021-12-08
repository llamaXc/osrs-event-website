import { ItemRepository } from '../repository/itemRepository';
import { IItem } from '../state/database';

export class ItemService{
    constructor(private readonly _itemRepo: ItemRepository){}

    async populateItems(items: [IItem?]){
        for (const item of items){
            if(item != null){
                await this._itemRepo.saveItem(item)
            }
        }
    }

    async getItemById(id: number){
        return await this._itemRepo.getItemById(id);
    }

}