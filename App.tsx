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
    /*
    <NavigationContainer>
    <Navigator/>
</NavigationContainer>*/

    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingPage title="" />}>
        {/* <StatusBar
style="dark"
backgroundColor="#FFFFFF"
animated={true}
translucent={false}
/> */}
        <SafeAreaProvider>
          <ThemeProvider>
            <PaperProvider theme={CombinedLightTheme}>
              <AppEntry />
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

/*
     const [fontLoaded, setfontLoaded] = useState(false);

useEffect(() => {
  if(!fontLoaded){
   
  }


}, )
        const loadFont =async () => {
          await Font.loadAsync({
            'Poppins-Light' : require('./src/assets/fonts/Poppins-Light.ttf'),
            'Poppins-Bold' : require('./src/assets/fonts/Poppins-Bold.ttf'),
            'Poppins-Medium' : require('./src/assets/fonts/Poppins-Medium.ttf')

          });
          setfontLoaded(true);
        }
*/
