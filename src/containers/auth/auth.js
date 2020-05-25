import React, { Component } from "react";
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.module.css';
import * as action from '../../store/index';
import { dispatch } from "rxjs/internal/observable/pairs";
class Authe extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'mail id'
                },
                value: '',
                validation: {
                    reqd: true,
					isEmail:true
                },
                valid: false,
                touched: false
            },
			password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: ' password'
                },
                value: '',
                validation: {
                    reqd: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.reqd) {
            isValid = value.trim() !== '' && isValid;
            //that is string must not be empty.
            //we have added  && isValid kuki peeche waale ko saath lekar chalengey tabhi isvalid sab cases ke liye ok rahega
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            isValid = pattern.test(value) && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
			));
        return (
            <div className={classes.Auth} >
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
						SUBMIT
                    </Button>

                </form>
            </div>
			)
		
    }
}
const mapToDispatchProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(action.auth(email, password))
    };
};
export default connect(null,mapToDispatchProps)(Authe);