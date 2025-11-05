import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { userService } from "../_services/users";
import SessionExpired from "../components/SessionExpired";
import SnackBar from "../components/SnackBar/SnackBar";
export default function ProfilePage() {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [profileDetails,setProfileDetails] = useState({});
    const [sessionExpired, setSessionExpired] = useState(false);
    const [snackbarTitle, setSnackbarTitle] = useState("");
    const [severity, setSeverity] = useState("success");    
    const [isOpen,setIsOpen] = useState(false);

    const onClose=()=>{
        setIsOpen(false);
    }
    useEffect(() => {   
        // Fetch profile details from API if needed
        getProfileDetails();
        }, []);

        const getProfileDetails = () => {
            // Simulate API call
            userService.getProfileInfo().then((res) => {
                if(res && res.status === 200){
                    let data = res.data.data;
                    setProfileDetails({
                        name: data.userName,
                        email: data.email,
                        contact: data.mobile,
                        roleId: data.roleId,
                        portalIds: data.portalIds,
                        id: data.userId,
                    });
                }if(res.status ===401){
                    // Handle session expiration if needed
                    setSessionExpired(true);
                }
                else{
                    // Handle error response if needed
                }
            });
        };  
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        contact: Yup.string().required("Contact is required"),
    });
    const handleEditOpen = () => {
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
    };

    const handleFormSubmit = (values) => {
        userService.updateProfile({
            name: values.name,
            email: values.email,
            mobile: values.contact
        }).then((res) => {
            if(res && res.status === 200){
                getProfileDetails();
                setEditDialogOpen(false);
                setSeverity("success");
                setSnackbarTitle("Profile updated successfully");
                setIsOpen(true);
                  // Handle successful response if needed
                }else if(res.status ===401){
                    // Handle session expiration if needed
                    setSessionExpired(true);
                } else{
                    setSeverity("error");
                    setSnackbarTitle(res.data.message || "Failed to update profile");
                    setIsOpen(true);

                    // Handle error response if needed  
            } 
                // Handle successful update if needed
        });
    };

    return (
        <Box sx={{ display: "flex", flexDirection:'row', justifyContent: "center", alignItems: "center", mt:10}}>
            <Card sx={{ width: 500, boxShadow: 3, borderRadius: 2 }}>
                <CardContent >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <Avatar  sx={{ width: 100, height: 100, mr: 3 ,bgcolor: 'deepskyblue',fontSize:32 }}  >{profileDetails.avatar}</Avatar>
                        <Box>
                            <Typography variant="h5">{profileDetails.name}</Typography>
                            <Typography variant="body1" color="textSecondary">{profileDetails.email}</Typography>
                            <Typography variant="body1" color="textSecondary">{profileDetails.contact}</Typography>
                            <Typography variant="body1" color="textSecondary">{profileDetails.address}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                    <Button variant="contained"  onClick={handleEditOpen}>Edit</Button>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{fontWeight:'bold',fontSize:'14px'}}>Edit User Details</DialogTitle>
                <Formik
                    initialValues={{
                        name: profileDetails.name,
                        email: profileDetails.email,
                        contact: profileDetails.contact
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values)=>{
                        handleFormSubmit(values)
                    }}
                >
                    {({ errors, touched,values,handleChange,isSubmitting }) => (
                        <Form>
                            <DialogContent>
                                <Box sx={{ mb: 2 }}>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        value={values.name}
                                        onChange={handleChange}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        value={values.email}
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Field
                                        as={TextField}
                                        name="contact"
                                        label="Contact"
                                        fullWidth
                                        onChange={handleChange}
                                        value={values.contact}
                                        error={touched.contact && Boolean(errors.contact)}
                                        helperText={touched.contact && errors.contact}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleEditClose} color="">Cancel</Button>
                                <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">Save</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
            <SnackBar open={isOpen} severity={severity} snackbarTitle={snackbarTitle} onClose={onClose} />
            <SessionExpired open={sessionExpired} />
        </Box>
    );
}
