import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { registerAsync, setCredentials, selectAuth, LoginAsync } from '../../context/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';


const defaultFormFields = {

    email: '',
    password: '',
    userName: '',
};

export const Register = ({ Register }) => {

    const handelRegister = () => {
        Register()
    }

    const dispatch = useDispatch()
    const { registered } = useSelector(selectAuth)
    const [formFields, setFormFields] = React.useState(defaultFormFields)

    const restFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handelChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setCredentials(formFields))
        dispatch(registerAsync())
        Register()
    };




    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        type={'email'}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address (will be case sensitive)"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handelChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User name"
                        name="userName"
                        // autoComplete="text"

                        onChange={handelChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handelChange}

                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create account
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                        </Grid>
                        <Grid item>
                            <Link onClick={handelRegister} variant="body2">
                                {"Already have an account?"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
    );
}




export const SignIn = ({ Register }) => {

    const defaultFormFields = {

        email: '',
        password: '',

    };

    const dispatch = useDispatch()

    const [formFields, setFormFields] = React.useState(defaultFormFields)

    const restFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handelChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }


    const handelRegister = () => {
        Register()
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setCredentials(formFields))
        try {
            dispatch(LoginAsync())
            // restFormFields()
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password')
                    break;
                case 'auth/user-not-found':
                    alert('No user associated this email')
                    break;
                default:
            }

        }

    };




    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        type="email"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handelChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handelChange}

                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={handelRegister} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}