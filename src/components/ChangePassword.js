import {
    Box,
    TextField,
    Typography,
    Button,
    CssBaseline,
    Container,
    Alert,
    AlertTitle,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

const validationSchema = yup.object({
    newPassword: yup
        .string('Enter new password')
        .required('Password is required')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            'Password must contain at least 8 Characters, One Uppercase, One Lowercase and One Number'
        ),
    confirmPassword: yup
        .string('Confirm password')
        .required('Password is required')
        .oneOf([yup.ref('newPassword')], 'Passwords don`t match'),
});

export default function ChangePassword() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const timer = useRef(null);

    useEffect(() => {
        return () => clearTimeout(timer.current);
    }, []);

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            console.log({
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            });

            setSuccessAlert(true);
            timer.current = setTimeout(() => {
                setShouldRedirect(true);
            }, 3000);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            {shouldRedirect && <Navigate replace to="/admin/sign-in" />}
            {successAlert ? (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Your password has been updated!
                    <p>
                        <strong>Redirecting to Sing In page...</strong>
                    </p>
                </Alert>
            ) : (
                <></>
            )}
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        error={
                            formik.touched.newPassword &&
                            Boolean(formik.errors.newPassword)
                        }
                        helperText={
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                        }
                        id="newPassword"
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        }
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
