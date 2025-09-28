import { Button, TextField, Box, Typography,Card, Container } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../slices/authslice";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
});


export default function LoginPage({ onLogin }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 10, p: 3, display: "flex", flexDirection: "column", alignItems: "center",borderRadius:3,boxShadow:3 }}>
                <Box  sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src='  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lNFsQMRmNoyUmcgoqMfGy9QomyZyUmCPJw&s' width={200} alt="Logo" className="logo" />
                    <Typography variant="h5" sx={{fontSize:'20px',fontWeight:'bold',mt:5}}>Login</Typography>
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            dispatch(login({ token: "fake-token", role: "admin" }));
                            onLogin();
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
        </Container>
    );
}