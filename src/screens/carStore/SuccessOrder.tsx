import React from "react";
import { CarParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import { palette } from "../../theme/colors";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { Baner } from "../../components/atoms/Baner";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cleanCart } from "../../store/slices/cartSlice";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import Lottie from "lottie-react-native";
import Animation from "../../../assets/looties/cartSuccessFully.json";

interface ProtectedScreenProps
  extends StackScreenProps<CarParamList, "SuccessOrder"> {}

export const SuccessOrder = ({ navigation }: ProtectedScreenProps) => {
  const dispatch = useAppDispatch();

  const onPress = () => {
    dispatch(cleanCart());
    navigation.popToTop();
  };
  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <Baner />
      <Text
        style={{
          textAlign: "center",
          fontSize: 50,
          marginVertical: heightScrenn * 0.05,
          fontFamily: "Xamire-Medium",
          color: palette.secondary,
        }}
      >
        Order received
      </Text>
      <Lottie
        source={Animation}
        autoPlay
        loop
        style={{
          width: widthScreen * 0.8,
          height: heightScrenn * 0.5,
          alignSelf: "center",
        }}
      />

      <Button
        style={[styles.btnLogIn]}
        mode="contained"
        buttonColor={palette.primary}
        rippleColor={palette.datesFilter}
        onPress={onPress}
        textColor={palette.white}
        labelStyle={styles.textLogIn}
      >
        {"Done"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnLogIn: {
    width: widthScreen * 0.6,
    alignSelf: "center",
    height: heightScrenn * 0.06,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: heightScrenn * 0.1,
  },
  textLogIn: {
    marginBottom: 2,
    fontSize: 18,
    alignSelf: "center",
    justifyContent: "center",

    height: heightScrenn * 0.05,
    textAlignVertical: "center",
    width: widthScreen * 0.62,
  },
});
