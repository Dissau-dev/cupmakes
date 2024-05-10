import React from "react";
import { Image, View } from "react-native";

export const TecoLogo = () => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/logo-w.png")}
        style={{
          width: "60%",
          height: 150,
          top: "50%",
        }}
      />
    </View>
  );
};
