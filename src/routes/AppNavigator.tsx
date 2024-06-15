import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AppParamList } from "./types";

//import { LoadingPage } from "../components/containers/LoadingPage";

//import crashlytics from "@react-native-firebase/crashlytics";
//import { useLazyLoadInitialDataQuery } from "../store/api/authApi";
import { HomeNavigator } from "./HomeNavigation";
import { ProductsNavigator } from "./ProductsNavigator";
import { CarNavigator } from "./CarNavigator";
import { TabsNavigator } from "./TabsNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { LoadingPage } from "../components/containers/LoadingPage";
import { useLazyLoadInitialDataQuery } from "../store/api/authApi";

const AppStack = createStackNavigator<AppParamList>();

export const AppNavigator = () => {
  const [loadData, { isLoading, isFetching }] = useLazyLoadInitialDataQuery();

  const init = async () => {
    await loadData()
      .unwrap()
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading || isFetching) {
    return <LoadingPage title="" />;
  }
  // const [loadData, { isLoading, isFetching }] = useLazyLoadInitialDataQuery();

  {
    /* const init = async () => {
    await loadData()
      .unwrap()
      .catch((error: any) => {
        // crashlytics().log("Something failed while loading initial data");
        // crashlytics().recordError(error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading || isFetching) {
    return <LoadingPage title="" />;
  } */
  }
  return (
    <>
      <AppStack.Navigator
        initialRouteName="TabsNavigator"
        screenOptions={{ headerShown: false }}
      >
        <AppStack.Screen name="TabsNavigator" component={TabsNavigator} />
        <AppStack.Screen name="HomeNavigator" component={HomeNavigator} />
        <AppStack.Screen
          name="ProductsNavigator"
          component={ProductsNavigator}
        />
        <AppStack.Screen name="CarNavigator" component={CarNavigator} />
        <AppStack.Screen name="ProfileNavigator" component={CarNavigator} />
        <AppStack.Screen name="AuthNavigator" component={AuthNavigator} />
      </AppStack.Navigator>
    </>
  );
};
