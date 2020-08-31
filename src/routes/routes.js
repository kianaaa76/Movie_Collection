import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import Login from "../components/screens/Login";
import Home from "../components/screens/Home";
import Category from "../components/screens/Category";
import Movie from "../components/screens/Movie";
import AddEditMovie from "../components/screens/AddAndEditMovie";

export const categoryStack = createStackNavigator(
    {
      categoryList: {
        screen: Category
      },
      CategoryMovies: {
        screen: Movie
      }
    },
    {
      initialRouteName: "categoryList",
      headerMode: "none",
      navigationOptions: {
        headerVisible: false
      }
    }
)

export const homeStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    AddEditMovie: {
      screen: AddEditMovie
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
)

export const SignedIn = createBottomTabNavigator(
    {
      Home: {
        screen: homeStack,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={25} color={tintColor} />
          )
        }
      },
      CategoriesList: {
        screen: categoryStack,
        navigationOptions: {
          tabBarLabel: "Categories",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="recent-actors" size={25} color={tintColor} />
          )
        }
      },
    },
    {
      initialRouteName: "Home",
      tabBarOptions: {
        activeTintColor: "#D2AD55",
        showIcon: true,
        style: {
          height: 60,
          paddingVertical: 5,
          backgroundColor: "#DAD2C1"
        },
        // labelStyle: {
        //   fontFamily: "BKoodakBold"
        // }
      }
    }
  );

export const switcher = createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: Login
      }
    },
    {
      initialRouteName: "SignedOut"
    }
  );

export const RootNav = createAppContainer(switcher);
