import { Theme } from "@react-navigation/native";
import { darkTheme, lightTheme } from "../../theme/colors";

type ThemeAction = { type: "set_light_theme" } | { type: "set_dark_theme" };

export interface ThemeState extends Theme {
    currentTheme: "light" | "dark";
}

export const themeReducer = (
    state: ThemeState,
    action: ThemeAction
): ThemeState => {
    switch (action.type) {
        case "set_light_theme":
            return { ...lightTheme };

        case "set_dark_theme":
            return { ...darkTheme };

        default:
            return state;
    }
};
