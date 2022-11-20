import * as actionType from "./actionType";
import axios from "../../axios-orders";

export const purcahseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purcahseBurgerFail = (error) => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purcahseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START,
  };
};

export const purcahseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purcahseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log(response.data);
        dispatch(purcahseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purcahseBurgerFail(error));
      });
  };
};

export const purcahseInt = () => {
  return {
    type: actionType.PURCHASE_INIT,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionType.FETCH_ORDER_START,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionType.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFail = (err) => {
  return {
    type: actionType.FETCH_ORDER_FAIL,
    err: err,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams =
      "?auth=" + token + '&orderBy=userId&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
