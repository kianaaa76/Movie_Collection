import React, { Component } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";

const pageWidth = Dimensions.get("screen").width;
export default class Statusbar extends Component {
  render() {
    return <View style={styles.statusBarBackground} />;
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: "#DAD2C1",
    height: Platform.OS === "ios" ? 20 : 0,
    width: pageWidth
  }
});
