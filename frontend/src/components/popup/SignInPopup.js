import React from 'react';
import PopUpDialog from './PopUpDialog';
import { hidePopUp, LoginAsync } from '../../context/auth/authSlice';
import { SignIn, Register } from '../auth/login-register';
import { selectAuth } from '../../context/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';



const SignInPopUp = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(true);
    const [register, setRegister] = React.useState(false);
    const { signInRedirect } = useSelector(selectAuth)

    const handleClose = (value) => {
        setOpen(false);
        dispatch(hidePopUp())
    };

    const handleRegister = (e) => {
        // e.preventDefault()
        setRegister(!register)
    }




    return (




        <PopUpDialog
            open={open}
            onClose={handleClose}
        >
            {register ? <Register Register={handleRegister} /> : <SignIn Register={handleRegister} />
            }                {/* <LoginForm/> */}
        </PopUpDialog>


    )
}

export default SignInPopUp