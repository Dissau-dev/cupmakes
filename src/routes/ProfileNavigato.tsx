import { createStackNavigator } from "@react-navigation/stack";

import { CarParamList, ProfileParamList } from "./types";
import AppBar from "../components/containers/AppBar";
import React from "react";
import { CarScreen } from "../screens/carStore/CarScreen";
import { MyCartScreen } from "../screens/carStore/MyCartScreen";
import { MyOrderScreen } from "../screens/carStore/MyOrderScreen";
import { TakeOrderScreen } from "../screens/carStore/TakeOrderScreen";
import { OrdersDetail } from "../screens/carStore/OrdersDetail";
import { SuccessOrder } from "../screens/carStore/SuccessOrder";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";

const Stack = createStackNavigator<ProfileParamList>();

export const ProfileNavigator = () => {
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
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      {/*<Stack.Screen
        name="ViewTicket"
        component={ViewTicket}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.titleScreen,
        })}
      />*/}
    </Stack.Navigator>
  );
};
