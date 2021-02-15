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

    //looping over the countries object to create and array of arrays.
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id : code, label: name}));


    
    //fetching the shipping countries via checkoutTokenId. Acts like a recipt.
    const fetchShippingCountries = async (checkoutTokenId) => {

       const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        //updating the state of the shipping countries.
        console.log("countries" + countries);
       setShippingCountries(countries);
       //changing the countries to string so we can loop over array.
       //this will bring back the keys eg ['AL', 'VE', 'IE', 'SK'] etc.
       setShippingCountry(Object.keys(countries)[0]);
      
    }

    //fething the shipping subdivisions for each country.
    const fetchSubdivisions = async  (countryCode) => {

        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        //setting the shipping subdivisions based off of country selected.
        setShippingSubDivisions(subdivisions);
        //setting a singular sub divsion
        setShippingSubDivision(Object.keys(subdivisions)[0]);
        
    }

    useEffect(() => {
        //fetch shipping countries onload and pass generated id.
        fetchShippingCountries(token.id);
    }, []);

    //this useEffect will run whenever the state of the shipping country chages
    // Once it does change we can then fetch the subdivsisions for that particular country.
    useEffect(() => {
        //fetching the subdivisions for the country at hand.
        if(shippingCountry) fetchSubdivisions(shippingCountry);

    }, [shippingCountry]);


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
                        {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                            {country.label}
                        </MenuItem>
                        ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                            Select Me
                        </MenuItem>
                        </Select>
                    </Grid>
                  {/*  <Grid item xs={12} sm={6}>
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