import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { MotiView } from "moti";
import { palette } from "../../theme/colors";

interface Props {
  selected: boolean;
  onPress: any;
  label: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  notification?: boolean;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FilterListItem({
  onPress,
  selected,
  label,

  disabled = false,
  containerStyle,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      <MotiView
        animate={{
          backgroundColor: selected ? palette.primary : palette.white,
          opacity: selected ? 1 : 0.6,
          borderColor: selected ? "#d2d0d0" : palette.primary,
          borderWidth: 2,
        }}
        transition={{ type: "timing", duration: 500 }}
        style={[styles.buttonContainer, containerStyle]}
      >
        <Text style={selected ? styles.textSelected : styles.text}>
          {label}
        </Text>
      </MotiView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 20, width: 0.08 * width, height: height * 0.03 },
  buttonContainer: {
    marginRight: 10,
    padding: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    // marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    color: "transparent",
    fontWeight: "400",
    fontSize: 14,
  },
  textSelected: {
    color: "transparent",
    fontWeight: "500",
    fontSize: 14,
  },
});
