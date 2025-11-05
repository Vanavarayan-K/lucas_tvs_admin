import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SideMenu() {
    const navigate = useNavigate();
    const userRole = useSelector((state) => state.auth.user?.role || "Guest"); // Replace with actual role from Redux

    const menuItems = [
        { text: "Users", icon: <DashboardIcon />, path: "/dashboard" },
        // { text: "Logs", icon: <ListAltIcon />, path: "/logs" }
    ];

    return (
        <Drawer variant="permanent" anchor="left" sx={{
            width: 240, // Adjust width as needed
            flexShrink: 0,
            "& .MuiDrawer-paper": {
                width: 240, // Ensure the drawer paper matches the width
                boxSizing: "border-box",
                top: 64, // Adjust this value to match your header height
            },
        }}>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        sx={{cursor:'pointer'}}
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}