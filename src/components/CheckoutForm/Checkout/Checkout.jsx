import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import useStyles from './styles.js';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {

    //setting and retrieving the active step.
    const [activeStep, setActiveStep] = useState(0);

    //store shipping data ie the data from the address form
    const [shippingData, setShippingData] = useState({});

    //setting the checkoutToken state.
    const [checkoutToken, setCheckoutToken] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                console.log("There was an error generating the token!!", error);
            }
        }
        generateToken();
    }, [cart]);


    const nextStep = () => {
        setActiveStep((previousActiveStep) => previousActiveStep + 1);
    }

    const backStep = () => {
        setActiveStep((backingStep) => backingStep - 1);
    }

    const next = (data) => {
        //set shipping data to data retrieved from adress form.
        setShippingData(data);

        nextStep();
    }

   

    const Form  = () => activeStep == 0 
        ? <AddressForm token={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} />

    
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
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
       
            </main>
        </>
    );
};

export default Checkout;