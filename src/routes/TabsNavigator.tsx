import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";

import { CarNavigator } from "./CarNavigator";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { palette } from "../theme/colors";
import { TabsParamList } from "./types";
import { Platform, View } from "react-native";
import { createMaterialBottomTabNavigator } from "react-native-paper/lib/typescript/react-navigation";
import { ProductsNavigator } from "./ProductsNavigator";
import { HomeNavigator } from "./HomeNavigation";
import { Badge } from "react-native-paper";
import { useAppSelector } from "../store/hooks";
import { selectProducts } from "../store/slices/cartSlice";
import { selectAuth } from "../store/slices/userSlice";
import { AuthNavigator } from "./AuthNavigator";
import { ProfileNavigator } from "./ProfileNavigato";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { heightScrenn, widthScreen } from "../theme/styles/global";
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
  const product = useAppSelector(selectProducts);
  return Platform.OS === "ios" ? <IOSBottomTabs /> : <AndroidBottomTabs />;
};
const AndroidBottomTab = createBottomTabNavigator<TabsParamList>();

const AndroidBottomTabs = () => {
  const products = useAppSelector(selectProducts);
  const isAuth = useAppSelector(selectAuth);

  const badgeScale = useSharedValue(1);
  const lastUpdated = useAppSelector((state) => state.cart.lastUpdated);
  React.useEffect(() => {
    if (lastUpdated) {
      badgeScale.value = withTiming(1.5, { duration: 200 }, () => {
        badgeScale.value = withTiming(1, { duration: 200 });
      });
    }
  }, [lastUpdated]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: badgeScale.value }],
    };
  });

  return (
    <AndroidBottomTab.Navigator
      initialRouteName="HomeNavigator"
      //screenOptions={{ headerShown: false}}
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 17,
          fontFamily: "Avanta-Medium",
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
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={({ route }) => ({
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            return (
              <Ionicons name={"person-outline"} size={size} color={color} />
            );
          },

          headerShown: false,
        })}
      />
      {isAuth ? (
        <AndroidBottomTab.Screen
          name="CarNavigator"
          component={CarNavigator}
          options={({ route }) => ({
            title: "Cart",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              return (
                <View style={{}}>
                  <View
                    style={{
                      marginLeft: widthScreen * 0.05,
                      top: heightScrenn * 0.016,
                      //position: "absolute",
                    }}
                  >
                    {products.length === 0 ? null : (
                      <Animated.View style={animatedStyle}>
                        <Badge
                          style={{
                            backgroundColor: palette.primary,
                            elevation: 1,
                            position: "absolute",
                            left: 0,
                            bottom: 2,
                          }}
                        >
                          {products.length > 9 ? "9+" : products.length}
                        </Badge>
                      </Animated.View>
                    )}
                  </View>

                  <Ionicons name={"cart-outline"} size={size} color={color} />
                </View>
              );
            },

            headerShown: false,
          })}
        />
      ) : (
        <AndroidBottomTab.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={({ route }) => ({
            title: "Cart",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              return (
                <View style={{}}>
                  <View
                    style={{ marginLeft: 22, bottom: 12, position: "absolute" }}
                  >
                    {products.length === 0 ? null : (
                      <Badge style={{ backgroundColor: palette.primary }}>
                        {products.length > 9 ? "9+" : products.length}
                      </Badge>
                    )}
                  </View>

                  <Ionicons name={"cart-outline"} size={size} color={color} />
                </View>
              );
            },

            headerShown: false,
          })}
        />
      )}
    </AndroidBottomTab.Navigator>
  );
};
const IOSBottomTab = createBottomTabNavigator<TabsParamList>();
const IOSBottomTabs = () => {
  const products = useAppSelector(selectProducts);
  const isAuth = useAppSelector(selectAuth);
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
      {isAuth ? (
        <IOSBottomTab.Screen
          name="CarNavigator"
          options={{
            title: "Cart",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              return (
                <View style={{}}>
                  <View
                    style={{ marginLeft: 22, bottom: 12, position: "absolute" }}
                  >
                    {products.length === 0 ? null : (
                      <Badge style={{ backgroundColor: palette.primary }}>
                        {products.length > 9 ? "9+" : products.length}
                      </Badge>
                    )}
                  </View>

                  <Ionicons name={"cart-outline"} size={size} color={color} />
                </View>
              );
            },
          }}
          component={CarNavigator}
        />
      ) : (
        <IOSBottomTab.Screen
          name="AuthNavigator"
          options={{
            title: "Cart",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              return (
                <View style={{}}>
                  <View
                    style={{ marginLeft: 22, bottom: 12, position: "absolute" }}
                  >
                    {products.length === 0 ? null : (
                      <Badge style={{ backgroundColor: palette.primary }}>
                        {products.length > 9 ? "9+" : products.length}
                      </Badge>
                    )}
                  </View>

                  <Ionicons name={"cart-outline"} size={size} color={color} />
                </View>
              );
            },
          }}
          component={AuthNavigator}
        />
      )}
    </IOSBottomTab.Navigator>
  );
};
