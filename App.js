import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootNav } from "./src/routes/routes";
import createStore from "./src/store";
import Toast from "./src/components/common/Toast";

const { store, persistor } = createStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    global.App = this;
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNav />
          <Toast ref={r => (this.toast = r)} />
        </PersistGate>
      </Provider>
    );
  }
}

const Styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  }
});
