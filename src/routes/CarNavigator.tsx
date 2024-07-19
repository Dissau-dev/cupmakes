import { createStackNavigator } from "@react-navigation/stack";

import { CarParamList } from "./types";
import AppBar from "../components/containers/AppBar";
import React from "react";
import { CarScreen } from "../screens/carStore/CarScreen";
import { MyCartScreen } from "../screens/carStore/MyCartScreen";
import { MyOrderScreen } from "../screens/carStore/MyOrderScreen";
import { TakeOrderScreen } from "../screens/carStore/TakeOrderScreen";
import { OrdersDetail } from "../screens/carStore/OrdersDetail";
import { SuccessOrder } from "../screens/carStore/SuccessOrder";
import { SelectAddress } from "../screens/carStore/SelectAddress";

const Stack = createStackNavigator<CarParamList>();

export const CarNavigator = () => {
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
      <Stack.Screen name="MyCartScreen" component={MyCartScreen} />

      <Stack.Screen
        name="TakeOrderScreen"
        component={TakeOrderScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Take Order",
        })}
      />
      <Stack.Screen
        name="OrdersDetail"
        component={OrdersDetail}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Details",
        })}
      />
      <Stack.Screen
        name="SelectAddress"
        component={SelectAddress}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Select Address",
        })}
      />
      <Stack.Screen
        name="SuccessOrder"
        component={SuccessOrder}
        options={{ title: "SuccessOrder" }}
      />
    </Stack.Navigator>
  );
};
