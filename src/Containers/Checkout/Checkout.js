import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCanclledHundler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHundler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCanclled={this.checkoutCanclledHundler}
            checkoutContinued={this.checkoutContinuedHundler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </>
      );
    }

    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
