import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';


const AddressForm = () => {

    //importing methods from useForm()
    const methods = useForm();


    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        </>
    );
};

export default AddressForm;