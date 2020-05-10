import React from 'react';
import styles from './Navbar.module.css'
import {AppBar, Toolbar, Typography} from '@material-ui/core';

function Navbar() {
    return(
        <AppBar className={styles.container} position="static">
            <Toolbar className={styles.toolbar}>
                <Typography className={styles.header}>
                    COVID-19 Tracker
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;