import React from 'react';
import classes from './Burger.module.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
import { concat } from 'rxjs';
const burger = (props) => {
    let transformedIngridients = Object.keys(props.ingridients).map(igKey => {
        return [...Array(props.ingridients[igKey])].map((_, i) => {
            return <BurgerIngridient key={igKey + i} type={igKey} />;
        });

    }).reduce((arr, el) => { return arr.concat(el) }, []);
    //.reduce is used to concat the transformedingridients into single array.
    //console.log(transformedIngridients);

    //to display if nothing is between the brreads then
    if (transformedIngridients.length === 0) {
        transformedIngridients = <p>Please,start adding some ingridients!!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top" />
            {
                transformedIngridients
            }
            <BurgerIngridient type="bread-bottom" />
        </div>
        );
};
export default burger;