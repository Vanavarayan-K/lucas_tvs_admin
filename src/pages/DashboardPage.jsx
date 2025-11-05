import { Box, Button, Dialog } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userService } from "../_services/users";
import React from "react";
import SnackBar from "../components/SnackBar/SnackBar";
import SessionExpired from "../components/SessionExpired";
export default function DashboardPage({ onLogs }) {
    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [snackbarTitle, setSnackbarTitle] = useState("");
    const [severity, setSeverity] = useState("success");    
    const [isOpen,setIsOpen] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [pageDetails, setPageDetails] = useState({
        page: 1,
        pageSize: 10,
        search:''
    })

    useEffect(() => {
        getAllUsers();
     }, [pageDetails]);
 
 
 
     const getAllUsers = () => {
         userService.getAllUsers(pageDetails).then((res) => {
             if(res && res.status === 200){
               let data = res?.data?.data?.data.map((user)=>({
                 id:user.userId,
                 name:user.userName,
                 email:user.email,
                 contact:user.mobile,
                 role:user.roleName,
                 portal:user.portalNames,
               }))
               
               setUsers(data);
                 // Handle successful response if needed
             }else if(res.status ===401){
                setSessionExpired(true);
             } else{
                 // Handle error response if needed
                 setSeverity("error");
                 setSnackbarTitle(res.data.message || "Failed to fetch users");
                 setIsOpen(true);
             }
         });
         // This function can be expanded to fetch users from an API if needed
     };

     const handleSubmit = async (values) => {
        let data ={
            email:values.email,
            name:values.name,
            mobile:values.contact,
            address:values.address,
            roleId:[values.role.id],
            portalIds:[values.portal.id],
            password:values?.password,
            "userProfile": {
                "avatar": "default.png",
                "department": "Sales"
              }
        }
        if(editUser){
         await  userService.updateUser(editUser.id, data).then((res)=>{
                if(res && res.status === 200){
                    setOpen(false);
                    setSeverity("success");
                    setSnackbarTitle("User updated successfully");
                    setIsOpen(true);
                    getAllUsers();
                }else{
                    // Handle error response if needed
                    setSeverity("error");
                    setSnackbarTitle(res.data.message || "Failed to update user");
                    setIsOpen(true);
                }
                 
                getAllUsers();
            });
        }else{
         await userService.createUser(data).then((res)=>{
                if( res.status == 200){
                    setOpen(false);
                    setSeverity("success");
                    setSnackbarTitle("User created successfully");
                    setIsOpen(true);  
                    getAllUsers();
                }else{
                    // Handle error response if needed
                    setSeverity("error");
                    setSnackbarTitle(res.data.message || "Failed to create user");
                    setIsOpen(true);
                }
                 
                getAllUsers();
            }
                
            );
        }
     }

     const handleDelete =async () => {
        await userService.deleteUser(deleteUser.id).then((res) => {
            if (res && res.status === 200) {
                setSeverity("success");
                setSnackbarTitle("User deleted successfully");
                setIsOpen(true);
                getAllUsers();
            } else {
                // Handle error response if needed
                setSeverity("error");
                setSnackbarTitle(res.data.message || "Failed to delete user");
                setIsOpen(true);
            }
        });
        setDeleteDialogOpen(false);
    }

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUser, setDeleteUser] = useState(null);

    return (
        <>
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <Button  variant="contained" onClick={() => { setEditUser(null); setOpen(true); }}>Create User</Button>
                </Box>
                <UserTable pageDetails={pageDetails} setPageDetails={setPageDetails} users={users}
                    onDelete={
                    (user) => {
                        setDeleteUser(user);
                        setDeleteDialogOpen(true);
                    }} 
                    onEdit={(user) =>  { 
                        setEditUser(user); 
                        setOpen(true); }} />
                <UserForm handleSubmit={handleSubmit} open={open} handleClose={() => setOpen(false)} initialValues={editUser} />
                <SnackBar severity={severity} open={isOpen} onClose={() => setIsOpen(false)} snackbarTitle={snackbarTitle} />   
                    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                        <Box sx={{ p: 3, minWidth: '300px' }}>
                            <h3>Confirm Delete</h3>
                            <p>Are you sure you want to delete user "{deleteUser?.name}"?</p>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                            </Box>
                        </Box>
                    </Dialog>
                    <SessionExpired open={sessionExpired}  />
            </Box>
        </>
    );
}