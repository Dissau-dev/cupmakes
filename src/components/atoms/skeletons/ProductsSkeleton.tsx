import { StyleSheet, Text, View, StyleProp } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { skeletonsColors } from "../../../theme/colors";
import { Skeleton } from "moti/skeleton";
import {
  globals,
  heightScrenn,
  widthScreen,
} from "../../../theme/styles/global";

export default function ProductsSkeleton() {
  return (
    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <View style={styles.card} key={index}>
            <Skeleton
              height={heightScrenn * 0.315}
              width={widthScreen * 0.44}
              radius={10}
              colorMode="dark"
              colors={skeletonsColors}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "95%",
    minHeight: 200,
    justifyContent: "space-evenly",
    flexDirection: "column",
    margin: 8,
    padding: 5,
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    margin: 10,
  },
});
