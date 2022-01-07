import Layout from "../components/Layout";
import { MainPanel } from "../components/MainPanel";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePlayerStore } from "../store/player";
import { Box } from "@mui/material";

const PlayerPage = () => {
    const router = useRouter()
    const fetchPlayerById = usePlayerStore(state => state.getPlayer);
    const player = usePlayerStore(state => state.player);
    const {id} = router.query

    useEffect(() => {
        if(id){
            fetchPlayerById(id);
        }
    }, [id])

    useEffect(() => {console.log(player)}, [player])

    return (
        <Layout title={player.username}>
            <Box className="player-ui-container">
                <h1>{player && player.username}</h1>
                <p>Level: {player && player.combatLevel}</p>
                <MainPanel/>
            </Box>
        </Layout>
    );
};

export default PlayerPage;
