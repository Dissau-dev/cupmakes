import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
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
import { useGetSellersQuery } from "../../store/api/sellersApi";

interface Props extends StackScreenProps<HomeParamList, "HomeScreen"> {}
export const HomeScreen = ({ navigation }: Props) => {
  const { data: sellers, isLoading } = useGetSellersQuery();

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
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

        <Image
          source={{
            uri: "https://res.cloudinary.com/dew8qnaad/image/upload/v1722877969/juqyzfwwsflhl9ihgtsl.png",
            //uri: "https://img.freepik.com/free-photo/psychedelic-paper-shapes-with-copy-space_23-2149378246.jpg?w=826&t=st=1722975449~exp=1722976049~hmac=a82c1202ab96c02ff71668c09658c88c3747e776b488c4bf560e4fa0c6f69c01",
          }}
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            alignSelf: "center",
          }}
        />

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
          sellers?.SellerProduct.map((product: any, index: number) => (
            <View key={product.id}>
              <Text>{product.name}</Text>
            </View>
            /*<ProductsHome
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
            />*/
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
