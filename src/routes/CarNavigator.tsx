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
      <Stack.Screen
        name="CarScreen"
        component={CarScreen}
        options={{ title: "Car" }}
      />

      {/*<Stack.Screen
        name="ViewTicket"
        component={ViewTicket}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.titleScreen,
        })}
      />*/}
      <Stack.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "My Cart ",
        })}
      />
      <Stack.Screen
        name="MyOrderScreen"
        component={MyOrderScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "My Orders ",
        })}
      />
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
        name="SuccessOrder"
        component={SuccessOrder}
        options={{ title: "SuccessOrder" }}
      />
    </Stack.Navigator>
  );
};
