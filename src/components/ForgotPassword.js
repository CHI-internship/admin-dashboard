import React, { useState } from 'react';
import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    AlertTitle,
} from '@mui/material';
import { Navigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('rec-email');

        if (email) {
            setSuccessAlert(true);
            setTimeout(() => {
                setShouldRedirect(true);
            }, 3000);
        }
    };

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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="rec-email"
                        label="Email Address"
                        name="rec-email"
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
