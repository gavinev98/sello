import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import useStyles from './styles.js';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = () => {

    //setting and retrieving the active step.
    const [activeStep, setActiveStep] = useState(0);

    const classes = useStyles();

    const form  = () => activeStep == 0 
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


        </Paper>
            </main>
            {activeStep === steps.length ? <Confirmation /> : <Form />}
        </>
    );
};

export default Checkout;