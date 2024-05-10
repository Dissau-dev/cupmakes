import { createStackNavigator } from "@react-navigation/stack";

import { CarParamList } from "./types";
import AppBar from "../components/containers/AppBar";
import React from "react";
import { CarScreen } from "../screens/carStore/CarScreen";

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
    </Stack.Navigator>
  );
};
