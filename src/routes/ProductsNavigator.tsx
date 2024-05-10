import { createStackNavigator } from "@react-navigation/stack";

import AppBar from "../components/containers/AppBar";

import React from "react";
import { ProductsParamList } from "./types";
import { ProductsScreen } from "../screens/products/ProductsScreen";

import { palette } from "../theme/colors";

const ProductsStack = createStackNavigator<ProductsParamList>();

export const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator
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
      <ProductsStack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
    </ProductsStack.Navigator>
  );
};
