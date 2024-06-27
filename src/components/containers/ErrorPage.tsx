import React, { useContext } from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import { Button } from "react-native-paper";
///import { I18n } from "i18n-js";
//import englishLanguage from "../../i18n/english.json";
//import spanishLanguage from "../../i18n/spanish.json";

//import { ThemeContext } from "../../context/theme/ThemeContext";
import { palette } from "../../theme/colors";
import FocusAwareStatusBar from "../atoms/FocusAwareStatusBar";

interface Props {
  message?: string | boolean;
  onRecovery: Function;
}

export const ErrorPage = ({ message, onRecovery }: Props) => {
  /* const { theme } = useContext(ThemeContext);
  const i18n = new I18n({
    en: englishLanguage,
    es: spanishLanguage,
  });*/

  const error = require("../../../assets/images/error.png");

  return (
    <View style={[styles.container, { backgroundColor: palette.white }]}>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <Image
        source={error}
        style={{
          width: 140,
          height: 140,
          opacity: 0.8,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 50,
        }}
      >
        {/* <Text style={[styles.title, { color: theme.colors.text }]}>
                    {i18n.t("errorMsg")}
                </Text> */}
        {message && (
          <Text style={[styles.subtitle, { color: palette.darkGray }]}>
            {message}
          </Text>
        )}
        <Button
          mode="contained"
          onPress={() => onRecovery()}
          icon="refresh"
          buttonColor={palette.primary}
          style={{ marginVertical: 32 }}
          labelStyle={{
            fontFamily:
              Platform.OS === "android" ? "Avanta-Medium" : "sf-medium",
            marginVertical: Platform.OS === "android" ? 8 : 8,
            color: palette.white,
          }}
        >
          Reintentar {/* {i18n.t("retry")} */}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: 16,
    fontSize: Platform.OS === "ios" ? 24 : 18,
    opacity: 0.9,
    textAlign: "center",
    fontFamily: Platform.OS === "android" ? "Avanta-Medium" : "sf-300",
  },
  subtitle: {
    opacity: 0.8,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 24 : 16,
    fontFamily: Platform.OS === "android" ? "Avanta-Medium" : "sf-300",
  },
});
