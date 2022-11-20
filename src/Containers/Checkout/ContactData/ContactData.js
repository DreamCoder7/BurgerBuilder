import React, { Component } from "react";
import Button from "../../../Components/Ui/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../Components/Ui/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../Components/Ui/Input/Input";
import { connect } from "react-redux";
import withErrorHundler from "../../../hoc/withErrorHundler/withErrorHundler";
import * as actions from "../../../store/action/index";
import { updatedObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        valid: true,
        value: "fastest",
      },
    },
    formIsValid: false,
  };

  orderHundler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifiers in this.state.orderForm) {
      formData[formElementIdentifiers] =
        this.state.orderForm[formElementIdentifiers].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChageHundler = (event, inputIdentifiers) => {
    const updatedFormElement = updatedObject(
      this.state.orderForm[inputIdentifiers],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifiers].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updatedObject(this.state.orderForm, {
      [inputIdentifiers]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let formElementArrays = [];

    for (let key in this.state.orderForm) {
      formElementArrays.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHundler}>
        {formElementArrays.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChageHundler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHundler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purcahseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withErrorHundler(ContactData, axios));
