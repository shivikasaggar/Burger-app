import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h1>WE HOPE YOU LIKE IT!!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingridients={props.ingridients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}
export default CheckoutSummary; 