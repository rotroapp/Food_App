import React from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../Store/cart-Contex';
import { useContext, useState } from 'react';
import CartItem from './CartItem';

import Checkout from './Checkout';

const Cart = (props) => {
    const[issubmitting , setsubmitting] = useState(false);
    const[didsubmit, setdidsubmit] = useState(false);
    const [ischeckout, setcheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = id => {
         cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
             cartCtx.addItem({...item, amount : 1})
    }
    
    const orderhandler = () => {
        setcheckout(true);
    }

    const confirmOrderhandler = async (userdata) =>{
          setsubmitting(true);
          console.log('confirm & placed')
           await fetch('https://foodappbackend-26d1a-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',{
            method : 'POST',
            body : JSON.stringify({
               user :  userdata,
               order : cartCtx.items,
               total : totalAmount
            })
          })
          setsubmitting(false);
          setdidsubmit(true);
          cartCtx.reset();
    }
    const hasitem = cartCtx.items.length > 0;
    const CartItems =(<ul className={classes['cart-items']}>
        {cartCtx.items.map((items) => (
        <CartItem
        key={items.key} 
        name = {items.name} 
        amount={items.amount} 
        price={items.price}
        onRemove = {cartItemRemoveHandler.bind(null, items.id)}
        onAdd = {cartItemAddHandler.bind(null, items)}> </CartItem> 
        ))}
    </ul>
    );

   const modalitems = 
   <div>
   <div className={classes.actions}>
         <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
         {hasitem && <button onClick={orderhandler} className={classes.button}>Order</button>}
   </div>
   </div>

   const modalcontent = <React.Fragment>
     {CartItems}
   <div className={classes.total}>
       <span>Total Amount</span>
       <span>{totalAmount}</span>
   </div>
         {!ischeckout && modalitems}

       {ischeckout && <Checkout onConfirm={confirmOrderhandler} onCancel={props.onHideCart}></Checkout>}
   </React.Fragment>

   const issubmittingmodalcontent = <p>Submitting the Order...</p>

   const didsubmittedmodalcontent = 
   <div>
    <p>Ordered Successfully!</p>
    <div className={classes.actions}>
         <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>   
    </div>
                         
    </div>

   return (
    <Modal onClick={props.onHideCart} >
     {!issubmitting && !didsubmit && modalcontent}
     {issubmitting && !didsubmit && issubmittingmodalcontent}
     {!issubmitting && didsubmit && didsubmittedmodalcontent}
    </Modal>
    
   );
};

export default Cart;