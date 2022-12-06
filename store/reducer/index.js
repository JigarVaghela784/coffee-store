import * as types from "../types";
const initialState = {
  latLong: "",
  coffeeStore: [],
};
export const coffeeStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LAT_LONG:
      return { ...state, latLong: action.payload };
    case types.SET_COFFEE_STORE:
        console.log('action.payload', action.payload)
      return { ...state, coffeeStore: action.payload };
    default:
      return state
  }
};