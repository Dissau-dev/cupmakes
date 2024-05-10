import { StyleSheet, Image } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";

const placeholderImage = require("../../../assets/images/Aceña.png");
const placeholderUser = require("../../../assets/images/cardAceña.jpg");

export default function AvatarComponent({
  uri,
  size,
  userPlaceholder = false,
}: {
  uri: string | undefined | null;
  size: number;
  userPlaceholder?: boolean;
}) {
  const placeholder = userPlaceholder ? placeholderUser : placeholderImage;
  return uri ? (
    <FastImage
      style={[styles.avatar, { height: size, width: size }]}
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
      }}
      defaultSource={placeholder}
      resizeMode={FastImage.resizeMode.cover}
    />
  ) : (
    <Image
      source={placeholder}
      style={[styles.avatar, { height: size, width: size }]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    backgroundColor: "transparent",
    borderRadius: 100,
    width: 100,
    alignSelf: "center",
  },
});
