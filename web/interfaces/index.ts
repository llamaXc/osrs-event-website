// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export interface Item {
  id: number;
  name: string;
  icon: string;
}

export interface InventorySlot{
  id: number;
  slotIndex: number;
  quantity: number;
  item: Item;
}

export interface Inventory{
  id: number,
  slots: InventorySlot[]
}

export interface Level{
  id: number,
  name: string,
  level: number
}

export interface Equipment{
  id: number,
  slots: EquipmentSlot[]
}

export interface EquipmentSlot{
  id: number,
  slotName: string,
  quantity: number,
  item: Item
}

export interface Quest{
  id: number,
  name: string,
  state: string
}

export interface Bank{
  id: number,
  slots?: InventorySlot[]
}