import { Box, Button, Container, TextField, Typography, Card } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Logo from '../assets/lucasLogo.png'
import { loginService } from "../_services/login";
import SnackBar from "../components/SnackBar/SnackBar";
import { useState } from "react";

const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
});


export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [open,setOpen] = useState(false)
    const [snackBarTitle,setSnackBarTitle] = useState('')
    const [severity,setSeverity] = useState('')
    const handleForgotPassword = ((values) => {
        loginService.forgotPassword({ email: values.email }).then((res) => {
            if (res.status === 200) {
                setSeverity('success')
                setOpen(true)
                setSnackBarTitle('Reset password using link sent to an email')
                navigate('/login')
            }else{
                setSeverity('error')
                setOpen(true)
                setSnackBarTitle(res.data.message)
            }
        })
    })
    return (

        <Container maxWidth="sm">
            <Card sx={{ mt: 10, p: 3, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 3, boxShadow: 3 }}>

                <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={Logo} width={200} alt="Logo" className="logo" />
                    <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold', mt: 5 }}>Forgot Password</Typography>

                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            handleForgotPassword(values)
                        }}
                    >
                        {({ values, handleChange, errors, touched }) => (
                            <Form>
                                <TextField name="email" label="Email" fullWidth margin="normal" value={values.email} onChange={handleChange} error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
                                <Button type="submit" variant="contained" sx={{ my: 2, textTransform: 'none' }} fullWidth >Send Reset Link</Button>
                                <Button fullWidth sx={{ mt: 1, textTransform: 'none' }} onClick={() => {
                                    navigate('/login');
                                }}>Back to Login</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Card>
            <SnackBar severity={severity} open={open} onClose={() => setOpen(false)} snackbarTitle={snackBarTitle} />
        </Container>
    );
}