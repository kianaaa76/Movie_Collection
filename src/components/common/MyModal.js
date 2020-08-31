import React, { Component } from "react";
import {
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing
} from "react-native";

const pageHeight = Dimensions.get("screen").height;

export default class ComponentName extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      showModal,
      children,
      onCloseModal,
      modalAnimatedValue
    } = this.props;
    return (
      <Modal
        visible={showModal}
        animationType="none"
        onRequestClose={() => {}}
        transparent
      >
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            opacity: modalAnimatedValue,
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%"
          }}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: modalAnimatedValue.interpolate({
                  inputRange: [0.3, 0.8],
                  outputRange: [pageHeight / 2 + 200, 0],
                  extrapolate: "clamp",
                  easing: Easing.out(Easing.exp)
                })
              }
            ],
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15
          }}
        >
          {children}
        </Animated.View>
      </Modal>
    );
  }
}
