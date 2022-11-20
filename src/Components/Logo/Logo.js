import React from "react";
import classes from "./Logo.module.css";
import logoBurger from "../../assets/images/burger-logo.png";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={logoBurger} alt="MyBurger" style={{ height: props.height }} />
  </div>
);

export default logo;
