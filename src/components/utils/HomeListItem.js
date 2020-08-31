import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MyText from "../common/MyText";

const pageHeight = Dimensions.get("screen").height;
const pageWidth = Dimensions.get("screen").width;

export default class HomeListItem extends Component {
  render() {
    const {
      item: {
        item: { title, date_of_release, rating, tags, director }
      },
      onDelete,
      onEdit
    } = this.props;
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
          <MyText>{director.split(':')[1]}</MyText>
        </View>
        <View style={Styles.itemIconContainerStyle}>
          <View style={Styles.itemIconContentContainerStyle}>
            <Icon name="delete" size={28} onPress={onDelete} />
            <Icon name="edit" size={28} onPress={onEdit} />
          </View>
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
    padding: 10
  },
  itemIconContainerStyle: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: 40
  },
  itemIconContentContainerStyle: {
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
