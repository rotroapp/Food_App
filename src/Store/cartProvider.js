import CartContext from "./cart-Contex";
import { useReducer } from "react";


const defaultCartstate = {
    items : [],
    totalAmount : 0
}

const cartReducer = (state , action) => {
    if(action.type === 'ADD')
    {
        // const updateItems = state.items.concat(action.item)
        const updateTotalAmount = state.totalAmount + action.item.price *  action.item.amount;
        
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const existingItem = state.items[existingItemIndex];

        let updatedItems;

        if(existingItem)
        {
           const updatedItem = {
                ...existingItem,
                amount : existingItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        return {
            items : updatedItems,
            totalAmount : updateTotalAmount
        }
    }
    
    if(action.type === 'Remove'){
        const existingItemIndex = state.items.findIndex(
          (item) => { return  item.id === action.id })
      const existingItem = state.items[existingItemIndex];
      const updatedtotalAmt = state.totalAmount - existingItem.price;
      
      let updatedItems;
      if(existingItem.amount === 1)
      {
              updatedItems = state.items.filter(item => {
              return item.id !== action.id
          })  
      }else{
          const updatedItem = {...existingItem, amount : existingItem.amount -1};
          updatedItems = [...state.items];
          updatedItems[existingItemIndex] = updatedItem;
      }
      
      return {
          items : updatedItems,
          totalAmount : updatedtotalAmt
      }
    }

    if(action.type === 'RESET')
    {
        return defaultCartstate;
    }

    return defaultCartstate;
}

    
const CartProvider = props => {
    
    const [Cartstate, despatchcartAction] = useReducer(cartReducer, defaultCartstate);

    const addItemTocartHandler = (item) => {
        console.log('add called')
      despatchcartAction({type : 'ADD', item : item})
    };

    const removeItemTocartHandler = (id) => {
        console.log('remove called')
        despatchcartAction({type : 'Remove', id : id})
    };

    const resetcartHandler  = () => {
        despatchcartAction({type : 'RESET'})
    }
    const cartContex = {
        items : Cartstate.items,
        totalAmount : Cartstate.totalAmount,
        addItem : addItemTocartHandler,
        removeItem : removeItemTocartHandler,
        reset : resetcartHandler
    };

    return (<CartContext.Provider value={cartContex}>
        {props.children}
    </CartContext.Provider>);
}

export default CartProvider;