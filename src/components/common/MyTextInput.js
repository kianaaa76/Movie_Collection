import React from "react";
import { TextInput } from "react-native";

const MyTextInput = ({
  placeholder,
  width,
  height,
  onInputChange,
  borderRadius,
  placeholderTextColor,
  isSecure
}) => {
  return (
    <TextInput
      style={{
        margin:5,
        width: width,
        height: height,
        backgroundColor: "#fff",
        borderRadius: borderRadius,
        padding: 15,
      }}
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholder}
      onChangeText={onInputChange}
      secureTextEntry={isSecure}
    />
  );
};

export default MyTextInput;
