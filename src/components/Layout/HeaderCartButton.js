import { useContext, useEffect, useState } from "react";
import CartIcon from "../Carts/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContex from "./../../Store/cart-Contex"

const HeaderCartButton = (props) => {
    
    const cartCx = useContext(CartContex);
    const { items } = cartCx;

    const [ isbumpactive, setbumpactive] = useState(false);

    const numberOfCartItem = items.reduce((curNumber,item) => {
        return (curNumber + item.amount);
    },0)

    

    const btnClasses = `${classes.button} ${ isbumpactive ? classes.bump : " " }`;

    useEffect(() =>{
     if(items.length === 0){
        return ;
     }
     setbumpactive(true);
     
     const timer = setTimeout(() => {
        setbumpactive(false);
     },300)
     
     return () => {
        clearTimeout(timer);
     }
      },[items]);

    return (
    <button className={btnClasses} onClick={props.onClick}> 
    <span className={classes.icon}>
    <CartIcon></CartIcon>
    </span>
    <span>Your Cart </span>
    <span className={classes.badge}>{numberOfCartItem}</span>
    </button>);
}

export default HeaderCartButton;

