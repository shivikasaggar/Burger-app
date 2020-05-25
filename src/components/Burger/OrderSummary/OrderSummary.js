import React from 'react';
import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridients).map(igKey => {
        return (
            <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey} </span>: {props.ingridients[igKey]}
            </li>);
    });
    
    return (

        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingridients</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p><strong>Total price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout??</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxillary>
        );
};
export default orderSummary;