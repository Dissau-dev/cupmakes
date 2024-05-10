import React, { createContext, useEffect, useReducer, useRef } from "react";
import { Appearance, AppState } from "react-native";

import { darkTheme, lightTheme } from "../../theme/colors";
import { ThemeState, themeReducer } from "./themeReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
  activateDefaultPhoneTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {
  const [theme, dispatch] = useReducer(
    themeReducer,
    lightTheme //Appearance.getColorScheme() === "light" ? lightTheme : darkTheme
  );

  const listenerRef = useRef<any>();

  const initTheme = async () => {
    const theme_config = await AsyncStorage.getItem("theme_config");
    if (theme_config === "null") return;
    if (theme_config === Appearance.getColorScheme()) return;

    switch (theme_config) {
      case "app":
        activateDefaultPhoneTheme();
        break;
      case "light":
        setLightTheme();
        break;
      default:
        setDarkTheme();
        break;
    }
  };

  useEffect(() => {
    initTheme();
  }, []);

  const activateDefaultPhoneTheme = async () => {
    Appearance.getColorScheme() === "light"
      ? dispatch({ type: "set_light_theme" })
      : dispatch({ type: "set_dark_theme" });

    await AsyncStorage.setItem("theme_config", "app");

    listenerRef.current = AppState.addEventListener("change", (status) => {
      if (status === "active") {
        initTheme();
      }
    });
  };

  const desactivateDefaultPhoneTheme = () => {
    if (listenerRef.current) {
      listenerRef.current.remove();
    }
  };

  const setDarkTheme = async () => {
    dispatch({ type: "set_dark_theme" });
    desactivateDefaultPhoneTheme();
    await AsyncStorage.setItem("theme_config", "dark");
  };

  const setLightTheme = async () => {
    dispatch({ type: "set_light_theme" });
    desactivateDefaultPhoneTheme();
    await AsyncStorage.setItem("theme_config", "light");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkTheme,
        setLightTheme,
        activateDefaultPhoneTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
