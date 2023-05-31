import {React,Fragment} from "react";
import classes from "./Header.module.css";
import mealImg from "../../assests/almonds.jpg"
import HeaderCartButton from "./HeaderCartButton"


const Header = props => {
    
    return (
    <Fragment>
        <header className={classes.header}>
            <h1>
            Indian Sweets
            </h1>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </header>
        <div className={classes['main-image']}> 
            <img src={mealImg} alt="meal table" />
        </div>
    </Fragment>
    );
};

export default Header;