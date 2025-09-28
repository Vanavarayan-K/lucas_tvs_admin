import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";


const schema = Yup.object({
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
});


export default function ResetPasswordPage({ onBack }) {
    return (
        <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5">Reset Password</Typography>
            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={schema}
                onSubmit={(values) => {
                    alert("Password reset successful!");
                    onBack();
                }}
            >
                {({ values, handleChange, errors, touched }) => (
                    <Form>
                        <TextField name="password" label="New Password" type="password" fullWidth margin="normal" value={values.password} onChange={handleChange} error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password} />
                        <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth margin="normal" value={values.confirmPassword} onChange={handleChange} error={touched.confirmPassword && Boolean(errors.confirmPassword)} helperText={touched.confirmPassword && errors.confirmPassword} />
                        <Button type="submit" variant="contained" fullWidth>Reset Password</Button>
                        <Button fullWidth sx={{ mt: 1 }} onClick={onBack}>Back to Login</Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}