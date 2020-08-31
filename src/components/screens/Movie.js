import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../common/Header";
import StatusBar from "../common/StatusBar"
import CategoryMoviesListItem from "../utils/CategoryMoviesListItem";
import MyText from "../common/MyText";

export default class Movie extends Component {
 
  renderItem(item) {
    return <CategoryMoviesListItem item={item} />;
  }

  renderEmptyList() {
    return (
      <View style={Styles.emptyListContainerStyle}>
        <MyText fontSize={20} isBold={true}>
          There is no item to show.
        </MyText>
      </View>
    );
  }

  render() {
    const {
      Movies,
      CategoryName,
    } = this.props.navigation.state.params;
    return (
      <View style={Styles.containerStyle}>
      <StatusBar/>
        <Header
          headerText={CategoryName}
          leftIcon={
            <Icon
              name="arrow-back"
              size={28}
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        
          <FlatList
            data={Movies}            
            keyExtractor={item => item.id}
            renderItem={item => this.renderItem(item)}
            ListEmptyComponent={this.renderEmptyList}
          />
        
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#DAD7D1",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyListContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
