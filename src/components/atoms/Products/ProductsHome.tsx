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
        <Text style={[index % 2 === 0 ? styles.textRight : styles.textLeft]}>
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
              ]}
            >
              Learn More{" "}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={palette.secondary}
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 2,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  odd: {
    backgroundColor: "#ffffff",
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
    fontSize: 30,
    textAlign: "left",
    color: palette.primary,
  },
  textRight: {
    fontSize: 30,
    textAlign: "right",
    marginRight: 30,
    color: palette.primary,
  },
  textBtnLeft: {
    fontSize: 18,
    textAlign: "left",
    // marginLeft: 20,
    color: palette.secondary,
  },
  textBtnRight: {
    fontSize: 18,
    textAlign: "right",
    color: palette.secondary,
  },
});
