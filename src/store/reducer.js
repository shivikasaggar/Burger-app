import * as actionTypes from './actions';
import { stat } from 'fs';
const initialState = {
    ingridients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat:0
    },
    totalPrice: 4
};

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.9,
    meat: 1.2
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    //we have created this ingridients immutably.
                    //we have created this object
                    //now we will update them.
                    [action.ingridientName]: state.ingridients[action.ingridientName] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
            };
        case actionTypes.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                  //recived the ingridients as action payload down
                    [action.ingridientName]: state.ingridients[action.ingridientName] - 1
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName]
            };
        default:
            return state;
    }
};
export default reducer;