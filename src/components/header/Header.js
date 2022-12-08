import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import cn from 'classnames'
import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import style from './Header.module.scss';
import { RequestContext } from '../../context/request.context';
import logo from '../../images/Logo.svg';
import logoutIcon from '../../images/logout.icon.svg'

const Header = () => {
    const { requests, authorized, setAuthorized } = useContext(RequestContext)
    const navigate = useNavigate()

    const logout = () => {
        setAuthorized(false)
        localStorage.removeItem('token')
        navigate('/admin/sign-in')
    }

    useEffect(() => {
        if (localStorage.getItem('token')) setAuthorized(true)
    }, [])

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
