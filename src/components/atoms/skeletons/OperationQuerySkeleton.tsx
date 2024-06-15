import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { skeletonsColors } from "../../../theme/colors";
import { Skeleton } from "moti/skeleton";
import { globals } from "../../../theme/styles/global";
import Layout from "../../../utils/Layout";
import { BanerSkeleton } from "../BanerSkeleton";

export default function OperationQuerySkeleton() {
  return (
    <View>
      <View style={styles.itemContainer}>
        <View style={{ marginBottom: Layout.window.height * 0.24 }}></View>

        <View style={{ marginTop: 25, marginHorizontal: 10, bottom: 130 }}>
          <Skeleton
            height={15}
            width={130}
            colorMode="light"
            colors={skeletonsColors}
          />
        </View>

        <View style={{ marginBottom: -100 }}></View>
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <View key={index}>
              <View
                style={[styles.column, { justifyContent: "space-between" }]}
              >
                <View style={{ flexDirection: "row" }}>
                  <Skeleton
                    height={40}
                    width={40}
                    radius={"round"}
                    colorMode="light"
                    colors={skeletonsColors}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      marginVertical: 4,
                      marginLeft: 6,
                      justifyContent: "space-between",
                    }}
                  >
                    <Skeleton
                      height={12}
                      width={100}
                      radius={"round"}
                      colorMode="light"
                      colors={skeletonsColors}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Skeleton
                        height={12}
                        width={70}
                        radius={"round"}
                        colorMode="light"
                        colors={skeletonsColors}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Skeleton
                    height={16}
                    width={60}
                    colorMode="light"
                    colors={skeletonsColors}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>
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

    backgroundColor: "#fff",

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
});
