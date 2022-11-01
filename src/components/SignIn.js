import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    CssBaseline,
    Container,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function SingIn() {
    const handleSubmit = async event => {
        event.preventDefault();
        new FormData(event.currentTarget);
    };

    return (
        <Container component="main" maxWidth="xs">
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
            <NavLink to="/admin/forgot-password" variant="body2">
                Forgot password ?
            </NavLink>
        </Container>
    );
}
