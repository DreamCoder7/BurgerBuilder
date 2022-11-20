import * as actionType from "../action/actionType";
import { updatedObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  chees: 0.7,
  bacon: 1,
  meat: 0.9,
};

const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updateIngredients = updatedObject(state.ingredients, updateIngredient);

  const updatedState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updateIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updateIngs = updatedObject(state.ingredients, updateIng);

  const updatedS = {
    ingredients: updateIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updatedObject(state, updatedS);
};

const setIngredient = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      chees: action.ingredients.chees,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientFaild = (state) => {
  return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionType.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionType.SET_INGREDIENT:
      return setIngredient(state, action);
    case actionType.FETCH_INGREDIENT_FAILED:
      fetchIngredientFaild(state);
    default:
      return state;
  }
};

export default reducer;
