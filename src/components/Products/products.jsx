import React from 'react';
import Grid from '@material-ui/core';


const product = [
    {
        id: 1,
        name : "Shoes",
        desc : "running shoes",
        price: "£ 100"
    },

    {
        id: 1,
        name : "Macbook Pro",
        desc : "a computer for all needs",
        price: "£ 2000"
    }
]


const Products = () => {
    <main>
        <Grid container justify="center" spacing={4}>
            {product.map((items) => (
                <Grid item key={items.id} xs={12} sm={6} md={4} lg={3}>
                   <Product product={items} /> 
                  </Grid>  
            ))}
        </Grid>    
    </main>

}

export default Products;