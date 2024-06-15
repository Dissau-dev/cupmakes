
import { adaptNavigationTheme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { ThemeState } from "../../Context/theme/themeReducer";


const paperColorsLightTheme = {
  colors: {
    primary: "rgb(121, 43, 225)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(236, 220, 255)",
    onPrimaryContainer: "rgb(39, 0, 87)",
    secondary: "rgb(192, 0, 12)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 218, 213)",
    onSecondaryContainer: "rgb(65, 0, 1)",
    tertiary: "rgb(0, 94, 179)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(213, 227, 255)",
    onTertiaryContainer: "rgb(0, 27, 60)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(29, 27, 30)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(29, 27, 30)",
    surfaceVariant: "rgb(232, 224, 235)",
    onSurfaceVariant: "rgb(73, 69, 78)",
    outline: "rgb(123, 117, 127)",
    outlineVariant: "rgb(203, 196, 207)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(50, 48, 51)",
    inverseOnSurface: "rgb(245, 239, 244)",
    inversePrimary: "rgb(214, 186, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(248, 241, 254)",
      level2: "rgb(244, 234, 253)",
      level3: "rgb(240, 228, 252)",
      level4: "rgb(239, 226, 251)",
      level5: "rgb(236, 222, 251)",
    },
    surfaceDisabled: "rgba(29, 27, 30, 0.12)",
    onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)",
  },
};

const paperLightTheme = {
  ...MD3LightTheme,
  colors: paperColorsLightTheme.colors, // Copy it from the color codes scheme and then use it here
};

const paperColorsDarkTheme = {
  colors: {
    primary: "rgb(214, 186, 255)",
    onPrimary: "rgb(66, 0, 137)",
    primaryContainer: "rgb(95, 0, 192)",
    onPrimaryContainer: "rgb(236, 220, 255)",
    secondary: "rgb(255, 180, 170)",
    onSecondary: "rgb(105, 0, 3)",
    secondaryContainer: "rgb(147, 0, 7)",
    onSecondaryContainer: "rgb(255, 218, 213)",
    tertiary: "rgb(167, 200, 255)",
    onTertiary: "rgb(0, 48, 97)",
    tertiaryContainer: "rgb(0, 71, 137)",
    onTertiaryContainer: "rgb(213, 227, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(29, 27, 30)",
    onBackground: "rgb(231, 225, 230)",
    surface: "rgb(29, 27, 30)",
    onSurface: "rgb(231, 225, 230)",
    surfaceVariant: "rgb(73, 69, 78)",
    onSurfaceVariant: "rgb(203, 196, 207)",
    outline: "rgb(149, 142, 153)",
    outlineVariant: "rgb(73, 69, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(231, 225, 230)",
    inverseOnSurface: "rgb(50, 48, 51)",
    inversePrimary: "rgb(121, 43, 225)",
    elevation: {
      level0: "transparent",
      level1: "rgb(38, 35, 41)",
      level2: "rgb(44, 40, 48)",
      level3: "rgb(49, 45, 55)",
      level4: "rgb(51, 46, 57)",
      level5: "rgb(55, 49, 62)",
    },
    surfaceDisabled: "rgba(231, 225, 230, 0.12)",
    onSurfaceDisabled: "rgba(231, 225, 230, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)",
  },
};

const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: paperColorsDarkTheme.colors, // Copy it from the color codes scheme and then use it here
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
export const lightTheme: ThemeState = {
  ...LightTheme,
  currentTheme: "light",
  dark: false,
  colors: {
    primary: "#FFC305",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#0D0E0E",
    border: "rgba(43,43,64,255)",
    notification: "rgb(255, 69, 58)",
  },
};

export const darkTheme: ThemeState = {
  ...DarkTheme,
  currentTheme: "dark",
  dark: true,
  colors: {
    primary: "rgba(0,92,169,1)",
    background: "#202425",
    card: "rgba(47,50,55,255)", //onyx: #2F3237FF
    text: "white",
    border: "rgba(43,43,64,255)",
    notification: "rgb(255, 69, 58)",
  },
};

export const CombinedLightTheme = {
  ...paperLightTheme,
  ...lightTheme,
  colors: {
    ...paperLightTheme.colors,
    ...lightTheme.colors,
    secondaryContainer: "transperent",
  },
};
export const CombinedDarkTheme = {
  ...paperDarkTheme,
  ...darkTheme,
  colors: {
    ...paperDarkTheme.colors,
    ...darkTheme.colors,
    secondaryContainer: "transperent",
  },
};

export const palette = {
  // primary: "#FFB305",
  primary: "#D12489",
  secondary: "#7EBBC0",
  logo: "#E25E28",
  icons: "#BABABA",
  green: "#02BB92",
  lightGreen: "#80DDC8",
  blue: "#0466C0",
  lightBlue: "#3CCADD",
  red: "#FD0E18",
  lightRed: "#F47676",
  darkGreen: "#33CC99",
  circularProgressBar: "#545454",
  circularProgressBar2: "#686A65",
  datesFilter: "#EFEFEF",
  white: "#FFFFFF",
  lightPrimary: "#FFEBAE",
  tags: "#EFEFEF",
  accountCard: "#FFD629",
  darkGray: "#969696",
  gold: "#C69426",
  purple: "#e461ff",
};

export const skeletonsColors = ["#EFEFEF99", "#F1F1F199"];
