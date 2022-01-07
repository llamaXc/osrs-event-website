import create, { SetState, GetState } from "zustand";
import { devtools } from "zustand/middleware";
import { API_PATH } from "../config/api";
import {Bank, Equipment, Inventory, Level, Quest} from "../interfaces/"

interface Player{
    username: string;
    combatLevel: number;
    questPoints: number;
    totalLevel: number;
    inventory: Inventory;
    levels: Level[]
    equipment: Equipment;
    quests: Quest[];
    bank: Bank;
}
interface PlayerStore {
    player: Player;
    id: number;
    getPlayer: (id) => void;
    updateBank: () => void;
}

const fetchPlayerById = async (id): Promise<Player> => {
    console.log("==== Load Player =====")
    const res = await fetch(API_PATH + "api-unauth/player/" + id + "/");
    const jsonRes = await res.json();
    const player = jsonRes['player']['player'] as Player;
    console.log("==== Player fetched====")
    console.log(player.bank)
    console.log(JSON.stringify(player, null, 2))
    return player;
};

const updatebank = async(id): Promise<Bank> => {
    console.log("==== Load Player =====")
    const res = await fetch(API_PATH + "api-unauth/player/" + id + "/bank");
    const jsonRes = await res.json();
    console.log(JSON.stringify(jsonRes, null, 2))
    const bank = jsonRes['bank'] as Bank;
    return bank;
}

export const usePlayerStore = create<PlayerStore>(
    devtools((set: SetState<PlayerStore>, get: GetState<PlayerStore>) => ({
        player: {
            username: "",
            combatLevel: -1,
            questPoints: -1,
            totalLevel: -1,
            inventory: {id: 0, slots: []},
            levels: [],
            quests: [],
            equipment: {id: 0, slots: []},
            bank: {id: 0, slots: []}
        },
        id: -1,
        getPlayer: async (id) => {
            const player = await fetchPlayerById(id);
            console.log("SETTING PLAYER!");
            set({id: id})
            set({ player: player });
        },
        updateBank: async() => {
            console.log("Updateing bank!")
            const curPlayer = get().player
            curPlayer.bank = await updatebank(get().id);
            set({player: curPlayer})
        }
    }))
);
