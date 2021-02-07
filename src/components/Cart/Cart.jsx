import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';


const Cart = ({ cart }) => {
    //import styles
    const classes = useStyles();
      
    //check if shopping cart is empty.
    const isEmpty = !cart.line_items.length;


    
    //a component to display if the cart is currently empty.
    const EmptyCart = () => {
        <Typography variant="subtitle1">You have no items in your shopping cart !</Typography>
    }

    //a component to display is the cart is filled.
    const FilledCart = () => {
        	<>
            <Grid container spacing={3}>
            {cart.line_items.map(lineItem => (
            <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem />
            </Grid>
            ))}
            </Grid>
         </>
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