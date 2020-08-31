import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const MyButton = ({
  title,
  color,
  width,
  height,
  borderRadius,
  onClick,
  textFontSize
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.touchableStyle,
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: borderRadius,
        marginHorizontal:10,
      }}
      onPress={onClick}
    >
      <Text style={{ ...styles.textStyle, fontSize: textFontSize }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    fontWeight: "bold"
  }
});

export default MyButton;
