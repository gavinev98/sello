import './App.css';
import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar } from './components';

const App = () => {

    //creating a hook for products.
  const [products, setProducts] = useState([]);

  //fetching products onload of app.
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    //setting products equal to data returned from commerce api call.
    setProducts(data);
  }

  //similar to onload function runs at the start.
  useEffect(() => {
    fetchProducts();
  }, [])

  console.log(products);

  return (
    <div> 
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
