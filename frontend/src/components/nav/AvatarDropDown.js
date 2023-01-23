import * as React from 'react';
import { logOut } from '../../context/auth/authSlice';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { initiateUserAsync } from '../../context/user/userSlice';




const AvatarDropDown = (props) => {
    const dispatch = useDispatch()
    const { anchorElUser, handleCloseUserMenu } = { ...props }
    const logoutHandler = () => {
        dispatch(logOut());
        dispatch(initiateUserAsync())
    }
    const settings = [{ name: 'Account', action: () => null }, { name: 'Logout', action: logoutHandler }];
    return (
        <>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={() => { handleCloseUserMenu(); setting.action() }}>
                        <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default AvatarDropDown