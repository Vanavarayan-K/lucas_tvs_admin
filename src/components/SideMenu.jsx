import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: "Users", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Roles", icon: <SecurityIcon />, path: "/roles" },
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
                        sx={{
                            cursor: 'pointer',
                            backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                        }}
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