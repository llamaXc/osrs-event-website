import { Box, Button, Link, Typography } from "@mui/material";

interface IFloatingBoxProps {
    title: string;
    buttonText: string;
    url: string;
}

export function FloatingBox(props: IFloatingBoxProps) {
    return (
        <Box
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            minHeight='90vh'
            flexWrap='wrap'
        >
            <Typography variant='h3' marginBottom={"10px"}>
                {props.title}
            </Typography>
            <Button href={props.url} variant='contained'>
                {props.buttonText}
            </Button>
        </Box>
    );
}
