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
import { lightTheme } from "../../theme/colors/index";

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

        {/* <Animated.View style={[{ width: 100, height: 100 }, animatedStyle]} />
        <Button
          onPress={() => {
            progress.value = withRepeat(
              withTiming(1 - progress.value, { duration: 2000 }),
              5
            );
          }}
        >
          <Text>Run animation</Text>
        </Button> */}
        {/*<FlatList
          data={dataDelivery}
          renderItem={({ item }) => (
            <DeliveryCard
              description={item.descrip}
              title={item.title}
              icon={item.icon}
              librery={item.librery}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        /> */}

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
  fabStyle: {
    bottom: heightScrenn * 0.01,
    right: widthScreen * 0.3,
    backgroundColor: palette.primary,
    position: "absolute",
  },
  deliveryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,

    height: 90,
    width: widthScreen * 0.3,

    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  title1: {
    fontSize: 50,
    height: 60,
    marginRight: widthScreen * 0.1,
    alignSelf: "flex-end",
    textAlign: "left",
    fontFamily: "Xamire-Medium",
    color: palette.primary,
  },
  title2: {
    fontSize: 28,
    alignSelf: "flex-end",
    width: widthScreen * 0.6,
    textAlign: "center",
    color: "white",
    fontFamily: "Avanta-Bold",
    marginVertical: 4,
  },
  title4: {
    fontSize: 28,
    alignSelf: "flex-end",
    width: widthScreen * 0.6,
    textAlign: "center",
    color: "white",
    fontFamily: "Avanta-Bold",
    marginBottom: 10,
  },
  title3: {
    alignSelf: "flex-end",
    width: widthScreen * 0.4,
    marginHorizontal: widthScreen * 0.1,
    textAlign: "center",
    fontSize: 22,
    color: "white",
    fontFamily: "Avanta-Bold",
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
  skeleton: {
    width: 200,
    height: 200,
    backgroundColor: "#EFEFEF",
  },
});
