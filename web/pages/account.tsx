import { Box, Link } from "@material-ui/core";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { usePlayersStore } from "../store/players";

const AccountPage = () => {

    const fetchPlayers = usePlayersStore((state) => state.getPlayers);
    const players = usePlayersStore(state => state.players);

    useEffect(() => {
        fetchPlayers();
    }, [])

    useEffect(() => {
        console.log(players)
    }, [players])

    return (
        <Layout title='About'>
            <Box
                display='flex'
                justifyContent='flex-start'
                flexDirection='column'
                alignItems='center'
                minHeight='90vh'
                flexWrap='wrap'
            >
                <div>
                <h1>View a player</h1>
                <Box display="flex" flexDirection={"column"}>
                {players && players.map(player => {
                    return <Link href={"player/?id=" + player.id}> Lvl: {player.combatLevel}    {player.username}</Link>
                })}
                </Box>
                </div>
            </Box>
        </Layout>
    );
};

export default AccountPage;
