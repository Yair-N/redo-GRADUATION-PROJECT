import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";

import { anonPages, adminPages, customerPages, airlinePages } from '../utils/constants';

import NavContainer from '../components/nav/NavContainer';
import Logo from '../components/logo/Logo';
import AvatarDropDown from '../components/nav/AvatarDropDown'

import { showPopUp, selectAuth, LoginAsync } from '../context/auth/authSlice';
import { selectUser, getUserAsync, initUser } from '../context/user/userSlice';
import SignInPopUp from '../components/popup/SignInPopup';

const Navigation = () => {

    const dispatch = useDispatch()
    const { avatar, role, username, id } = useSelector(selectUser)
    const { PopupState, authenticated, signInRedirect } = useSelector(selectAuth)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [pages, setPages] = React.useState([])
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const defPages = () => {
        let page = (<></>)
        switch (role) {
            case 1:
                setPages(anonPages)
                break;
            case 2:
                setPages(customerPages)
                break;
            case 3:
                setPages(airlinePages)
                break;
            case 4:
                setPages(adminPages)
                break;
        }

    }


    useEffect(() => {
        if (authenticated)
            dispatch(getUserAsync());
    }, [authenticated, avatar])

    useEffect(() => {
        defPages()
    } // eslint-disable-next-line
        , [role])

    useEffect(() => {
        if (signInRedirect) {
            dispatch(LoginAsync())
        }
    }, [PopupState])

    return (

        <>
            <NavContainer xs={12} minWidth={'600px'}  >
                <Link to="/">
                    <Logo />
                </Link>

                {/* small or mobile - hamburger */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    {/*hamburger */}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="primary"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem
                                key={page.name} onClick={() => { navigate(page.to); handleCloseNavMenu() }} >

                                <Typography color='primary' textAlign="center">{page.name}</Typography>

                            </MenuItem>

                        ))}
                    </Menu>
                </Box>

                {/* full size */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button sx={{ color: 'primary' }}

                            key={page.name}
                            onClick={() => { navigate(page.to); handleCloseNavMenu() }}
                        // sx={{ my: 2, color: 'primary', display: 'block' }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </Box>
                {/* Avatar + profile menu */}

                <Box sx={{ flexGrow: 0 }}>

                    {authenticated ?
                        (<Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={username.toUpperCase()} src={avatar} />
                            </IconButton>
                        </Tooltip>) :

                        <Button sx={{ my: 2, color: 'primary', display: 'block' }} onClick={() => dispatch(showPopUp())}>Sign In</Button>}

                    <AvatarDropDown
                        anchorElUser={anchorElUser}
                        handleCloseUserMenu={handleCloseUserMenu}
                    />
                </Box>

            </NavContainer >
            {PopupState && <SignInPopUp />}
            <Outlet />
            {/* <StickyFooter /> */}
        </>
    )
}

export default Navigation