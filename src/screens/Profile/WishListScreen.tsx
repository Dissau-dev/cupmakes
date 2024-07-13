import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../store/hooks";
import { selectWitches } from "../../store/slices/witchesSlice";
import { ProductList } from "../../components/atoms/Products/ProductList";
import LottieView from "lottie-react-native";
import { heightScrenn, widthScreen } from "../../theme/styles/global";

import addressAnimation from "../../../assets/looties/Animation - 4.json";

export const WishListScreen = () => {
  const witches = useAppSelector(selectWitches);

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
      ></ScrollView>
      <FlatList
        data={witches}
        ListEmptyComponent={
          <View>
            <Text
              style={{
                color: palette.secondary,
                fontFamily: "Avanta-Medium",
                fontSize: 40,
                textAlign: "center",
                marginTop: heightScrenn * 0.2,
              }}
            >
              Whishlist Empty
            </Text>
            <LottieView
              source={addressAnimation}
              autoPlay
              loop
              style={{
                width: widthScreen * 1,
                height: heightScrenn * 0.5,
              }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <ProductList
            images={item.images[0].src}
            name={item.name}
            item={item}
            //@ts-ignore
            price={item.price}
            date={item.date}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
});
