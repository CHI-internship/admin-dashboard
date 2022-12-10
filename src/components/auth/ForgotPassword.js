import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object({
    recEmail: yup
        .string('Enter valid admin email to recover')
        .required('Email is required'),
});

export default function ForgotPassword() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const timer = useRef(null);

    useEffect(() => {
        return () => clearTimeout(timer.current);
    }, []);

    const formik = useFormik({
        initialValues: {
            recEmail: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            console.log(values.recEmail);

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
                    Check your email for further action!
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
                    Recover password
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        id="recEmail"
                        label="Email Address"
                        name="recEmail"
                        error={
                            formik.touched.recEmail &&
                            Boolean(formik.errors.recEmail)
                        }
                        helperText={
                            formik.touched.recEmail && formik.errors.recEmail
                        }
                        value={formik.values.recEmail}
                        onChange={formik.handleChange}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Recover
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
