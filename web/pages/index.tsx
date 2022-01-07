import { Box, Button, Typography } from "@mui/material";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout title="Home">
      <Box
        display="flex"
        flexDirection="column"
        minWidth="100vw"
        alignItems="center"
        justifyContent="center"
        alignContent="center"
        textAlign="center"
        m="10"
      >
          <Box id="homepageMainBanner" maxWidth={"80vw"}>
            <Typography  variant="h1" component="h2">
            Osrs Social
            </Typography>
            <Typography>View in game Old School RuneScape data. See your latest inventory, equipped armour, levels, quest states, npc kills, and bank tab.</Typography>
        </Box>
        <Box>
            <Button className="mainButton" variant="outlined" href="https://github.com/llamaXc/osrs-event-website" >View Source Code</Button>
            <Button className="mainButton" variant="outlined" href="account">View Players</Button>
            <Button className="mainButton" variant="outlined">Register Account</Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default IndexPage;
