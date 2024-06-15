import React from "react";
import { Button } from "react-native-paper";
import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import { palette } from "../../../../theme/colors";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";

import cartAnimation from "../../../../../assets/looties/cartEmpty.json";

export const EmptyCart = () => {
  return (
    <View>
      <Text
        style={{
          color: palette.secondary,
          fontFamily: "Xamire-Medium",
          fontSize: 70,
          textAlign: "center",
          marginVertical: heightScrenn * 0.05,
        }}
      >
        Cart is Empty
      </Text>
      <LottieView
        source={cartAnimation}
        autoPlay
        loop
        style={{
          width: widthScreen * 1,
          height: heightScrenn * 0.45,
          alignSelf: "center",
        }}
      />
      <Button
        onPress={() => console.log("p")}
        rippleColor={palette.datesFilter}
        // rippleColor={"#FF5C35"}
        textColor="#fff"
        style={{
          marginVertical: 40,
          borderRadius: 100,
          backgroundColor: palette.primary,
          width: widthScreen * 0.6,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignContent: "center",
            fontSize: 18,
          }}
        >
          Order Now
        </Text>
      </Button>
    </View>
  );
};
