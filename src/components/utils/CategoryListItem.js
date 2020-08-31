import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, View, ActivityIndicator} from "react-native";
import MyText from "../common/MyText";

const pageWidth = Dimensions.get("screen").width;

export default class ComponentName extends Component {
    render() {
        const {name, onPress} = this.props;
        return(
            <TouchableOpacity style={Styles.itemContainerStyle} onPress={onPress}>
                <MyText isBold={true} fontSize={20} color="#000">
                    {name}
                </MyText>
            </TouchableOpacity>
        );
    }
}

const Styles = StyleSheet.create({
    itemContainerStyle:{
        width: pageWidth*0.85,
        height:100,
        backgroundColor:"#D1BC8A",
        borderRadius:20,
        marginVertical:6,
        justifyContent:"center",
        alignItems:"center"
    }
})