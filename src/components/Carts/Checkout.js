import { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const Checkout = (props) => {

    const [isinputvalid, setinputvalid] = useState({
        name : true,
        city : true,
        street : true,
        postal : true,
        // contact : true

    })
    const nameInputref = useRef();
    const cityInputref = useRef();
    const PostalcodeInputref = useRef();
    const streetInputref = useRef();
    // const contactInputref = useRef();
    
    const isempty = (value) => {
        return value.trim().length === 0;
    }
    const validpostal = (value) => {
        return (value.trim().length >= 5)
    }
    
    // const validcontact = (value) => {
    //     return (value.trim().length === 10)
    // }
    const checkouthandler = (event) => {
        event.preventDefault();
        const enteredname = nameInputref.current.value;
        const enteredstreet = streetInputref.current.value;
        const enteredcity = cityInputref.current.value;
        const enteredpostalcode = PostalcodeInputref.current.value;
        // const enteredcontactnumber = contactInputref.current.value;

        console.log(enteredname)
        console.log(enteredpostalcode)

        const isnamevalid = !isempty(enteredname);
        const isstreetvalid = !isempty(enteredstreet);
        const iscityvalid = !isempty(enteredcity);
        const ispostalvalid = validpostal(enteredpostalcode);
        // const iscontactvalid = validcontact(enteredcontactnumber);
        
        setinputvalid({
            name : isnamevalid,
            city : iscityvalid,
            street : isstreetvalid,
            postal : ispostalvalid,
            // contact : iscontactvalid
        });

        
        const formvalid = isnamevalid && iscityvalid && isstreetvalid && ispostalvalid;
    
        if(!formvalid)
        {
            return ;
        }


        props.onConfirm({
            name : enteredname,
            street : enteredstreet,
            city : enteredcity,
            postal: enteredpostalcode
        });
    }

    const nameclassescontrol = `${classes.control}  ${isinputvalid.name ? '' : classes.invalid}`
    const streetclassescontrol = `${classes.control}  ${isinputvalid.street ? '' : classes.invalid}`
    const cityclassescontrol = `${classes.control}  ${isinputvalid.city ? '' : classes.invalid}`
    // const contactclassescontrol = `${classes.control}  ${isinputvalid.contact ? '' : classes.invalid}`
    const postalclassescontrol = `${classes.control}  ${isinputvalid.postal ? '' : classes.invalid}`

    return (
       <div className={classes.control}>
        <h1>Checkout Order</h1>
       <form onSubmit={checkouthandler}>
        <div className={nameclassescontrol}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputref}></input>
        { !isinputvalid.name && <p>Please enter Name</p>}
        </div>
        
        <div className={streetclassescontrol}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputref}></input>
        { !isinputvalid.street && <p>Please enter street address</p>}
        </div>
        
        <div className={cityclassescontrol}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputref}></input>
        { !isinputvalid.city && <p>Please enter city name</p>}
        </div>

        {/* <div className={contactclassescontrol}>
        <label htmlFor="contact">Contact Number</label>
        <input type="tel" id="contact" ref={contactInputref}></input>
        { !isinputvalid.contact && <p>Please enter valid contact number</p>}
        </div> */}

        <div className={postalclassescontrol}>
        <label htmlFor="postal" >Postal Code</label>
        <input type="text" id="postal" ref={PostalcodeInputref}></input>
        { !isinputvalid.postal && <p>Please enter valid postal code</p>}
        </div>
        <div className={classes.actions}> 
        <button onClick={props.onCancel}>Cancel</button>
        <button>Submit</button>
        </div>
       </form>
       </div>
       
    )
} 

export default Checkout;