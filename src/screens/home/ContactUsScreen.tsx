import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeParamList } from "../../routes/types";

interface Props extends StackScreenProps<HomeParamList, "ContactUsScreen"> {}

export default function ContactUsScreen() {
  return (
    <View>
      <Text>ContactUsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
