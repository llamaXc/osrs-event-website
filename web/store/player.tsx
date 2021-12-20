import create, { SetState, GetState } from "zustand";
import { devtools } from "zustand/middleware";

interface PlayerStore {
    username: string;
    combatLevel: number;
    authenticated: boolean;
    authenticate: () => void;
    logout: () => void;
    fetch: (username) => void;
}

interface PlayerAPIResponse {
    username: string;
    combatLevel: number;
    authenticated: boolean;
}

const fetchPlayerByName = async (username): Promise<PlayerAPIResponse> => {
    const FIXTURE_PLAYER_RESPONSE: PlayerAPIResponse = {
        username: "IRON 69M",
        combatLevel: 50,
        authenticated: false,
    };
    // const res = await fetch("../fixture/playerApi.json");
    // const fetchedUsername = res.body["username"];
    // const fetchedCombatLevel = res.body["combatLevel"];
    return FIXTURE_PLAYER_RESPONSE;
};

export const usePlayerStore = create<PlayerStore>(
    devtools((set: SetState<PlayerStore>, get: GetState<PlayerStore>) => ({
        username: "",
        combatLevel: 0,
        authenticated: false,
        fetch: async (username) => {
            const player = await fetchPlayerByName(username);
            console.log(player);
            set({ username: player.username, combatLevel: player.combatLevel });
        },
        logout: async () => {
            //call server and let them know of logout?
            set({ authenticated: false });
        },
        authenticate: async () => {
            // const serverResponse = await authenticatePlayer(username, ...)
            set({ authenticated: true });
        },
    }))
);
