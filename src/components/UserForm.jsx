import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createUser, editUser } from "../slices/userslice";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { userService } from "../_services/users";
import SnackBar from "./SnackBar/SnackBar";

export default function UserForm({ open, handleClose, initialValues,handleSubmit }) {
    const dispatch = useDispatch();
    const [userRoles, setUserRoles] = React.useState(["Admin", "Sales", "Clients"]);
    const [portal, setPortal] = React.useState(["QIS Portal", "Client Portal"]);
    const [snackbarTitle, setSnackbarTitle] = React.useState("");
    const [severity, setSeverity] = React.useState("success");
    const [isOpen, setIsOpen] = React.useState(false);
    const isEdit = Boolean(initialValues?.id);
    const users = useSelector((state) => state.users.list);
    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        contact: Yup.string().required("Required"),
        password:initialValues?Yup.string().nullable():  Yup.string().required("Required"),
        role: Yup.object().required("Required"),
        portal: Yup.object().required("Required"),
    });

    useEffect(() => {
        // Any side effects if needed when initialValues change
        getUserRoles();
        getAllPortal()
    }, []);

     const getAllPortal = () => {
            userService.getPortalData().then((res) => {
                if(res && res.status === 200){
                    setPortal(res.data.data);
                  // Handle successful response if needed
                }else{
                    // Handle error response if needed
                    setSeverity("error");
                    setSnackbarTitle(res.data.message || "Failed to fetch portal data");
                    setIsOpen(true);
                }
            });
        }
    const getUserRoles = () => {
        // Fetch user roles from API or define them here
            userService.getUserRoles().then((res) => {
                if(res && res.status === 200){
                  // Handle successful response if needed
                  setUserRoles(res.data.data);
                }else{
                    // Handle error response if needed
                    setSeverity("error");
                    setSnackbarTitle(res.data.message || "Failed to fetch user roles");
                    setIsOpen(true);
                }
            }
        );
    };
   initialValues  = initialValues ? {
       ...initialValues,
        portal: portal.find((p) => p.name === initialValues.portal),
        role: userRoles.find((role) => role.name === initialValues.role) || null,
    } : null;
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '14px' }}>{isEdit ? "Edit User" : "Create User"}</DialogTitle>
            <Formik
                initialValues={initialValues || {  id: Date.now(), name: "", email: "", contact: "", password: "", role: "",portal:portal[0]}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
            >
                {({ values, handleChange, setFieldValue, errors, touched }) => (
                    <Form>
                        <DialogContent>
                            
                            {Object.keys(values).filter(k => k !== "id").map((field) => (
                                field === "role"  ? (
                                    <Autocomplete
                                        key={field}
                                        options={userRoles}
                                        getOptionLabel={(option) => option.name || ''}
                                        value={values[field]}
                                        onChange={(event, newValue) => setFieldValue(field, newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                margin="dense"
                                                name={field}
                                                label="Role"
                                                fullWidth
                                                error={touched[field] && Boolean(errors[field])}
                                                helperText={touched[field] && errors[field]}
                                            />
                                        )}
                                    />
                                ) : field === 'portal' ?
                                
                                    <Autocomplete
                                        key={field}
                                        options={portal}
                                        value={values[field]}
                                        getOptionLabel={(option) => option.name || ''}
                                        onChange={(event, newValue) => setFieldValue(field, newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                margin="dense"
                                                name={field}
                                                label="Portal"
                                                fullWidth
                                                error={touched[field] && Boolean(errors[field])}
                                                helperText={touched[field] && errors[field]}
                                            />
                                        )}
                                    />
                                 : (
                                    <TextField
                                        key={field}
                                        margin="dense"
                                        name={field}
                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                        fullWidth
                                        value={values[field]}
                                        onChange={handleChange}
                                        error={touched[field] && Boolean(errors[field])}
                                        helperText={touched[field] && errors[field]}
                                    />
                                )
                            ))}
                        </DialogContent>
                        <DialogActions>
                            <Button color="" sx={{}} onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" color="primary" type="submit">Save</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
            <SnackBar open={isOpen} severity={severity} snackbarTitle={snackbarTitle} onClose={() => setIsOpen(false)} />
        </Dialog>
    );
}