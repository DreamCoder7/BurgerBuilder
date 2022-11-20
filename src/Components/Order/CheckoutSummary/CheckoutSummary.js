import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../Ui/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it's testes well!</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger ingredients={props.ingredients} />
    </div>

    <Button btnType="Danger" clicked={props.checkoutCanclled}>
      CANCLE
    </Button>
    <Button btnType="Success" clicked={props.checkoutContinued}>
      SUCCESS
    </Button>
  </div>
);

export default checkoutSummary;
