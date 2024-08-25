import React from "react";
import { Button } from "react-native-paper";
import { heightScrenn, widthScreen } from "../../../../theme/styles/global";
import { palette } from "../../../../theme/colors";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../../../assets/placeholders/70014175_JEMA GER 1722-09.svg";
import { AntDesign } from "@expo/vector-icons";

export const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          color: palette.secondary,
          fontFamily: "Montserrat-Bold",
          fontSize: 40,
          textAlign: "center",
          marginVertical: heightScrenn * 0.05,
        }}
      >
        Cart is Empty
      </Text>
      <AntDesign
        size={45}
        color={palette.lightRed}
        name="questioncircleo"
        style={{
          position: "absolute",
          top: heightScrenn * 0.23,
          right: widthScreen * 0.12,
          alignSelf: "flex-end",
        }}
      />
      <Logo
        width={widthScreen * 0.8}
        height={heightScrenn * 0.44}
        style={{ alignSelf: "center" }}
        fill={palette.secondary}
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
