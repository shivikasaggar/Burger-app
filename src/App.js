import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Order from './containers/Order/Order';
import './App.css';
import { Route, Link } from 'react-router-dom';

import Auth from './containers/auth/auth';
import Checkout from './containers/checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/order"  component={Order} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/auth" component={Auth} />
                    
                </Layout>
            </div>

      );
    }
}
export default App;
