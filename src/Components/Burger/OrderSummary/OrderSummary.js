import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../Ui/Button/Button";

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be class based
  componentDidUpdate() {
    // console.log("[OrderSummary.js] componentDidUpdate");
  }

  render() {
    const OrderSummaryIngredient = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );

    return (
      <Auxiliary>
        <h1>Your Order!</h1>
        <p>A delicious burger with the following ingredient: </p>
        <ul>{OrderSummaryIngredient}</ul>
        <p>Continue to Checkout!</p>

        <p>
          <strong>Total price: {this.props.price.toFixed()}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchasCancelled}>
          CANCLED
        </Button>
        <Button btnType="Success" clicked={this.props.purchasContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

export default OrderSummary;
