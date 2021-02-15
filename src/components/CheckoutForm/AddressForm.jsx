import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';


const AddressForm = ( { token }) => {
    //states for settting the shipping country.
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');

    //states for setting the shipping sub divisions.
    const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [shippingSubDivision, setShippingSubDivision] = useState('');

    //states for setting the shipping options.
    const [ shippingOptions, setShippingOptions] = useState([]);
    const [ shippingOption, setShippingOption] = useState('');

    //importing methods from useForm()
    const methods = useForm();

    //fetching the shipping countries via checkoutTokenId. Acts like a recipt.
    const fetchShippingCountries = async (checkoutTokenId) => {

       const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        //updating the state of the shipping countries.
       setShippingCountries(countries);
       //changing the countries to string so we can loop over array.
       //this will bring back the keys eg ['AL', 'VE', 'IE', 'SK'] etc.
       setShippingCountry(Object.keys(countries)[0]);
      
    }

    useEffect(() => {
        //fetch shipping countries onload and pass generated id.
        fetchShippingCountries(token.id);
    }, []);


    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                <Grid container spacing={3}>
                    <FormInput required name='firstName' label='First Name' />
                    <FormInput required name='lastName' label='Last Name' />
                    <FormInput required name='address1' label='Address' />
                    <FormInput required name='email' label='Email' />
                    <FormInput required name='city' label='City' />
                    <FormInput required name='eircode' label='Eircode' />
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                        <MenuItem key={} value={}>
                            Select Me
                        </MenuItem>
                        </Select>
                    </Grid>
                  {/*  <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                            Select Me
                        </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                            Select Me
                        </MenuItem>
                        </Select>
                    </Grid> */}
                </Grid>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;