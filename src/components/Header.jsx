import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../slices/authslice";

export default function Header() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
        setAnchorEl(null);
    };

    const handleLogoutConfirm = () => {
        setLogoutDialogOpen(false);
        logoutUser(dispatch); // Use the reusable logout function
        navigate("/login");
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };

    const handleProfileRedirect = () => {
        navigate("/profile");
        handleMenuClose();
    };

    const handleEditUserDetails = () => {
        navigate("/edit-user");
        handleMenuClose();
    };

    const handleChangePassword = () => {
        navigate("/change-password");
        handleMenuClose();
    };

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Lucas TVS
                    </Typography>
                    <Box>
                        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: "" }}>
                                {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={handleProfileRedirect}>Profile</MenuItem>
                            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                            <MenuItem onClick={handleLogoutClick}>
                                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={logoutDialogOpen}
                onClose={handleLogoutCancel}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}