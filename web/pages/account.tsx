import { Box, Link } from "@material-ui/core";
import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { usePlayersStore } from "../store/players";

const AccountPage = () => {
  const fetchPlayers = usePlayersStore((state) => state.getPlayers);
  const players = usePlayersStore((state) => state.players);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    console.log(players);
  }, [players]);

  return (
    <Layout title="About">
      <Box
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        alignItems="center"
        minHeight="90vh"
        flexWrap="wrap"
      >
        <div>
          <Box id="mainContainer">
            <Typography variant="h3">View a player</Typography>
            <List>
            {players &&
              players.map((player) => {
                if (player.combatLevel > 0) {
                  return (<ListItem>
                    <Link key={player.id} href={"/player/?id=" + player.id}>
                      <Button className="playerButton" variant="outlined"> {player.combatLevel}  {player.username}</Button>
                    </Link>
                  </ListItem>
                  );
                }
              })}
            </List>
          </Box>
        </div>
      </Box>
    </Layout>
  );
};

export default AccountPage;
