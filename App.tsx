import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppEntry from "./AppEntry";
//import { store}  from './Redux/root';
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

//import { StatusBar } from 'expo-status-bar';
import { PersistGate } from "redux-persist/integration/react";
import { LoadingPage } from "./src/components/containers/LoadingPage";
import { persistStore } from "redux-persist";

import { store } from "./src/store/root";
import { injectStore } from "./src/services/APIServer";

import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "./src/Context/theme/ThemeContext";
import { CombinedLightTheme } from "./src/theme/colors";
import StripeConfig, {
  STRIPE_PUBLISHABLE_KEY,
} from "./src/screens/carStore/StripeConfig";
import { StripeProvider } from "@stripe/stripe-react-native";

/*
import { Navigator } from './src/Navigator/Navigator';
import * as Font from 'expo-font' */
injectStore(store);

export default function App() {
  //Disable font scaling
  //@ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  //@ts-ignore
  Text.defaultProps.allowFontScaling = false;

  const initialLoad = async () => {
    await SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 200);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingPage title="" />}>
        <SafeAreaProvider>
          <ThemeProvider>
            <PaperProvider theme={CombinedLightTheme}>
              <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
                <AppEntry />
              </StripeProvider>
            </PaperProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
