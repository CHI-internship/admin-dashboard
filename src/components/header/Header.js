import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../../images/Logo.svg';

import './style.css';

const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar className={'toolbar'}>
                <div className={'logo'}>
                    <img src={logo} alt="logo" />
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                        KraudDonate
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
