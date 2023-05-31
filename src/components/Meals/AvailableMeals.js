import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";
import { useEffect, useState } from "react";

 
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Jalebi',
//       description: 'Crispy curls and filled with sweet taste',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Barfi',
//       description: 'Milk made and pure taste',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: ' Gulab Jamun',
//       description: 'Indian royal soft sweet',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Laddo',
//       description: 'Besan made sweet dumpling',
//       price: 18.99,
//     },
//   ];


  const AvailableMeals = () => {

  const [meals, setmeals] = useState([]);
  const [isloading, setisloading] = useState(true);
  const[errorpost , catcherror] = useState();

    useEffect(() => {
      const fetchMeal  = async() => { 
        const response = await fetch('https://foodappbackend-26d1a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
        if(!response.ok)
        {
          throw new Error('📛 Something went wrong 📛');
        }
        const responseData = await response.json();
  
        const loadMeals = []
  
        for(const key in responseData)
        {
            loadMeals.push({
              id : key,
              name : responseData[key].name,
              description : responseData[key].description,
              price : responseData[key].price
            })
        }
  
        setmeals(loadMeals)
      }
      fetchMeal().catch((error) => {
        catcherror(error.message)
        setisloading(false)
      });
      setisloading(false)
  },[])

  if(isloading){
    return <section className={classes.loading}>Loading---</section>
  }
   
  if(errorpost){
    return <section className={classes.error}>{errorpost}</section>
  }
     const dummyList = meals.map(value =>
     <MealsItem 
     key={value.id} 
     id={value.id} 
     name={value.name} 
     description={value.description} 
     price={value.price}
     /> )

     return (
       <Card>
      <section className={classes.meals}>
        <ul>
       {dummyList}
        </ul>
       </section>
       </Card>
            
      )
  }

  export default AvailableMeals;