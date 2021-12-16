import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { usePlayerStore } from "../store/player";

export function FloatingUserBox() {
    const username = usePlayerStore((state) => state.username);
    const combatLevel = usePlayerStore((state) => state.combatLevel);
    const authenticated = usePlayerStore((state) => state.authenticated);

    const authenticatePlayerAction = usePlayerStore(
        (state) => state.authenticate
    );
    const loadPlayer = usePlayerStore((state) => state.fetch);

    const getPlayerOrWelcomeString = () => {
        if (combatLevel > 0) {
            return username + " " + combatLevel;
        }
    };

    const getSecretApiText = () => {
        if (authenticated) {
            return <p>Secret API Key: XYZKKJ#JK#JJ@</p>;
        }
    };

    useEffect(() => {
        //Load on compoment load!
        loadPlayer("IRON 69M");
    }, []);

    return (
        <Box
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            minHeight='90vh'
            flexWrap='wrap'
        >
            <Typography variant='h5' marginBottom={"10px"}>
                {getPlayerOrWelcomeString()}
            </Typography>

            {/* Show if username is not populated yet */}
            {!authenticated && (
                <Button
                    onClick={() => authenticatePlayerAction()}
                    variant='contained'
                >
                    Login
                </Button>
            )}

            {getSecretApiText()}
        </Box>
    );
}
