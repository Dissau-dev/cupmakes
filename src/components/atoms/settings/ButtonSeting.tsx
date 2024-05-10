import React, { useState } from "react";
import { View, Text } from "react-native";
import Layout from "../../../utils/Layout";
import { Button, IconButton } from "react-native-paper";
import { palette } from "../../../theme/colors";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";

const height = Layout.window.height;
const width = Layout.window.width;

interface Props {
  icon: string;
  title: string;
  istarget?: boolean;
  anotherTitle?: string;
}

export const ButtonSeting = ({ icon, title, istarget }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: icon === "delete" ? width * 0.9 : width * 0.74,
        height: height * 0.08,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <IconButton
          icon={icon === "delete" ? "delete" : "cog"}
          style={{ alignSelf: "center" }}
          iconColor="#fff"
          containerColor={icon === "delete" ? palette.red : palette.primary}
          size={20}
        />

        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 14,
            textAlignVertical: "center",
            alignSelf: "center",
            textAlign: istarget ? "center" : "left",
            marginTop: istarget ? 12 : 4,
            width: width * 0.6,
            marginLeft: istarget ? width * -0.01 : width * 0.005,
          }}
        >
          {title}
        </Text>
      </View>
      {icon === "delete" ? (
        <Button
          style={{ marginVertical: height * 0.012 }}
          mode="contained"
          buttonColor={"#ffffff"}
        >
          <Fontisto name={"angle-right"} size={16} color="#636161" />
        </Button>
      ) : null}
    </View>
  );
};
