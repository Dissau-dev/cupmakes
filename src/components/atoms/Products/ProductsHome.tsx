import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";

interface Props {
  id: number;
  index: number;
  images: string;
  name: string;
  onpress: () => void;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export const ProductsHome = ({ id, index, images, name, onpress }: Props) => {
  return (
    <View
      key={id}
      style={[styles.container, index % 2 === 0 ? styles.even : styles.odd]}
    >
      <Image
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        source={{ uri: images }}
        style={[index % 2 === 0 ? styles.imageRight : styles.imageLeft]}
      />
      <View>
        <Text
          style={[
            index % 2 === 0 ? styles.textRight : styles.textLeft,
            { fontFamily: "Montserrat-Bold" },
          ]}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={onpress}>
            <Text
              style={[
                index % 2 === 0 ? styles.textBtnLeft : styles.textBtnRight,
                { fontFamily: "Montserrat-Thin" },
              ]}
            >
              Learn more{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[index === 5 && { height: heightScrenn * 0.8 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    bottom: heightScrenn * 0.01,
    right: widthScreen * 0.3,
    backgroundColor: palette.primary,
    position: "absolute",
  },

  image: {
    width: widthScreen,
    height: heightScrenn * 0.5,
  },
  titlesContainer: {
    position: "absolute",
    top: heightScrenn * 0.1,
    right: 6,
    alignItems: "center",
    justifyContent: "center",
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
  even: {
    flexDirection: "row",
  },
  odd: {
    flexDirection: "row-reverse",
  },
  imageRight: {
    width: widthScreen * 0.5,
    height: heightScrenn * 0.25,
    marginRight: 10,
    marginLeft: 10,
    transform: [{ rotate: "35deg" }],
  },
  imageLeft: {
    width: widthScreen * 0.5,
    height: heightScrenn * 0.25,
    marginRight: 10,
    marginLeft: 10,
    transform: [{ rotate: "-35deg" }],
  },
  textLeft: {
    fontSize: 28,
    textAlign: "left",
    maxWidth: widthScreen * 0.4,
  },
  textRight: {
    fontSize: 28,
    textAlign: "right",
    marginRight: 30,
    fontFamily: "Montserrat-Bold",
    maxWidth: widthScreen * 0.4,
  },
  textBtnLeft: {
    fontSize: 16,
    textAlign: "right",
  },
  textBtnRight: {
    fontSize: 16,
    textAlign: "right",
  },
});
