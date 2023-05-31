import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import {React,Fragment} from "react";

const Meals = (props)  => {
    return (
        <Fragment>
            <MealsSummary></MealsSummary>
            <AvailableMeals/>
        </Fragment>
    )
}

export default Meals;