import './App.css';
import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

const App = () => {

    //creating a state/hook for products.
  const [products, setProducts] = useState([]);

  //creating a state/hook for the shopping cart.
  const [cart, setCart] = useState({});


  //fetching products onload of app.
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    //setting products equal to data returned from commerce api call.
    setProducts(data);
  }

  //fetching the current cart session if there is one avaliable.
  const fetchCart = async () => {
    //storing the response in a variable.
    const cart = await commerce.cart.retrieve();

    //setting the carts state if there is any.
    setCart(cart);
   
  }

  //handle add to cart operation
  const handleAddToCart = async (productId, quantity) => {

    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);

  }

  //handle update quanity of product operation.
  const handleUpdateCartQty = async (productId, quantity) => {

    const updatedItem = await commerce.cart.update(productId, {quantity});

    setCart(updatedItem.cart);

  }

  //similar to onload function runs at the start.
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  console.log(cart);

  return (
    <Router>
    <div> 
      <Navbar totalItems={cart.total_items} />
      <Switch>
        <Route exact path="/">
          <Products products={products} onAddToCart={handleAddToCart} />
        </Route>
        <Route exact path="/cart">
          <Cart cart={cart} />
        </Route>
      </Switch>
    </div>
    </Router>
  );
};

export default App;
