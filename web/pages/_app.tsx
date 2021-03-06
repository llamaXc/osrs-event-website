import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import "../styles/Inventory.Modules.css"
import "../styles/Level.Modules.css"
import "../styles/Equipment.Modules.css"
import "../styles/Layout.Modules.css"
import "../styles/Quests.Modules.css"
import "../styles/Index.Modules.css"
import "../styles/AccountPage.Modules.css"
import "../styles/MainPanel.Modules.css"
import "../styles/Bank.Modules.css"

export default function MyApp(props) {
    const { Component, pageProps } = props;

    useEffect(() => {
        console.log("Loading app.tsx")
    }, [])

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
