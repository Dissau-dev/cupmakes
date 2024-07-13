import React from "react";
import { Button } from "react-native-paper";
import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import { palette } from "../../../../theme/colors";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";

import cartAnimation from "../../../../../assets/looties/cartEmpty.json";
import { useNavigation } from "@react-navigation/native";

export const EmptyCart = () => {
  const navigation = useNavigation();
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
        onPress={() =>
          //@ts-ignore
          navigation.navigate("ProductsNavigator", {
            screen: "ProductsScreen",
          })
        }
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
            fontSize: 20,
            fontFamily: "Avanta-Medium",
          }}
        >
          Order Now
        </Text>
      </Button>
    </View>
  );
};
