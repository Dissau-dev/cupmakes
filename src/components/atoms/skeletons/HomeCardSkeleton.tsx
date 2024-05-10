import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { skeletonsColors } from "../../../theme/colors";
import { Skeleton } from "moti/skeleton";
import { globals } from "../../../theme/styles/global";
import { Baner } from "../Baner";
import { BanerSkeleton } from "../BanerSkeleton";
import Layout from "../../../utils/Layout";

export default function HomeCardSkeleton() {
  return (
    <View
      style={[globals.container, { marginBottom: Layout.window.height * 0.25 }]}
    >
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.row,
            { justifyContent: "flex-start", marginVertical: 15 },
          ]}
        ></View>

        <View style={{ marginTop: 10 }}></View>
        {Array.from({ length: 1 }).map((_, index) => {
          return (
            <View
              style={{
                flexDirection: "column",
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              <Skeleton
                height={150}
                width={"95%"}
                colorMode="light"
                colors={skeletonsColors}
              />
            </View>
          );
        })}
      </View>

      <View
        style={{
          // width: "100%",

          // backgroundColor: "aliceblue",
          // marginVertical: 10
          // paddingHorizontal: 10,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "90%",
    minHeight: 160,
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignSelf: "center",

    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
