import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette, skeletonsColors } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Ionicons } from "@expo/vector-icons";

import { Baner } from "../../components/atoms/Baner";
import { AnimatedFAB, Button, Chip } from "react-native-paper";
import { useGetBestSellerQuery } from "../../store/api/productsApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeParamList } from "../../routes/types";

import Animation from "../../../assets/looties/Loading2.json";

import Lottie from "lottie-react-native";

import { ProductsHome } from "../../components/atoms/Products/ProductsHome";
import { HomeImages } from "../../components/atoms/Products/HomeImages";

interface Props extends StackScreenProps<HomeParamList, "HomeScreen"> {}
export const HomeScreen = ({ navigation }: Props) => {
  const { data: sellers, isLoading } = useGetBestSellerQuery();

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <Baner />

        <HomeImages
          onPress={() => {
            //@ts-ignore
            navigation.navigate("ProductsNavigator", {
              screen: "ProductsScreen",
            });
          }}
        />

        {isLoading ? (
          <Lottie
            source={Animation}
            autoPlay
            loop
            style={{
              width: widthScreen * 1,
              height: heightScrenn * 0.4,
              alignSelf: "center",
            }}
          />
        ) : (
          //@ts-ignore
          sellers?.map((product: any, index: number) => (
            <ProductsHome
              onpress={() => {
                //@ts-ignore
                navigation.navigate("ProductsNavigator", {
                  screen: "ProductDescrip",
                  params: {
                    titleScreen: product.name,
                    id: product.id,
                  },
                });
              }}
              id={product.id}
              images={product.images[0].src}
              index={index}
              name={product.name}
              key={product.id}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
});
