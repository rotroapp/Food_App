import {React, useState} from 'react';
import Header from './components/Layout/Header';
import './App.css';
import Meals from './components/Meals/Meals';
import Cart from './components/Carts/Cart';
import CartProvider from './Store/cartProvider';

function App() {

  const [cartIsshown, setcartisShown] = useState(false);

  const showCartHandler = () => {
    setcartisShown(true);
  }

  const hideCartHandler = () => {
    setcartisShown(false);
  }

  return (
    <CartProvider>
     {cartIsshown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
