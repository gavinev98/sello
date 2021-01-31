import React from 'react';
import Grid from '@material-ui/core';


const products = [
    {
        id: 1,
        name : "Shoes",
        desc : "running shoes"
    },

    {
        id: 1,
        name : "Macbook Pro",
        desc : "a computer for all needs"
    }
]


const Products = () => {
    <main>
        <Grid container justify="center" spacing={4}>
            {products.map((items) => (
                <Grid item key={items.id} xs={12} sm={6} md={4} lg={3}>
                   <Product /> 
                  </Grid>  
            ))}
        </Grid>    
    </main>

}

export default Products;