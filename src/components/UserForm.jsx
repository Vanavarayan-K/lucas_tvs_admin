import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createUser, editUser } from "../slices/userslice";
import { useSelector } from "react-redux";
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    contact: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
});

export default function UserForm({ open, handleClose, initialValues }) {
    const dispatch = useDispatch();
    const isEdit = Boolean(initialValues?.id);
    const users = useSelector((state) => state.users.list);
    console.log(users);
    const roleOptions = ["Admin", "Sales", "Clients"]; // Dropdown options

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '14px' }}>{isEdit ? "Edit User" : "Create User"}</DialogTitle>
            <Formik
                initialValues={initialValues || { id: Date.now(), name: "", email: "", contact: "", address: "", role: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (isEdit) dispatch(editUser(values));
                    else dispatch(createUser(values));
                    handleClose();
                }}
            >
                {({ values, handleChange, setFieldValue, errors, touched }) => (
                    <Form>
                        <DialogContent>
                            {Object.keys(values).filter(k => k !== "id").map((field) => (
                                field === "role" ? (
                                    <Autocomplete
                                        key={field}
                                        options={roleOptions}
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
                                ) : (
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
                            <Button sx={{}} onClick={handleClose}>Cancel</Button>
                            <Button variant="standard" sx={{}} type="submit">Save</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}