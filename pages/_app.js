import "../styles/globals.css";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { coffeeStoreReducer } from "../store/reducer/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
class MyApp extends App {
  render() {
    const persistConfig = {
      key: "root",
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, coffeeStoreReducer);
    const store = createStore(persistedReducer);
    let persistor = persistStore(store);
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}
export default MyApp;
