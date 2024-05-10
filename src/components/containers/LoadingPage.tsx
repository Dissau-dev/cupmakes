import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

//import { useAnimation } from "../../hooks/useAnimation";
import { StatusBar } from "expo-status-bar";

import { palette } from "../../theme/colors";

interface Props {
  title: string;
  subtitle?: string;
}

export const LoadingPage = ({ title, subtitle }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.primary,
      }}
    >
      <StatusBar backgroundColor={palette.primary} translucent={false} />
      {/*} <AnimatedLogo />*/}
      {/* <Animated.Image
        source={logo_color}
        resizeMode={"contain"}
        style={{
          alignSelf: "center",
          width: 70,
          height: 70,
          opacity,
        }}
      />
      <View
        style={{
          flexDirection: "column",
          marginTop: 30,
        }}
      > */}
      {/* <ActivityIndicator size={40} color={colors.orange} /> */}
      {/* <Text style={[styles.text, { marginTop: 5 }]}>{title}</Text> */}
      {/* </View> */}
      {/* {!!subtitle && <Text style={styles.text}>{subtitle}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    marginStart: 8,
    fontWeight: "bold",
  },
});
