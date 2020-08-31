import React from "react";
import { TextInput, View, Dimensions } from "react-native";
import MyText from "./MyText";

const pageWidth = Dimensions.get("screen").width;
const pageHeight = Dimensions.get("screen").height;

const TextInputWithLabel = ({
  placeholder,
  onInputChange,
  placeholderTextColor,
  label,
  value
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" , paddingHorizontal:10}}>
      <View style={{ width: 70 }}>
        <MyText isBold={true} fontSize={15}>
          {label}
        </MyText>
      </View>
      <TextInput
        style={{
          borderRadius: 10,
          margin: 5,
          width: pageWidth * 0.6,
          height: pageHeight * 0.08,
          backgroundColor: "#fff",
          padding: 15
        }}
        defaultValue={value}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        onChangeText={onInputChange}
      />
    </View>
  );
};

export default TextInputWithLabel;
