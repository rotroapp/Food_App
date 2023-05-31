import Input from "../../UI/Input.js";
import classes from "./MealItemForm.module.css"
import { useRef, useState } from "react";

const MealItemForm = (props) => {
    const [isvalidAmount , setisvalidAmount] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const numEnteredAmount = +enteredAmount;

        if(enteredAmount.trim().length === 0|| numEnteredAmount < 0  || numEnteredAmount > 5)
        {
            setisvalidAmount(false);
            return;
        }
         console.log('moved')
         props.onAddtoCart(numEnteredAmount);
        };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
        <Input  
            label="Amount" 
            ref = {amountInputRef}
            input={{
            id : 'amount_' + props.id,
            type : 'number',
            min : '1',
            max : '5',
            step: '1',
            defaultValue : '1'
        }}>
        </Input>
        <button>+ Add</button>
        {!isvalidAmount && <p>Please enter a valid</p>}
        </form>
    )
}

export default MealItemForm;