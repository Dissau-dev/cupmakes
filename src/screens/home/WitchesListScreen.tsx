import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../store/hooks";
import { selectWitches } from "../../store/slices/witchesSlice";
import { ProductList } from "../../components/atoms/Products/ProductList";

export const WitchesListScreen = () => {
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
        renderItem={({ item }) => (
          <ProductList
            images={item.images[0].src}
            name={item.name}
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
