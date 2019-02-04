import React from "react";

import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import { Icon, TabBar } from "../components";
import * as Screens from "../screens";

const TabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: Screens.ScreenA,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="A" color={tintColor} />
      }
    },
    SearchScreen: {
      screen: Screens.ScreenB,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="B" color={tintColor} />
      }
    },
    FavoritesScreen: {
      screen: Screens.ScreenC,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="C" color={tintColor} />
      }
    },
    ProfileScreen: {
      screen: Screens.ScreenD,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="D" color={tintColor} />
      }
    },
    ProfileScreen2: {
      screen: Screens.ScreenE,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="E" color={tintColor} />
      }
    }
  },
  {
    tabBarComponent: props => (
      <TabBar
        tabColors={["#f62626", "#ff8a14", "#e5ff0a", "#21ff30", "#196eff"]}
        {...props}
      />
    ),
    tabBarOptions: {
      activeTintColor: "#eeeeee",
      inactiveTintColor: "#222222"
    }
  }
);

export default createAppContainer(TabNavigator);
