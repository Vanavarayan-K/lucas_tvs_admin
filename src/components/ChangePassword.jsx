import React from "react";
import { Box, Button, TextField, Typography, Card } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SnackBar from "./SnackBar/SnackBar";
import { userService } from "../_services/users";
export default function ChangePassword() {
    // Formik setup
    const [snackbarTitle, setSnackbarTitle] = React.useState("");
    const [severity, setSeverity] = React.useState("success");
    const [isOpen, setIsOpen] = React.useState(false);

       let  initialValues = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }

    const handlePassword = (values) => {
        userService.changePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        }).then((res) => {
            if (res && res.status === 200) {
                // Handle successful response if needed
            } else {
                setIsOpen(true);
                setSeverity("error");
                setSnackbarTitle(res.data.message || "Failed to change password");
                // Handle error response if needed
            }
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 4
            }}
        >
            <Card sx={{ padding: 4, width: "100%", maxWidth: 400, boxShadow: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                    Change Password
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Enter your current password and a new password to update your credentials.
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ Yup.object({
                        currentPassword: Yup.string().required("Current password is required"),
                        newPassword: Yup.string()
                            .required("New password is required")
                            .min(8, "Password must be at least 8 characters long")
                            .matches(
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                "Password must contain letters, numbers, and special characters"
                            ),
                        confirmPassword: Yup.string()
                            .required("Confirm password is required")
                            .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
                    })}
                    onSubmit={(values)=>{
                        handlePassword(values)
                    }}
                     >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <TextField
                                fullWidth
                                id="currentPassword"
                                name="currentPassword"
                                label="Current Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={values.currentPassword}
                                onChange={handleChange}
                                error={touched.currentPassword && Boolean(errors.currentPassword)}
                                helperText={touched.currentPassword && errors.currentPassword}
                            />
                            <TextField
                                fullWidth
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={values.newPassword}
                                onChange={handleChange}
                                error={touched.newPassword && Boolean(errors.newPassword)}
                                helperText={touched.newPassword && errors.newPassword}
                            />
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2, textTransform: 'none' }}
                            >
                                Change Password
                            </Button>
                        </Form>
                    )}
                </Formik>

            </Card>
            <SnackBar severity={severity} open={isOpen} onClose={() => setIsOpen(false)} snackbarTitle={snackbarTitle} />
        </Box>
    );
}