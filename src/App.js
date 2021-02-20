import './App.css';
import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

const App = () => {

    //creating a state/hook for products.
  const [products, setProducts] = useState([]);

  //creating a state/hook for the shopping cart.
  const [cart, setCart] = useState({});

  // capture the order
  const [order, setOrder] = useState({});

  //capture the error
  const [errorMsg, setErrorMsg] = useState('');


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

    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);

  }

  //handle update quanity of product operation.
  const handleUpdateCartQty = async (productId, quantity) => {

    const { cart } = await commerce.cart.update(productId, {quantity});

    setCart(cart);

  }

  //handle removing quantity/product.
  const handleRemoveFromCart = async(productId) => {

    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
 }


 //handle emptying of cart operation.
 const handleEmptycart = async () => {

    const { cart } = await commerce.cart.empty();

    setCart(cart);

 }

 //refresh the cart once the order has been submitted.
 const refreshCart = async () => {
   const newCart = await commerce.cart.refresh();

   setCart(newCart);
 }


 //function to handle checkout. 
 const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  //using try catch statement when submitting order,
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
       
        setOrder(incomingOrder);
        refreshCart();

      } catch(error) {
        setErrorMsg(error.data.error.message);
      }
 }

  //handle remove

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
          <Cart cart={cart}  
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptycart={handleEmptycart}
          />
        </Route>
        <Route exact path="/checkout">
         <Checkout cart={cart} order={order} handleCaptureCheckout={handleCaptureCheckout} error={errorMsg} />
        </Route>
      </Switch>
    </div>
    </Router>
  );
};

export default App;
