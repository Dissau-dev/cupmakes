import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props {
  title: string;
  description: string;
  icon: string;
  librery: string;
}

export const DeliveryCard = ({ title, description, icon, librery }: Props) => {
  return (
    <View
      style={{
        width: width * 0.8,
        height: heigth * 0.2,
        marginHorizontal: 10,
        // alignItems: "center",
        marginTop: 20,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 10,

        shadowColor: "#000",

        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: palette.primary,
          borderRadius: 100,
          height: "45%",
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {librery === "MaterialC" ? (
          <MaterialCommunityIcons
            //@ts-ignore
            name={`${icon}`}
            size={48}
            color={"#fff"}
          />
        ) : (
          <FontAwesome5
            //@ts-ignore
            name={`${icon}`}
            size={30}
            color={"#fff"}
          />
        )}
      </View>
      <View>
        <Text
          style={{
            // color: "#fff",
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            //color: "#fff",
            width: width * 0.6,
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
