import React from 'react';
import classes from './Orders.module.css';
const Orders = (props) => {
    const ingridients = [];
    
    for (let ingridientName in props.ingridients) {
        console.log(props.ingridients);
        ingridients.push(
            {
                name: ingridientName,
                amount: props.ingridients[ingridientName]
            }
        )
    }
    const ingridientOutput = ingridients.map(ig => {
        return <span>{ig.name} ({ ig.amount })</span>
    });
    return (
        <div className={classes.Orders}>
            <p>Ingridients:{ingridientOutput}</p>
            <p>Price :<strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
} ;
export default Orders;