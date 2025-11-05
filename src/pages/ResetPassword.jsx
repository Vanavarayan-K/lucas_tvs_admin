import { Box, Button, TextField, Typography, Card, Container } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/lucasLogo.png'

const schema = Yup.object({
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
});


export default function ResetPasswordPage() {
    const navigate = useNavigate()
    const onBack = (() => {
        navigate('/login')
    })
    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 10, p: 3, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 3, boxShadow: 3 }}>

                <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={Logo} width={200} alt="Logo" className="logo" />
                    <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold', mt: 5 }}>Forgot Password</Typography>
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
                                <Button sx={{ mt: 1 }} type="submit" variant="contained" fullWidth>Reset Password</Button>
                                <Button fullWidth sx={{ mt: 1 }} onClick={onBack}>Back to Login</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Card>
        </Container>
    );
}