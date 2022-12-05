import cn from 'classnames'
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import logo from '../../images/Logo.svg';
import style from './Header.module.scss';
import logoutIcon from '../../images/logout.icon.svg'
import { RequestContext } from '../../context/request.context';

const Header = () => {
    const { requests } = useContext(RequestContext)
    const [authorized, setAuthorized] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/admin/sign-in')
    }

    useEffect(() => { if (localStorage.getItem('token')) setAuthorized(true) }, [])

    return (
        <AppBar position="static" color="primary">
            <Toolbar className={style.toolbar}>
                <div className={style.logo}>
                    <img src={logo} alt="logo" />
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                        KraudDonate
                    </Typography>
                </div>
                <div className={style.menu}>
                    {authorized ?
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <NavLink to="/admin/request" className={({ isActive }) =>
                                cn(style.menuItem, { [style.activeLink]: isActive })}>
                                Open requests ({requests.length})
                            </NavLink>
                            <NavLink to="/close-request" className={({ isActive }) =>
                                cn(style.menuItem, { [style.activeLink]: isActive })}>
                                Closed requests
                            </NavLink>
                            <Button onClick={logout} sx={{ padding: '0', margin: '0 -10px' }}>
                                <img src={logoutIcon} className={style.logoutIcon} />
                            </Button>
                        </div>
                        :
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate('/admin/sign-in')}
                            sx={{ color: '#fff', textTransform: 'capitalize' }}
                        >
                            Sing in
                        </Button>
                    }
                </div>
            </Toolbar>
        </AppBar >
    );
};

export default Header;
