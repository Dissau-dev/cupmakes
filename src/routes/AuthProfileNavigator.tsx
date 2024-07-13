import { createStackNavigator } from "@react-navigation/stack";

import {
  AuthProfileParamsList,
  AuthenticationParamList,
  CarParamList,
} from "./types";
import AppBar from "../components/containers/AppBar";
import React from "react";
import { LoginProfileScreen } from "../screens/authProfile/LoginProfileScreen";
import { RegisterProfileScreen } from "../screens/authProfile/RegisterProfileScreen";
const Stack = createStackNavigator<AuthProfileParamsList>();

export const AuthProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
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
      <Stack.Screen name="LoginProfileScreen" component={LoginProfileScreen} />
      <Stack.Screen
        name="RegisterProfileScreen"
        component={RegisterProfileScreen}
      />
    </Stack.Navigator>
  );
};
