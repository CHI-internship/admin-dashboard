import React, { useState } from 'react';
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
import { Navigate } from 'react-router-dom';
import { passwordValidation } from '../utils/inputValidation.js';

export default function ChangePassword() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [unequalPass, setUnequalPass] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        setInvalidPass(false);
        setUnequalPass(false);
        const data = new FormData(event.currentTarget);
        const newPassword = data.get('new-password');
        const confirmPassword = data.get('confirm-password');

        if (!passwordValidation(newPassword)) setInvalidPass(true);
        else if (newPassword !== confirmPassword) setUnequalPass(true);
        else {
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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={invalidPass}
                        helperText={
                            invalidPass
                                ? 'Password must be at least 8 characters length, include at least one uppercase letter, one lowercase letter and one number'
                                : ''
                        }
                        id="new-password"
                        label="New Password"
                        name="new-password"
                        type="password"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={unequalPass}
                        helperText={
                            unequalPass ? 'Passwords must be equal' : ''
                        }
                        id="confirm-password"
                        label="Confirm Password"
                        name="confirm-password"
                        type="password"
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
