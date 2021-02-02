import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';


const producto = [
    {
        id: 1,
        name : "Shoes",
        desc : "running shoes",
        price: "£ 100",
        image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    },

    {
        id: 1,
        name : "Macbook Pro",
        desc : "a computer for all needs",
        price: "£ 2000",
        image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'  }
]


const Products = () => {
    
 
    return (
        <main>
        <Grid container justify="center" spacing={4}>
            {producto.map((items) => (
                <Grid item key={items.id} xs={12} sm={6} md={4} lg={3}>
                   <Product product={items} /> 
                  </Grid>  
            ))}
        </Grid>    
    </main>
        
    )


}

export default Products;