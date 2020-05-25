import React, { Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary';
import axios from '../../axios-orders';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            axios.interceptors.respone.use(null, error => {
                this.setState({ error: error });
            });
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Auxillary>
                    <Modal show={this.state.error}
                        clicked={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                        something is wrong
                </Modal>
                    < WrappedComponent{...this.props} />
                </Auxillary>
            );
        }
    }
}
export default withErrorHandler;