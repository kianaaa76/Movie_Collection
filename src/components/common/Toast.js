import React, { Component } from "react";
import { Animated, StyleSheet, Text } from "react-native";

class Toast extends Component {
  constructor(props) {
    super(props);
    this.toastOpacityAnimatedValue = new Animated.Value(0);
    this.state = { text: "", isVisible: false };
  }

  show(txt) {
    this.setState({ isVisible: true });
    this.setState({ text: txt }, () => {
      Animated.sequence([
        Animated.timing(this.toastOpacityAnimatedValue, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(this.toastOpacityAnimatedValue, {
          toValue: 0,
          duration: 500,
          delay: 2000
        })
      ]).start(() => {
        this.setState({ isVisible: false });
      });
    });
  }

  render() {
    const { isVisible } = this.state;
    return isVisible ? (
      <Animated.View
        style={{
          padding:10,
          backgroundColor: "#D2AD55",
          opacity: this.toastOpacityAnimatedValue,
          borderWidth:2,
          borderColor:"gray",
          position: "absolute",
          bottom: 180,
          left: 50,
          right: 50,
          height: 40,
          justifyContent: "center",
          borderRadius: 20
        }}
      >
        <Text style={Styles.toastTextStyle}>{this.state.text}</Text>
      </Animated.View>
    ) : null;
  }
}

const Styles = StyleSheet.create({
  toastTextStyle: {
    textAlign:"center",
    alignSelf: "center",
    color: "#fff"
  }
});

export default Toast;
