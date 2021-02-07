import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';



const Cart = () => {
    //check if shopping cart is empty.
    const isEmpty = true;  
    
    

    //a component to display if the cart is currently empty.
    const EmptyCart = () => {
        <Typography variant="subtitle1">You have no items in your shopping cart !</Typography>
    }

    //a component to display is the cart is filled.
    const FilledCart = () => {

    }

    return (
            <Container>
                <div className={classes.toolbar} />

                <Typography className={classes.title} variant="h3" >Your Shopping Cart!</Typography>
                {isEmpty ? <EmptyCart /> : <FilledCart />}
            </Container>
    );
};

export default Cart;