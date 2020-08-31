import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MyText from "../common/MyText";

const pageHeight = Dimensions.get("screen").height;
const pageWidth = Dimensions.get("screen").width;

export default class extends Component {
  render() {
    const {
      item: { title, date_of_release, rating, tags, director }
    } = this.props.item;
    return (
      <View style={Styles.itemContainerStyle}>
        <MyText fontSize={18} isBold={true}>
          {title}
        </MyText>
        <View style={{ flexDirection: "row" }}>
          <MyText isBold={true}>Date of Release: </MyText>
          <MyText>{date_of_release}</MyText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MyText isBold={true}>Rating: </MyText>
          <MyText>{rating}</MyText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MyText isBold={true}>Tags: </MyText>
          <MyText>{tags.toString()}</MyText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MyText isBold={true}>Director: </MyText>
          <MyText>{director}</MyText>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  itemContainerStyle: {
    width: pageWidth * 0.85,
    backgroundColor: "#D1BC8A",
    borderRadius: 20,
    marginVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    padding:10
  }
});
