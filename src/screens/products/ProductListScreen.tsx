import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ProductsParamList } from "../../routes/types";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { useGetProductByCategoryQuery } from "../../store/api/productsApi";
import { palette } from "../../theme/colors";

import { heightScrenn, widthScreen } from "../../theme/styles/global";

interface ScreenProps
  extends StackScreenProps<ProductsParamList, "ProductListScreen"> {}

import Animation from "../../../assets/looties/Loading2.json";
import LAnimation from "../../../assets/looties/bagEmpty.json";

import Lottie from "lottie-react-native";
import { ProductList } from "../../components/atoms/Products/ProductList";

export const ProductListScreen = ({ navigation, route }: ScreenProps) => {
  const { id } = route.params;

  const { isLoading, data, isError, isSuccess } =
    useGetProductByCategoryQuery(id);

  if (isLoading) {
    return (
      <View>
        <FocusAwareStatusBar
          barStyle={"default"}
          backgroundColor={palette.primary}
          translucent={false}
        />

        <Text style={styles.headerTitle}>Fresh and Tasty</Text>
        <Lottie
          source={Animation}
          autoPlay
          loop
          style={{
            width: widthScreen * 1,
            height: heightScrenn * 0.68,
            alignSelf: "center",
          }}
        />
      </View>
    );
  }

  if (isSuccess && data.length === 0) {
    return (
      <View>
        <FocusAwareStatusBar
          barStyle={"default"}
          backgroundColor={palette.primary}
          translucent={false}
        />

        <Text style={styles.headerTitle}>No products in this category</Text>
        <Lottie
          source={LAnimation}
          autoPlay
          loop
          style={{
            width: widthScreen * 1,
            height: heightScrenn * 0.68,
            alignSelf: "center",
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"light-content"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <Text style={styles.headerTitle}>Fresh and Tasty</Text>
      <View style={{ paddingBottom: heightScrenn * 0.245 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ProductList
              name={item.name}
              price={item.price}
              key={item.id}
              images={item.images[0].src}
              onPress={() =>
                navigation.navigate("ProductDescrip", {
                  titleScreen: item.name,
                  id: item.id,
                })
              }
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Xamire-Medium",
    fontSize: 50,
    textAlign: "center",

    marginVertical: 20,

    color: palette.secondary,
    height: 50,
  },
});
