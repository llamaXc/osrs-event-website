import { Box } from "@material-ui/core";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import { usePlayerStore } from "../store/player";

const AccountPage = () => {
    const username = usePlayerStore((state) => state.username);
    const combatLevel = usePlayerStore((state) => state.combatLevel);
    const authenticated = usePlayerStore((state) => state.authenticated);
    const logoutAction = usePlayerStore((state) => state.logout);
    return (
        <Layout title='About'>
            <Box
                display='flex'
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
                minHeight='90vh'
                flexWrap='wrap'
            >
                <h1>About</h1>
                {authenticated && (
                    <div>
                        <p>
                            Current player: {username} lvl: {combatLevel}
                        </p>
                        <Button
                            variant='outlined'
                            onClick={() => logoutAction()}
                        >
                            Logout
                        </Button>
                    </div>
                )}

                {!authenticated && (
                    <p>
                        No player found, go to the home page and{" "}
                        <a href='home'>login!</a>
                    </p>
                )}
            </Box>
        </Layout>
    );
};

export default AccountPage;
