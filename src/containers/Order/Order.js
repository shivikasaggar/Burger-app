import React, { Component } from "react";
import Orders from '../../components/Orders/Orders';
import axios from '../../axios-orders';
class Order extends Component {
    state = {
        orders: [],
        loading:true
    }
    componentDidMount() {
        axios.get('/orders.json') 
            .then(res => {
                const fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id:key
                        
                   });
                }
                this.setState({ loading: false, orders:fetchedData });
            })
            .catch(err => {
            this.setState({ loading: false });
        });
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Orders
                        key={order.id}
                        ingridients={order.ingridients}
                        price={order.price}
                    />
                ))}
            </div>
            );
    }
}
export default Order;
