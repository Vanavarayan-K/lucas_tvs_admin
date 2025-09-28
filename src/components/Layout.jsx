import React from "react";
import { Box, Toolbar } from "@mui/material";
import SideMenu from "./SideMenu";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <Box sx={{ display: "flex" }}>
            <Header />
            <SideMenu />
            <Box component="main" sx={{ flexGrow: 2, pl:2}}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}