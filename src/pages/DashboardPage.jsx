import { Box, Button } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

export default function DashboardPage({ onLogs }) {
    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <Button sx={{}} variant="contained" onClick={() => { setEditUser(null); setOpen(true); }}>Create User</Button>
                </Box>
                <UserTable onEdit={(user) => { setEditUser(user); setOpen(true); }} />
                <UserForm open={open} handleClose={() => setOpen(false)} initialValues={editUser} />
            </Box>
        </>
    );
}