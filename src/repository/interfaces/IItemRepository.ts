import { IItem } from "../../state/database";

export interface IItemIRepository{
    saveItem(item: IItem): Promise<boolean>
    getItemById(id: number): Promise<IItem|undefined>
}