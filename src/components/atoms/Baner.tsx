import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Baner = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        //  marginHorizontal: 20,
        backgroundColor: palette.primary,
        paddingBottom: 10,
      }}
    >
      <View style={{ width: "15%" }} />

      <Image
        source={require("../../../assets/images/2.png")}
        style={{
          width: widthScreen * 0.46,
          height: heightScrenn * 0.05,
          alignSelf: "center",
        }}
      />

      <TouchableOpacity
        //@ts-ignore
        onPress={() => navigation.navigate("WitchesListScreen")}
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          marginHorizontal: widthScreen * 0.03,
          width: "10%",
        }}
      >
        <Ionicons name="heart-outline" color={palette.white} size={30} />
      </TouchableOpacity>
    </View>
  );
};
