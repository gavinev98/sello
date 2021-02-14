import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import useStyles from './styles.js';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart }) => {

    //setting and retrieving the active step.
    const [activeStep, setActiveStep] = useState(0);

    //setting the checkoutToken state.
    const [checkoutToken, setCheckoutToken] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = commerce.checkout.generateToken(cart.id, { type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {

            }
        }
    }, []);

    const Form  = () => activeStep == 0 
        ? <AddressForm />
        : <PaymentForm />

    
    //confirmation function.
    const Confirmation = () => (
        <div>
            Confirmation
        </div>

    );

    return (
        <>
          <div className={classes.toolbar}  />
            <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
                <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                </Step>
            ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
       
            </main>
        </>
    );
};

export default Checkout;