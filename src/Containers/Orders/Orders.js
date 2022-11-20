import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import withErrorHundler from "../../hoc/withErrorHundler/withErrorHundler";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
import Spinner from "../../Components/Ui/Spinner/Spinner";

class Orders extends Component {
  componentWillMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return <Order price={order.price} ingredients={order.ingredients} />;
      });
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withErrorHundler(Orders, axios));

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
