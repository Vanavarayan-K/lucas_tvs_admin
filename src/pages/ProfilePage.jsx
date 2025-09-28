import React, { useState } from "react";
import { Box, Typography, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function ProfilePage() {
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "123-456-7890",
        address: "123 Main St, Springfield, USA",
        avatar: "J"
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        contact: Yup.string().required("Contact is required"),
        address: Yup.string().required("Address is required"),
    });

    const handleEditOpen = () => {
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
    };

    const handleFormSubmit = (values) => {
        console.log("Updated User Details:", values);
        handleEditClose();
    };

    return (
        <Box sx={{ display: "flex", flexDirection:'row', justifyContent: "center", alignItems: "center", mt:10}}>
            <Card sx={{ width: 500, boxShadow: 3, borderRadius: 2 }}>
                <CardContent >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <Avatar  sx={{ width: 100, height: 100, mr: 3 ,bgcolor: 'deepskyblue',fontSize:32 }}  >{user.avatar}</Avatar>
                        <Box>
                            <Typography variant="h5">{user.name}</Typography>
                            <Typography variant="body1" color="textSecondary">{user.email}</Typography>
                            <Typography variant="body1" color="textSecondary">{user.contact}</Typography>
                            <Typography variant="body1" color="textSecondary">{user.address}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                    <Button variant="contained" sx={{}} onClick={handleEditOpen}>Edit</Button>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{fontWeight:'bold',fontSize:'14px'}}>Edit User Details</DialogTitle>
                <Formik
                    initialValues={{
                        name: user.name,
                        email: user.email,
                        contact: user.contact,
                        address: user.address,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <DialogContent>
                                <Box sx={{ mb: 2 }}>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Name"
                                        fullWidth
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
                                        error={touched.contact && Boolean(errors.contact)}
                                        helperText={touched.contact && errors.contact}
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Field
                                        as={TextField}
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        error={touched.address && Boolean(errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleEditClose} color="">Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">Save</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </Box>
    );
}
