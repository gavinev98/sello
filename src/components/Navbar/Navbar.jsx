import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Icon} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { FiberPin } from '@material-ui/icons';
import logo from '../../assets/commerce.png';

import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';

const Navbar = ({ totalItems }) => {

    //importing stylings
    const classes = useStyles();

    //finding the current location
    const location = useLocation();
 

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit" >
                <Toolbar>
                    <Link to="/"/>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Sello"  height="25px" className={classes.image}/>
                        sello
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname == '/' && (
                    <div className={classes.button}>
                        <Link to="/cart"   />
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary" >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;