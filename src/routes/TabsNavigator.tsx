import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { CarNavigator } from "./CarNavigator";

import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { palette } from "../theme/colors";
import { TabsParamList } from "./types";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "react-native-paper/lib/typescript/react-navigation";
import { ProductsNavigator } from "./ProductsNavigator";
import { HomeNavigator } from "./HomeNavigation";
//import Ionicons from 'react-native-vector-icons/Ionicons';

const viewBox = Platform.OS === "ios" ? "20 -550 100 1500" : "100 100 50 50";

const Tab = createBottomTabNavigator();

type IconProps = {
  focused: boolean;
  color: string;
  size?: number;
};

const profileIcon = ({ focused, color }: IconProps) => {
  return <Ionicons name="person-outline" size={20} color={color} />;
};

export const TabsNavigator = () => {
  return Platform.OS === "ios" ? <IOSBottomTabs /> : <AndroidBottomTabs />;
};
const AndroidBottomTab = createBottomTabNavigator<TabsParamList>();

const AndroidBottomTabs = () => {
  return (
    <AndroidBottomTab.Navigator
      initialRouteName="HomeNavigator"
      //screenOptions={{ headerShown: false}}
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "Poppins-Medium",
        },
        tabBarIcon: ({ focused, color, size }: IconProps) => {
          let iconName;

          if (route.name === "HomeNavigator") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "CarNavigator") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={"home-outline"} size={size} color={color} />;
        },
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: "#c0b4b4",
        headerShown: false,
      })}
    >
      <AndroidBottomTab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={({ route }) => ({
          title: "Home",

          headerShown: false,
        })}
      />

      <AndroidBottomTab.Screen
        name="ProductsNavigator"
        component={ProductsNavigator}
        options={({ route }) => ({
          title: "Products",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            return (
              <MaterialCommunityIcons
                name={"storefront-outline"}
                size={size}
                color={color}
              />
            );
          },

          headerShown: false,
        })}
      />
      <AndroidBottomTab.Screen
        name="CarNavigator"
        component={CarNavigator}
        options={({ route }) => ({
          title: "Cart",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            return <Ionicons name={"cart-outline"} size={size} color={color} />;
          },

          headerShown: false,
        })}
      />
    </AndroidBottomTab.Navigator>
  );
};
const IOSBottomTab = createBottomTabNavigator<TabsParamList>();
const IOSBottomTabs = () => {
  return (
    <IOSBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.icons,
        tabBarStyle: { backgroundColor: palette.white },
      }}
      sceneContainerStyle={{ backgroundColor: palette.white }}
      initialRouteName="HomeNavigator"
      backBehavior="history"
    >
      <IOSBottomTab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={({ route }) => ({
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            return <Ionicons name={"home-outline"} size={size} color={color} />;
          },

          headerShown: false,
        })}
      />

      <IOSBottomTab.Screen
        name="ProductsNavigator"
        options={({ route }) => ({
          title: "Products",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            return <Ionicons name={"card-outline"} size={size} color={color} />;
          },

          headerShown: false,
        })}
        component={ProductsNavigator}
      />
      <IOSBottomTab.Screen
        name="CarNavigator"
        options={{
          title: "Products",
          tabBarIcon: profileIcon,
        }}
        component={CarNavigator}
      />
    </IOSBottomTab.Navigator>
  );
};
