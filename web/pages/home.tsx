import { Box } from "@material-ui/core";
import { Button } from "@mui/material";
import { FloatingUserBox } from "../components/FloatingUserBox";
import Layout from "../components/Layout";
import { usePlayerStore } from "../store/player";

const LandingPage = () => {
    const username = usePlayerStore((state) => state.username);
    const combatLevel = usePlayerStore((state) => state.combatLevel);
    const authenticated = usePlayerStore((state) => state.authenticated);
    const logoutAction = usePlayerStore((state) => state.logout);

    return (
        <Layout title='Landing'>
            <FloatingUserBox />
        </Layout>
    );
};

export default LandingPage;
