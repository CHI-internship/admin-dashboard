import {
    Box,
    TextField,
    Typography,
    Button,
    CssBaseline,
    Container,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, NavLink } from 'react-router-dom';
import adminService from '../../api/admin.api';

const validationSchema = yup.object({
    email: yup.string('Enter valid admin email').required('Email is required'),
    password: yup.string('Enter password').required('Password is required'),
});

export default function SignIn() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            adminService.login(values)
                .then(() => navigate('/admin/requests'));
        },
    });

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
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        value={formik.values.password}
                        onChange={formik.handleChange}
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
