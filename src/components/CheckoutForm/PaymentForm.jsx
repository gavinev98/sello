import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { NextWeekSharp } from '@material-ui/icons';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ shippingData, checkoutToken, backStep, handleCaptureCheckout, nextStep }) => {

    const handleSubmit = (event, elements, stripe) => {
        //this is to prevent the website from re loading.
        event.preventDefault();
        
        //quick error checking to see if there is no stripe or no elements.
        if(!stripe || !elements) return;

        //storing everything inside of card element
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card : cardElement});

        if(error) {
            console.log(error);
        } else {
            //final object to contain all of the data eg everythign inside of our cart.
            const orderData = {
                list_items : checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
                shipping: { name: 'Primary',
                 street: shippingData.address1,
                 town_city: shippingData.city,
                 county_state: shippingData.shippingSubdivision,
                 postal_zip_code: shippingData.zip,
                 country: shippingData.shippingCountry
                 },
                 fulfillment: { shipping_method: shippingData.shippingOption },
                 payment : {
                     gateway: 'stripe',
                     stripe: {
                         payment_method_id: paymentMethod.id
                     }
                 }
            }
            //executing the checkout.
            handleCaptureCheckout(checkoutToken.id, orderData);

            //set the next step so we get confirmation.
            nextStep();

        }

    }


    return (
        <>
         <Review checkoutToken={checkoutToken} />
         <Divider />
         <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment Method</Typography>

         <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({elements, stripe}) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                       <CardElement />
                       <br /> <br />
                       <div style={{display: 'flex', justifyContent: 'space-between'}}>
                           <Button variant="outlined" onClick={backStep}>Back</Button>
                           <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                               Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                               </Button>
                       </div>
                    </form>
                )}
            </ElementsConsumer>
         </Elements>
        </>
    );
};

export default PaymentForm;