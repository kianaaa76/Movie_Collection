import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const pageWidth = Dimensions.get("screen").width;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.renderHeaderLeft = this.renderHeaderLeft.bind(this);
    this.renderHeaderRight = this.renderHeaderRight.bind(this);
  }

  renderHeaderLeft = () => {
    const { leftIcon } = this.props;
    return leftIcon;
  };
  renderHeaderRight = () => {
    const { rightIcon } = this.props;
    return rightIcon;
  };

  render() {
    const { headerText, rightIcon, leftIcon } = this.props;
    return (
      <View style={Styles.headercontainerStyle}>
        <View style={Styles.headerContentStyle}>
          <View style={{ width: 40, alignItems:"flex-end" }}>
            {!!leftIcon && this.renderHeaderLeft()}
          </View>

          <View style={Styles.headerTextContainerStyle}>
            <Text style={Styles.headerTitleStyle}>{headerText}</Text>
          </View>
          <View style={{ width: 40 }}>
            {!!rightIcon && this.renderHeaderRight()}
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  headercontainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 49.5,
    width: pageWidth,
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: "#DAD2C1",
    // borderBottomColor: "#ADADAD",
    // borderBottomWidth: 0.5
  },
  headerContentStyle: {
    width: 328,
    height: 27.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerButtonsStyle: {
    width: 24,
    height: 24
  },
  headerTitleStyle: {
    fontWeight:"bold",
    fontSize: 18,
    textAlign: "center",
    color: "#000"
  },
  headerTextContainerStyle: {
    flex: 1
  }
});
