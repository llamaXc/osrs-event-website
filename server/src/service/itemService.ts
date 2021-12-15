import { Item } from '../entity/Item';
import { IItemIRepository } from '../repository/interfaces/IItemRepository';

export class ItemService{
    constructor(private readonly _itemRepo: IItemIRepository){}

    async insertItem(item: Item){
        return await this._itemRepo.saveItem(item);
    }

    async getItemById(id: number){
        return await this._itemRepo.getItemById(id);
    }

}