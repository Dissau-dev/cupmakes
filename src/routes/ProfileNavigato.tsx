import { createStackNavigator } from "@react-navigation/stack";

import { CarParamList, ProfileParamList } from "./types";
import AppBar from "../components/containers/AppBar";
import React from "react";

import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { WishListScreen } from "../screens/Profile/WishListScreen";
import { OrdersScreen } from "../screens/Profile/OrdersScreen";
import AccounDetail from "../screens/Profile/AccounDetail";
import AddressScreen from "../screens/Profile/AddressScreen";
import AddAddress from "../screens/Profile/AddAddress";

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

      <Stack.Screen
        name="WishListScreen"
        component={WishListScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Wishlist",
        })}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "My orders",
        })}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccounDetail}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Edit My Account ",
        })}
      />
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "My Addresses",
        })}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};
