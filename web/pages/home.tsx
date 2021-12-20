import { Box } from "@material-ui/core";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import { usePlayerStore } from "../store/player";
import { Inventory } from "../components/Inventory";
import { MainPanel } from "../components/MainPanel";

const LandingPage = () => {
    const username = usePlayerStore((state) => state.username);
    const combatLevel = usePlayerStore((state) => state.combatLevel);
    const authenticated = usePlayerStore((state) => state.authenticated);
    const logoutAction = usePlayerStore((state) => state.logout);

    return (
        <Layout title='Landing'>
            <MainPanel/>
        </Layout>
    );
};

export default LandingPage;
