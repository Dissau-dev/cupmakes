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
];

interface Props {
  onPress: () => void;
}
export const HomeImages = ({ onPress }: Props) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    };
    playVideo();
  }, []);
  const naviagtion = useNavigation();

  const handlePress = (index: number) => {
    if (index === 1) {
      //@ts-ignore
      return naviagtion.navigate("LocationScreen");
    } else {
      //@ts-ignore
      return naviagtion.navigate("ProductsNavigator", {
        screen: "ProductsScreen",
      });
    }
  };
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
                ref={videoRef}
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
            style={styles.Btn}
            rippleColor={palette.icons}
            onPress={() => handlePress(index)}
            labelStyle={{
              width: widthScreen * 0.5,
              height: heightScrenn * 0.037,
              justifyContent: "center",
              verticalAlign: "middle",
            }}
          >
            <Text style={styles.textBtn}>
              {index === 1 ? "Contact us" : "Order now"}
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
  Btn: {
    backgroundColor: "#000",
    position: "absolute",
    top: heightScrenn * 0.758,
    left: widthScreen * 0.12,
    width: widthScreen * 0.5,
    height: heightScrenn * 0.06,
    justifyContent: "center",
  },
  textBtn: {
    color: palette.white,
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
  },
});
