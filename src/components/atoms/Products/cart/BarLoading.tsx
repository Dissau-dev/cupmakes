import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { palette } from "../../../../theme/colors";
import { widthScreen } from "../../../../theme/styles/global";

interface Props {
  level: number;
}
export const BarLoading = ({ level }: Props) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          width: widthScreen * 0.7,
          marginTop: 20,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <View style={styles.full}></View>

        <View style={styles.line}></View>

        <View style={[level < 1 ? styles.normal : styles.full]}></View>

        <View style={styles.line}></View>

        <View style={[level < 2 ? styles.normal : styles.full]}></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: widthScreen * 0.7,
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        <Text style={styles.textFull}>Cart</Text>
        <Text style={[level < 1 ? styles.textMidNormal : styles.textMidFull]}>
          Locations
        </Text>
        <Text style={[level < 2 ? styles.textNormal : styles.textFull]}>
          Payment
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    backgroundColor: palette.secondary,
    borderRadius: 100,
    width: 14,
    height: 14,
  },
  normal: {
    borderWidth: 1,

    borderColor: palette.secondary,
    borderRadius: 100,
    width: 14,
    height: 14,
  },
  line: {
    backgroundColor: palette.secondary,
    borderRadius: 100,
    width: 110,
    height: 2,
  },
  textFull: {
    color: palette.secondary,
    fontFamily: "Avanta-Medium",
    fontSize: 16,
    top: 10,
  },
  textNormal: {
    color: palette.icons,
    fontFamily: "Avanta-Medium",
    fontSize: 16,
    top: 10,
  },
  textMidFull: {
    color: palette.secondary,
    fontFamily: "Avanta-Medium",
    fontSize: 16,
    top: 10,
  },
  textMidNormal: {
    color: palette.icons,
    fontFamily: "Avanta-Medium",
    fontSize: 16,
    top: 10,
    marginHorizontal: widthScreen * 0.22,
  },
});
