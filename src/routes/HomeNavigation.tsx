import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens/home/HomeScreen";

import { HomeParamList } from "./types";
import { WitchesListScreen } from "../screens/home/WitchesListScreen";
import AppBar from "../components/containers/AppBar";

const HomeStack = createStackNavigator<HomeParamList>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "Poppins-Medium" },
        cardStyle: { backgroundColor: "#ffffff" },
        header: ({ navigation, route, options, back }) => {
          return (
            <AppBar
              title={options.title || ""}
              back={back}
              navigation={navigation}
            />
          );
        },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        initialParams={undefined}
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <HomeStack.Screen
        name="WitchesListScreen"
        initialParams={undefined}
        component={WitchesListScreen}
        options={{ title: "Witches List", headerShown: true }}
      />
    </HomeStack.Navigator>
  );
};
