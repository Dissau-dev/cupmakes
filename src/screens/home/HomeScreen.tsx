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

import Animation from "../../../assets/looties/loaderSpinner.json";

import Lottie from "lottie-react-native";

import { ProductsHome } from "../../components/atoms/Products/ProductsHome";
import { HomeImages } from "../../components/atoms/Products/HomeImages";
import { useGetSellersQuery } from "../../store/api/sellersApi";
import { Video, ResizeMode } from "expo-av";

interface Props extends StackScreenProps<HomeParamList, "HomeScreen"> {}
export const HomeScreen = ({ navigation }: Props) => {
  const { data: sellers, isLoading } = useGetSellersQuery();

  const [showButton, setShowButton] = useState(false);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: any } };
  }) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    // Establece el punto en el que quieres que aparezca el botón.
    const threshold = heightScrenn * 0.9; // Se muestra después de una pantalla completa.

    if (yOffset > threshold && !showButton) {
      setShowButton(true);
    } else if (yOffset <= threshold && showButton) {
      setShowButton(false);
    }
  };

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
        onScroll={handleScroll}
        scrollEventThrottle={16} // Para que el scroll capture movimientos más frecuentemente.
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
              width: widthScreen * 0.6,
              height: heightScrenn * 0.6,
              alignSelf: "center",
            }}
          />
        ) : (
          <>
            <Image
              source={require("../../../assets/images/imagenes webp/d7dadb.png")}
              style={{
                width: widthScreen,
                height: heightScrenn * 2.63,
                position: "relative",
              }}
            />
            <View
              style={{ position: "absolute", marginTop: heightScrenn * 0.94 }}
            >
              {
                //@ts-ignore
                sellers?.map((item: any, index: number) => (
                  <ProductsHome
                    onpress={() =>
                      navigation.navigate("NutritionalScreen", {
                        item: item,
                      })
                    }
                    id={item.id}
                    images={item.images[0].src}
                    index={index}
                    name={item.name}
                    key={item.id}
                  />
                ))
              }
            </View>
          </>
        )}
      </ScrollView>
      {showButton && (
        <Button
          style={styles.floatBtn}
          onPress={() => {
            //@ts-ignore
            navigation.navigate("ProductsNavigator", {
              screen: "ProductsScreen",
            });
          }}
        >
          <Text style={styles.textBtn}>Order Now</Text>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  floatBtn: {
    marginTop: heightScrenn * 0.82,
    alignSelf: "center",
    backgroundColor: "#000",
    position: "absolute",
    width: widthScreen * 0.7,

    height: heightScrenn * 0.06,
    justifyContent: "center",
  },
  textBtn: {
    color: palette.white,
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
  },
});
