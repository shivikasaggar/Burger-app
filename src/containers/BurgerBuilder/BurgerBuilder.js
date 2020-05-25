import React, { Component } from "react";
import { connect } from 'react-redux';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
import axios from '../../axios-orders';
import { dispatch } from "rxjs/internal/observable/range";

class BurgerBuilder extends Component {
   /* constructor(props) {
        super(props);
        this.state = { ...}
    }*/
    state = {
        //this ingridients is not an array,its an object therefore we cant apply map.we need to convert object to array.
        //ingridients: null,//now we won't be using this locala state instead ings/
       // totalPrice: 4,
        //purchasable: false,
        purchasing: false,
        loading: false

    }
    componentDidMount() {
        console.log(this.props);
      /*  axios.get('https://myburger-react-6c170.firebaseio.com/ingridients.json')
            .then(response => {
                this.setState({ ingridients: response.data });
            });;
      */
    }
    purchaseHandler=()=> {
        this.setState({ purchasing: true });

    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        //alert('You are ready to continueeee!!');

        const queryParam = [];
        for (let i in this.state.ingridients) {
            queryParam.push(encodeURIComponent(i) + '='+ encodeURIComponent(this.state.ingridients[i]));
        }
        queryParam.push('price=' + this.state.totalPrice);
        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    updatePurchaseHandler(ingridients) {
       
        const sum = Object.keys(ingridients).map(igKey => {
            return ingridients[igKey];
        }).reduce((sum , el) => {
            return sum + el;
        }, 0);
       return sum > 0 ;
    }
  
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = null;
        let burger = <Spinner />;
        if (this.props.ings) {
            burger = (
                <Auxillary>
                    <Burger ingridients={this.props.ings} />
                    <BuildControls
                        ingridientAdded={this.props.onIngridientAdded}
                        ingridientRemoved={this.props.onIngridientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseHandler(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler} />
                </Auxillary>
            );
            orderSummary = <OrderSummary
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price}
                ingridients={this.props.ings} />;
        }
       
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
            );
    }
}
const mapStateToProps = state=> {
    return {
        ings: state.ingridients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGRIDIENT, ingridientName: ingName }),
        onIngridientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGRIDIENT, ingridientName: ingName })
    };

}
export default connect(mapStateToProps, mapDispatchToProps )(BurgerBuilder);