import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { skeletonsColors } from "../../../theme/colors";
import { Skeleton } from "moti/skeleton";
import { globals } from "../../../theme/styles/global";

import { BanerSkeleton } from "../BanerSkeleton";

const width = Dimensions.get("window").width;

const height = Dimensions.get("window").height;

export default function DispatchDetailsSkeleton() {
  return (
    <View style={[globals.container, { padding: 10 }]}>
      <View style={styles.itemContainer}>
        <View style={{ marginBottom: height * 0.2 }}>
          <BanerSkeleton
            onProfile={() => {
              // navigation.dispatch(
              //   CommonActions.navigate({
              //     name: "ProfileNavigator",
              //   })
              // );
              //@ts-ignore
              navigation.navigate("ProfileNavigator", {
                screen: "PerfilScreen",
              });
            }}
            //@ts-ignore
            onNotifications={() => console.log("m")}
          />
        </View>
        <View style={{ height: 60 }}></View>
        <View
          style={{
            paddingHorizontal: 10,
            marginBottom: 40,
            alignItems: "center",
          }}
        >
          <Skeleton
            height={20}
            width={200}
            colorMode="light"
            colors={skeletonsColors}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              width: 280,
              height: 32,
              backgroundColor: "#c1c1c11b",
              borderRadius: 50,
            }}
          >
            <Skeleton
              height={32}
              width={140}
              colorMode="light"
              colors={skeletonsColors}
            />
            <Skeleton
              height={32}
              width={140}
              colorMode="light"
              colors={skeletonsColors}
            />
          </View>
        </View>
        <View style={{}}></View>
        {Array.from({ length: 2 }).map((_, index) => {
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
                width={"90%"}
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
          flex: 1,
          flexShrink: 1,
          // backgroundColor: "aliceblue",
          // marginVertical: 10,
          marginBottom: 5,
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
});
