import React, {Component} from "react";
import { connect } from 'react-redux';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from "../../../axios-oders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: ''
        },
      zipcode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP CODE'
          },
          value: ''
        },
      country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: ''
        },
      email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail'
          },
          value: ''
        },
      deliveryMethod: {
          elementType: 'select',
          elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}
              ]
          },
          value: ''
        },
      },
    
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ings,
      price: this.props.price
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({loading: false});
        this
          .props
          .history
          .push('/')
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
  }

  render() {
    let form = (
      <form>
        <Input elementType="..." elementConfig="..." value="..."/>
        <Input inputtype="input" type="email" name="email" placeholder="Your Mail"/>
        <Input inputtype="input" type="text" name="street" placeholder="Street"/>
        <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      ings: state.ingredients,
      price: state.totalPrice
  }
}


export default connect(mapStateToProps)(ContactData);
