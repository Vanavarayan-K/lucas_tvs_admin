import { Box, Button, Container, TextField, Typography, Card } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
});


export default function ForgotPasswordPage({ onBack }) {
    const navigate = useNavigate();
    return (

        <Container maxWidth="sm">
            <Card sx={{ mt: 10, p: 3, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 3, boxShadow: 3 }}>

                <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src='  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lNFsQMRmNoyUmcgoqMfGy9QomyZyUmCPJw&s' width={200} alt="Logo" className="logo" />
                    <Typography variant="h5" sx={{fontSize:'20px',fontWeight:'bold',mt:5}}>Forgot Password</Typography>

                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            alert(`Password reset link sent to ${values.email}`);
                            onBack();
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
        </Container>
    );
}