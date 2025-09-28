import React from "react";
import { Box, Button, TextField, Typography, Card } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ChangePassword() {
    // Formik setup
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: (values) => {
            console.log("Change password request:", values);
            // Add your change password logic here
        },
    });

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt:4
            }}
        >
            <Card sx={{ padding: 4, width: "100%", maxWidth: 400, boxShadow: 3 }}>
                <Typography variant="h6" sx={{fontWeight:'bold'}} gutterBottom>
                    Change Password
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Enter your current password and a new password to update your credentials.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="currentPassword"
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                        helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                    />
                    <TextField
                        fullWidth
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                </form>
            </Card>
        </Box>
    );
}