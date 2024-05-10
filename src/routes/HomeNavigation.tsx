import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens/home/HomeScreen";

import { HomeParamList } from "./types";

const HomeStack = createStackNavigator<HomeParamList>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        initialParams={undefined}
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
