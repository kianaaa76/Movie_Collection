import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

const MyText = ({ fontFamily, fontSize, isBold, color, children }) => {
  return (
    <Text
      style={{
        ...styles.text,
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: isBold ? "bold" : null,
        color: color
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    alignSelf: "center"
  }
});

export default MyText;
