import * as types from "../types";

export const setLatLongData = (latLong) => {
  return {
    type: types.SET_LAT_LONG,
    payload:latLong,
  };
};
export const setCoffeeStoreData = (coffeeStore) => {
  return {
    type: types.SET_COFFEE_STORE,
    payload:coffeeStore,
  };
};
