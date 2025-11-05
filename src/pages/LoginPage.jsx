import { Button, TextField, Box, Typography,Card, Container } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../slices/authslice";
import { useNavigate } from "react-router-dom";
import { loginService } from "../_services/login";
import Logo from '../assets/lucasLogo.png';
import React, { useState } from "react";
import SnackBar from "../components/SnackBar/SnackBar";
import Cookies from 'universal-cookie'

const schema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
});

const cookies = new Cookies();

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open,setOpen]=useState(false);
    const [snackbarTitle,setSnackbarTitle]=useState("");
    const [severity,setSeverity]=useState("success");


    const onClose=()=>{
        setOpen(false);
    }   
    const handleLogin = async (values) => {
        try {
            await loginService.userLogin(values).then((res) => {
                if (res && res?.status === 200) {
                    dispatch(login({ token: res.data.data.token, role: res.data.data.user,user:res.data.data.userName }));
                    cookies.set("token", res.data.data.token);
                    navigate('/dashboard');
                } else {
                    setSeverity("error");
                    setSnackbarTitle(res.data.message || "Login failed");
                    setOpen(true);
                }
            }).catch((err) => {
                setSeverity("error");
                setSnackbarTitle("Login failed");
                setOpen(true);
                // alert("An error occurred during login. Please try again.");
            });   
        } catch (error) {
            setOpen(true);
            setSeverity("error");
            setSnackbarTitle("An error occurred during login. Please try again.");
        }
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 10, p: 3, display: "flex", flexDirection: "column", alignItems: "center",borderRadius:3,boxShadow:3 }}>
                <Box  sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={Logo} width={200} alt="Logo" className="logo" />
                    <Typography variant="h5" sx={{fontSize:'20px',fontWeight:'bold',mt:5}}>Login</Typography>
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            // dispatch(login({ token: "fake-token", role: "admin" }));
                            // onLogin();
                            handleLogin(values);
                            // dispatch(login({ token: "fake-token", role: "admin" }));
                        }}
                    >
                        {({ values, handleChange, errors, touched }) => (
                            <Form >
                                <TextField name="username" label="Username" fullWidth margin="normal" value={values.username} onChange={handleChange} error={touched.username && Boolean(errors.username)} helperText={touched.username && errors.username} />
                                <TextField name="password" label="Password" type="password" fullWidth margin="normal" value={values.password} onChange={handleChange} error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password} />
                                <Button type="submit" variant="contained" sx={{my:2}} fullWidth>Login</Button>
                                <Button disableTouchRipple disableFocusRipple disableRipple onClick={() => {
                                    navigate('/forgot');
                                }} fullWidth sx={{ mt: 1 }}>Forgot Password?</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>

            </Card>
            <SnackBar open={open} severity={severity} snackbarTitle={snackbarTitle} onClose={onClose} />
        </Container>
    );
}