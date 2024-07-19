import { createStackNavigator } from "@react-navigation/stack";

import { AuthenticationParamList, CarParamList } from "./types";
import AppBar from "../components/containers/AppBar";
import React from "react";
import { CarScreen } from "../screens/carStore/CarScreen";
import { MyCartScreen } from "../screens/carStore/MyCartScreen";
import { MyOrderScreen } from "../screens/carStore/MyOrderScreen";
import { TakeOrderScreen } from "../screens/carStore/TakeOrderScreen";
import { OrdersDetail } from "../screens/carStore/OrdersDetail";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator<AuthenticationParamList>();

export const AuthNavigator = () => {
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
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "LoginScreen" }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: "RegisterScreen" }}
      />
    </Stack.Navigator>
  );
};
