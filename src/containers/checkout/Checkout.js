import React, { Component } from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import Contactdata from './ContactData/ContactData';
class Checkout extends Component {
    state = {
        ingridients: null,
        price:0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = [];
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            }
            else {
                ingridients[param[0]] = +param[1];
            }
           
        }
        this.setState({ ingridients: ingridients, totalPrice: price });
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack(); 
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingridients={this.state.ingridients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => <Contactdata ingridients={this.state.ingridients} price={this.state.totalPrice} {...props} />} />
            </div>
            );
        
    }
}
export default Checkout;