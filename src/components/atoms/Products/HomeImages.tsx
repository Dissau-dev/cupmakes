import React, { useEffect, useRef, useState } from "react";
import { palette } from "../../../theme/colors";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";
import { FlatList, Image, Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeParamList } from "../../../routes/types";

import { Video, ResizeMode } from "expo-av";
const HomeData = [
  {
    id: 1,
    text1: "Especial offers",
    text2: "Simple - Classic",
    text4: "- Delicious -",
    tex3: "Delivery and Pick up options",
    image: require("../../../../assets/Secuencia 04/Secuencia 04.mp4"),
  },
  {
    id: 2,
    text1: "Fresh & Tasty",
    text2: "Make your own cupcake",
    text4: " ",
    tex3: "",
    image: require("../../../../assets/images/imagenes webp/HOME.webp"),
  },
  {
    id: 3,
    text1: "Best Choice",
    text2: "Fresh Bred Every Day",
    text4: " ",
    tex3: "Only Natural Ingredients",
    image: require("../../../../assets/images/imagenes webp/4.webp"),
  },
];

interface Props {
  onPress: () => void;
}
export const HomeImages = ({ onPress }: Props) => {
  return (
    <FlatList
      data={HomeData}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {index === 0 ? (
            <View
              style={{
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <Video
                shouldPlay={true}
                source={item.image}
                style={{
                  width: widthScreen * 1,
                  height: heightScrenn * 0.87,
                }}
                isLooping={true}
                resizeMode={ResizeMode.COVER}
              />
            </View>
          ) : (
            <Image
              source={item.image}
              style={{ width: widthScreen, height: heightScrenn * 0.87 }}
            />
          )}

          <Button
            style={{
              backgroundColor: "#000",
              position: "absolute",
              top: heightScrenn * 0.758,
              left: widthScreen * 0.12,
              width: widthScreen * 0.5,
              height: heightScrenn * 0.06,
              justifyContent: "center",
            }}
            rippleColor={palette.icons}
            //@ts-ignor
            // onPress={() => navigation.navigate("LocationScreen")}
          >
            <Text
              style={{
                color: palette.white,
                fontFamily: "Montserrat-Bold",
                fontSize: 18,
              }}
            >
              Order now
            </Text>
          </Button>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>{`${index + 1} / ${
              HomeData.length
            }`}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      //onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  fabStyle: {
    bottom: heightScrenn * 0.01,
    right: widthScreen * 0.3,
    backgroundColor: palette.primary,
    position: "absolute",
  },
  deliveryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,

    height: 90,
    width: widthScreen * 0.3,

    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: widthScreen,
    height: heightScrenn * 0.87,
  },
  titlesContainer: {
    position: "absolute",
    top: heightScrenn * 0.1,
    right: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  title1: {
    fontSize: 50,
    height: 60,
    marginRight: widthScreen * 0.1,
    alignSelf: "flex-end",
    textAlign: "left",
    fontFamily: "Xamire-Medium",
    color: palette.primary,
  },
  title2: {
    fontSize: 28,
    alignSelf: "flex-end",
    width: widthScreen * 0.6,
    textAlign: "center",
    color: "white",
    fontFamily: "Avanta-Bold",
    marginVertical: 4,
  },
  title2Alt: {
    fontSize: 30,
    alignSelf: "center",
    marginVertical: 4,
    width: widthScreen * 0.4,
    textAlign: "center",
    color: "white",
    fontFamily: "Avanta-Bold",
  },
  title4: {
    fontSize: 28,
    alignSelf: "flex-end",
    width: widthScreen * 0.6,
    textAlign: "center",
    color: "white",
    fontFamily: "Avanta-Bold",
    marginBottom: 10,
  },
  title3: {
    alignSelf: "flex-end",
    width: widthScreen * 0.4,
    marginHorizontal: widthScreen * 0.1,
    textAlign: "center",
    fontSize: 22,
    color: "white",
    fontFamily: "Avanta-Bold",
  },
  sliderContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderText: {
    fontSize: 16,
    color: "white",
  },

  container: {
    alignItems: "center",
    padding: 10,
    justifyContent: "space-around",
  },
});
