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


  return (
    <div> 
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
