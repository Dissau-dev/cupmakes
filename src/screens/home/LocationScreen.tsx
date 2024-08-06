import React from "react";
import { HomeParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Baner } from "../../components/atoms/Baner";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";

interface Props extends StackScreenProps<HomeParamList, "LocationScreen"> {}
export const LocationScreen = () => {
  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{
            uri: "https://maps.googleapis.com/maps/api/staticmap?center=37.7749,-122.4194&zoom=14&size=400x400&key=YOUR_API_KEY",
          }}
          style={{ width: 400, height: 400 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
});
