import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

class Modal extends Component {
  shouldComponentUpdate(nextState, prevState) {
    return (
      nextState.show !== this.props.show ||
      nextState.children !== this.props.children
    );
  }

  componentDidUpdate() {
    // console.log("[Modal.js] componentDidUpdate");
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} cliked={this.props.modalClose} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100)",
            opacity: this.props.show ? "1" : "0",
            visibility: this.props.show ? "visible" : "hidden",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
