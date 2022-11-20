import * as actionType from "../action/actionType";
import { updatedObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state) => {
  return updatedObject(state, { purchased: false });
};

const purchaseBurgerStart = (state) => {
  return updatedObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };

  return updatedObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state) => {
  return updatedObject(state, { loading: false });
};

const fetchOrderStart = (state) => {
  return updatedObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updatedObject(state, { loading: false, orders: action.orders });
};

const fetchOrderFail = (state) => {
  return updatedObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_INIT:
      return purchaseInit(state);
    case actionType.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionType.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionType.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionType.FETCH_ORDER_START:
      return fetchOrderStart(state);
    case actionType.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionType.FETCH_ORDER_FAIL:
      return fetchOrderFail(state);
    default:
      return state;
  }
};

export default reducer;
